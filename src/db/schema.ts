import {
	index,
	mysqlTable,
	serial,
	text,
	varchar,
} from 'drizzle-orm/mysql-core';

export const packs = mysqlTable(
	'packs',
	{
		id: serial('id').primaryKey().autoincrement(),
		name: varchar('name', { length: 256 }).notNull(),
		description: text('description').notNull(),
		userId: varchar('user_id', { length: 256 }).notNull(),
	},
	(table) => ({
		userIdIdx: index('user_id_idx').on(table.userId),
	})
);
