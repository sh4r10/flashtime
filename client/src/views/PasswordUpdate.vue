<template>
  <div>
    <h1>Hello here you can change your password</h1>
    <div>
      <b-form @submit.stop.prevent @submit="saveNewPassword">
        <label for="text-password">Password</label>
        <b-form-input
          type="password"
          id="text-password"
          v-model="currentPassword"
          aria-describedby="password-help-block"
          placeholder="currentPassword"
        ></b-form-input>
        <b-form-input
          type="password"
          id="text-password2"
          v-model="newPassword"
          aria-describedby="password-help-block2"
          placeholder="New Password"
          required
        ></b-form-input>
        <b-form-input
          type="password"
          id="text-password3"
          v-model="confirmNewPassWord"
          aria-describedby="password-help-block3"
          placeholder="Confirm New Password"
          required
        ></b-form-input>
        <b-form-text id="password-help-block2">
          Your password must be 8-20 characters long, contain letters and
          numbers, and must not contain spaces, special characters, or emoji.
        </b-form-text>
        <b-button
          @click="$router.push('/profile')"
          type="back"
          variant="primary"
          >Back</b-button
        >
        <b-button type="submit" variant="success">Save</b-button>
      </b-form>
    </div>
  </div>
</template>
<script>
import { Api } from '../Api'
export default {
  name: 'passwordUpdate',
  data() {
    return {
      currentPassword: '',
      newPassword: '',
      confirmNewPassWord: ''
    }
  },
  methods: {
    saveNewPassword: async function (e) {
      e.preventDefault()
      if (this.newPassword !== this.confirmNewPassWord) {
        this.$vToastify.error('Passwords do not match')
        return
      }
      console.log(this.currentPassword)
      try {
        await Api.patch('/users/password', {
          currentPassword: this.currentPassword,
          newPassword: this.newPassword
        })
        this.$vToastify.success('Password updated successfully')
        this.$router.push('/profile')
      } catch (err) {
        this.$vToastify.error('Something went wrong')
      }
      // console.log(this.user.password)
    }
  }
}
</script>
<style scoped></style>
