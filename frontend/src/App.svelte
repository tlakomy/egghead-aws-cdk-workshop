<script>

</script>

<style>
  .app {
    display: flex;
    flex-direction: column;
  }

  header {
    text-align: center;
  }

  h1,
  h2 {
    color: #ff3e00;
    text-transform: uppercase;
    font-weight: 100;
  }

  main {
    padding: 4rem;
  }

  h1 {
    font-size: 4em;
  }

  .add-todo--section {
    display: flex;
    justify-content: center;
  }

  .my-todos--section {
    display: flex;
    flex-direction: column;
  }
</style>

<div class="app">
  <header>
    <h1>CDK Todo App</h1>
  </header>
  <main>
    <section class="add-todo--section">
      <label>
        Add a new todo
        <input type="text" placeholder="example: learn CDK" />
      </label>
    </section>

    <section class="my-todos--section">
      <h2>My todos:</h2>
      <ul>
        <li>Create a Todo app</li>
      </ul>
    </section>
  </main>
</div>
