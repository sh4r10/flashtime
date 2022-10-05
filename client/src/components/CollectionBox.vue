<template>
  <div>
    <div class="box">
      <p>{{ collection.name }}</p>

      <button class="delete" @click="removeCollection(collection._id)">
        Delete
      </button>
      <b-button @click="clickHandler">Edit</b-button>
    </div>
  </div>
</template>
<script>
import { Api } from '../Api'
export default {
  name: 'CollectionBox',
  props: ['collection'],
  methods: {
    clickHandler: function () {
      this.$emit('updateCurrentCollection', this.collection)
    },
    removeCollection: async function (collectionId) {
      try {
        await Api.delete(`/collections/${collectionId}`)
        this.$emit('removeCollection', collectionId)
      } catch (err) {
        this.$vTostify.error('something went wrong')
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
