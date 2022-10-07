<template>
  <router-link
    :to="{ name: 'collection', params: { id: collection._id } }"
    class="box"
    >{{ collection.name }}</router-link
  >
</template>
<script>
export default {
  name: 'Collection',
  props: ['collection'],
  components: {}
}
</script>
<style scoped>
.box, .box:hover{
  float: left;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  border-radius: 8px;
  transition: .4s;
  text-decoration: none;
  color: var(--black);
  text-transform: capitalize;
}

.box:hover{
  box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.2);
}

</style>
