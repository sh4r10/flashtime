<template>
    <div>
        <Navbar/>
        <b-button @click="setCurrentCard(undefined)">Add new deck</b-button>
        <DeckModal :deck="currentDeck" @updateDeck="updateDeck" @createDeck="createDeck"/>
        <Decks v-for="deck in decks" :key="deck._id" :deck="deck" @deleteDeck="deleteDeck" @setCurrentDeck="setCurrentDeck"/>
    </div>
</template>
<script>
import Navbar from '../components/Navbar.vue'
import Decks from '../components/DeckComp.vue'
import { Api } from '../Api'
import DeckModal from '../components/DeckModal.vue'

export default {
  data() {
    return {
      decks: [],
      currentDeck: undefined
    }
  },
  components: {
    Navbar, Decks, DeckModal
  },
  methods: {
    fetchDecks: function () {
      Api.get('/decks')
        .then(res => { this.decks = res.data })
        .catch(err => console.log(err))
    },
    async createDeck(name) {
      try {
        await Api.post('/decks', { name })
        this.fetchDecks()
        this.$vToastify.success('Deck created successfully')
      } catch (err) {
        this.$vToastify.error('Something wennnt wrong')
      }
    },
    async updateDeck(id, name) {
      try {
        await Api.put(`/decks/${id}`, { name })
        this.$vToastify.success('Deck updated')
        this.fetchDecks()
      } catch (err) {
        this.$vToastify.error('Something went wrong')
      }
    },
    deleteDeck: function (id) {
      this.decks = this.decks.filter((deck) => deck._id !== id)
    },
    setCurrentDeck: function (deck) {
      this.currentDeck = deck
      this.$bvModal.show('deck-modal')
    }
  },
  mounted: function () {
    Api.get('/decks')
      .then((res) => (this.decks = res.data))
      .catch((err) => console.log(err))
  }
}
</script>

<style scoped>
</style>
