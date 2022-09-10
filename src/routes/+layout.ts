import { initFirebase } from '$lib/firebase/firebase';
import type { LayoutLoad } from './$types';

export function load(): LayoutLoad {
	initFirebase();
	return {};
}
