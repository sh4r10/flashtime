<template>
  <div class="dashboard-container">
    <Navbar />
    <b-container fluid class="content-container">
      <b-row>
        <TextLogo />
      </b-row>
      <b-row>
        <Searchbar />
      </b-row>
      <b-row>
        <RevisionDecksContainer />
      </b-row>
      <b-row>
        <TopCollections />
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Searchbar from '../components/Searchbar.vue'
import Navbar from '../components/Navbar.vue'
import TextLogo from '../components/TextLogo.vue'
import TopCollections from '../components/TopCollections.vue'
import RevisionDecksContainer from '../components/RevisionDecksContainer.vue'
export default {
  data() {
    return {
      deckCollections: []
    }
  },
  name: 'Dashboard',
  components: {
    Searchbar,
    Navbar,
    TextLogo,
    TopCollections,
    RevisionDecksContainer
  }
}
</script>

<style scoped>
.dashboard-container {
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  min-height: 100vh;
}

.content-container{
  z-index: 1;
}
</style>
