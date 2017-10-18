export default {
  namespaced: true,
  state: {
    contacts: [{
      id: 'u_0',
      name: '天棠',
      avatar: ''
    }, {
      id: 'u_1',
      name: '惊蛰',
      avatar: ''
    }],
    currentContact: ''
  },
  mutations: {
    addContact (state, contact) {
      state.contacts.push(contact)
    },
    removeContact (state, contact) {
      let index = state.contacts.indexOf(contact)
      if (index >= 0) {
        state.splice(index, 1)
      }
    },
    activeContact (state, contactId) {
      state.currentContact = contactId
    }
  },
  actions: {
    addContact ({ commit }, cond) {
      commit('addContact', cond.contact)
    },
    removeContact ({ commit }, cond) {
      commit('removeContact', cond.contact)
    },
    activeContact ({ commit, state }, contactId) {
      let index = state.contacts.find(contact => contact.id === contactId)
      if (index) {
        commit('activeContact', contactId)
      }
    }
  }
}
