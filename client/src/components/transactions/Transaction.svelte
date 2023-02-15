<script>
  export let transact;
  export let delete_transact;

  const convertDate = (milliseconds) => {
    return new Date(milliseconds).toLocaleString();
  };
</script>

<div
  class="notification is-light {transact.value > 0
    ? 'is-success'
    : 'is-danger'}"
>
  <div class="container">
    <p>Value: ${transact.value}</p>
    <p>
      {convertDate(transact.date)}
    </p>
  </div>
  <button
    on:click={() => delete_transact(transact._id)}
    class="delete"
    data-id={transact._id}>Delete</button
  >
</div>
