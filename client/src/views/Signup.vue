<template>
  <b-container fluid>
    <Navbar />
    <b-container fluid="md">
      <b-form @submit="submitHandler">
        <b-form-group>
          <b-form-input
            id="fname"
            v-model="form.firstName"
            placeholder="First Name"
            required
          >
          </b-form-input>
          <b-form-input
            id="lname"
            v-model="form.lastName"
            placeholder="Last Name"
            required
          >
          </b-form-input>
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
          <b-form-input
            id="confirmPassword"
            v-model="form.confirmPassword"
            type="password"
            placeholder="Confirm Password"
          >
          </b-form-input>
          <b-button variant="primary" type="submit">Sign up</b-button>
        </b-form-group>
      </b-form>
    </b-container>
  </b-container>
</template>

<script>
import { Api } from '../Api'
import Navbar from '../components/Navbar.vue'

export default {
  name: 'Signup',
  components: { Navbar },
  data: function () {
    return {
      form: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
      }
    }
  },
  methods: {
    submitHandler: async function (e) {
      e.preventDefault()
      try {
        await Api.post('/users', this.form)
        this.$vToastify.success('Account created successfully')
        this.$router.push('/login')
      } catch (error) {
        const errors = error.response.data.errors
        errors.forEach(error => this.$vToastify.error(error))
      }
    }
  }
}
</script>
