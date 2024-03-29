<template>
    <div>
        <h1>Lyon-Parilly (France)</h1>
        <div>
            <button @click="fetchData">Fetch Data</button>
            <pre v-if="data">{{ data }}</pre>
        </div>
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
