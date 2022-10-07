<template>
  <b-col cols="12" md="8" class="mx-auto mt-3">
    <h2>Needs Revision</h2>
    <b-container fluid>
      <b-row v-for="deck in topDecks" :key="deck._id">
        <Deck :deck="deck" url="/" />
      </b-row>
    </b-container>
  </b-col>
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
      response.data.sort((a, b) => a.cardsDue < b.cardsDue)
      this.topDecks = response.data.slice(0, 3).filter((deck) => deck.cardsDue > 0)
    } catch (err) {
      console.error(err)
    }
  }
}
</script>

<style scoped>
h2 {
  font-size: 1.5rem;
  text-align: left;
  margin: 0;
}
</style>
