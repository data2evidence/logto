import { appInsights } from '@logto/app-insights/node';
import { ConsoleLog } from '@logto/shared';
import { trySafe } from '@silverhand/essentials';
import chalk from 'chalk';
import Koa from 'koa';

import initApp from './app/init.ts';
import { redisCache } from './caches/index.ts';
import { EnvSet } from './env-set/index.ts';
import { checkPreconditions } from './env-set/preconditions.ts';
import initI18n from './i18n/init.ts';
import SystemContext from './tenants/SystemContext.ts';
import { tenantPool } from './tenants/index.ts';
import { loadConnectorFactories } from './utils/connectors/index.ts';

const consoleLog = new ConsoleLog(chalk.magenta('index'));

console.log('Logto worker initializing...');

if (await appInsights.setup('core')) {
  consoleLog.info('Initialized ApplicationInsights');
}

try {
  const app = new Koa({
    proxy: EnvSet.values.trustProxyHeader,
  });

  const sharedAdminPool = await EnvSet.sharedPool;

  await Promise.all([
    initI18n(),
    redisCache.connect(),
    loadConnectorFactories(),
    checkPreconditions(sharedAdminPool),
    SystemContext.shared.loadProviderConfigs(sharedAdminPool),
  ]);

  process.on('unhandledRejection', (error) => {
    consoleLog.error(error);
    void appInsights.trackException(error);
  });

  await initApp(app);

  console.log('Logto worker initialized successfully');
} catch (error: unknown) {
  console.error('Error while initializing Logto worker:');
  console.error(error);

  void Promise.all([trySafe(tenantPool.endAll()), trySafe(redisCache.disconnect())]);
}
