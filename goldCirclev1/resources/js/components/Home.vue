
<script setup>
    // where 'name' is the actual name of the file, and 'ext' is the extension
    function getImageUrl(name, ext) {
        return new URL(`./assets/img/${name}.${ext}`, import.meta.url).href
    }
</script>
<template>
    <div class="home_wrapper">
        <div v-if="loading">Loading...</div>
        <div v-else class="home_wrapper2">
            <div v-if="data1">
                <div class="rc_wrapper">
                    <div class="rc_title">{{ data1.racecard.track }} (AUS)</div>
                    <div class="rc_info_wrapper">
                        <div class="rc_info">
                            <div class="rc_info_data">{{ data1.racecard.day }} {{ data1.racecard.month }} {{ data1.racecard.year }}</div>
                            <div>{{ data1.racecard.dayOfWeek }}</div>
                            <div>Race: {{ data1.racecard.races[0]['race'] }} ({{ data1.racecard.races[0]['startTime'] }})</div>
                            <div>{{ raceCountRed }} Races</div>
                        </div>
                        <div class="rc_img"><img :src="getImageUrl('redcliffe-course','svg')"  alt="greyville course" class="gc-logo" width="150"/></div>
                    </div>
                    <div class="rc_btn_wrapper">
                        <div class="rc_btn greyville"><router-link  to="/red" >View Redcliffe Race Card</router-link></div>
                    </div>
                </div>
            </div>
            <div v-else>
                <h3>Loading</h3>
            </div>
            <div v-if="data3">
                <div class="rc_wrapper">
                    <div class="rc_title"><img :src="getImageUrl('hb-greyville-title','svg')"  alt="lyon course" class="gc-logo" width="200"/> (SA)</div>
                    <div class="rc_info_wrapper">
                        <div class="rc_info">
                            <div class="rc_info_data">{{ data3.racecard.day }} {{ data3.racecard.month }} {{ data3.racecard.year }}</div>
                            <div>{{ data3.racecard.dayOfWeek }}</div>
                            <div>Race: {{ data3.racecard.races[0]['race'] }} ({{ data3.racecard.races[0]['startTime'] }})</div>
                            <div>{{ raceCountGrey }} Races</div>
                        </div>
                        <div class="rc_img"><img :src="getImageUrl('greyville-course','svg')"  alt="greyville course" class="gc-logo" width="145"/></div>
                    </div>
                    <div class="rc_btn_wrapper">
                        <div class="rc_btn lyon"><router-link  to="/grey" >View Greyville Race Card</router-link></div>
                    </div>
                </div>
            </div>
            <div v-else>
                <h3>Loading</h3>
            </div>
            <div v-if="data2">
                <div class="rc_wrapper">
                    <div class="rc_title">{{ data2.racecard.track }} (FR)</div>
                    <div class="rc_info_wrapper">
                        <div class="rc_info">
                            <div class="rc_info_data">{{ data2.racecard.day }} {{ data2.racecard.month }} {{ data2.racecard.year }}</div>
                            <div>{{ data2.racecard.dayOfWeek }}</div>
                            <div>Race: {{ data2.racecard.races[0]['race'] }} ({{ data2.racecard.races[0]['startTime'] }})</div>
                            <div>{{ raceCountLyon }} Races</div>
                        </div>
                        <div class="rc_img"><img :src="getImageUrl('lyon-course','svg')"  alt="lyon course" class="gc-logo" width="150"/></div>
                    </div>
                    <div class="rc_btn_wrapper">
                        <div class="rc_btn lyon"><router-link  to="/lyon" >View LyonParilly Race Card</router-link></div>
                    </div>
                </div>
            </div>
            <div v-else>
                <h3>Loading</h3>
            </div>
        </div>
    </div>
</template>

<script>

    export default {

        data() {
            return {
            data1: null,
            data2: null,
            data3: null,
            loading: true,
            raceCountRed: 0,
            raceCountLyon: 0,
            raceCountGrey: 0
            };
        },
        methods: {
            async fetchData() {
                try {
                    const response1 = await fetch("/data/RaceCard_C3R.json");
                    this.data1 = await response1.json();
                    const response2 = await fetch("/data/RaceCard_LYO.json");
                    this.data2 = await response2.json();
                    const response3 = await fetch("/data/RaceCard_XGD.json");
                    this.data3 = await response3.json();
                    this.loading = false;
                     // gets the number of races
                     this.updateRaceCount();
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            },
            updateRaceCount() {
                if (this.data1 && this.data1.racecard && this.data1.racecard.races) {
                    this.raceCountRed = this.data1.racecard.races.length;
                }
                if (this.data2 && this.data2.racecard && this.data2.racecard.races) {
                    this.raceCountLyon = this.data2.racecard.races.length;
                }
                if (this.data3 && this.data3.racecard && this.data3.racecard.races) {
                    this.raceCountGrey = this.data3.racecard.races.length;
                }
            }
        },
        mounted() {
            this.fetchData();
        }
    }
</script>

<style>

.home_wrapper {
    padding: 6px 0;
}

.home_wrapper2 {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    min-width: 360px;
    padding: 9px 0;
}

.rc_btn{
    padding: 4px;
    background-color: #1a2f8a;
    color: #fff;
    width: 100%;
    text-align: center;


    border: 2px solid #1a2f8a;
    border-radius: 3px !important;

}

.rc_wrapper {
	background-color: #dddddd;
	border-radius: 6px;
	border: 1px solid #000;
	padding: 1.3rem !important;
	-webkit-animation: fadein-data-v-b752430c 3.5s;
	animation: fadein-data-v-b752430c 3.5s;
    margin-bottom: 20px;
}

.rc_title{
    text-align: center;
    font-size: 1.2em;
    font-weight: bold;
    padding-bottom: 2px ;
    border-bottom: 1px #1a2f8a solid;
}

.rc_info_wrapper{
    display: flex;
    padding: 4px;
}

.rc_info{
    flex-grow: 1;
    margin-top: 30px;
    padding: 6px;
}

a {
    color: #dddddd;
    text-decoration: none;
}

</style>
