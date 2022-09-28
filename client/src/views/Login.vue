<template>
  <b-container fluid>
    <Navbar />
    <b-container fluid="md">
        <b-form @submit="submitHandler">
            <b-form-group>
            <b-form-input
            id="email"
            v-model="form.email"
            type="email"
            placeholder="Email"
            required
          >
          </b-form-input>
          <b-form-input
            id="password"
            v-model="form.password"
            type="password"
            placeholder="Password"
            required
          >
          </b-form-input>
          <b-button type="submit" variant="primary">Login</b-button>
        </b-form-group>
        </b-form>
    </b-container>
  </b-container>
</template>

<script>
import { Api } from '../Api'
import Navbar from '../components/Navbar.vue'
export default {
  name: 'Login',
  components: { Navbar },
  data: function () {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    submitHandler: async function (e) {
      e.preventDefault()
      try {
        const response = await Api.post('/auth/login', this.form, { withCredentials: true })
        localStorage.setItem('accessToken', response.data.accessToken)
        this.$router.push('/')
      } catch (error) {
        const serverErrror = error.response.data.error
        if (serverErrror) {
          this.$vToastify.error(serverErrror)
        } else {
          this.$vToastify.error('Something went wrong')
        }
      }
    }
  }
}
</script>
