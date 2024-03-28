
<script setup>
    // where 'name' is the actual name of the file, and 'ext' is the extension
    function getImageUrl(name, ext) {
        return new URL(`./assets/img/${name}.${ext}`, import.meta.url).href
    }
</script>
<template>
    <div class="home">
        <div class="rc_wrapper">
            <div class="rc_title">Hollywoodbets Greyville(SA)</div>
            <div class="rc_info_wrapper">
                <div class="rc_info">
                    <div>
                        <div v-if="loading">Loading...</div>
                        <div v-else></div>
                        <div v-if="data1">Data 1: {{ data1 }}</div>
                    </div>
                    <div>1st Race</div>
                    <div>Number of Races  </div>
                </div>
                <div class="rc_img"><img :src="getImageUrl('greyville-course','svg')"  alt="greyville course" class="gc-logo" width="25"/></div>
            </div>
        </div>

        <div class="rc_wrapper">
            <div class="rc_title">Hollywoodbets Greyville(SA)</div>
            <div class="rc_in_wrapper">

            </div>
        </div>

    </div>
</template>

<script >

</script>

<style>
.home {
    display: flex;
    padding: 6px 0;
}


.rc_wrapper {
	background-color: hsla(0,0%,100%,.85);
	border-radius: 6px;
	border: 1px solid #000;
	padding: 1.3rem !important;
	-webkit-animation: fadein-data-v-b752430c 3.5s;
	animation: fadein-data-v-b752430c 3.5s;
}
</style>
