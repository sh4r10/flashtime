<template>
  <div>
    <Navbar />
    <Searchbar />
    <NeedRevisionDecks />
    <h2>Your Collections</h2>
    <Deckbox
      v-for="collection in deckCollections.slice(0, 9)"
      :key="collection._id"
      :collection="collection"
    />
    <b-button v-b-modal.collection-modal>Create new Collection</b-button>
    <CollectionModal />
  </div>
</template>

<script>
import { Api } from '../Api'
import Searchbar from '../components/Searchbar.vue'
import Deckbox from '../components/Deckbox.vue'
import NeedRevisionDecks from '../components/NeedRevisionDecks.vue'
import Navbar from '../components/Navbar.vue'
import CollectionModal from '../components/CollectionModal.vue'
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
    Deckbox,
    Navbar,
    CollectionModal
  },
  mounted: function () {
    Api.get('/collections')
      .then((res) => {
        this.deckCollections = res.data
      })
      .catch((err) => console.error(err))
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
