<template>
  <q-page class="constraint q-pa-md">
      <div class="row q-col-gutter-lg">
        <div class="col-12 col-sm-8">    <q-card 
        v-for="post in posts"
        :key="post.id"
       class="card-post q-mb-md" 
       flat 
       bordered
       >
        <q-item>
          <q-item-section avatar>
            <q-avatar>
              <img src="../avtar/pic.png">
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-bold">Ashutosh Chandra</q-item-label>
            <q-item-label caption>
              {{post.location}}
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-separator />
        <q-img
          :src="post.imgUrl"
        />

        <q-card-section>
          <div >{{post.caption}}</div>
          <div class="text-caption text-grey">{{post.date | filterDate}}</div>
        </q-card-section>
      </q-card>
      </div>
        <div class="col-4 large-screen-only">
        <q-item class="fixed">
          <q-item-section avatar>
            <q-avatar size="48px">
              <img src="../avtar/pic.png">
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-bold">Ashutosh Chandra</q-item-label>
            <q-item-label caption>
              Ashutosh Chandra
            </q-item-label>
          </q-item-section>
        </q-item>
          
          </div>
    </div>

  </q-page>
</template>

<script>
import { date } from 'quasar'
export default {
  name: 'PageHome',
  data(){
    return{
      posts:[
        {
          id: 1,
          caption:'Golden Grey Bridge',
          date:1591776655504,
          location:'NewYork ,USA',
          imgUrl:"https://cdn.quasar.dev/img/parallax2.jpg"
        },
        { 
          id: 2,
          caption:'Golden Grey Bridge',
          date:1591776655504,
          location:'NewYork ,USA',
          imgUrl:"https://cdn.quasar.dev/img/parallax2.jpg"
        },
        { 
          id: 3,
          caption:'Golden Grey Bridge',
          date:1591776655504,
          location:'NewYork ,USA',
          imgUrl:"https://cdn.quasar.dev/img/parallax2.jpg"
        },
        { 
          id: 4,
          caption:'Golden Grey Bridge',
          date:1591776655504,
          location:'NewYork ,USA',
          imgUrl:"https://cdn.quasar.dev/img/parallax2.jpg"
        },

      ]
    }
  },
  filters:{
    filterDate(value){
      return date.formatDate(value, 'MMM D h:mmA')
    }
  }
}
</script>
<style lang="sass">
  .card-post
    .q-img
      min-height:200px
</style>