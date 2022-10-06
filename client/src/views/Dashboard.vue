<template>
  <div class="main-container">
    <Navbar />
    <b-container>
      <b-row>
        <TextLogo />
      </b-row>
      <b-row>
        <Searchbar />
      </b-row>
      <b-row>
        <NeedRevisionDecks />
      </b-row>
      <b-row>
        <TopCollections />
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Searchbar from '../components/Searchbar.vue'
import NeedRevisionDecks from '../components/NeedRevisionDecks.vue'
import Navbar from '../components/Navbar.vue'
import TextLogo from '../components/TextLogo.vue'
import TopCollections from '../components/TopCollections.vue'
export default {
  data() {
    return {
      deckCollections: []
    }
  },
  name: 'Dashboard',
  components: {
    Searchbar,
    NeedRevisionDecks,
    Navbar,
    TextLogo,
    TopCollections
  }
}
</script>

<style scoped>
.main-container {
  display: flex;
  justify-content: center;
  flex-direction: column;
  min-height: 100vh;
}
</style>
