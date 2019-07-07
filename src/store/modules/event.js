import EventService from '@/services/EventService.js'

export const namespaced = true

export const state = {
  events: [],
  eventsTotal: 0,
  event: {}
}

export const mutations = {
  ADD_EVENT(state, event) {
    state.events.push(event)
  },
  SET_EVENTS(state, events) {
    state.events = events
  },
  SET_EVENTS_TOTAL(state, eventsTotal) {
    state.eventsTotal = eventsTotal
  },
  SET_EVENT(state, event) {
    state.event = event
  }
}
export const actions = {
  createEvent({ commit, dispatch, rootState }, event) {
    return EventService.postEvent(event)
      .then(() => {
        commit('ADD_EVENT', event)
        const notification = {
          type: 'success',
          message: 'Evento creato correttamente da: ' + rootState.user.user.name
        }
        dispatch('notification/add', notification, { root: true })
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message:
            "Si è verificato un errore durante la creazione dell'evento: " +
            error.message
        }
        dispatch('notification/add', notification, { root: true })
        throw error
      })
  },
  fetchEvents({ commit, dispatch }, { perPage, page }) {
    EventService.getEvents(perPage, page)
      .then(response => {
        commit('SET_EVENTS_TOTAL', parseInt(response.headers['x-total-count']))
        commit('SET_EVENTS', response.data)
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message:
            'Si è verificato un errore nel caricamento degli eventi: ' +
            error.message
        }
        dispatch('notification/add', notification, { root: true })
      })
  },
  fetchEvent({ commit, dispatch, getters }, id) {
    var event = getters.getEventById(id)
    if (event) {
      commit('SET_EVENT', event)
    } else {
      EventService.getEvent(id)
        .then(response => {
          commit('SET_EVENT', response.data)
        })
        .catch(error => {
          const notification = {
            type: 'error',
            message:
              "Si è verificato un errore nel caricamento dell'evento: " +
              error.message
          }
          dispatch('notification/add', notification, { root: true })
        })
    }
  }
}
export const getters = {
  getEventById: state => id => {
    return state.events.find(event => event.id === id)
  }
}
