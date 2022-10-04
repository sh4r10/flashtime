<template>
  <b-col cols="12" md="8" class="mx-auto mt-3">
    <h2>Your Collections</h2>
    <Deckbox
      v-for="collection in deckCollections.slice(0, 9)"
      :key="collection._id"
      :collection="collection"
    />
    <CreateCollection />
  </b-col>
</template>

<script>
import { Api } from '../Api'
import Deckbox from './Deckbox.vue'
import CreateCollection from './CreateCollection.vue'

export default {
  name: 'TopCollections',
  data: function () {
    return {
      deckCollections: []
    }
  },
  mounted: function () {
    Api.get('/collections')
      .then((res) => {
        this.deckCollections = res.data
      })
      .catch((err) => console.error(err))
  },
  components: { Deckbox, CreateCollection }
}
</script>

<style scoped>
h2 {
  font-size: 1.5rem;
  text-align: left;
  margin: 0;
}
</style>
