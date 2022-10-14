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

      <div>
        <b-button v-b-modal.modal-prevent-closing>Delete Account</b-button>

        <b-modal
          id="modal-prevent-closing"
          ref="modal"
          title="Delete your account"
          @show="resetModal"
          @hidden="resetModal"
          @ok="handleOk"
          ok-title="Delete"
          ok-variant="danger"
        >
          <form ref="form" @submit.stop.prevent="handleSubmit">
            <b-form-group
              label="Please type your password"
              label-for="password-input"
              invalid-feedback="password is required"
              :state="passwordState"
            >
              <b-form-input
                id="name-input"
                type="password"
                v-model="password"
                :state="passwordState"
                required
              ></b-form-input>
            </b-form-group>
          </form>
        </b-modal>
      </div>

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
      password: '',
      passwordState: null
    }
  },
  methods: {
    // Delete Account methods:

    deleteAccount: function () {},
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity()
      this.passwordState = valid
      return valid
    },
    resetModal() {
      this.password = ''
      this.passwordState = null
    },
    handleOk(bvModalEvent) {
      // Prevent modal from closing
      bvModalEvent.preventDefault()
      // Trigger submit handler
      this.handleSubmit()
    },
    handleSubmit: async function () {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return
      }
      try {
        await Api.delete('/users', { data: { password: this.password } })
        localStorage.removeItem('accessToken')
        window.location = '/'
        console.log('you have deleted the user account successfully')
      } catch (err) {
        this.$vToastify.error(err)
        console.log(this.password)
      }

      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide('modal-prevent-closing')
      })
    },

    // Update User information methods
    onSubmit: async function (event) {
      event.preventDefault()
      try {
        await Api.put('/users/', {
          firstName: this.form.firstName,
          lastName: this.form.lastName,
          email: this.form.email
        })
        this.$vToastify.success('User updated')
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
