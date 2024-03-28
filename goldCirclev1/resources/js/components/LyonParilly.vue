<template>
    <div>
        <index></index>
        <navigation-bar></navigation-bar>
        <div>Lyon-Parilly (France)</div>
    </div>

</template>

<script>
    export default {
        data() {
    return {
      data: null,
    };
  },
  methods: {
    async fetchData() {
      const response = await fetch("/data/RaceCard_LYO.json");
      this.data = await response.json();
    }
  }
    }
</script>

<style scoped>
</style>
