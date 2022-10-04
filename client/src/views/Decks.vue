<template>
  <div>
    <Navbar />
    <h1>{{ collection.name }}</h1>
    <!--eslint-disable-next-line vue/no-multiple-template-root-->
    <DeckCard
      v-for="deck in decks"
      :key="deck._id"
      :deck="deck"
      @removeDeck="removeDeck"
    />
    <AddNewDeck :decks="decksToAdd" />
  </div>
</template>
<script>
import { Api } from '../Api'
import DeckCard from '../components/DeckCard.vue'
import Navbar from '../components/Navbar.vue'
import AddNewDeck from '../components/AddNewDeck.vue'
export default {
  data() {
    return {
      decks: [],
      collection: '',
      decksToAdd: []
    }
  },
  components: {
    DeckCard,
    Navbar,
    AddNewDeck
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

    this.fetchDecksToAdd()
  },
  methods: {
    addNewDeck() {},
    removeDeck: async function (deckId) {
      this.decks = this.decks.filter((d) => d._id !== deckId)
      this.fetchDecksToAdd()
    },
    fetchDecksToAdd: async function () {
      try {
        const res = await Api.get('/decks')
        this.decksToAdd = res.data.filter((d) => !d.collection)
      } catch (err) {
        this.$vToastify.error('Something went wrong')
      }
    }
  }
}
</script>
<style scoped></style>
