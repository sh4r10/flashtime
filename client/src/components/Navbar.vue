<template>
    <b-navbar>
        <b-navbar-brand href="/">flashtime</b-navbar-brand>
        <b-navbar-nav class="ml-auto">
            <router-link :to="{name: 'login'}"><b-button variant="link" href="/login">Login</b-button></router-link>
            <router-link :to="{name: 'signup'}"><b-button variant="outline-primary" href="/signup">Sign up</b-button></router-link>
        </b-navbar-nav>
    </b-navbar>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>

<style scoped>
    nav {
        position: fixed;
        top: 0;
        padding: 1rem 2rem;
        width: 100%;
    }
</style>
