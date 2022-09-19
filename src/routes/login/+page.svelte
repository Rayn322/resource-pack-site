<script lang="ts">
	import { goto } from '$app/navigation';
	import { signIn } from '$lib/firebase/firebase';
	import { isLoggedIn } from '$lib/stores/authStore';

	$: if ($isLoggedIn) {
		goto('/profile');
	}
</script>

<main>
	<div>
		<button on:click={signIn}>Login with Google</button>
	</div>
</main>

<style>
	div {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	button {
		font-size: 1em;
		cursor: pointer;
		padding: 0.3em 0.4em;
		border: 2px solid var(--button-color);
		border-radius: 8px;
		background-color: transparent;
		width: 50vw;
	}
</style>
