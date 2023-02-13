<script>
  import { onMount } from "svelte";

  let input = 0;
  let transactionType = "+";
  let transactions = [];

  onMount(async () => {
    let response = await fetch("api/trans", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let data = await response.json();
    console.log(data);
    transactions = data;
  });

  const saveTransact = async () => {
    const transact = {
      value: transactionType === "+" ? input : input * -1,
      date: new Date().getTime(),
    };

    const response = await fetch("api/trans", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...transact,
      }),
    });

    const data = await response.json();
    transactions = [data, ...transactions];
    input = 0;
  };

  const deleteTransact = async (id) => {
    console.log(id);
    const response = await fetch("api/trans", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    const data = await response.json();
    console.log(data);
  };
</script>

<div class="app container">
  <div class="field has-addons">
    <p class="control">
      <span class="select">
        <select bind:value={transactionType}>
          <option value="+">+</option>
          <option value="-">-</option>
        </select>
      </span>
    </p>
    <p class="control is-expanded">
      <input
        class="input"
        type="number"
        placeholder="Amount of money"
        bind:value={input}
      />
    </p>
    <p class="control">
      <button class="button" on:click={saveTransact}> Save </button>
    </p>
  </div>
  {#each transactions as transact}
    <div class="notification">
      <div class="container">
        <p>Value: {transact.value}</p>
        <p>Date: {transact.date}</p>
      </div>
      <button
        on:click={() => deleteTransact(transact._id)}
        class="delete"
        data-id={transact._id}>Delete</button
      >
    </div>
  {/each}
</div>

<style>
  .app {
    margin: 40px auto;
    max-width: 500px;
  }
</style>
