<template>
  <div>
    <h1>Event Listing</h1>
    <EventCard />
    <router-link :to="{ name: 'event-show', params: { id: '1' } }"
      >First Event #{{ id }}</router-link
    >
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'
export default {
  props: ['id'],
  components: {
    EventCard
  }
}
</script>
