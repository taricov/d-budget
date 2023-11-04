<template lang="html">
  <div>
    <v-row align="center" justify="center" style="margin-top: 40px;">
      <v-col style="position: relative;top: 13%;max-width: 30em;" class="text-xs-center">
        <div class="title">App Connector</div>
        <p class="text">Connect Your Daftra Account and Start Using The Application, To Connect Please Input Your Data As Rquired Below:</p>

        <v-form v-model="valid" class="mt-5">
          <v-text-field v-model="email" label="Email address" :rules="emailRules" />
          <v-btn :disabled="!valid" color="primary" @click="requestButtonPressed">
            Connect Now
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { firestore, authUi, authUiConfig, firebase } from '../../firebaseConfig'
import 'firebaseui/dist/firebaseui.css'

export default {
  name: 'Connect',
  data() {
    return {
      valid: null,
      email: null,
      emailRules: [v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'],
      username: null,
      password: null
    }
  },
  computed: {
    env() {
      return process.env.NODE_ENV
    }
  },
  mounted() {
    authUi.start('#firebaseui-auth-container', authUiConfig)
  },
  methods: {
    submit() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.username, this.password)
        .then(data => {
          this.$store.commit('SET_SNACKBAR_MESSAGE', 'Successfully logged in!')
          this.username = ''
          this.password = ''
        })
        .catch(err => {
          this.$store.commit('SET_SNACKBAR_MESSAGE', err.message)
          this.password = ''
        })
    },
    requestButtonPressed() {
      if (this.email.length > 0) {
        this.firebasePush()
      }
    },
    logout() {
      this.$store.dispatch('LOGOUT')
    },
    firebasePush() {
      // Add a new document in collection "cities"
      firestore
        .collection('emails')
        .doc(this.email)
        .set({
          email: this.email
        })
        .then(response => {
          this.$swal({ text: 'Email received! We will contact you when your account is ready.' })
          console.log('Document successfully written!')
        })
        .catch(error => {
          this.$swal({ text: 'Email received! We will contact you when your account is ready.' })
          console.error('Error writing document: ', error)
        })
    }
  }
}
</script>
<style scoped>
.title{
  text-align: center;
  font-size: 2rem !important;
  font-weight:bold;
  padding: 6px 4px;
  background-color: antiquewhite;
  color: #fff;
  border-radius: 8px;
}
.text{
margin: 1em 0 0;
}
</style>
