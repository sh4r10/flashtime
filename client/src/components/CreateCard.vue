<template>
    <div>
      <b-button @click="clickHandler">Add new card</b-button>
    </div>
  </template>

<script>
export default {
  name: 'CreateCard',
  methods: {
    clickHandler: function () {
      this.$emit('setCurrentCard')
      this.$bvModal.show('cardModal')
    }
  }
}
</script>
