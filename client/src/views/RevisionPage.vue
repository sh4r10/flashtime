<template>
  <div>
    <h1>Welcom to your revision page</h1>
    <b-col cols="12" md="8" class="mx-auto mt-3">
      <b-container fluid>
        <b-row v-for="deck in topDecks" :key="deck._id">
          <RevisionDeck :deck="deck" url="/" />
        </b-row>
      </b-container>
    </b-col>
  </div>
</template>
<script>
import { Api } from '../Api'
import RevisionDeck from '../components/RevisionDeck.vue'
export default {
  name: 'revisionPage',
  data() {
    return {
      deck: '',
      url: '',
      topDecks: []
    }
  },
  components: { RevisionDeck },

  mounted: async function () {
    try {
      const response = await Api.get('/decks/')
      response.data.sort((a, b) => a.cardsDue < b.cardsDue)
      this.topDecks = response.data.filter((deck) => deck.cardsDue > 0)
    } catch (err) {
      console.error(err)
    }
  }
}
</script>
<style scoped></style>
