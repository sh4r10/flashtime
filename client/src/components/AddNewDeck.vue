<template>
  <div>
    <b-button v-b-modal.decks-to-add-modal>Add a new deck</b-button>

    <b-modal id="decks-to-add-modal" title="Add Decks" hide-footer>
      <b-list-group>
        <b-list-group-item
          v-for="deck in decks"
          :key="deck._id"
          button
          @click="addDeck(deck._id)"
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
  props: ['decks'],
  methods: {
    addDeck: async function (deckId) {
      try {
        await Api.put(`/collections/${this.$route.params.id}/decks`, {
          deckId
        })
      } catch (err) {
        this.$vToastify.error('Something went wrong')
      }
      this.$emit('addDeck', deckId)
    }
  }
}
</script>

<style scoped></style>
