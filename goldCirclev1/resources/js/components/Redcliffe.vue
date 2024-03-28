<template>
    <div>
        <index></index>
        <navigation-bar></navigation-bar>
        <div>Redcliffe (Australia)</div>

        
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
      const response = await fetch("/data/RaceCard_C3R.json");
      this.data = await response.json();
    }
  }
    }
</script>

<style scoped>
</style>
