<template>
<div>
  <Searchbar/>
  <NeedRevisionDecks/>
  <h2>Your Collections </h2>
  <Deckbox/>
</div>
</template>

<script>
import Searchbar from '../components/Searchbar.vue'
import Deckbox from '../components/Deckbox.vue'
import NeedRevisionDecks from '../components/NeedRevisionDecks.vue'
export default {
  name: 'Dashboard',
  methods: {},
  components: {
    Searchbar,
    Deckbox,
    NeedRevisionDecks
  }
}
</script>

<style scoped>
h1{
  margin-top: 8%;
  margin-left:-47%;
  font-size: 30px;
  color: #627281;
}
h2{
  margin-top: 30%;
  margin-left:-47%;
  font-size: 30px;
  color: #627281;
}
</style>
