<template>
  <div id="signup">
    <div id="signin">
     <div class="form">
          <p v-if="name">Welcome, {{ name }} </p>
           <form class="login-form" @submit.prevent="onSubmit">
        <div class="input">
          <input
                  type="text"
                  id="long"
                  placeholder="How long have you been using this product"
                  v-model="long"
                  required>
          </div>
        <div class="input">
          <input
                  type="text"
                  placeholder="How much did you buy it?"
                  id="price"
                  v-model="price">
        </div>
        <div class="input">
          <input
            type="text"
            placeholder="Comment about the product"
            id="comment"                
            v-model="comment">

        </div>
          <button type="submit">Submit</button>
        </form> 
      
      </div>
   </div>
  </div>
</template>

<script>

  export default {
    data () {
      return {
        price: '',
        long:'',
        comment: ''
      }
    },
    methods : {
      onSubmit () {
        const postData = {
          price: this.price,
          long: this.long,
          comment: this.comment
        }
        console.log(postData)
        this.$store.dispatch('postData', postData)
      }
    },
    computed: {
      name () {
        return !this.$store.getters.user ? false : this.$store.getters.user.name
      }
    },
    created () {
      this.$store.dispatch('fetchUser')
    }
  }
</script>

<style scoped>
  h1, p {
    text-align: center;
  }

  p {
    color: red;
  }
</style>