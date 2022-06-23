import type { User } from 'firebase/auth';
import { writable, type Writable } from 'svelte/store';

export const isLoggedIn = writable(false);
export const currentUser: Writable<User | null> = writable(null);
