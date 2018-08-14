<template>
  <div>
    {{ incident.title }}
  </div>
</template>

<script>
export default {
  props: {
    incident: {
      type: Object,
      required: true
    }
  }
}
</script>
