<template>
    <div class="box">{{collection.name}}</div>
</template>
<script>
export default {
  name: 'Deckbox',
  props: ['collection']
}
</script>
<style scoped>
.box{
  margin-left: 11%;
  width:200px ;
  height:100px ;
  border:none;
  background: transparent;
  position: absolute;
  box-shadow: 0px 0px 16px rgba(234, 6, 6, 0.25); ;
  background-color: rgba(225,225,225,0.75);
}
</style>
