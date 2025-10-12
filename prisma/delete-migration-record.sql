-- Remove the failed migration record from the _prisma_migrations table
DELETE FROM _prisma_migrations
WHERE migration_name = '20251011153934_update_shema';
