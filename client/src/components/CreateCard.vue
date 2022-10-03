<template>
    <div>
      <b-button v-b-modal.modal-prevent-closing>Add new card</b-button>
      <b-modal
        id="modal-prevent-closing"
        ref="modal"
        title="Submit Your Front and Back"
        @show="resetModal"
        @hidden="resetModal"
        @ok="handleOk"
      >
        <form ref="form" @submit.stop.prevent="handleSubmit">
          <b-form-group
            label1 ="Front"
            label-for="front-input"
            invalid-feedback="Front is required"
            :state="nameState"
          >
            <b-form-input
              id="front-input"
              v-model="front"
              :state="frontState"
              required
            ></b-form-input>
          </b-form-group>
        </form>
        <form ref="form" @submit.stop.prevent="handleSubmit">
          <b-form-group
            label1 ="Back"
            label-for="back-input"
            invalid-feedback="Back is required"
            :state="nameState"
          >
            <b-form-input
              id="back-input"
              v-model="back"
              :state="bsckState"
              required
            ></b-form-input>
          </b-form-group>
        </form>
      </b-modal>
    </div>
  </template>

<script>
import { Api } from '../Api'

export default {
  data() {
    return {
      front: '',
      back: '',
      nameState: null,
      submittedNames: []
    }
  },
  methods: {
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity()
      this.nameState = valid
      return valid
    },
    resetModal() {
      this.front = ''
      this.back = ''
      this.nameState = null
    },
    async handleOk(bvModalEvent) {
      try {
        bvModalEvent.preventDefault()
        // Trigger submit handler
        this.handleSubmit()
        await Api.post(`/decks/${this.$route.params.id}/cards/`, { front: this.front, back: this.back })
      } catch (err) {
        this.$vToastify.error('Something went wrong')
        this.$router.push('/')
      }
      // Prevent modal from closing
    },
    handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return
      }
      // Push the name to submitted names
      this.submittedNames.push(this.name)
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide('modal-prevent-closing')
      })
    }
  }
}
</script>
