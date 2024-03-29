<script setup>
    // where 'name' is the actual name of the file, and 'ext' is the extension
    function getImageUrl(name, ext) {
        return new URL(`./assets/img/${name}.${ext}`, import.meta.url).href
    }
</script>

<template>
    <div class="home_wrapper">
        <h1>Redcliffe (AUS)</h1>

        <div v-if="loading">Loading...</div>
        <div v-else class="home_wrapper2">
            {{ data }}

        </div>

    </div>
</template>

<script>

    export default {
        data() {
            return {
                data: null
            };
        },
        methods: {
            async fetchData() {
                try {
                    const response = await fetch("/data/RaceCard_C3R.json");
                    this.data = await response.json();
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
        },
        mounted() {
            this.fetchData();
        }
    }
</script>

<style>

</style>
