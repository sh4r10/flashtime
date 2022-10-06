<template>
    <div>
        <Navbar/>
        <input type="text" v-model="search">
        <DeckModal :deck="currentDeck" @updateDeck="updateDeck" @createDeck="createDeck"/>
        <CreateDeck @setCurrentDeck="setCurrentDeck"/>
        <Decks v-for="deck in filteredDecks" :key="deck._id" :deck="deck" @deleteDeck="deleteDeck" @setCurrentDeck="setCurrentDeck"/>
    </div>
</template>
<script>
import Navbar from '../components/Navbar.vue'
import Decks from '../components/Decks.vue'
import { Api } from '../Api'
import CreateDeck from '../components/CreateDeck.vue'
import DeckModal from '../components/DeckModal.vue'

export default {
  data() {
    return {
      search: '',
      decks: [],
      currentDeck: undefined
    }
  },
  components: {
    Navbar, Decks, DeckModal, CreateDeck
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
  },
  computed: {
    filteredDecks() {
      return this.decks.filter(deck => deck.name.includes(this.search))
    }
  }
}
</script>

<style scoped>
</style>
