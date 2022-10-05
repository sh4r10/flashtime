<template>
  <div>
    <b-modal
      id="collection-modal"
      ref="modal"
      :title="collection ? 'Update Collection' : 'Create new collection'"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
      :ok-title="collection ? 'Update' : 'Create'"
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
  name: 'CollectionModal',
  data() {
    return {
      name: '',
      nameState: null
    }
  },
  props: ['collection'],
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
      if (!this.collection) {
        try {
          const response = await Api.post('/collections/', { name: this.name })
          this.$router.push(`/collection/${response.data._id}`)
        } catch (err) {
          this.$vToastify.error('Something went wrong')
          this.$router.push('/')
        }
      } else {
        this.$emit('updateCollection', this.collection._id, this.name)
      }
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide('collection-modal')
      })
    }
  },
  watch: {
    collection: {
      immediate: true,
      handler: function (newCollection) {
        this.name = newCollection ? newCollection.name : ''
      }
    }
  }
}
</script>
