<template>
  <v-form @submit.prevent="submit">
    <v-card>
      <v-card-title>이메일로그인</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="email"
          label="email"
        />
      </v-card-text>
      <v-card-actions>
        <v-btn @click="signOut" v-if="isLogin">로그아웃</v-btn>
        <v-btn type="submit" v-else>전송</v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { getAuth, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink, signOut } from 'firebase/auth'

@Component<AuthSign>({
  created() {
    this.signIn();
  }
})
export default class AuthSign extends Vue {
  email = '';
  isLogin = false;

  submit() {
    const actionCodeSettings = {
      url: 'http://localhost:8080/finishSignUp',
      handleCodeInApp: true,
    };

    sendSignInLinkToEmail(getAuth(), this.email, actionCodeSettings)
    .then(() => {
      localStorage.setItem('emailForSignIn', this.email);
      // ...
    })
    .catch((error) => {
      console.log(error);
      
      // ...
    });
  }
  signIn() {
    console.log('signIn...');
    
    const auth = getAuth();
    if(!isSignInWithEmailLink(auth, location.href)) return;
    
    const email = localStorage.getItem('emailForSignIn');
    if(!email) return;
    this.email = email;

    signInWithEmailLink(auth, email, location.href)
      .then((result) => {
        this.isLogin = true;
        //console.log(result);
        
        localStorage.removeItem('emailForSignIn');
      })
      .catch((error) => {
        console.log(error);
      });
  }
  signOut() {
    console.log('signOut...');

    signOut(getAuth())
      .then(() => {
        this.isLogin = false;
        console.log('Sign-out successful');
      })
      .catch(error => {
        console.log(error);
      });
  }
}
</script>

<style scoped>

</style>