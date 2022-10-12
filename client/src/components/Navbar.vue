<template>
  <div>
    <b-navbar v-if="!loggedIn">
      <b-navbar-brand href="/">flashtime</b-navbar-brand>
      <b-navbar-nav class="ml-auto">
        <router-link :to="{ name: 'login' }"
          ><b-button variant="link" href="/login">Login</b-button></router-link
        >
        <router-link :to="{ name: 'signup' }"
          ><b-button variant="outline-primary" href="/signup"
            >Sign up</b-button
          ></router-link
        >
      </b-navbar-nav>
    </b-navbar>

    <b-navbar toggleable="lg" type="dark" variant="info" v-if="loggedIn">
      <b-navbar-brand href="#">flashtime</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item @click="$router.push('/collections')"
            >Collections</b-nav-item
          >
          <b-nav-item @click="$router.push('/decks')">Decks</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>{{ currentUser }}</em>
            </template>
            <b-dropdown-item @click="$router.push('/profile')"
              >Profile</b-dropdown-item
            >
            <b-dropdown-item @click="signOut">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { Api } from '../Api'
export default {
  name: 'Navbar',
  data: function () {
    return {
      loggedIn: false,
      currentUser: ''
    }
  },
  mounted: function () {
    this.loggedIn = !!localStorage.getItem('accessToken')
    Api.get('/users/')
      .then((res) => {
        this.currentUser = res.data.firstName + ' ' + res.data.lastName
      })
      .catch((err) => console.error(err))
  },
  methods: {
    signOut: async function () {
      try {
        await Api.delete('/auth/logout', { withCredentials: true })
        localStorage.removeItem('accessToken')
        window.location = '/'
      } catch (err) {
        this.$vToastify.error('Something went wrong')
      }
    }
  }
}
</script>

<style scoped>
nav {
  background: none;
  position: fixed;
  top: 0;
  padding: 1rem 2rem;
  width: 100%;
  z-index: 0;
}
.navbar {
  background: none;
  position: fixed;
  top: 0;
  padding: 1rem 2rem;
  width: 100%;
  z-index: 0;
}

.bd-info {
  color: var(--primary);
}
</style>
