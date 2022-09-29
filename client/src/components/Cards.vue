<template>
    <div>
        <b-card>
            {{card.front}}
        <b-card-text>{{card.back}}</b-card-text>
      </b-card>
    </div>
</template>
<script>
export default {
  props: ['card']
}
</script>
<style scoped>
</style>
