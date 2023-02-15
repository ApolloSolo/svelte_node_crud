<script>
  export let transactions;
  $: balance = transactions.reduce(
    (total, transaction) => total + transaction.value,
    0
  );

  $: positive_income = transactions
    .filter((trans) => trans.value > 0)
    .reduce((total, trans) => total + trans.value, 0);

  $: negative_income = transactions
    .filter((trans) => trans.value < 0)
    .reduce((total, trans) => total - trans.value, 0);
</script>

<div class="notification is-info is-light has-text-centered">
  <h1><strong>Balance:</strong> ${balance}</h1>
</div>
<div class="columns has-text-centered">
  <div class="column">
    <div class="notification is-success is-light">
      <h4><strong>Gains:</strong> ${positive_income}</h4>
    </div>
  </div>
  <div class="column">
    <div class="notification is-danger is-light">
      <h4><strong>Losses:</strong> ${negative_income}</h4>
    </div>
  </div>
</div>
