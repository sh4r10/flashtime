<template>
  <div>
    <Navbar />
    <div>
      <h5 class="deck-name">{{ deckName }}</h5>
      <h5 class="progress-card">
        {{ this.currentCard + 1 }}/{{ this.cards.length }}
      </h5>
    </div>
    <Card @nextCard="nextCard" :card="cards[currentCard]" />
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import Card from '../components/Card.vue'
export default {
  name: 'revision',
  data() {
    return {
      currentCard: 0,
      cards: [
        {
          id: 1,
          front: 'Hello first',
          back: 'Hi first card'
        },
        {
          id: 2,
          front: 'Hello second',
          back: 'Hi second card'
        },
        {
          id: 3,
          front: 'Hello third',
          back: 'Hi third card'
        }
      ],
      deckName: 'Math',
      progress: this.currentCard,
      value: '',
      max: ''
    }
  },
  methods: {
    nextCard() {
      console.log('hello')
      if (this.currentCard + 1 < this.cards.length) {
        this.currentCard++
      } else {
        this.$vToastify.success('You are done with your revision.')
      }
    }
  },
  // eslint-disable-next-line vue/no-unused-components
  components: { Navbar, Card }
}
</script>

<style scoped>
body {
  background: #00a5f7;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.deck-name {
  text-align: left;
}
.progress-card {
  text-align: right;
  font-weight: 400;
}
</style>
