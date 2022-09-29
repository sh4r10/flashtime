<template>
  <router-link :to="url">
    <p>
        {{ deck.name }}
        <b-badge variant="primary" pill v-if="deck.collection">{{ deck.collection }}</b-badge>
    </p>
    <div class="deck-info">
      <div>
        <p class="total-cards">{{ deck.totalCards }}</p>
        <p>cards</p>
      </div>
      <div>
        <p class="cards-due">{{ deck.cardsDue }}</p>
        <p>due</p>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'Deck',
  props: ['deck', 'url']
}
</script>

<style scoped>
    a, a:hover {
        background: #fff;
        color: #121212;
        width: 500px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 10px auto;
        padding: 5px 20px;
        text-decoration: none;
        border-radius: 5px;
        box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.05);
        transition: .2s;
    }

    a:hover{
        box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.1);
    }

    a .deck-info{
        display: flex;
    }

    a .deck-info div:last-child{
        margin-left: 20px;
    }

    a .deck-info p{
        margin: 0;
        color: #808080;
    }

    a .deck-info p.total-cards{
        font-size: 20px;
        color: #3399ff;
    }

    a .deck-info p.cards-due{
        font-size: 20px;
        color: #ff3300;
    }

</style>
