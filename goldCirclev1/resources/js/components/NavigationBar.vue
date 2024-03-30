<script setup>
    // where 'name' is the actual name of the file, and 'ext' is the extension
    function getImageUrl(name, ext) {
        return new URL(`./assets/img/${name}.${ext}`, import.meta.url).href
    }
</script>
<template>
    <div class="topnav" id="myTopnav">
        <router-link to="/home" class="link"  :class="{ active: activePage === 'home' }" @click="setActive('home')">Home</router-link>
        <router-link to="/grey" class="link" :class="{ active: activePage === 'grey' }" @click="setActive('grey')">Hollywoodbets Greyville (SA)</router-link>
        <router-link to="/lyon" class="link" :class="{ active: activePage === 'lyon' }" @click="setActive('lyon')">Lyon-Parilly (FR)</router-link>
        <router-link to="/red" class="link" :class="{ active: activePage === 'red' }" @click="setActive('red')">Redcliffe (AUS)</router-link>
        <a href="javascript:void(0);" class="icon link" @click="LoadResponsiveNav">
            <img class="fa-bars" :src="getImageUrl('hamburger-menu','svg')"  alt="Menu Icon" />
        </a>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                activePage: 'home'
            }
        },
        methods: {
            LoadResponsiveNav() {
                var x = document.getElementById("myTopnav");
                if (x.className === "topnav") {
                    x.className += " responsive";
                } else {
                    x.className = "topnav";
                }
            },
            setActive(page) {
                console.log(page)
                this.activePage = page;
            }
        }
    }

</script>

<style>
.topnav {
  overflow: hidden;
  background-color: #333;
}

.topnav a {
  float: left;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

.topnav a:hover {
  background-color: #ddd;
  color: black;
}

.active {
  background-color: #f89a04;
  color: white;
}

.topnav .icon {
  display: none;
}

.fa-bars{
    width: 16px;
    background: #ddd;
}

@media screen and (max-width: 600px) {
  .topnav a:not(:first-child) {display: none;}
  .topnav a.icon {
    float: right;
    display: block;
  }
}

@media screen and (max-width: 600px) {
  .topnav.responsive {position: relative;}
  .topnav.responsive .icon {
    position: absolute;
    right: 0;
    top: 0;
    width: 10px;
  }
  .topnav.responsive a {
    float: none;
    display: block;
    text-align: left;
  }
}
</style>
