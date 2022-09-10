<script context="module" lang="ts">
	/** @type {import('@sveltejs/kit').Load} */
	export function load({ error, status }: { error: Error; status: number }) {
		return {
			props: {
				title: `${status}: ${error?.message}`
			}
		};
	}
</script>

<script lang="ts">
	export let title: string;
</script>

<main>
	<h1>{title}</h1>
	<a href="/">Go home</a>
</main>
