/* eslint-disable vue/no-mutating-props */ /* eslint-disable
vue/no-mutating-props */
<template>
  <div>
    <div class="container">
      <div
        class="card"
        @click="
          cardFlipped === false ? (cardFlipped = true) : (cardFlipped = false)
        "
        v-bind:class="{ flipped: cardFlipped === true }"
      >
        <div class="card__face card__face--front">{{ card.front }}</div>
        <div class="card__face card__face--back">{{ card.back }}</div>
      </div>
      <div
        class="btn-toolbar"
        role="toolbar"
        aria-label="Toolbar with button groups"
      ></div>
      <div
        v-if="cardFlipped"
        class="btn-group"
        role="group"
        aria-label="First group"
      >
        <button @click="handleClick" value="0" class="btn btn-secondary">
          0
        </button>
        <button @click="handleClick" value="1" class="btn btn-secondary">
          1
        </button>
        <button @click="handleClick" value="2" class="btn btn-secondary">
          2
        </button>
        <button @click="handleClick" value="3" class="btn btn-secondary">
          3
        </button>
        <button @click="handleClick" value="4" class="btn btn-secondary">
          4
        </button>
        <button @click="handleClick" value="5" class="btn btn-secondary">
          5
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Card',
  props: ['card'],
  data() {
    return {
      cardFlipped: false
    }
  },
  methods: {
    handleClick() {
      this.$emit('nextCard')
      this.cardFlipped = false
    }
  }
}
</script>
<style scoped>
.container {
  width: 800px;
  height: 900px;
  position: relative;
  perspective: 1000px;
  border-radius: 4px;
}
.card {
  widows: 50%;
  height: 20%;
  width: 50%;
  position: relative;
  display: inline-block;
  transform-style: preserve-3d;
  transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border-radius: 6px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  cursor: pointer;
}

.card__face {
  position: absolute;
  width: 100%;
  height: 100%;
  line-height: 260px;
  color: black;
  text-align: center;
  font-size: 40px;
  backface-visibility: hidden;
}

.card__face--back {
  transform: rotateY(180deg);
}

.flipped {
  transform: rotateY(180deg);
}
</style>
