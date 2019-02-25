<template>
  <div />
</template>

<script>
export default {
  fetch({ app, redirect }) {
    redirect(301, app.localePath("index"));
  }
};
</script>
