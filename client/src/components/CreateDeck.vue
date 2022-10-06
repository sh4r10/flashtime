<template>
    <div>
      <b-button @click="clickHandler">Add new deck</b-button>
    </div>
  </template>

<script>
export default {
  name: 'CreateDeck',
  methods: {
    clickHandler: function () {
      this.$emit('setCurrentDeck')
      this.$bvModal.show('deckModal')
    }
  }
}
</script>
