<template>
  <b-col cols="12" md="8" class="mx-auto mt-3">
    <div class="header">
      <h2>Your Collections</h2>
      <b-button v-b-modal.collection-modal>Create</b-button>
    </div>
    <div class="collection-container">
      <Collection
        v-for="collection in deckCollections.slice(0, 9)"
        :key="collection._id"
        :collection="collection"
      />
    </div>
    <CollectionModal />
  </b-col>
</template>

<script>
import { Api } from '../Api'
import Collection from './Collection.vue'
import CollectionModal from './CollectionModal.vue'

export default {
  name: 'TopCollections',
  data: function () {
    return {
      deckCollections: []
    }
  },
  mounted: function () {
    Api.get('/collections')
      .then((res) => {
        this.deckCollections = res.data
          .sort((a, b) => a.createdAt < b.createdAt)
          .slice(0, 3)
      })
      .catch((err) => console.error(err))
  },
  components: { Collection, CollectionModal }
}
</script>

<style scoped>
h2 {
  font-size: 1.5rem;
  text-align: left;
  margin: 0;
}

.collection-container {
  display: grid;
  grid-template-columns: repeat(3, minmax(200px, 1fr));
  grid-gap: 1rem;
  width: 100%;
}

.header {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin: 1rem auto;
}

button,
button:focus,
button:hover {
  background: none;
  border: 1px solid var(--secondary);
  color: var(--secondary);
  padding: 0.25rem 1.5rem;
  outline: none;
  transition: 0.2s;
  border-radius: 5px;
  text-transform: uppercase;
  font-size: 14px;
}

button:hover {
  background: var(--secondary);
  color: #fff;
  border: 1px solid var(--secondary);
}

@media screen and (max-width: 1200px) {
  .collection-container {
    grid-template-columns: repeat(2, minmax(200px, 1fr));
  }
}

@media screen and (max-width: 768px) {
  .collection-container {
    grid-template-columns: 1fr;
  }
}
</style>
