<script setup>
    // where 'name' is the actual name of the file, and 'ext' is the extension
    function getImageUrl(name, ext) {
        return new URL(`./assets/img/${name}.${ext}`, import.meta.url).href
    }
</script>

<template>
    <div class="">
        <div v-if="loading">Loading...</div>
        <div v-else>
            <div class="cp_header">
                <div class="cp_header_title">Hollywoodbets Greyville (SA)</div>
                <div class="cp_header_course">Course: Poly</div>
                <div class="cp_header_date">
                    {{ data.racecard.dayOfWeek }} - {{ data.racecard.day }} {{ data.racecard.month }} {{ data.racecard.year }}
                </div>
                <div class="cp_nav_wrapper">
                    <div v-for="(raceItem) in races" :key="raceItem.race" @click="selectRaceItem(raceItem, raceItem.race)" >
                        <div class="cp_nav_index" >
                            <div :class="{ is_active: activeNumber === raceItem.race }" >  {{  raceItem.race }}</div>
                        </div>
                    </div>
                </div>
                <div class="search_bar_wrapper">
                    <div>
                        <input type="text" v-model="searchQuery" placeholder="Search for a horse or jockey" @input="searchData"  size="30" />
                        <button @click="searchRaces">Search</button>
                    </div>
                </div>
            </div>
            <div v-if="searchResults">
                <div class="search_results_wrapper">
                    <div class="search_results_title">Search Results</div>
                    <div class="search_results_close_btn" @click="closeSearch()">Close (X) </div>
                </div>
                <div v-for="search in searchResults" :key="search.race">
                    <div v-if="search">
                    <RaceDetails
                        location="greyville-course"
                        page_type="search"
                        :active_page_number=activeNumber
                        :race="search" />
                    </div>
                </div>
            </div>
            <div v-else>
                <div v-if="currentRaceItem">
                    <RaceDetails
                        location="greyville-course"
                        page_type="race"
                        :active_page_number=activeNumber
                        :race="currentRaceItem" />
                    </div>
                <div v-else>
                    <div v-if="races[0]">
                        <RaceDetails
                        location="greyville-course"
                        page_type="race"
                        :active_page_number=activeNumber
                        :race="races[0]" />
                    </div>
                    <div v-else>
                        <p>No Data to display</p>
                    </div>
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
                    activeNumber: 1,
                    searchQuery: '',
                    searchResults: null
                }
            },
            methods: {
                async fetchData() {
                    try {
                        const response = await fetch("/data/RaceCard_XGD.json");
                        this.data = await response.json();
                        this.loading = false;
                        this.races = this.data.racecard.races ? this.data.racecard.races : {};

                    } catch (error) {
                        console.error('Error fetching data:', error);
                    }
                },
                selectRaceItem(item, number) {
                    this.setActive(number)
                    this.currentRaceItem = item;
                    this.searchResults = null;
                },
                setActive(number) {
                    this.activeNumber = number;
                },
                closeSearch() {
                    this.searchResults = null;
                },
                searchRaces() {
                    const query = this.searchQuery.trim().toLowerCase();
                    if (query) {
                        this.searchResults = Object.values(this.races).flatMap(race => {
                            // Find matching horses and jockeys
                            const matchedHorses = race.horses
                                .filter(horse => horse.horseName.toLowerCase().includes(query));
                            const matchedJockeys = race.horses
                                .filter(jockey => jockey.jockeyName.toLowerCase().includes(query))
                                .map(jockey => ({ horseName: jockey.horseName, jockeyName: jockey.jockeyName }));

                            // If matches are found, create a new race object with only the matched horses or jockeys
                            if (matchedHorses.length > 0 || matchedJockeys.length > 0) {
                                return [{
                                    race: race.race,
                                    horses: [...matchedHorses, ...matchedJockeys]
                                }];
                            }
                            return [];
                        }
                    );
                }
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

    .search_bar_wrapper{
        text-align: right !important;
        padding: 4px;

    }

    .search_bar_wrapper input{
        padding: 6px;
        margin-right: 6px;
    }

    .search_bar_wrapper button{
        padding: 6px;
        margin-right: 6px;
    }


    .search_results_wrapper{
        display: flex;

        margin-top: 15px;
        color: whitesmoke;
        padding: 12px;
        text-align: center;
        background-color: black;
        justify-content: center;
        align-items: center;

    }

    .search_results_title{
        flex-grow: 1;
        font-size: 1.4em;
    }

    .search_results_close_btn{
        border: 2px wheat solid;
        border-radius: 4px;
        padding: 4px;

        font-size: 0.8em;
    }

</style>
