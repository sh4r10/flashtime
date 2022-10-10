<template>
  <div>
    <Navbar />
    <b-container fluid class="main-container">
      <h1>{{ collection.name }}</h1>
      <DeckCard
        v-for="deck in decks"
        :key="deck._id"
        :deck="deck"
        @removeDeck="removeDeck"
      />
    </b-container>
    <AddNewDeck :decks="decksToAdd" />
  </div>
</template>
<script>
import { Api } from '../Api'
import DeckCard from '../components/DeckCard.vue'
import Navbar from '../components/Navbar.vue'
import AddNewDeck from '../components/AddNewDeck.vue'
export default {
  name: 'CollectionView',
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
<style scoped>
.main-container {
  margin: 7rem auto;
}

.box {
  margin-left: 11%;
  width: 200px;
  height: 100px;
  border: none;
  background: transparent;
  box-shadow: 0px 0px 16px rgba(234, 6, 6, 0.25);
  background-color: rgba(225, 225, 225, 0.75);
  text-decoration: none;
}
.button {
  position: absolute;
  top: 5px;
  right: 5px;
  text-align: right;
}

.container-fluid {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 900px;
}
</style>
