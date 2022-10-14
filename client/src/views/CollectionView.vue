<template>
  <div>
    <Navbar />
    <b-container fluid class="main-container">
      <h1>{{ collection.name }}</h1>
      <NoItems v-if="decks.length === 0" message="This collection does not have any decks, click Add to start" variant="secondary"/>
      <DeckCard
        v-for="deck in decks"
        :key="deck._id"
        :deck="deck"
        :actions="[
          {
            id: 'remove',
            title: 'Remove from collection',
            icon: 'x-circle-fill',
            color: 'var(--danger)',
            clickHandler: removeDeck
          }
        ]"
      />
    </b-container>
    <div>
      <b-form-select
        v-model="selected"
        @change="sort"
        :options="options"
        class="mb-3"
        value-field="item"
        text-field="name"
        disabled-field="notEnabled"
      ></b-form-select>
    </div>
    <AddNewDeck :decks="decksToAdd" />
  </div>
</template>
<script>
import { Api } from '../Api'
import DeckCard from '../components/DeckCard.vue'
import Navbar from '../components/Navbar.vue'
import AddNewDeck from '../components/AddNewDeck.vue'
import NoItems from '../components/NoItems.vue'

export default {
  name: 'CollectionView',
  data() {
    return {
      decks: [],
      collection: '',
      decksToAdd: [],
      selected: 'Alphabetically',
      options: [
        { item: 'Alphabetically', name: 'Alphabetically' },
        { item: 'Number Of Cards', name: 'Number Of Cards' }
      ]
    }
  },
  components: {
    DeckCard,
    Navbar,
    AddNewDeck,
    NoItems
  },
  mounted: async function () {
    try {
      const collectionRes = await Api.get(
        `/collections/${this.$route.params.id}`
      )
      this.collection = collectionRes.data
      const decksRes = await Api.get(
        `/collections/${this.$route.params.id}/decks`
      )
      this.decks = decksRes.data
    } catch (err) {
      console.error(err)
    }
    this.sortAlphabetically()
    this.fetchDecksToAdd()
  },
  methods: {
    addNewDeck: async function () {
      Api.get(`/collections/${this.$route.params.id}/decks`).then((res) => {
        this.decks = res.data
      })
      this.fetchDecksToAdd()
    },
    removeDeck: async function (deckId) {
      try {
        await Api.delete(
          `/collections/${this.$route.params.id}/decks/${deckId}`
        )
        this.decks = this.decks.filter((d) => d._id !== deckId)
        this.fetchDecksToAdd()
      } catch (err) {
        this.$vToastify.error('Something went wrong')
      }
    },
    fetchDecksToAdd: async function () {
      try {
        const res = await Api.get('/decks')
        this.decksToAdd = res.data.filter((d) => d.deckCollection === null)
      } catch (err) {
        this.$vToastify.error('Something went wrong')
      }
    },
    sortAlphabetically: function () {
      this.decks.sort((a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return -1
        }
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return 1
        }
        return 0
      })
    },
    sortByNumOfCards: function () {
      this.decks.sort((a, b) => {
        if (a.cards.length > b.cards.length) {
          return -1
        }
        if (a.cards.length < b.cards.length) {
          return 1
        }
        return 0
      })
    },
    sort: function () {
      switch (this.selected) {
        case 'Alphabetically':
          this.sortAlphabetically()
          break
        case 'Number Of Cards':
          this.sortByNumOfCards()
          break
        default:
          this.sortAlphabetically()
      }
    }
  }
}
</script>
<style scoped>
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
