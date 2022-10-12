<template>
  <div>
    <Searchbar />
    <CollectionModal
      :collection="currentCollection"
      @updateCollection="updateCollectionName"
    />
    <CollectionBox
      v-for="collection in deckCollections"
      :key="collection._id"
      :collection="collection"
      @removeCollection="removeCollection"
      @updateCurrentCollection="setCurrentCollection"
    />
    <div>
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
import Searchbar from '../components/Searchbar.vue'
import CollectionBox from '../components/CollectionBox.vue'
import CollectionModal from '../components/CollectionModal.vue'

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
  components: { Searchbar, CollectionBox, CollectionModal },

  mounted: function () {
    this.fetchCollections()
  },
  methods: {
    fetchCollections: function () {
      Api.get('/collections')
        .then((res) => (this.deckCollections = res.data))
        .catch((err) => console.log(err))
      this.sortAlphabetically()
    },

    setCurrentCollection: function (newCollection) {
      this.currentCollection = newCollection
      this.$bvModal.show('collection-modal')
    },

    removeCollection: async function (collectionId) {
      try {
        this.deckCollections = this.deckCollections.filter(
          (c) => c._id !== collectionId
        )
      } catch (err) {
        this.$vToastify.error('Something went wrong')
      }
    },
    updateCollectionName: async function (collectionId, newName) {
      console.log(collectionId, newName)
      try {
        await Api.put(`/collections/${collectionId}`, { name: newName })
        this.fetchCollections()
        this.$vToastify.success('Card updated')
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
        if (a.name < b.name) {
          return -1
        }
        if (a.name > b.name) {
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
<style scoped></style>
