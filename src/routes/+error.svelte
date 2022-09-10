<script lang="ts">
	import { page } from '$app/stores';
</script>

<main>
	<h1>{$page.status} : {$page.error?.message}</h1>
	<a href="/">Go home</a>
</main>
