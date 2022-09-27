<template>
    <b-container fluid>
        <Navbar />
        <b-container fluid>
            <h1>The <span>Modern</span> Solution to Flashcards</h1>
            <p>Based on the scientifically proven spaced repitition method.</p>
            <router-link to="/signup"><b-button variant="primary">Sign up</b-button></router-link>
            <router-link to="/login"><b-button variant="secondary">Log in</b-button></router-link>
        </b-container>
    </b-container>
</template>

<script>
import Navbar from '../components/Navbar.vue'
export default {
  name: 'landing',
  components: { Navbar }
}
</script>

<style>

</style>
