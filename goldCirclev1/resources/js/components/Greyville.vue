<script setup>
    // where 'name' is the actual name of the file, and 'ext' is the extension
    function getImageUrl(name, ext) {
        return new URL(`./assets/img/${name}.${ext}`, import.meta.url).href
    }
</script>

<template>
   <div>
    <button @click="fetchData">Fetch Data</button>
    <pre v-if="data">{{ data }}</pre>
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
      const response = await fetch("/data/RaceCard_XGD.json");
      this.data = await response.json();
    }
  }
    }
</script>

<style>
</style>
