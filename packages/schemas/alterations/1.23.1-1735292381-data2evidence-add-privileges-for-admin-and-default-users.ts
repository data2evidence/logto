import type { CommonQueryMethods } from '@silverhand/slonik';
import { sql } from '@silverhand/slonik';

import type { AlterationScript } from '../lib/types/alteration.js';

const getDatabaseName = async (pool: CommonQueryMethods) => {
  const { currentDatabase } = await pool.one<{ currentDatabase: string }>(sql`
    select current_database();
  `);

  return currentDatabase.replaceAll('-', '_');
};

const getSchemaName = async (pool: CommonQueryMethods) => {
  const { currentSchema } = await pool.one<{ currentSchema: string }>(sql`
    SELECT current_schema;
  `);

  return currentSchema.replaceAll('-', '_');
};

const getId = (value: string) => sql.identifier([value]);

const alteration: AlterationScript = {
  up: async (pool) => {
    const database = await getDatabaseName(pool);
    const schema = getId(`${await getSchemaName(pool)}`);
    const adminId = getId(`logto_tenant_${database}_admin`);
    const defaultId = getId(`logto_tenant_${database}_default`);
    await pool.query(sql`
      GRANT USAGE ON SCHEMA ${schema} TO ${defaultId};
      GRANT USAGE ON SCHEMA ${schema} TO ${adminId};
      grant select, insert, update, delete
        on all tables
        in schema ${schema}
        to ${adminId};
      grant select, insert, update, delete
        on all tables
        in schema ${schema}
        to ${defaultId};
    `);
  },
  down: async (pool) => {
    const database = await getDatabaseName(pool);
    const schema = getId(`${await getSchemaName(pool)}`);
    const adminId = getId(`logto_tenant_${database}_admin`);
    const defaultId = getId(`logto_tenant_${database}_default`);

    await pool.query(sql`
      revoke usage on schema ${schema} from ${adminId};
      revoke all privileges
        on all tables
        in schema ${schema}
        from ${adminId};
    `);
    await pool.query(sql`
      revoke usage on schema ${schema} from ${defaultId};
      revoke all privileges
        on all tables
        in schema ${schema}
        from ${defaultId};
    `);
  },
};

export default alteration;
