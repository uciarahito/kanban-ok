<template lang="html">

</template>

<script>

export default {
  data() {
    return {
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
          this.$emit('pushTasks', payload)
          // window.location = '/'
          // this.$db.ref('tasks').push(payload, () => {
          //   this.formNewTask.point = 0
          //   this.$refs[formName].resetFields();
          //   // this.$router.push('/')
          //   window.location = '/'
          // })
        } else {
          console.log('error add new todo!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style lang="css">
</style>
