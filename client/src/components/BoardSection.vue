<template lang="html">
  <el-card :body-style="{ padding: '10px' }" style="height:auto;">
    <div slot="header" class="clearfix">
      <span><b>{{titleCard}}</b></span>
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
  .el-card__header {
    padding: 10px 10px;
  }
</style>
