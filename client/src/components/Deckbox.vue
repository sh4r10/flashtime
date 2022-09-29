<template>
  <router-link
    :to="{ name: 'collection', params: { id: collection._id } }"
    class="box"
    >{{ collection.name }}</router-link
  >
</template>
<script>
export default {
  name: 'Deckbox',
  props: ['collection'],
  components: {}
}
</script>
<style scoped>
.box {
  margin-left: 11%;
  width: 200px;
  height: 100px;
  border: none;
  background: transparent;
  box-shadow: 0px 0px 16px rgba(234, 6, 6, 0.25);
  background-color: rgba(225, 225, 225, 0.75);
  text-decoration: none;
}
</style>
