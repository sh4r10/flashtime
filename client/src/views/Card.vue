<template>
    <div>
        <Navbar/>
        <CreateCard @fetchCard="fetchCards"/>
        <Cards v-for ="card in cards" :key="card._id" :card="card" @deleteCard="deleteCard"/>
</div>
</template>
<script>
import Navbar from '../components/Navbar.vue'
import Cards from '../components/Cards.vue'
import { Api } from '../Api'
import CreateCard from '../components/CreateCard.vue'
export default {
  name: 'home',
  data() {
    return {
      cards: []
    }
  },
  methods: {
    fetchCards: function () {
      Api.get(`/decks/${this.$route.params.id}/cards`)
        .then(res => { this.cards = res.data })
        .catch(err => console.log(err))
    },
    deleteCard: function (id) {
      this.cards = this.cards.filter((card) => card._id !== id)
    }
  },
  components: { Navbar, Cards, CreateCard },
  mounted: function () {
    this.fetchCards()
  }

}

</script>
<style scoped>
</style>
