<template>
  <div>
    <b-button v-b-modal.modal-1>Add a new deck</b-button>

    <b-modal id="modal-1" title="BootstrapVue">
      <p class="my-4">Add a new deck</p>
      <b-list-group>
        <b-list-group-item
          v-for="deck in decks"
          :key="deck._id"
          @click="addDeck(deck._id)"
          button
          >{{ deck.name }}</b-list-group-item
        >
      </b-list-group>
    </b-modal>
  </div>
</template>

<script>
import { Api } from '../Api'

export default {
  name: 'AddNewDeck',
  data: function () {
    return {
      decks: []
    }
  },
  mounted: async function () {
    try {
      const decks = await Api.get('/decks')
      this.decks = decks.filter((d) => !d.collection)
    } catch (err) {
      this.$vToastify.error('Something went wrong')
    }
  },
  methods: {
    addDeck: function (id) {
      Api.post('')
    }
  }
}
</script>

<style scoped></style>
