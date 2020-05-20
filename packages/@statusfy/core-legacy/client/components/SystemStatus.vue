<template>
  <div>
    <div class="systems-container flex flex-col">
      <system v-for="system in systems" :key="system.name" :system="system" />
    </div>
  </div>
</template>

<script>
import System from "./System";
import "./icons/fortawesome/clock-solid";
import "./icons/fortawesome/exclamation-circle-solid";
import "./icons/fortawesome/minus-circle-solid";
import "./icons/fortawesome/times-circle-solid";
import "./icons/fortawesome/check-circle-solid";

export default {
  components: {
    System
  },
  props: {
    systems: {
      type: Array,
      require: true,
      default: () => []
    }
  }
};
</script>
