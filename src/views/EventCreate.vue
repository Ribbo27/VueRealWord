<template>
  <div>
    <h1>Ciao {{ user.name }}, crea un evento</h1>
    <p>Creato da: {{ user.name }}</p>
    <p>Evento JSON: {{ getEventById(2) }}</p>
    <ul>
      <li v-for="cat in categories" :key="cat">{{ cat }}</li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['getEventById']),
    ...mapState(['user', 'categories'])
  }
}
</script>

<style scoped></style>
