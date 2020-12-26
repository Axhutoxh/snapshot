<template>
  <q-page class="constraint-more q-pa-md">
    <div class="camera-frame q-pa-md">
   
      <video 
         v-show="!imageCaptured"
         ref="video"
         class="full-width"
         autoplay
         />

      <canvas 
      v-show="imageCaptured"
      ref="canvas"
      class="full-width"
      height="240"/>

    </div>

    <div class="text-center q-pa-md">
      
       <q-btn 
         v-if="hasCameraSupport"
         @click="captureImage()"
         size="lg"
         round 
         color="purple-8" 
         icon="mdi-camera" 
         />

         <q-file 
           v-else
           label="Choose an Image"
           outlined 
           accept="image/"
           @input="captureImageFallback"
           v-model="imageUpload">
           <template v-slot:prepend>
             <q-icon name="mdi-attachment" />
           </template>
         </q-file>

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
            :loading="locationLoading"
            class="col col-sm-6"
            label="Location"
            dense >
            <template v-slot:append>
             <q-btn 
              v-if="!locationLoading && locationSupported"
              @click="getLocation"
              round 
              dense 
              flat 
              icon="mdi-map-marker" />
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
      },
      imageCaptured:false,
      imageUpload:[],
      hasCameraSupport:true,
      locationLoading:false
    }
  },
  computed:{
    locationSupported(){
      if ('geolocation' in navigator) return 
      true
      return false
    }
  },
  methods:{
     getLocation(){
       this.locationLoading=true
     navigator.geolocation.getCurrentPosition(
       position =>{
        this.getCityAndCountry(position)
       },err =>{
        this.locationError()
       },{timeout :7000}
     )
    },
    getCityAndCountry(position){
      let apiUrl =`https://geocode.xyz/${position.coords.latitude},${position.coords.longitude}?json=1`
      this.$axios.get(apiUrl).then(result =>{
        this.locationSuccess(result)
      }).catch(err =>{
        this.locationError()
      })
    },
    locationSuccess(result){
      this.post.location=result.data.city 
      if(result.data.city){
        this.post.location += `, ${result.data.country}` 
      }
      this.locationLoading=false
    },
    locationError(){
        this.$q.dialog({
        title: 'Error',
        message: 'Could not find the Location'
      })
      this.locationLoading=false
    }
    ,
    initCamera(){
      navigator.mediaDevices.getUserMedia({
        video:true
      }).then(stream=>{
          this.$refs.video.srcObject = stream
      }).catch(error =>{
        this.hasCameraSupport =false
      })
    },
    captureImage(){
       let video =this.$refs.video
       let canvas = this.$refs.canvas
       canvas.width = video.getBoundingClientRect().width
       canvas.height = video.getBoundingClientRect().height

       let context=canvas.getContext('2d')
       context.drawImage(video, 0,0, canvas.width,canvas.height)
       this.imageCaptured=true
       this.post.photo = this.dataURItoBlob(canvas.toDataURL())
       this.disableCamera()
    },
    captureImageFallback(file){
      this.post.photo=file

          let canvas = this.$refs.canvas
          let context=canvas.getContext('2d')

           var reader = new FileReader()
           reader.onload = (event)=>{
               var img = new Image()
               img.onload = ()=>{
                   canvas.width = img.width
                   canvas.height = img.height
                   context.drawImage(img,0,0)
                   this.imageCaptured=true
               }
               img.src = event.target.result
            }
            reader.readAsDataURL(file)    
    },
    disableCamera(){
      this.$refs.video.srcObject.getVideoTracks().forEach(track =>{
        track.stop()
      })
    },
      dataURItoBlob(dataURI) {
       var byteString = atob(dataURI.split(',')[1]);
       var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
       var ab = new ArrayBuffer(byteString.length);
       var ia = new Uint8Array(ab);
       for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
       var blob = new Blob([ab], {type: mimeString});
        return blob;

      }
  },
  mounted(){
    this.initCamera()
  },
  beforeDestroy(){
    if(this.hasCameraSupport){
      this.disableCamera()
    }
  }
}
</script>
<style lang="sass">
  .camera-frame
    border: 3px solid $purple-3
    border-radius: 10px
  
</style>