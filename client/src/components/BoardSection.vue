<template lang="html">
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>{{titleCard}}</span>
    </div>
    <BoardCard v-for="(task, index) in tasks" :key="index" :task="task"></BoardCard>
  </el-card>
</template>

<script>
import BoardCard from './BoardCard'

export default {
  components: {
    BoardCard
  },
  props: ['tasks', 'titleCard']
}
</script>

<style lang="css">
</style>
