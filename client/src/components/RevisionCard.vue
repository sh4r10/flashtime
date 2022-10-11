/* eslint-disable vue/no-mutating-props */ /* eslint-disable
vue/no-mutating-props */
<template>
  <div class="card-container">
    <div
      class="card"
      @click="cardFlipped = !cardFlipped"
      v-bind:class="{ flipped: cardFlipped }"
    >
      <div class="card-face front" v-if="!cardFlipped">{{ card.front }}</div>
      <div class="card-face back" v-else>{{ card.back }}</div>
    </div>
    <div
      v-show="cardFlipped"
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
</template>
<script>
import { Api } from '../Api'

export default {
  name: 'CardRevision',
  props: ['card'],
  data() {
    return {
      cardFlipped: false
    }
  },
  methods: {
    async handleClick(e) {
      try {
        await Api.patch(`/cards/${this.card._id}/revise`, {
          grade: e.target.value
        })
        this.$emit('nextCard')
        this.cardFlipped = false
      } catch (err) {
        console.error(err)
      }
    }
  }
}
</script>
<style scoped>
.card-container {
  perspective: 1000px;
  border-radius: 4px;
  margin-top: 2rem;
  max-width: 600px;
  width: 100%;
}
.card {
  transform-style: preserve-3d;
  transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  cursor: pointer;
  backface-visibility: hidden;
  border: none;
}

.card-face {
  background: #fff;
  width: 100%;
  height: 100%;
  line-height: 260px;
  color: black;
  text-align: center;
  font-size: 40px;
  backface-visibility: hidden;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  border-radius: 6px;
  border: none;
}

.card-face.back {
  transform: rotateY(180deg);
}

.flipped {
  transform: rotateY(180deg);
  -moz-transform: rotateY(180deg);
}

.btn-group {
  margin-top: 1.5rem;
}
</style>
