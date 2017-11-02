export default {
  namespaced: true,
  state: {
    contacts: [],
    currentContact: ''
  },
  mutations: {
    initContacts (state, contacts) {
      state.contacts = contacts
    },
    addContact (state, contact) {
      state.contacts.push(contact)
    },
    removeContact (state, id) {
      let index = state.contacts.findIndex(contact => {
        return contact.id === id
      })
      if (index >= 0) {
        state.contacts.splice(index, 1)
      }
    },
    activeContact (state, contactId) {
      state.currentContact = contactId
    }
  },
  actions: {
    initContacts ({ commit }, contacts) {
      commit('initContacts', contacts)
    },
    addContact ({ commit }, contact) {
      commit('addContact', contact)
    },
    removeContact ({ commit }, id) {
      commit('removeContact', id)
    },
    activeContact ({ commit, state }, contactId) {
      let index = state.contacts.find(contact => contact.id === contactId)
      if (index) {
        commit('activeContact', contactId)
      }
    }
  }
}
