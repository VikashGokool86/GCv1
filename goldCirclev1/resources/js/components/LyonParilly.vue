<script setup>
    // where 'name' is the actual name of the file, and 'ext' is the extension
    function getImageUrl(name, ext) {
        return new URL(`./assets/img/${name}.${ext}`, import.meta.url).href
    }
</script>

<template>
    <div class="">
        <div v-if="loading">Loading...</div>
        <div v-else class="">

            <div class="cp_header">
                <div class="cp_header_title">Lyon-Parilly (FR)</div>
                <div class="cp_header_course">Course: Poly</div>
                <div class="cp_header_date">
                    {{ data.racecard.dayOfWeek }} - {{ data.racecard.day }} {{ data.racecard.month }} {{ data.racecard.year }}
                </div>
                <div class="cp_nav_wrapper">
                    <div v-for="(raceItem, index) in races" :key="raceItem.race" @click="selectRaceItem(raceItem, raceItem.race)" >
                        <div class="cp_nav_index" >
                            <div :class="{ is_active: activeNumber === raceItem.race }" >  {{  raceItem.race }}</div>

                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div v-if="currentRaceItem">
                    <RaceDetails
                    location="lyon"
                    :race="currentRaceItem" />
                    </div>
                <div v-else class="">
                    <RaceDetails
                    location="lyon"
                    :race="races[0]" />
                </div>
            </div>
        </div>

    </div>
</template>

<script>

    import RaceDetails from './RaceDetails.vue';

    export default {
        components: {
            RaceDetails
        },
        data() {
            return {
                data: null,
                loading: true,
                races: [],
                currentRaceItem: null,
                activeNumber: 1
            }
        },
        methods: {
            async fetchData() {
                try {
                    const response = await fetch("/data/RaceCard_LYO.json");
                    this.data = await response.json();
                    this.loading = false;
                    this.races = this.data.racecard.races ? this.data.racecard.races : {};
                    // gets the number of races
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            },
            selectRaceItem(item, number) {
                this.setActive(number)
                this.currentRaceItem = item;
            },
            setActive(number) {
                this.activeNumber = number;
            }

        },
        mounted() {
            this.fetchData();
        }
    }
</script>

<style>
    .cp_header{
        text-align: center;
        background: #000;
        color: aliceblue;
        padding: 4px;
    }

    .cp_header_title{
        font-size: 2em;
    }

    .cp_header_course{
        font-size: 1.2em;
    }

    .cp_header_date{
        font-size: 1.2em;
    }

    .cp_nav_wrapper{
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .cp_nav_index{
        padding: 2px;
        color: aliceblue;
        border: 2px aliceblue solid;
        border-radius: 2px;
        padding: 6px;
        margin: 4px;
        font-weight: bold;
    }

.is_active {
    background-color: #fff;
    color: #000;
}

</style>
