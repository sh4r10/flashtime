<template>
  <div>
    <div class="box">
      {{ deck.name }}
      <button @click="removeDeck(deck._id)">Remove</button>
    </div>
  </div>
</template>
<script>
import { Api } from '../Api'
export default {
  name: 'DeckCard',
  props: ['deck'],
  methods: {
    removeDeck: async function (deckId) {
      try {
        await Api.delete(
          `/collections/${this.$route.params.id}/decks/${deckId}`
        )
        this.$emit('removeDeck', deckId)
      } catch (err) {
        this.$vToastify.error('Something went wrong')
      }
    }
  }
}
</script>
<style scoped>
.box {
  margin-left: 11%;
  width: 200px;
  height: 100px;
  border: none;
  background: transparent;
  box-shadow: 0px 0px 16px rgba(168, 83, 83, 0.25);
  background-color: rgba(225, 225, 225, 0.75);
}
</style>
