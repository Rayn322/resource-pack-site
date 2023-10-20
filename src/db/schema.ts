import { sql } from 'drizzle-orm';
import {
	index,
	mysqlTable,
	serial,
	text,
	timestamp,
	varchar,
} from 'drizzle-orm/mysql-core';

// TODO: figure out why this errors but still works sometimes idk
export const packs = mysqlTable(
	'packs',
	{
		id: serial('id').primaryKey().autoincrement(),
		name: varchar('name', { length: 256 }).notNull(),
		description: text('description').notNull(),
		downloadUrl: varchar('download_url', { length: 256 }).notNull(),
		userId: varchar('user_id', { length: 256 }).notNull(),
		// use defaultCurrentTimestamp() eventually https://github.com/drizzle-team/drizzle-orm/issues/921
		createdAt: timestamp('created_at')
			.default(sql`CURRENT_TIMESTAMP`)
			.notNull(),
		updatedAt: timestamp('updated_at')
			.default(sql`CURRENT_TIMESTAMP`)
			.onUpdateNow()
			.notNull(),
	},
	(table) => ({
		userIdIdx: index('user_id_idx').on(table.userId),
	}),
);

export type Pack = typeof packs.$inferSelect;
