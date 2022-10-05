<template>
    <div>
        <Navbar/>
        <DeckCard v-for="deck in decks" :key="deck._id" :deck="deck" />
    </div>
</template>
<script>
import Navbar from '../components/Navbar.vue'
import DeckCard from '../components/DeckCard.vue'
import { Api } from '../Api'

export default {
  data() {
    return {
      decks: []
    }
  },
  components: {
    Navbar, DeckCard
  },
  mounted: function () {
    Api.get('/decks')
      .then((res) => (this.decks = res.data))
      .catch((err) => console.log(err))
  }

}
</script>
<style scoped>
</style>
