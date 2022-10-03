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
      const res = await Api.get('/decks')
      this.decks = res.data.filter((d) => !d.collection)
    } catch (err) {
      this.$vToastify.error('Something went wrong')
    }
  },
  methods: {
    addDeck: async function (deckId) {
      try {
        await Api.put(`/collections/${this.$route.params.id}/decks`, {
          deckId
        })
      } catch (err) {
        this.$vToastify.error('Something went wrong')
      }
    }
  }
}
</script>

<style scoped></style>
