<template lang="html">
  <div id="content">

    <el-row type="flex" class="row-bg" justify="space-between">
      <el-col :span="3" :offset="21">
        <el-button type="info" @click="newTaskDialog">New Tasks</el-button>
      </el-col>
    </el-row>

    <el-dialog title="New Task" v-model="dialogFormVisibleNewTask">
      <el-form :model="formNewTask" :rules="rules" ref="formNewTask" label-width="120px" class="demo-ruleForm" style="padding:0px 20px 0px 5px;margin-top:10px;">
        <el-form-item label="Title" prop="title">
          <el-input v-model="formNewTask.title"></el-input>
        </el-form-item>
        <el-form-item label="Description" prop="desc">
          <el-input type="textarea" v-model="formNewTask.desc"></el-input>
        </el-form-item>
        <el-form-item label="Point">
          <el-input type="number" v-model="formNewTask.point" :min="0"></el-input>
        </el-form-item>
        <el-form-item label="Assigned To" prop="assigned_to">
          <el-input v-model="formNewTask.assigned_to"></el-input>
        </el-form-item>
        <el-form-item style="margin-left:0px;">
          <el-button type="primary" @click="submitForm('formNewTask')">Create</el-button>
          <el-button @click="resetForm('formNewTask')">Reset</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-row :gutter="20" type="flex" class="row-bg" justify="space-around">
      <el-col :span="6">
        <BoardSection :tasks="backlog" :titleCard="this.$store.state.titleName[0]"></BoardSection>
      </el-col>
      <el-col :span="6">
        <BoardSection :tasks="todo" :titleCard="this.$store.state.titleName[1]"></BoardSection>
      </el-col>
      <el-col :span="6">
        <BoardSection :tasks="doing" :titleCard="this.$store.state.titleName[2]"></BoardSection>
      </el-col>
      <el-col :span="6">
        <BoardSection :tasks="done" :titleCard="this.$store.state.titleName[3]"></BoardSection>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import BoardSection from './BoardSection'

export default {
  components: {
    BoardSection
  },
  firebase() {
    return {
      tasks: this.$db.ref('tasks')
    }
  },
  data() {
    return {
      dialogFormVisibleNewTask: false,
      formNewTask: {
        title: '',
        desc: '',
        status: 0,
        point: 0,
        assigned_to: ''
      },
      rules: {
        title: [
          { required: true, message: 'Please input the title', trigger: 'blur' }
        ],
        desc: [
          { required: true, message: 'Please input the content', trigger: 'blur' }
        ],
        assigned_to: [
          { required: true, message: 'Please input the name', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    newTaskDialog(){
      this.dialogFormVisibleNewTask = true
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let payload = {
            idUser: window.localStorage.getItem('id'),
            title: this.formNewTask.title,
            desc: this.formNewTask.desc,
            status: this.formNewTask.status,
            point: this.formNewTask.point,
            assigned_to: this.formNewTask.assigned_to
          }
          this.$db.ref('tasks').push(payload)
          this.dialogFormVisibleNewTask = false
          this.$router.push('/')
        } else {
          console.log('error add new todo!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  computed: {
    backlog() {
      return this.tasks.filter(task => task.status === 0)
    },
    todo() {
      return this.tasks.filter(task => task.status === 1)
    },
    doing() {
      return this.tasks.filter(task => task.status === 2)
    },
    done() {
      return this.tasks.filter(task => task.status === 3)
    }
  }
}
</script>

<style lang="css">
  #content {
    margin: auto;
    width: 95%;
  }

  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
