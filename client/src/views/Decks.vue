<template>
  <div>
    <Navbar />
    <h1>{{ collection.name }}</h1>
    <!--eslint-disable-next-line vue/no-multiple-template-root-->
    <DeckCard v-for="deck in decks" :key="deck._id" :deck="deck" />
    <AddNewDeck />
    <RemoveDeckFromCollection />
  </div>
</template>
<script>
import { Api } from '../Api'
import DeckCard from '../components/DeckCard.vue'
import Navbar from '../components/Navbar.vue'
import AddNewDeck from '../components/AddNewDeck.vue'
import RemoveDeckFromCollection from '../components/RemoveDeckFromCollection.vue'
export default {
  data() {
    return {
      decks: [],
      collection: undefined
    }
  },
  components: {
    DeckCard,
    Navbar,
    AddNewDeck,
    RemoveDeckFromCollection
  },
  mounted: function () {
    Api.get(`/collections/${this.$route.params.id}`)
      .then((res) => (this.collection = res.data))
      .catch((err) => console.log(err))
    Api.get(`/collections/${this.$route.params.id}/decks`)
      .then((res) => {
        this.decks = res.data
      })
      .catch((err) => console.log(err))
  },
  methods: {
    addNewDeck() {}
  }
}
</script>
<style scoped></style>
