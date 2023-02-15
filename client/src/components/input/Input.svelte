<script>
  import { transactions } from "../../stores";
  export let transactionType;

  let input = 0;

  $: disabled = !input;

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
    $transactions = [data, ...$transactions];
    input = 0;
  };
</script>

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
    <button class="button" on:click={saveTransact} {disabled}> Save </button>
  </p>
</div>
