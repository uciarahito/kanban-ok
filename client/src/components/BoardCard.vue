<template lang="html">
  <el-card :body-style="{ padding: '10px' }" style="height:auto;">
    <div slot="header" class="clearfix">
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="12"><span><b>{{task.title}}</b></span></el-col>
        <el-col :span="12" style="text-align:right;"><span><b>User: {{task.username}}</b></span></el-col>
      </el-row>
    </div>
    <div class="text item">
      <span>Point: {{task.point}}</span>
      <p>Assigned To: {{task.assigned_to}}</p>
      <el-button size="small" icon="view" @click="viewDetail" style="background-color:mediumturquoise;color:#fff;">Show Detail</el-button>
    </div>

    <el-dialog v-model="displayVisibleDetail">
      <el-card :body-style="{ padding: '10px' }" style="height:auto;">
        <div slot="header" class="clearfix">
          <span><b>Detail Task: {{task.title}}</b></span>
        </div>
        <div class="text item">
          <span><b>Task Description:</b></span><br>
          <span>{{task.desc}}</span><br>
          <span><b>Point:</b></span><br>
          <span>{{task.point}}</span><br>
          <span><b>Status:</b></span><br>
          <span>{{currentStatus}}</span>
        </div>
        <hr>
        <el-row type="flex" class="row-bg" justify="space-between" style="padding:0px;margin:0px;" v-if="userActive">

          <el-col :span="6">
            <el-popover
              ref="popover5"
              placement="top"
              width="160"
              v-model="visiblePrevious">
              <p>Mark this task as {{previousStatus}} ?</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="closeDetailTaskDialogPrev">No, cancel!</el-button>
                <el-button type="primary" size="mini" @click="previousTask">Yes, I'm sure!</el-button>
              </div>
            </el-popover>
            <el-button v-popover:popover5 icon="arrow-left" size="small" v-if="task.status != 0" style="background-color:gold;color:#fff;">{{previousStatus}}</el-button>
          </el-col>

          <el-col :span="6" style="text-align:center;">
            <el-popover
              ref="popover5"
              placement="top"
              width="160"
              v-model="visibleDelete">
              <p>Are you sure to delete this?</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="closeDetailTaskDialogDelete">No, cancel!</el-button>
                <el-button type="primary" size="mini" @click="deleteTask">Yes, I'm sure!</el-button>
              </div>
            </el-popover>
            <el-button v-popover:popover5 icon="delete" type="danger" size="small">Delete</el-button>
          </el-col>

          <el-col :span="6" style="text-align:right;">
            <el-popover
              ref="popover5"
              placement="top"
              width="160"
              v-model="visibleNext">
              <p>Mark this task as {{nextStatus}}</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="closeDetailTaskDialogNext">No, cancel!</el-button>
                <el-button type="primary" size="mini" @click="nextTask">Yes, I'm sure!</el-button>
              </div>
            </el-popover>
            <el-button v-popover:popover5 size="small" v-if="task.status != 3" style="background-color:lawngreen;color:#fff;">Next &nbsp;<i class="el-icon-arrow-right"></i></el-button>
          </el-col>

        </el-row>
      </el-card>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  props: ['task'],
  data() {
    return {
      displayVisibleDetail: false,
      visibleDelete: false,
      visiblePrevious: false,
      visibleNext: false,
      userActive: false
    }
  },
  methods: {
    viewDetail() {
      this.displayVisibleDetail = true
    },
    previousTask() {
      const newStatus = this.task.status - 1
      this.$db.ref('tasks').child(this.task['.key'])
      .child('status').set(newStatus)
      this.closeDetailTaskDialogPrev()
    },
    deleteTask() {
      this.$db.ref('tasks').child(this.task['.key']).remove()
      this.closeDetailTaskDialogDelete()
    },
    nextTask() {
      const newStatus = this.task.status + 1
      this.$db.ref('tasks').child(this.task['.key'])
      .child('status').set(newStatus)
      this.closeDetailTaskDialogNext()
    },
    closeDetailTaskDialogPrev() {
      this.visiblePrevious = false
      this.displayVisibleDetail = false
      this.clearCurrentTask()
    },
    closeDetailTaskDialogDelete() {
      this.visibleDelete = false
      this.displayVisibleDetail = false
      this.clearCurrentTask()
    },
    closeDetailTaskDialogNext() {
      this.visibleNext = false
      this.displayVisibleDetail = false
      this.clearCurrentTask()
    },
    clearCurrentTask() {
      this.$store.state.currentTask = {
        title: null,
        desc: null,
        status: null,
        point: null,
        assigned_to: null
      }
    }
  },
  computed: {
    previousStatus() {
      console.log('cek status prev: '+this.task.status);
      switch (this.task.status) {
        case 1:
          return 'Back Log'
        case 2:
          return 'To Do'
        case 3:
          return 'Doing'
        default:
          return 'Back Log'
      }
    },
    currentStatus() {
      switch (this.task.status) {
        case 0:
          return 'Back Log'
        case 1:
          return 'To Do'
        case 2:
          return 'Doing'
        case 3:
          return 'Done'
        default:
          return 'Back Log'
      }
    },
    nextStatus() {
      switch (this.task.status) {
        case 0:
          return 'To Do'
        case 1:
          return 'Doing'
        case 2:
          return 'Done'
        default:
          return 'Done'
      }
    }
  },
  created() {
    console.log('cek type: ', typeof this.task.status);
    if (this.task.idUser === window.localStorage.getItem('id')) {
      this.userActive = true
    }
  }
}
</script>

<style lang="css">
  .el-card {
    margin-bottom: 10px;
  }

  .el-card__header {
    padding: 10px 10px;
  }
</style>
