<template>
  <div class="note-list">
    <ul>

      <li v-for="(item, i) of noteList" :key="i" v-if="noteList.length" @click="goNoteDetail(item)">
        <div class="img"><img :src="item.head_img" alt=""></div>
        <div class="time">{{ item.m_time }}</div>
        <div class="title">{{ item.title }}</div>
      </li>

    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from '../api/index.js'

const route = useRoute()
const router = useRouter()
const { title } = route.query

const noteList = ref([])

onMounted(async () => {
  // 发送请求
  const res = await axios.get('/findNoteListByType', {
    params: {
      note_type: title
    }
  })
  res.code === 800 && (noteList.value = res.data)
})

const goNoteDetail = (item) => {
  router.push({ name: 'Detail', params: { id: item.id }, query: { id: item.id, title: item.title } })
}

</script>

<style lang="less" scoped>
.note-list {
  width: 100%;
  padding: 1rem 0.667rem 0;
  box-sizing: border-box;

  ul {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 50px;
    grid-row-gap: 30px;

    li {
      font-size: 0.37rem;

      img {
        width: 100%;
        height: 4rem;
        border-radius: 0.27rem;

        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>