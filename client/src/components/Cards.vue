<template>
    <div>
        <b-card
        border-variant="primary"
        :header="card.front"
        header-bg-variant="primary"
        header-text-variant="white"
      >
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
