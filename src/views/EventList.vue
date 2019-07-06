<template>
  <div>
    <h1>Event List</h1>
    <router-link :to="{ name: 'event-show', params: { id: '1' } }"
      >First Event #{{ id }}</router-link
    >
  </div>
</template>

<script>
export default {
  props: ['id']
}
</script>
