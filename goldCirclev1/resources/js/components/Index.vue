<script setup>
// where 'name' is the actual name of the file, and 'ext' is the extension
function getImageUrl(name, ext) {
  return new URL(`./assets/img/${name}.${ext}`, import.meta.url).href
}
</script>

<template>
    <header>
        <div>
            <div class="gc-header">
                <div><img :src="getImageUrl('gold-circle-logo2','jpg')"  alt="Gold Circle Logo" class="gc-logo"/></div>
                <div class="gc-txt">Technical Assessment of Vikash Gokool</div>
            </div>
            <navigation-bar></navigation-bar>
            <router-view></router-view>
        </div>
    </header>
</template>

<script>
     import NavigationBar from './NavigationBar.vue';
     import Home from './Home.vue';

    export default {
        name: 'NavigationBar',
        components: {
            'navigation-bar': NavigationBar,
            'home':Home
        }
    };
</script>

<style scoped>


  .gc-header {
    background-color: #1a2f8a;
    color: #000;
    padding: 1rem;
    display: flex;
    align-items: center;

  }

  .gc-logo {
    height: 90px;
    margin-right: 1rem;
  }


  .gc-txt{
    font-size: 2.8vw;
    margin-left: 6px;
    color:white;
    }

  @media screen and (max-width: 360px) {
    .gc-txt {
        font-size: 1.2em;
        margin-left: 6px;
        color:white;
    }
   .gc-header {
        flex-wrap: wrap;
   }

  }
</style>

