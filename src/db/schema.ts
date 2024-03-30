import { relations } from 'drizzle-orm';
import {
	index,
	integer,
	pgTable,
	serial,
	text,
	timestamp,
	varchar,
} from 'drizzle-orm/pg-core';

export const packs = pgTable(
	'packs',
	{
		id: serial('id').primaryKey(),
		name: varchar('name', { length: 256 }).notNull(),
		description: varchar('description').notNull(),
		userId: varchar('user_id', { length: 256 }).notNull(),
		createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
		updatedAt: timestamp('updated_at', { mode: 'date' })
			.defaultNow()
			.$onUpdate(() => new Date())
			.notNull(),
	},
	(table) => ({
		userIdIdx: index('user_id_idx').on(table.userId),
	}),
);

export const packsRelations = relations(packs, ({ many }) => ({
	versions: many(versions),
}));

export const versions = pgTable('versions', {
	id: serial('id').primaryKey(),
	packId: integer('pack_id').notNull(),

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
