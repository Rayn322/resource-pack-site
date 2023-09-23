import {
	index,
	mysqlTable,
	serial,
	text,
	timestamp,
	varchar,
} from 'drizzle-orm/mysql-core';

export const packs = mysqlTable(
	'packs',
	{
		id: serial('id').primaryKey().autoincrement(),
		name: varchar('name', { length: 256 }).notNull(),
		description: text('description').notNull(),
		downloadUrl: varchar('download_url', { length: 256 }).notNull(),
		userId: varchar('user_id', { length: 256 }).notNull(),
		createdAt: timestamp('created_at').defaultNow(),
		updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
	},
	(table) => ({
		userIdIdx: index('user_id_idx').on(table.userId),
	}),
);

export type Pack = typeof packs.$inferSelect;
