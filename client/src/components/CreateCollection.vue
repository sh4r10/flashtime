<template>
  <div>
    <button v-b-modal.modal-prevent-closing>Create</button>

    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Create new collection"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
      ok-title="Create"
      ok-variant="success"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="Collection Name"
          label-for="name-input"
          invalid-feedback="Name is required"
          :state="nameState"
        >
          <b-form-input
            id="name-input"
            v-model="name"
            :state="nameState"
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
  name: 'CreateCollection',
  data() {
    return {
      name: '',
      nameState: null
    }
  },
  methods: {
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity()
      this.nameState = valid
      return valid
    },
    resetModal() {
      this.name = ''
      this.nameState = null
    },
    handleOk(bvModalEvent) {
      bvModalEvent.preventDefault()
      // Trigger submit handler
      this.handleSubmit()
      // Prevent modal from closing
    },
    async handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return
      }
      try {
        const response = await Api.post('/collections/', { name: this.name })
        this.$router.push(`/collection/${response.data._id}`)
      } catch (err) {
        this.$vToastify.error('Something went wrong')
        this.$router.push('/')
      }
    }
  }
}
</script>

<style scoped>
  button, button:focus, button:hover{
    background: none;
    border: 1px solid var(--green);
    color: var(--green);
    padding: 0.25rem 1.5rem;
    outline: none;
    transition: .2s;
    border-radius: 5px;
    text-transform: uppercase;
    font-size: 14px;
  }

  button:hover{
    background: var(--green);
    color: #fff;
    border: 1px solid var(--green);
  }
</style>
