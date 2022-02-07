import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from 'firebase/auth'
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

import firebaseConfig from '../firebaseConfig'

initializeApp(firebaseConfig)
getAuth().useDeviceLanguage()

if (location.hostname === 'localhost') {
  connectAuthEmulator(getAuth(), 'http://localhost:9099/');
  connectFirestoreEmulator(getFirestore(), 'localhost', 5002);
}

// import firebase from "firebase/app"
// Vue.prototype.$firebase = firebase

import AuthHandler from '@/handler/auth';
AuthHandler.instance();

console.log(AuthHandler.instance());

console.log(AuthHandler.instance());

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
