<template>
  <div>
    <b-form @submit="onSubmit" v-if="show">
      <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          placeholder="Enter email"
          :disabled="!Boolean(ready)"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="First Name:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.firstName"
          placeholder="Enter First Name"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Last Name:" label-for="input-3">
        <b-form-input
          id="input-3"
          v-model="form.lastName"
          placeholder="Enter Last Name"
          required
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
    <b-button
      class="change-password"
      @click="changePassword"
      type="submit"
      variant="primary"
      >Change password</b-button
    >
  </div>
</template>

<script>
import { Api } from '../Api'
export default {
  name: 'profile',
  data() {
    return {
      form: {
        email: '',
        firstName: '',
        lastName: ''
      },
      show: true,
      ready: false
    }
  },
  methods: {
    onSubmit: async function (event) {
      event.preventDefault()
      try {
        await Api.put('/users/', {
          firstName: this.form.firstName,
          lastName: this.form.lastName,
          email: this.form.email
        })
        this.$vToastify.success('User updated')
        console.log('sub')
      } catch (err) {
        this.$vToastify.error('Something went wrong')
      }
    },
    changePassword: function () {
      this.$router.push('/profile/password')
    }
  },
  mounted: async function () {
    const res = await Api.get('/users')
    this.form.firstName = res.data.firstName
    this.form.lastName = res.data.lastName
    this.form.email = res.data.email
  }
}
</script>
