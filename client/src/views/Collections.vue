<template>
  <div>
    <Navbar />
    <div class="main-container">
      <h1>Your Collections</h1>
      <div class="actions">
        <b-button @click="clickHandler">Create</b-button>
      </div>
      <CollectionModal
        :collection="currentCollection"
        @updateCollection="updateCollectionName"
      />
      <div class="collections-container">
        <Collection
          v-for="collection in deckCollections"
          :key="collection._id"
          :collection="collection"
          @removeCollection="removeCollection"
          @updateCurrentCollection="setCurrentCollection"
          :controls="true"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { Api } from '../Api'
import CollectionModal from '../components/CollectionModal.vue'
import Collection from '../components/Collection.vue'
import Navbar from '../components/Navbar.vue'

export default {
  data() {
    return {
      deckCollections: [],
      currentCollection: undefined
    }
  },
  components: { CollectionModal, Collection, Navbar },

  mounted: function () {
    Api.get('/collections')
      .then((res) => (this.deckCollections = res.data))
      .catch((err) => console.log(err))
    this.fetchCollections()
  },
  methods: {
    fetchCollections: function () {
      Api.get('/collections')
        .then((res) => {
          this.deckCollections = res.data
        })
        .catch((err) => console.log(err))
    },

    setCurrentCollection: function (newCollection) {
      this.currentCollection = newCollection
      this.$bvModal.show('collection-modal')
    },

    removeCollection: async function (collectionId) {
      this.deckCollections = this.deckCollections.filter(
        (c) => c._id !== collectionId
      )
    },
    clickHandler: function () {
      this.currentCollection = undefined
      this.$bvModal.show('collection-modal')
    },
    updateCollectionName: async function (collectionId, newName) {
      try {
        await Api.put(`/collections/${collectionId}`, { name: newName })
        this.fetchCollections()
      } catch (err) {
        this.$vToastify.error('Something went wrong')
      }
    }
  }
}
</script>
<style scoped>
.main-container {
  margin: 8rem auto;
  max-width: 900px;
  width: 100%;
}

.main-container h1 {
  margin-bottom: 2rem;
}

.collections-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 1rem;
}

.actions {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
}

.actions button,
.actions button:focus,
.actions button:hover {
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

.actions button:hover {
  background: var(--secondary);
  color: #fff;
  border: 1px solid var(--secondary);
}
</style>
