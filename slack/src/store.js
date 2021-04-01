import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//Creation of a State array to hold data
const state = {
    currentUser : null
};

//Updates or changes in state
const mutations = {
    SET_USER(state,user)
    {
        state.currentUser = user;
    }
};

//Actions to be performed
const actions = {
    setUser(state, user)
    {
        state.commit('SET_USER',user)
    }
};

//get data from state
const getters = {
    currentUser : state => state.currentUser
};

//Vuex Store
const store = new Vuex.Store({
    state,
    mutations,
    actions,
    getters
});

export default store;