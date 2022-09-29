<template>
    <div>
        <Navbar/>,
        <Cards v-for ="card in cards" :key="card._id" :card="card" />
</div>
</template>
<script>
import Navbar from '../components/Navbar.vue'
import Cards from '../components/Cards.vue'
import { Api } from '../Api'
export default {
  data() {
    return {
      cards: []
    }
  },
  name: 'home',
  components: { Navbar, Cards },
  mounted: function () {
    console.log(this.$route.params.id)
    Api.get(`/decks/${this.$route.params.id}/cards`)
      .then(res => { this.cards = res.data })
      .catch(err => console.log(err))
  }

}

</script>
<style scoped>
</style>
