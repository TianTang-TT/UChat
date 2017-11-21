export default {
  namespaced: true,
  state: {
    contacts: [],
    currentContact: ''
  },
  getters: {
    contactInfo: state => state.contacts.find(item => item.id === state.currentContact)
  },
  mutations: {
    INIT_CONTACTS (state, contacts) {
      state.contacts = contacts
    },
    ADD_CONTACT (state, contact) {
      state.contacts.push(contact)
    },
    REMOVE_CONTACT (state, id) {
      let index = state.contacts.findIndex(contact => {
        return contact.id === id
      })
      if (index >= 0) {
        state.contacts.splice(index, 1)
      }
    },
    ACTIVE_CONTACT (state, contactId) {
      state.currentContact = contactId
    }
  },
  actions: {
    initContacts ({ commit }, contacts) {
      commit('INIT_CONTACTS', contacts)
    },
    addContact ({ commit }, contact) {
      commit('ADD_CONTACT', contact)
    },
    removeContact ({ commit }, id) {
      commit('REMOVE_CONTACT', id)
    },
    activeContact ({ commit, state }, contactId) {
      let index = state.contacts.find(contact => contact.id === contactId)
      if (index) {
        commit('ACTIVE_CONTACT', contactId)
      }
    }
  }
}
