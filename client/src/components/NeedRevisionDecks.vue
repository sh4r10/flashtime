<template>
  <div>
    <h1>Needs Revision</h1>
    <b-container fluid>
      <Deck v-for="deck in topDecks" :deck="deck" :key="deck.id" url="/" />
    </b-container>
  </div>
</template>

<script>
import { Api } from '../Api'
import Deck from './Deck.vue'

export default {
  name: 'NeedRevisionDecks',
  data: function () {
    return {
      topDecks: []
    }
  },
  methods: {},
  components: { Deck },
  mounted: async function () {
    try {
      const response = await Api.get('/decks/')
      response.data.sort((a, b) => {
        return a.cardsDue < b.cardsDue
      })
      this.topDecks = response.data.slice(0, 5)
    } catch (err) {
      console.error(err)
    }
  }
}
</script>

<style scoped>
div {
  margin: 0 auto;
}
.container-fluid {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
