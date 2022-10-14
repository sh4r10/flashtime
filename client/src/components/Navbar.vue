<template>
  <div>
    <b-navbar toggleable="lg" variant="outlined">
      <b-navbar-brand @click="$router.push({name: 'root'})">
        <img src="../assets/images/logo.svg" />
        flashtime
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav v-if="loggedIn">
          <b-nav-item @click="$router.push('/collections')"
            >Collections</b-nav-item
          >
          <b-nav-item @click="$router.push('/decks')">Decks</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right v-if="loggedIn">
            <!-- Using 'button-content' slot -->
            <template  #button-content :style="{ color: 'var(--primary)' }">
              <em>{{ currentUser }}</em>
            </template>
            <b-dropdown-item @click="$router.push('/profile')"
              >Profile</b-dropdown-item
            >
            <b-dropdown-item @click="signOut">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item v-if="!loggedIn" @click="$router.push({name: 'login'})"
            >Login</b-nav-item
          >
          <b-nav-item v-if="!loggedIn" @click="$router.push({name: 'signup'})"
            >Sign Up</b-nav-item
          >
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
  background: #fff;
  position: fixed;
  top: 0;
  padding: 1rem 2rem;
  width: 100%;
  z-index: 0;
  font-family: 'Raleway', sans-serif;
  font-size: 1.1rem;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.05);
}

div.navbar-brand {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

div.navbar-brand img {
  margin-right: 0.5rem;
}

.nav-item a.nav-link {
  color: var(--primary);
}

.nav-item a.nav-link:hover {
  color: var(--primary-dark);
}

a.dropdown-toggle em{
  text-transform: capitalize;
  color: var(--primary);
}
</style>
