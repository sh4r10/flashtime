<template>
<div>
    <Navbar/>
    <!--eslint-disable-next-line vue/no-multiple-template-root-->
    <DeckCard v-for ="deck in decks" :key="deck._id" :deck="deck" />
    </div>
</template>
<script>
import { Api } from '../Api'
import DeckCard from '../components/DeckCard.vue'
import Navbar from '../components/Navbar.vue'
export default {
  data() {
    return {
      decks: []
    }
  },
  components: {
    DeckCard,
    Navbar
  },
  mounted: function () {
    console.log(this.$route.params.id)
    Api.get(`/collections/${this.$route.params.id}/decks`)
      .then(res => { this.decks = res.data })
      .catch(err => console.log(err))
  }
}
</script>
<style scoped>
</style>
