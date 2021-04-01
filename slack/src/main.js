// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase/app'
import store from './store'
import auth from 'firebase/auth'

Vue.config.productionTip = false
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyAxRivqDbsCPS7_q_L_c47GOuEn5ReLvuU",
    authDomain: "slack-clone-9791f.firebaseapp.com",
    projectId: "slack-clone-9791f",
    storageBucket: "slack-clone-9791f.appspot.com",
    messagingSenderId: "4182365061",
    appId: "1:4182365061:web:48a5f1d7169221a4346aec",
    measurementId: "G-V0YYQ2SQX6"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  window.firebase = firebase;

  const unsubscribe = firebase.auth().onAuthStateChanged( user => {

    //dispatch user
    store.dispatch('setUser',user)
      
    new Vue({
      el: '#app',
      router,
      store,
      components: { App },
      template: '<App/>'
    })

    //Recursive call to check the auth state
    unsubscribe()

  })
