import { int, mysqlTable, serial, text } from 'drizzle-orm/mysql-core';

export const users = mysqlTable('users', {
	id: serial('id').primaryKey().autoincrement(),
	fullName: text('full_name').notNull(),
	age: int('age').notNull(),
});
