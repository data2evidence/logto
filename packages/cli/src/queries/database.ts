import type { CommonQueryMethods } from '@silverhand/slonik';
import { sql } from '@silverhand/slonik';

export const getDatabaseName = async (pool: CommonQueryMethods, normalized = false) => {
  const { currentDatabase } = await pool.one<{ currentDatabase: string }>(sql`
    select current_database();
  `);

  return normalized ? currentDatabase.replaceAll('-', '_') : currentDatabase;
};

export const getDatabaseUser = async (pool: CommonQueryMethods) => {
  const { currentUser } = await pool.one<{ currentUser: string }>(sql`
    select current_user;
  `);

  return currentUser;
};
