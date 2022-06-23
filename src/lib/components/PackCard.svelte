<script lang="ts">
  export let name: string;
  export let author: string;
  export let image: string;
</script>

<div>
  <img src={image} alt="The icon for {name}" />
  <p>{name}</p>
  <p>{author}</p>
</div>

<style>
  div {
    display: inline-flex;
    flex-direction: column;
    width: 10em;
    margin: 1em 0.25em;
    margin-top: 0;
    padding: 1em 2em;
    box-shadow: 0.2em 0.2em 10px var(--card-shadow-color);
    border-radius: 10px;
    /* border: 0.1em solid rgba(0, 0, 0, 0.287); */
    /* background: var(--card-color);
    background: linear-gradient(
      0deg,
      rgba(55, 142, 192, 1) 0%,
      rgba(54, 211, 196, 1) 100%
    ); */

    background-color: var(--card-color);
  }

  p {
    margin-top: 1em;
    margin-bottom: 0em;
    color: var(--card-font-color);
  }
</style>
