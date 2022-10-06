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
      currentCollection: undefined
    }
  },
  components: { Searchbar, CollectionBox, CollectionModal },

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
    }
  }
}
</script>
<style scoped></style>
