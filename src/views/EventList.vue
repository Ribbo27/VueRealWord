<template>
  <div>
    <h1>Eventi</h1>
    <EventCard />
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
