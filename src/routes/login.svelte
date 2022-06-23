<script lang="ts">
  import { signIn, signOut } from '$lib/firebase';
  import { currentUser, isLoggedIn } from '$lib/stores/authStore';
  import type { User } from 'firebase/auth';
  import { onDestroy } from 'svelte';

  let loggedIn: boolean;
  let user: User | null;

  const unsubLogIn = isLoggedIn.subscribe((value) => {
    loggedIn = value;
  });

  const unsubUser = currentUser.subscribe((value) => {
    user = value;
  });

  onDestroy(unsubLogIn);
  onDestroy(unsubUser);
</script>

<main>
  <div>
    {#if loggedIn}
      <h1>Welcome {user?.displayName}</h1>
      <button on:click={signOut}>Sign out</button>
    {:else}
      <button on:click={signIn}>Login with Google</button>
    {/if}
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
