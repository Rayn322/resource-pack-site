<script lang="ts">
  import { processZip } from '$lib/util/processFiles';

  let text = 'Select a resource pack';
  let packList: FileList | null;
  let confirmed = false;
  let name: string;
  let description: string;
  let imageBase64: string;
  let imageList: FileList | null;

  // TODO: detect when submitted file isn't a resource pack
  async function onPackSubmit() {
    if (packList && packList.length > 0) {
      ({ name, description, imageBase64 } = await processZip(packList[0]));
      confirmed = true;
    }
  }

  // TODO: actually upload
  function onPackUpload() {
    console.log(name);
    console.log(description);
  }

  function onFileSelect() {
    if (packList && packList?.length > 0) {
      const file = packList[0];
      text = file.name;
    } else {
      text = 'Select a resource pack';
    }
  }

  function onImageSelect() {
    const image = imageList?.item(0);

    if (image == null) {
      imageBase64 = '';
      return;
    }

    let reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = () => {
      imageBase64 = reader.result as string;
    };
  }
</script>

<main>
  <div>
    {#if confirmed}
      <form class="card" on:submit|preventDefault={onPackUpload}>
        <h2 class="title">Confirm Details</h2>
        <label for="name" class="text-label">Name</label>
        <input type="text" name="name" id="name" class="text-input" required bind:value={name} />

        <label for="description" class="text-label">Description</label>
        <input
          type="text"
          name="description"
          id="description"
          class="text-input"
          required
          bind:value={description}
        />

        {#if imageBase64 != ''}
          <img src={imageBase64} alt={name} />
          <label for="image" class="file-upload">Change Image</label>
        {:else}
          <label for="image" class="file-upload">Upload Image</label>
        {/if}

        <input
          type="file"
          name="image"
          id="image"
          class="file button"
          alt={name}
          accept=".png"
          bind:files={imageList}
          on:change={onImageSelect}
        />

        <input class="submit upload" type="submit" value="Upload" />
        <button class="cancel" on:click={() => (confirmed = false)}>Cancel</button>
      </form>
    {:else}
      <form class="card" on:submit|preventDefault={onPackSubmit}>
        <h2 class="title">Upload a Resource Pack</h2>
        <label for="pack" class="file-upload">{text}</label>
        <input
          bind:files={packList}
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

  .text-label {
    margin-bottom: 0.25em;
  }

  .text-input {
    font-size: inherit;
    margin: 0;
    margin-bottom: 0.75em;
    padding: 0.25em;
    border-radius: 4px;
    border: 2px solid var(--font-color);
    background-color: transparent;
  }

  img {
    margin-bottom: 1em;
  }

  .file {
    display: none;
  }

  .file-upload {
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

  .cancel {
    font-size: 1em;
    cursor: pointer;
    padding: 0.3em 0.4em;
    border: 2px solid var(--font-color);
    border-radius: 8px;
    background-color: transparent;
  }

  .upload {
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
