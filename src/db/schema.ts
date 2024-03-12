import { relations, sql } from 'drizzle-orm';
import { index, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const packs = sqliteTable(
	'packs',
	{
		id: integer('id').primaryKey({ autoIncrement: true }),
		name: text('name', { length: 256 }).notNull(),
		description: text('description').notNull(),
		userId: text('user_id', { length: 256 }).notNull(),
		// use defaultCurrentTimestamp() eventually https://github.com/drizzle-team/drizzle-orm/issues/921
		createdAt: integer('created_at', { mode: 'timestamp' })
			.default(sql`CURRENT_TIMESTAMP`)
			.notNull(),
		updatedAt: integer('updated_at', { mode: 'timestamp' })
			.default(sql`CURRENT_TIMESTAMP`)
			// .onUpdate(sql`CURRENT_TIMESTAMP`)
			// ^ using a sqlite trigger
			.notNull(),
	},
	(table) => ({
		userIdIdx: index('user_id_idx').on(table.userId),
	}),
);

export const packsRelations = relations(packs, ({ many }) => ({
	versions: many(versions),
}));

export const versions = sqliteTable('versions', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	packId: integer('pack_id').notNull(),

	version: text('version', { length: 256 }).notNull(),
	mcVersion: text('mc_version', { length: 256 }).notNull(),
	changelog: text('changelog').notNull(),

	fileKey: text('file_key', { length: 256 }).notNull(),
	downloadUrl: text('download_url', { length: 256 }).notNull(),
});

export const versionsRelations = relations(versions, ({ one }) => ({
	pack: one(packs, { fields: [versions.packId], references: [packs.id] }),
}));

export type Pack = typeof packs.$inferSelect;
