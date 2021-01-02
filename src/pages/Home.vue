<template>
  <q-page class="constrain q-pa-md">
    <div class="row q-col-gutter-lg">
      <div class="col-12 col-sm-8">
        <template v-if="!loadingPosts && posts.length">
          <q-card
            v-for="post in posts"
            :key="post.id"
            class="card-post q-mb-md"
            flat
            bordered
          >
            <q-item>
              <q-item-section avatar>
                <q-avatar>
                  <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label class="text-bold">Sonali_Saxena</q-item-label>
                <q-item-label caption>
                  {{ post.location }}
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-separator />
            <q-img :src="post.imageUrl" />
            <q-card-section>
              <div>{{ post.caption }}</div>
              <div class="text-caption text-grey">
                {{ post.date | niceDate }}
              </div>
            </q-card-section>
          </q-card>
        </template>
        <template v-else-if="!loadingPosts && !posts.length">
          <h5 class="text-center text-grey">No posts yet</h5>
        </template>
        <template v-else>
          <q-card flat bordered style="max-width: 300px">
            <q-item>
              <q-item-section avatar>
                <q-skeleton type="QAvatar" animation="fade" />
              </q-item-section>

              <q-item-section>
                <q-item-label>
                  <q-skeleton type="text" animation="fade" />
                </q-item-label>
                <q-item-label caption>
                  <q-skeleton type="text" animation="fade" />
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-skeleton height="200px" square animation="fade" />

            <q-card-section>
              <q-skeleton type="text" class="text-subtitle2" animation="fade" />
              <q-skeleton
                type="text"
                width="50%"
                class="text-subtitle2"
                animation="fade"
              />
            </q-card-section>
          </q-card>
        </template>
      </div>
      <div class="col-4">
        <q-item class="fixed">
          <q-item-section avatar>
            <q-avatar size="48px">
              <img src="../avtar/pic.png" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-bold">Ashutosh chandra</q-item-label>
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
import { date } from "quasar";
export default {
  name: "PageHome",
  data() {
    return {
      posts: [],
      loadingPosts: false
    };
  },
  methods: {
    getposts() {
      setTimeout(() => {
        // this.loadingPosts = true;
        this.$axios
          .get(`${process.env.API}/posts`)
          .then(response => {
            this.posts = response.data;
          })
          .catch(err => {
            this.$q.dialog({
              title: "Error",
              message: "Could not download posts"
            });
            // this.loadingPosts = false;
          });
      }, 3000);
    }
  },
  filters: {
    niceDate(value) {
      return date.formatDate(value, "MMMM D h:mmA");
    }
  },
  created() {
    this.getposts();
  }
};
</script>
<style lang="sass">
.crad-post
   .q-img
        min-height:200px
</style>
