<template>
    <div>
      <b-button v-b-modal.cardModal @click="$emit('setCurrentCard', undefined)">Add new card</b-button>
    </div>
  </template>

<script>
import { Api } from '../Api'

export default {
  methods: {
    async createCard(front, back) {
      try {
        await Api.post(`/decks/${this.$route.params.id}/cards/`, { front, back })
        this.$emit('fetchCard')
      } catch (err) {
        this.$vToastify.error('Something went wrong')
        this.$router.push('/')
      }
    }
  }
}
</script>
