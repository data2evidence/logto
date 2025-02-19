import type { CommonQueryMethods } from '@silverhand/slonik';
import { sql } from '@silverhand/slonik';

import type { AlterationScript } from '../lib/types/alteration.js';

const getDatabaseName = async (pool: CommonQueryMethods) => {
  const { currentDatabase } = await pool.one<{ currentDatabase: string }>(sql`
    select current_database();
  `);

  return currentDatabase.replaceAll('-', '_');
};
const getId = (value: string) => sql.identifier([value]);

const alteration: AlterationScript = {
  up: async (pool) => {
    const database = await getDatabaseName(pool);
    const adminId = getId(`logto_tenant_${database}_admin`);
    const defaultId = getId(`logto_tenant_${database}_default`);
    await pool.query(sql`
      GRANT USAGE ON SCHEMA logto TO ${defaultId};
      GRANT USAGE ON SCHEMA logto TO ${adminId};
      grant select, insert, update, delete
        on all tables
        in schema logto
        to ${adminId};
      grant select, insert, update, delete
        on all tables
        in schema logto
        to ${defaultId};
      ALTER ROLE ${adminId} SET search_path = logto;
      ALTER ROLE ${defaultId} SET search_path = logto;
    `);
  },
  down: async (pool) => {
    const database = await getDatabaseName(pool);
    const adminId = getId(`logto_tenant_${database}_admin`);
    const defaultId = getId(`logto_tenant_${database}_default`);

    await pool.query(sql`
      revoke usage on schema logto from ${adminId};
      ALTER ROLE ${adminId} SET search_path = "$user", public;
      revoke all privileges
        on all tables
        in schema logto
        from ${adminId};
    `);
    await pool.query(sql`
      revoke usage on schema logto from ${defaultId};
      ALTER ROLE ${defaultId} SET search_path = "$user", public;
      revoke all privileges
        on all tables
        in schema logto
        from ${defaultId};
    `);
  },
};

export default alteration;
