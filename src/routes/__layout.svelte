<script>
  import "$lib/global.css";
</script>

<div class="background" />
<nav>
  <a href="/" class="title">Cool Name</a>
  <div class="links">
    <a href="/packs">Resource Packs</a>
    <a href="/upload">Upload</a>
    <a href="/login" class="login">Login</a>
  </div>
</nav>

<div class="slot">
  <slot />
</div>

<style>
  nav {
    display: flex;
    align-items: center;
    padding: 1em 6vw;
    margin-bottom: 1em;
    background-color: var(--nav-color);
    /* background: linear-gradient(
      -90deg,
      rgba(55, 142, 192, 1) 45%,
      rgba(54, 211, 196, 1) 100%
    ); */
    box-shadow: 0px -3px 5px 5px #00000080;
  }

  a {
    text-decoration: none;
    color: var(--nav-font-color);
  }

  .title {
    display: inline;
    font-size: 1.4rem;
  }

  .links {
    margin-left: auto;
  }

  .links a {
    font-size: 1.2rem;
    margin-left: 1em;
    padding: 0.2em 0.4em;
    border: 2px solid var(--nav-font-color);
    border-radius: 8px;
  }

  .links .login {
    /* background: linear-gradient(var(--nav-color), var(--nav-color)) padding-box,
      linear-gradient(to right, #36d3c4, #378ec0) border-box; */
    border: 2px solid var(--button-color);
  }

  .slot {
    padding: 5vh 5vw;
  }
</style>
