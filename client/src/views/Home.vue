<template>
  <b-container fluid>
    <Navbar />
    <b-container fluid class="home-container">
      <h1>The <span>Modern</span> Solution to Flashcards</h1>
      <p>Based on the scientifically proven spaced repitition method.</p>
      <div class="btn-container">
        <router-link to="/signup"
          ><b-button variant="primary">Sign up</b-button></router-link
        >
        <router-link to="/login"
          ><b-button variant="secondary">Log in</b-button></router-link
        >
      </div>
      <div class="image-container">
        <img src="../assets/images/home-bg.svg"/>
      </div>
    </b-container>
  </b-container>
</template>

<script>
import Navbar from '../components/Navbar.vue'
export default {
  name: 'Home',
  components: { Navbar }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700&family=Raleway&display=swap');

.home-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  justify-content: center;
  align-items: center;
}

.image-container {
  width: 100%;
  margin-top: 5rem;
  align-self: flex-end
}

.image-container img{
  width: 30%;
  min-width: 400px;
}
</style>
