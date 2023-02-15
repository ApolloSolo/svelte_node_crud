<script>
  import { onMount } from "svelte";
  import Balance from "../../components/balance/Balance.svelte";
  import Input from "../../components/input/Input.svelte";
  import Transaction from "../../components/transactions/Transaction.svelte";
  import { transactions } from "../../stores";

  let transactionType = "+";

  onMount(async () => {
    let response = await fetch("api/trans", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let data = await response.json();
    console.log(data);
    $transactions = data;
  });

  const delete_transact = async (id) => {
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
    $transactions = $transactions.filter((transact) => transact._id !== id);
  };
</script>

<div class="app container">
  <Input {transactionType}/>
  <Balance transactions={$transactions}/>
  <hr />
  {#each $transactions as transact (transact._id)}
    <Transaction {transact} {delete_transact} />
  {/each}
</div>

<style>
  .app {
    margin: 40px auto;
    max-width: 500px;
  }
</style>
