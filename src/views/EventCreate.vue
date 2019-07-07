<template>
  <div>
    <h1>Ciao {{ event.user.name }}, crea un evento</h1>
    <form @submit.prevent="createEvent">
      <label>Scegli una categoria</label>
      <select v-model="event.category">
        <option v-for="cat in categories" :key="cat">{{ cat }}</option>
      </select>
      <h3>Descrivi il tuo evento</h3>
      <div class="field">
        <label>Titolo</label>
        <input v-model="event.title" type="text" placeholder="Titolo" />
      </div>
      <div class="field">
        <label>Descrizione</label>
        <input
          v-model="event.description"
          type="text"
          placeholder="Descrizione"
        />
      </div>
      <h3>Dove si svolgerà il tuo evento?</h3>
      <div class="field">
        <label>Location</label>
        <input v-model="event.location" type="text" placeholder="Location" />
      </div>
      <h3>Quando si svolgerà il tuo evento?</h3>
      <div class="field">
        <label>Data</label>
        <datepicker v-model="event.date" placeholder="Data" />
      </div>
      <div class="field">
        <label>Imposta un orario</label>
        <select v-model="event.time">
          <option v-for="time in times" :key="time">{{ time }}</option>
        </select>
      </div>
      <input type="submit" class="button -fill-gradient" value="Submit" />
    </form>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import { mapState, mapGetters } from 'vuex'

export default {
  components: {
    Datepicker
  },
  data() {
    const times = []
    for (let i = 1; i <= 24; i++) {
      times.push(i + ':00')
    }
    return {
      times,
      categories: this.$store.state.categories,
      event: this.createFreshEventObject()
    }
  },
  methods: {
    createEvent() {
      this.$store
        .dispatch('createEvent', this.event)
        .then(() => {
          this.$router.push({
            name: 'event-show',
            params: { id: this.event.id }
          })
          this.event = this.createFreshEventObject()
        })
        .catch(() => {
          console.log(
            "Si è verificato un errore durante il salvataggio dell'evento"
          )
        })
    },
    createFreshEventObject() {
      const user = this.$store.state.user.user
      const id = Math.floor(Math.random() * 10000000)
      return {
        id: id,
        user: user,
        category: '',
        organizer: user,
        title: '',
        description: '',
        location: '',
        date: '',
        attendees: []
      }
    }
  },
  computed: {
    ...mapGetters(['getEventById']),
    ...mapState(['user'])
  }
}
</script>

<style scoped>
.field {
  margin-bottom: 24px;
}
</style>
