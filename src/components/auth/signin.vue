<template>
  <div id="signin">
     <div class="form">
    <form class="login-form"  @submit.prevent="onSubmit">
      <input
        placeholder="Email"
        type="email"
        id="email"
        v-model="email">
      <input
        placeholder="Password"
        type="password"
        id="password"
        v-model="password">
      <button type="submit">login</button>
      <p class="message">Not registered? <router-link to="/signup">Sign Up</router-link> </p>
    </form>
  </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      onSubmit () {
        const formData = {
          email: this.email,
          password: this.password,
        }
        console.log(formData)
        this.$store.dispatch('login', {email: formData.email, password: formData.password})
      }
    }
  }
</script>

