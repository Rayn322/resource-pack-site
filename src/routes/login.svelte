<script lang="ts">
  import { goto } from '$app/navigation';
  import { signIn } from '$lib/firebase/firebase';
  import { isLoggedIn } from '$lib/stores/authStore';
  import { onDestroy } from 'svelte';
  import { get } from 'svelte/store';

  let loggedIn: boolean;

  const unsubLogIn = isLoggedIn.subscribe((value) => {
    loggedIn = value;
  });

  onDestroy(unsubLogIn);

  // probably a better way but if i call get(isLoggedIn) too soon it returns false anyways
  setTimeout(() => {
    if (get(isLoggedIn)) {
      goto('/profile');
    }
  }, 200);
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
