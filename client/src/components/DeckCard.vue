<template>
  <div>
    <router-link :to="{name: 'decks', params:{id:deck._id}}" class="box">{{ deck.name }}</router-link>
  </div>
</template>
<script>
export default {
  name: 'DeckCard',
  props: ['deck']
}
</script>
<style scoped>
.box {
  margin-left: 11%;
  width: 200px;
  height: 100px;
  background: transparent;
  box-shadow: 0px 0px 16px rgba(168, 83, 83, 0.25);
  background-color: rgba(225, 225, 225, 0.75);
}
</style>
