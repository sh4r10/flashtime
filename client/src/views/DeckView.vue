<template>
  <div class="main-container">
    <Navbar/>
    <CardModal
      :card="currentCard"
      @updateCard="updateCard"
      @createCard="createCard"
    />
    <h1>{{deck ? deck.name : ''}} <span v-if="!!deck"><CollectionBadge :deck="deck || undefined"/>
    </span></h1>
    <b-container fluid>
      <div class="actions">
      <b-button class="add-button" variant="outlined" @click="setCurrentCard(undefined)">Add Card</b-button>
    </div>
    <NoItems v-if="cards.length === 0" message="This deck does not have any cards, click Create to add a card" variant="secondary"/>
      <Card
        v-for="card in cards"
        :key="card._id"
        :card="card"
        @deleteCard="deleteCard"
        @setCurrentCard="setCurrentCard"
      />
    </b-container>
  </div>
</template>
<script>
import Card from '../components/Card.vue'
import { Api } from '../Api'
import CardModal from '../components/CardModal.vue'
import CollectionBadge from '../components/CollectionBadge.vue'
import Navbar from '../components/Navbar.vue'
import NoItems from '../components/NoItems.vue'
export default {
  name: 'DeckView',
  data() {
    return {
      cards: [],
      currentCard: undefined,
      deck: undefined
    }
  },
  methods: {
    fetchCards: function () {
      Api.get(`/decks/${this.$route.params.id}/cards`)
        .then(res => { this.cards = res.data })
        .catch(err => console.error(err))
    },
    async createCard(front, back) {
      try {
        await Api.post(`/decks/${this.$route.params.id}/cards/`, { front, back })
        this.fetchCards()
      } catch (err) {
        this.$vToastify.error('Something went wrong')
        this.$router.push('/')
      }
    },
    async updateCard(id, front, back) {
      try {
        await Api.put(`/cards/${id}`, { front, back })
        this.$vToastify.success('Card updated')
        this.fetchCards()
      } catch (err) {
        this.$vToastify.error('Something went wrong')
      }
    },
    deleteCard: function (id) {
      this.cards = this.cards.filter((card) => card._id !== id)
    },
    setCurrentCard: function (card) {
      this.currentCard = card
      this.$bvModal.show('card-modal')
    }
  },
  components: { Card, CardModal, CollectionBadge, Navbar, NoItems },
  mounted: async function () {
    this.fetchCards()
    try {
      const res = await Api.get(`/decks/${this.$route.params.id}`)
      this.deck = res.data
    } catch (err) {
      console.error(err)
    }
  }

}
</script>
<style scoped>
.action {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.action .b-icon {
  font-size: 1.25rem;
  cursor: pointer;
  box-sizing: content-box;
  padding: 3px;
}
.actions .bi-pencil{
  color: var(--primary);
}
.container-fluid {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 900px;
}

h1{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
}

h1 span{
  font-size: 1rem;
}

.actions{
  width: 100%;
  text-align: right;
}

button,
button:focus,
button:hover {
  background: none;
  border: 1px solid var(--secondary);
  color: var(--secondary);
  padding: 0.25rem 1.5rem;
  outline: none;
  transition: 0.2s;
  border-radius: 5px;
  text-transform: uppercase;
  font-size: 14px;
}

button:hover {
  background: var(--secondary);
  color: #fff;
  border: 1px solid var(--secondary);
}
</style>
