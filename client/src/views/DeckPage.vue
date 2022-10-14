<template>
  <div class="main-container">
    <Navbar />
    <div class="content-container">
      <div class="headers">
        <h1>Your Decks</h1>
        <b-button @click="setCurrentDeck(undefined)">Add new deck</b-button>
      </div>
      <!-- <Decks v-for="deck in filteredDeck" :key="deck._id" :deck="deck" @deleteDeck="deleteDeck" @setCurrentDeck="setCurrentDeck"/> -->
      <div class="decks-container">
        <DeckCard
          v-for="deck in filteredDeck"
          :key="deck._id"
          :deck="deck"
          :actions="deckActions[deck._id]"
        />
      </div>
    </div>
    <DeckModal
      :deck="currentDeck"
      @updateDeck="updateDeck"
      @createDeck="createDeck"
    />
  </div>
</template>
<script>
import { Api } from '../Api'
import DeckModal from '../components/DeckModal.vue'
import Navbar from '../components/Navbar.vue'
import DeckCard from '../components/DeckCard.vue'

export default {
  data() {
    return {
      decks: [],
      search: '',
      currentDeck: undefined
    }
  },
  components: {
    DeckModal,
    Navbar,
    DeckCard
  },
  methods: {
    fetchDecks: function () {
      Api.get('/decks')
        .then((res) => {
          this.decks = res.data
        })
        .catch((err) => console.error(err))
    },
    async createDeck(name) {
      try {
        await Api.post('/decks', { name })
        this.fetchDecks()
      } catch (err) {
        this.$vToastify.error('Something went wrong')
      }
    },
    async updateDeck(id, name) {
      try {
        await Api.put(`/decks/${id}`, { name })
        this.fetchDecks()
      } catch (err) {
        this.$vToastify.error('Something went wrong')
      }
    },
    deleteDeck: async function (id) {
      try {
        await Api.delete(`/decks/${id}`)
        this.decks = this.decks.filter((deck) => deck._id !== id)
      } catch (err) {
        this.$vToastify.error('Something went wrong')
      }
    },
    setCurrentDeck: function (id) {
      this.currentDeck = this.decks.find((deck) => deck._id === id)
      this.$bvModal.show('deck-modal')
    },
    handleInputChange: function (input) {
      this.query = input
    }
  },
  mounted: function () {
    Api.get('/decks')
      .then((res) => (this.decks = res.data))
      .catch((err) => console.error(err))
  },
  computed: {
    filteredDeck() {
      return this.decks.filter((deck) =>
        deck.name.toLowerCase().includes(this.search)
      )
    },
    deckActions() {
      const decks = this.decks.map((deck) => {
        const actions = [
          {
            id: 'update',
            title: 'Update Deck',
            icon: 'pencil',
            color: 'var(--primary)',
            clickHandler: this.setCurrentDeck
          },
          {
            id: 'delete',
            title: 'Delete Deck',
            icon: 'trash',
            color: 'var(--danger)',
            clickHandler: this.deleteDeck
          }
        ]
        if (deck.cardsDue > 0) {
          actions.unshift({
            id: 'revise',
            title: 'Revise Deck',
            icon: 'journals',
            color: 'var(--green)',
            clickHandler: () =>
              this.$router.push({ name: 'revise', params: { id: deck._id } })
          })
        }
        return [deck._id, actions]
      })
      return Object.fromEntries(decks)
    }
  }
}
</script>

<style scoped>
.content-container {
  max-width: 900px;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 2rem;
}

.decks-container {
  width: 100%;
}

.headers {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.headers h1 {
  width: auto;
}
</style>
