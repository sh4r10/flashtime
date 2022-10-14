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
      <b-form-select
        v-model="selected"
        @change="sort"
        :options="options"
        class="mb-3"
        value-field="item"
        text-field="name"
        disabled-field="notEnabled"
      ></b-form-select>
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
      currentCollection: undefined,
      sorted: false,
      selected: 'Alphabetically',
      options: [
        { item: 'Alphabetically', name: 'Alphabetically' },
        { item: 'Newest to Oldest', name: 'Newest to Oldest' },
        { item: 'Oldest to Newest', name: 'Oldest to Newest' }
      ]
    }
  },
  components: { CollectionModal, Collection, Navbar },

  mounted: async function () {
    await this.fetchCollections()
    this.sortAlphabetically()
  },
  methods: {
    fetchCollections: async function () {
      try {
        const res = await Api.get('/collections')
        this.deckCollections = res.data
      } catch (err) {
        console.error(err)
      }
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
    },
    sort: function () {
      switch (this.selected) {
        case 'Alphabetically':
          this.sortAlphabetically()
          break
        case 'Newest to Oldest':
          this.sortByNewest()
          break
        case 'Oldest to Newest':
          this.sortByOldest()
          break
        default:
          this.sortAlphabetically()
      }
    },
    sortAlphabetically: function () {
      this.deckCollections.sort((a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return -1
        }
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return 1
        }
        return 0
      })
    },
    sortByNewest: function () {
      this.deckCollections.sort((a, b) => {
        if (a.createdAt > b.createdAt) {
          return -1
        }
        if (a.createdAt < b.createdAt) {
          return 1
        }
        return 0
      })
    },
    sortByOldest: function () {
      this.deckCollections.sort((a, b) => {
        if (a.createdAt < b.createdAt) {
          return -1
        }
        if (a.createdAt > b.createdAt) {
          return 1
        }
        return 0
      })
    }
  }
}
</script>
<style scoped>
.main-container {
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
