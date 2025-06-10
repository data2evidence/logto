/* This SQL will run before all other queries. */

create schema if not exists ${schema};
create role logto_tenant_${database} password '${password}' noinherit;
GRANT USAGE ON SCHEMA ${schema} TO logto_tenant_${database};