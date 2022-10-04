<template>
    <div>
        <b-card
        border-variant="primary"
        :header="card.front"
        header-bg-variant="primary"
        header-text-variant="white"
      >
      <button class="update" @click="clickHandler">UPDATE</button>
      <button class="delete" @click="deleteCard(card._id)">DELETE</button>
        <b-card-text>{{card.back}}</b-card-text>
      </b-card>
    </div>
</template>
<script>
import { Api } from '../Api'
export default {
  props: ['card'],
  methods: {
    deleteCard(id) {
      Api.delete(`/cards/${id}`)
      // eslint-disable-next-line no-return-assign, vue/no-mutating-props
        .then(() => this.$emit('deleteCard', id))
        .catch(err => console.log(err))
    },
    clickHandler: function () {
      this.$emit('setCurrentCard', this.card)
      this.$bvModal.show('cardModal')
    }
  }
}
</script>
<style scoped>
  .delete {
    position:   absolute;
    top:        5px;
    left:       5px;
    text-align: left;
  }
  .update{
    position:   absolute;
    top:        5px;
    right:       5px;
    text-align: right;
  }
</style>
