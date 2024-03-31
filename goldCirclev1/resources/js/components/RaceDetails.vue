<script setup>
    // where 'name' is the actual name of the file, and 'ext' is the extension
    function getImageUrl(name, ext) {
        return new URL(`./assets/img/${name}.${ext}`, import.meta.url).href
    }

</script>

<template>
    <div class="race-detail">
        <div v-if="page_type === 'race'" class="rc_header">
            <div class="rc_header_wrapper">
                <div class="rc_header_course_img">
                    <img :src="getImageUrl(location,'svg')"  alt="location" class="gc-logo" width="150" />
                </div>
                <div class="rc_race_info_wrapper">
                    <div class="rc_race_info">
                        Race {{  race.race }} - {{ race.startTime }} - {{ race.distance }}m
                    </div>
                    <div class="rc_race_info_title">{{  race.title }} </div>
                </div>
                <div class="rc_race_info_stake_wrapper">
                    <div class="rc_race_info_stake_pot">Stake :{{ race.stake }}</div>
                    <div v-if="race.stakes">
                        <div class="rc_race_info_stakes">
                            <ul>
                                <li v-for="(item, index) in createPrizeList(race.stakes )" :key="index">{{ item }}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="race.horses">
            <div v-for="(horse, index1) in race.horses " :key="index1">
                <div class="rc_horse_wrapper">
                    <div class="rc_horse_wrapper_data">
                        <div class="rc_horse_img">
                            <div v-if="horse.silksFilename">
                                <img :src="getImageUrl( horse.silksFilename.split('.')[0] ,'svg')"  alt="silk image" class="gc-logo" width="100"/>
                            </div>
                            <div v-else class="">
                                <div>
                                    <img :src="getImageUrl( '00006' ,'svg')" alt="no silk image" class="gc-logo" width="100" />
                                </div>
                            </div>

                        </div>
                        <div class="rc_horse_info_wrapper">
                            <div> <span class="horse_no">{{  horse.horseNo }}</span> <span class="horse_name">{{  horse.horseName }}</span></div>
                            <div class="horse_draw"><span class="horse_draw_title">Draw: </span>{{  horse.draw }}</div>
                            <div>{{  horse.jockeyName }}</div>
                            <div>{{  horse.trainerName }}</div>
                            <div>{{  horse.weight }}</div>

                        </div>
                    </div>

                    <div v-if="horse.pastRuns">
                        <div class="rc_race_info">Past Runs</div>
                        <div class="previous_races_wrapper" style="overflow-x:auto;">
                            <table>
                            <tr>
                                <th>Date</th>
                                <th>CF Code</th>
                                <th>Race Code</th>
                                <th>Distance</th>
                                <th>Jockey Name</th>
                                <th>Weight</th>
                                <th>Draw</th>
                                <th>Finished</th>
                                <th>Time Finished</th>
                                <th>Close Odds</th>
                            </tr>
                                <tr v-for="(past, index2) in horse.pastRuns " :key="index2">
                                    <td>{{ past.dateString }}</td>
                                    <td>{{ past.cfcode }}</td>
                                    <td>{{ past.raceCode }}</td>
                                    <td>{{ past.distance }}</td>
                                    <td>{{ past.jockeyName }}</td>
                                    <td>{{ past.weight }}</td>
                                    <td>{{ past.draw }}</td>
                                    <td>{{ past.finished }}</td>
                                    <td>{{ past.timeFinished }}</td>
                                    <td>{{ past.closeOdds }}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <div v-else>
                        <div class="rc_race_info">No Past Runs</div>
                    </div>

                </div>



            </div>
        </div>
        <div v-else class="">
            <p>No Race Data to display</p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            prizeString: null,
        };
    },
    props: {
      race: {
        type: Object,
      },
      location: String,
      page_type: String,
      active_page_number:Intl
    },
    methods: {
        createPrizeList(prizeString) {
        return prizeString.split(',').map(item => item.trim());
        }
    }
}
</script>

<style scoped>
    .rc_header_wrapper{
        display: flex;
        justify-items: center;
        justify-content: space-evenly;
        align-items: center;
    }

    .rc_race_info{
        background: #000;
        color: whitesmoke;
        padding: 4px;
        border-radius: 4px;;
        text-align: center;
    }

    .rc_race_info_title{
        font-weight: bold;
        padding: 4px;
        margin-top: 4px;
    }

    .rc_race_info_stake_wrapper{
        padding: 8px;
        margin-top: 10px;
        border: 2px #000 solid;
        border-radius: 2px;
        text-align: center;
    }

    .rc_race_info_stake_pot{
        font-size: 1em;
        font-weight: bold;
    }

    .rc_horse_wrapper{
        padding: 4px;
        background-color: aliceblue;
        border: 2px #333333 solid;
        border-radius: 4px;
        margin: 4px;
    }

    .rc_horse_wrapper_data{
        display: flex;
    }

    table {
        border-collapse: collapse;
        border-spacing: 0;
        width: 100%;
        border: 1px solid #ddd;
        width: 100%;
    }

    th, td {
        text-align: left;
        padding: 8px;
    }

    @media screen and (max-width: 600px) {
        .rc_race_info_stake_wrapper{
            display: none;
        }
        .rc_race_info_title{
            font-size: 0.8em;
        }

    }



</style>
