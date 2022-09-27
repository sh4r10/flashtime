<template>
    <div>
        <input type="text" placeholder="Search for deck and decks collections..." >
    </div>
</template>
<script>
export default {
  name: 'Searchbar'
}
</script>
<style scoped>
input {
  display: inline-block;
  width: 75%;
  padding: 15px;
  color:#313131;
  font-size:20px;
  appearance: none;
  margin-top: 20%;
  border:none;
  background: none;
  box-shadow: 0px 0px 16px rgba(0,0,0,0.25);
  background-color: rgba(225,225,225,0.5);
  border-radius: 0px 16px 0px 16px;
  transition: 0.4s;
}
input {
  box-shadow: 0px 0px 16px rgba(234, 6, 6, 0.25); ;
  background-color: rgba(225,225,225,0.75);
  border-radius: 16px 0px 16px 0px;
}
</style>
