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
      <div class="mb-1">
        <b-button @click="deleteAllDecks">Delete All Decks</b-button>
      </div>
      <div class="mb-1">
        <b-button @click="deleteAllCollections"
          >Delete All Collections</b-button
        >
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
      ready: false,
      password: '',
      passwordState: null,
      decks: [],
      deckCollections: []
    }
  },
  methods: {
    // Delete Account methods:

    deleteAccount: function () {},
    deleteAllDecks: async function () {
      this.$bvModal
        .msgBoxConfirm(
          'Please confirm that you want to delete All your decks.',
          {
            title: 'Please Confirm',
            size: 'sm',
            buttonSize: 'sm',
            okVariant: 'danger',
            okTitle: 'YES',
            cancelTitle: 'NO',
            footerClass: 'p-2',
            hideHeaderClose: false,
            centered: true
          }
        )
        .then(() => {
          console.log(this.decks)
          if (this.decks.length === 0) {
            return this.$vToastify.error('You have no decks to delete')
          }
          Api.delete('/decks')
          this.decks = ''
          this.$vToastify.success('You have deleted all your decks')
        })
        .catch(() => {
          this.$vToastify.error('Something went wrong')
        })
    },
    deleteAllCollections: async function () {
      this.$bvModal
        .msgBoxConfirm(
          'Please confirm that you want to delete All your Collections.',
          {
            title: 'Please Confirm',
            size: 'sm',
            buttonSize: 'sm',
            okVariant: 'danger',
            okTitle: 'YES',
            cancelTitle: 'NO',
            footerClass: 'p-2',
            hideHeaderClose: false,
            centered: true
          }
        )
        .then(() => {
          console.log(this.deckCollections)
          if (this.deckCollections.length === 0) {
            return this.$vToastify.error('You have no collections to delete')
          }
          Api.delete('/collections')
          this.deleteAllCollections = ''
          this.$vToastify.success('You have deleted all your collections')
        })
        .catch(() => {
          this.$vToastify.error('Something went wrong')
        })
    },
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
      } catch (err) {
        this.$vToastify.error(err)
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
    const decksfromUser = await Api.get('/decks')
    const collectionsfromUser = await Api.get('/collections')
    this.form.firstName = res.data.firstName
    this.form.lastName = res.data.lastName
    this.form.email = res.data.email
    this.decks = decksfromUser.data
    this.deckCollections = collectionsfromUser.data
  }
}
</script>
