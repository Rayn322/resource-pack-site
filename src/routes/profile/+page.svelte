<script lang="ts">
	import { signOut } from '$lib/firebase/firebase';
	import { currentUser } from '$lib/stores/authStore';
</script>

<main>
	<div class="container">
		<div class="card">
			<h2 class="title">Profile</h2>
			<div class="sidebyside">
				<div>
					<p class="details">{$currentUser?.displayName}</p>
					<p class="details">{$currentUser?.email}</p>
				</div>
				<!-- svelte-ignore a11y-img-redundant-alt -->
				<img src={$currentUser?.photoURL} alt="The users profile picture" />
			</div>
			<button on:click={signOut}>Sign out</button>
		</div>
	</div>
</main>

<style>
	.container {
		display: flex;
		justify-content: center;
	}

	.card {
		display: flex;
		flex-direction: column;
		width: clamp(400px, 50vw, 45em);
		padding: 2em 2em;
		box-shadow: 0.2em 0.2em 10px var(--card-shadow-color);
		border-radius: 10px;
		background-color: var(--card-color);
	}

	.title {
		margin: 1em 0.25em;
		margin-top: 0em;
		text-align: center;
	}

	.sidebyside {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1em;
	}

	.details {
		font-size: 1em;
	}

	img {
		width: clamp(0px, 20vw, 96px);
		height: auto;
	}

	button {
		font-size: 1em;
		cursor: pointer;
		padding: 0.3em 0.4em;
		border: 2px solid var(--button-color);
		border-radius: 8px;
		background-color: transparent;
	}
</style>
