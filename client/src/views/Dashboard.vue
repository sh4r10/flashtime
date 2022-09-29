<template>
  <div>
    <Searchbar />
    <h1>Need Revision</h1>
    <h2>Your Collections</h2>

    <Deckbox
      v-for="collection in deckCollections.slice(0, 3)"
      :key="collection._id"
      :collection="collection"
    />
    <createCollection />
  </div>
</template>

<script>
import { Api } from '../Api'
import Searchbar from '../components/Searchbar.vue'
import Deckbox from '../components/Deckbox.vue'
import createCollection from '../components/createCollection.vue'
export default {
  data() {
    return {
      deckCollections: []
    }
  },
  name: 'Dashboard',
  methods: {
    showModel() {}
  },
  components: {
    createCollection,
    Searchbar,
    Deckbox
  },
  mounted: function () {
    Api.get('/collections')
      .then((res) => {
        this.deckCollections = res.data
      })
      .catch((err) => console.log(err))
  }
}
</script>

<style scoped>
h1 {
  margin-top: 8%;
  margin-left: -47%;
  font-size: 30px;
  color: #627281;
}
h2 {
  margin-top: 30%;
  margin-left: -47%;
  font-size: 30px;
  color: #627281;
}
</style>
