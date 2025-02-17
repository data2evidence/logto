/* This SQL will run before all other queries. */
-- "logto" 
create schema if not exists logto;
set search_path = logto, "$user";
-- "logto_postgres"
alter role ${databaseUser} set search_path = logto, "$user";
create role logto_tenant_${database} password '${password}' noinherit;

GRANT USAGE ON SCHEMA logto TO logto_tenant_${database};
ALTER ROLE logto_tenant_${database} SET search_path = logto, "$user";