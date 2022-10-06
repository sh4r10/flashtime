<template>
  <div>
    <Navbar />
    <div>
      <h5 class="deck-name">{{ deckName }}</h5>
      <h5 class="progress-card">
        {{ this.currentCard + 1 }}/{{ this.cards.length }}
      </h5>
    </div>
    <CardRevision @nextCard="nextCard" :card="cards[currentCard]" />
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import CardRevision from '../components/CardRevision.vue'
import { Api } from '../Api'
export default {
  name: 'revision',
  data() {
    return {
      currentCard: 0,
      cards: [],
      deckName: 'Math',
      progress: this.currentCard,
      value: '',
      max: ''
    }
  },
  methods: {
    nextCard() {
      if (this.currentCard + 1 < this.cards.length) {
        this.currentCard++
      } else {
        this.$vToastify.success('You are done with your revision.')
      }
    }
  },
  // eslint-disable-next-line vue/no-unused-components
  components: { Navbar, CardRevision },
  mounted: function () {
    Api.get('/decks/632365d448fcf9ad5966d735/cards/due')
      .then((res) => {
        if (res.data.length === 0) {
          this.$vToastify.success('You have no cards to revise.')
          this.$router.push('/')
        }
        this.cards = res.data
      })
      .catch((err) => {
        this.$vToastify.error('An error occurred.')
        console.log(err)
        this.$router.push('/')
      })
  }
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
