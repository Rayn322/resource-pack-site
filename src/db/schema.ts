import { relations, sql } from 'drizzle-orm';
import {
	int,
	mysqlTable,
	serial,
	text,
	timestamp,
	varchar,
} from 'drizzle-orm/mysql-core';

export const packs = mysqlTable('packs', {
	id: serial('id').primaryKey(),
	name: varchar('name', { length: 256 }).notNull(),
	description: text('description').notNull(),
	userId: varchar('user_id', { length: 256 }).notNull(),
	// use defaultCurrentTimestamp() eventually https://github.com/drizzle-team/drizzle-orm/issues/921
	createdAt: timestamp('created_at')
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull(),
	updatedAt: timestamp('updated_at')
		.default(sql`CURRENT_TIMESTAMP`)
		.onUpdateNow()
		.notNull(),
});

export const packsRelations = relations(packs, ({ many }) => ({
	versions: many(versions),
}));

export const versions = mysqlTable('versions', {
	id: serial('id').primaryKey(),
	packId: int('pack_id').notNull(),

	version: varchar('version', { length: 256 }).notNull(),
	mcVersion: varchar('mc_version', { length: 256 }).notNull(),
	changelog: text('changelog').notNull(),

	fileKey: varchar('file_key', { length: 256 }).notNull(),
	downloadUrl: varchar('download_url', { length: 256 }).notNull(),
});

export const versionsRelations = relations(versions, ({ one }) => ({
	pack: one(packs, { fields: [versions.packId], references: [packs.id] }),
}));

export type Pack = typeof packs.$inferSelect;
