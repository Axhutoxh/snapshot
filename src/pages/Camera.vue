<template>
  <q-page class="constraint-more q-pa-md">
    <div class="camera-frame q-pa-md">
      <img 
      class="full-width"
      src="https://cdn.quasar.dev/img/parallax2.jpg" >
    </div>
    <div class="text-center q-pa-md">
       <q-btn 
         size="lg"
         round 
         color="purple-8" 
         icon="mdi-camera" 
         />
         <div class="row justify-center q-ma-md">
           <q-input 
            v-model="post.caption"
            class="col col-sm-6"
            label="Caption"
            dense />
         </div>
          <div class="row justify-center q-ma-md">
           <q-input 
            v-model="post.location"
            class="col col-sm-6"
            label="Location"
            dense >
            <template v-slot:append>
             <q-btn round dense flat icon="mdi-map-marker" />
            </template>
           </q-input>
         </div>
            <div class="row justify-center q-mt-lg">
            <q-btn 
              unelevated 
              rounded 
              color="primary" 
              label="Post Images" />
         </div>
    </div>
  </q-page>
</template>

<script>
import { uid } from 'quasar'
export default {
  name: 'PageCamera',
  data() {
    return {
      post:{
        id:uid(),
        caption:'',
        location:'',
        photo:null,
        date:Date.now()
      }
    }
  },
}
</script>
<style lang="sass">
  .camera-frame
    border: 3px solid $purple-3
    border-radius: 10px
  
</style>