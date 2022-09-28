<template>
<div>
  <Searchbar/>
  <h1>Need Revision</h1>
  <h2>Your Collections </h2>
  <Deckbox/>
</div>
</template>

<script>
import Searchbar from '../components/Searchbar.vue'
import Deckbox from '../components/Deckbox.vue'
export default {
  name: 'User',
  data() {
    return {
    }
  },
  methods: {},
  created: {},
  components: {
    Searchbar,
    Deckbox
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
