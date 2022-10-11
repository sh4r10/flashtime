<template>
  <div>
    <Navbar />
    <div class="main-container">
      <div class="headers">
        <p class="deck-name">{{ deckName }}</p>
        <p class="progress-card">
          {{ this.currentCard + 1 }}/{{ this.cards.length }}
        </p>
      </div>
      <b-progress variant="primary" :value="this.currentCard" :max="this.cards.length" :precision="1" class="mb-3 w-100"></b-progress>
      <RevisionCard @nextCard="nextCard" :card="cards[currentCard]" />
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import RevisionCard from '../components/RevisionCard.vue'
import { Api } from '../Api'
export default {
  name: 'Revision',
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
  components: { Navbar, RevisionCard },
  mounted: function () {
    Api.get(`/decks/${this.$route.params.id}/cards/due`)
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
.main-container {
  margin: 7rem auto;
  width: 100%;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

.headers{
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 1.5rem;
}

.deck-name {
  text-align: left;
}
.progress-card {
  text-align: right;
}

</style>
