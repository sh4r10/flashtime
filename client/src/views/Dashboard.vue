<template>
  <div>
    <Searchbar />
    <NeedRevisionDecks />
    <h2>Your Collections</h2>

    <Deckbox
      v-for="collection in deckCollections.slice(0, 3)"
      :key="collection._id"
      :collection="collection"
    />
  </div>
</template>

<script>
import { Api } from '../Api'
import Searchbar from '../components/Searchbar.vue'
import Deckbox from '../components/Deckbox.vue'
import NeedRevisionDecks from '../components/NeedRevisionDecks.vue'
export default {
  data() {
    return {
      deckCollections: []
    }
  },
  name: 'Dashboard',
  components: {
    Searchbar,
    NeedRevisionDecks,
    Deckbox
  },
  mounted: function () {
    Api.get('/collections')
      .then(res => { this.deckCollections = res.data })
      .catch(err => console.error(err))
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
