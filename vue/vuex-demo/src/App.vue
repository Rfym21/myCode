<template>
  <h1>
    {{ count }}
    <AppHeader />
    <button type="button" @click="increment">点击渡劫飞升</button>
  </h1>
</template>

<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'
import AppHeader from './components/AppHeader.vue'

const store = useStore() // hooks 编程

const count = computed(() => store.state.count)

const increment = () => {
  // store.commit('increment')
  store.dispatch('increment')
}
</script>

<style lang="css" scoped></style>