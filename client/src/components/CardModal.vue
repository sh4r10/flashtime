<template>
          <b-modal
        id="cardModal"
        title="Submit Your Front and Back"
        @show="resetModal"
        @hidden="resetModal"
        @ok="handleOk"
      >
        <form ref="form" @submit.stop.prevent="handleSubmit">
          <b-form-group
            label ="Front"
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
            label ="Back"
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
</template>
<script>

export default {
  data() {
    return {
      front: '',
      back: ''
    }
  },
  props: ['card'],
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
      bvModalEvent.preventDefault()
      // Trigger submit handler
      this.handleSubmit()
    },
    handleSubmit() {
      if (!this.checkFormValidity()) {
        return
      }
      this.$emit('createCard', this.front, this.back)
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide('modal-prevent-closing')
      })
    }
  }
}
</script>
