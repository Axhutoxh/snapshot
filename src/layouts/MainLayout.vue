<template>
  <q-layout view="lHh Lpr lFf">
    <q-header 
      class="bg-white text-grey-10"
      bordered>
      <q-toolbar  class="constraint">
        <q-btn 
          to="/camera"
          class="large-screen-only q-mr-sm"
          flat round 
          icon="mdi-camera-outline"
          size=18px
          dense 
          />
          <q-separator 
          class="large-screen-only"
            vertical 
            spaced
             />
          <q-toolbar-title class="text-grand-hotel text-bold" >
           SnapShot
          </q-toolbar-title>

        <q-btn 
          to="/"
          class="large-screen-only"
          flat round 
          icon="mdi-home-outline"
          size=18px
          dense 
          />
      </q-toolbar>

    </q-header>

       <q-footer 
        class="bg-white small-screen-only"
        bordered 
        >
          <q-tabs 
            class="text-grey-10"
            active-color="primary"
            indicator-color="transparent">
            <q-route-tab 
              to="/" 
              icon="mdi-home-outline" 
              />
            <q-route-tab 
              to="/camera" 
              icon="mdi-camera-outline" 
              />
          </q-tabs>
      </q-footer>

    <q-page-container class="bg-purple-1">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>



export default {

  data () {
    return {

    }
  }
}
</script>

<style lang="sass">
  .q-toolbar
    @media( max-width: $breakpoint-xs-min)
      height: 77px
  .q-toolbar__title
    font-size:30px
    @media( max-width: $breakpoint-xs-max)
      text-align: center
    .q-tab__icon
    font-size:30px
</style>
