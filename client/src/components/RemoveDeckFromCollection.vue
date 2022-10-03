<template>
  <div>
    <b-button v-b-modal.modal-1>Remove deck</b-button>

    <b-modal id="modal-1" title="BootstrapVue">
      <p class="my-4">Remove deck</p>
      <b-list-group>
        <b-list-group-item
          v-for="deck in decks"
          :key="deck._id"
          @click="removeDeck(deck._id)"
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
  name: 'RemoveDeckFromCollection',
  data: function () {
    return {
      decks: []
    }
  },
  mounted: async function () {
    try {
      const res = await Api.get(`/collections/${this.$route.params.id}/decks/`)
      this.decks = res.data
    } catch (err) {
      this.$vToastify.error('Something went wrong')
    }
  },
  methods: {
    removeDeck: async function (deckId) {
      try {
        await Api.delete(
          `/collections/${this.$route.params.id}/decks/${deckId}`
        )
      } catch (err) {
        this.$vToastify.error('Something went wrong')
      }
    }
  }
}
</script>

<style scoped></style>
