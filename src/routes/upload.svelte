<script lang="ts">
  import { processZip } from '$lib/processFiles';

  let text = 'Select a resource pack';
  let files: FileList | null;
  let confirmed = false;
  let name: string;
  let description: string;
  let imageBase64: string;

  // TODO: detect when submitted file isn't a resource pack
  // TODO: make details editable
  async function onSubmit(event: SubmitEvent) {
    if (files && files.length > 0) {
      console.log('submitted');
      ({ name, description, imageBase64 } = await processZip(files[0]));
      confirmed = true;
    } else {
      console.log('no files');
    }
  }

  function onFileSelect() {
    if (files && files?.length > 0) {
      const file = files[0];
      text = file.name;
    } else {
      text = 'Select a resource pack';
    }
  }
</script>

<main>
  <div>
    {#if confirmed}
      <div class="card">
        <h2 class="title">Confirm Details</h2>
        <p>Name: {name}</p>
        <p>Description: {description}</p>
        <img src={imageBase64} alt={name} />
        <button class="submit">Upload</button>
        <button class="button" on:click={() => (confirmed = false)}> Cancel </button>
      </div>
    {:else}
      <form class="card" on:submit|preventDefault={(event) => onSubmit(event)}>
        <h2 class="title">Upload a Resource Pack</h2>
        <label for="pack">{text}</label>
        <input
          bind:files
          on:change={onFileSelect}
          class="file button"
          type="file"
          id="pack"
          name="pack"
          accept=".zip"
        />
        <input class="submit" type="submit" value="Confirm File" />
      </form>
    {/if}
  </div>
</main>

<style>
  div {
    display: flex;
    justify-content: center;
  }

  .card {
    display: flex;
    flex-direction: column;
    width: 20em;
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

  p {
    margin: 0;
    margin-bottom: 1em;
  }

  img {
    margin-bottom: 1em;
  }

  .file {
    display: none;
  }

  label {
    font-size: 1em;
    cursor: pointer;
    padding: 0.3em 0.4em;
    margin-bottom: 1em;
    border: 2px solid var(--font-color);
    border-radius: 8px;
    text-align: center;
    overflow-wrap: break-word;
    hyphens: auto;
  }

  button {
    font-size: 1em;
    cursor: pointer;
    padding: 0.3em 0.4em;
    border: 2px solid var(--font-color);
    border-radius: 8px;
    background-color: transparent;
    margin-bottom: 1em;
  }

  .submit {
    font-size: 1em;
    cursor: pointer;
    padding: 0.3em 0.4em;
    border: 2px solid var(--button-color);
    border-radius: 8px;
    background-color: transparent;
  }
</style>
