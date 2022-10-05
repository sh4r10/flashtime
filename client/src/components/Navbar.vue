<template>
  <b-navbar>
    <b-navbar-brand href="/">flashtime</b-navbar-brand>
    <b-navbar-nav class="ml-auto">
      <router-link to="/login"
        ><b-button variant="link" href="/login">Login</b-button></router-link
      >
      <router-link to="/signup"
        ><b-button variant="outline-primary" href="/signup"
          >Sign up</b-button
        ></router-link
      >
      <router-link to="/collections"
        ><b-button variant="link" href="/collections"
          >Collections</b-button
        ></router-link
      >
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>
