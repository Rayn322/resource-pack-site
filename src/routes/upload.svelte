<script lang="ts">
  let text = "Select a resource pack";
  let files: FileList | null;

  function onSubmit(event: SubmitEvent) {
    if (files && files.length > 0) {
      console.log("submitted");
    } else {
      console.log("no files");
    }
  }

  function onFileSelect() {
    if (files && files?.length > 0) {
      const file = files[0];
      text = file.name;
    } else {
      text = "Select a resource pack";
    }
  }
</script>

<main>
  <div>
    <form on:submit|preventDefault={(event) => onSubmit(event)}>
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
      <input class="submit" type="submit" value="Upload File" />
    </form>
  </div>
</main>

<style>
  div {
    display: flex;
    justify-content: center;
  }

  form {
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

  .submit {
    font-size: 1em;
    cursor: pointer;
    padding: 0.3em 0.4em;
    border: 2px solid var(--button-color);
    border-radius: 8px;
    background-color: transparent;
  }
</style>
