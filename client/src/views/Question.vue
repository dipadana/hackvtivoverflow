<template>
  <b-container class="w-75 border-left">
    <!-- Question Section -->
    <b-row class="p-3">
      <QuestionSection :data="questionData" @updateResponse="fetchQuestionDetail"/>
    </b-row>

    <!-- Answer Section -->
      <h4 class="p-3 mt-3 mb-0">Answer :</h4>

      <b-row v-for="(dataAnswer,index) in questionData.AnswerId" :key="index" class="border-top p-3">

        <AnswerSection @updateResponse="fetchQuestionDetail" :data="dataAnswer"/>

      </b-row>

    <!-- Your Answer Section -->
    <b-row class="border-top p-3">
      <b-col class="my-4">
        <h4 class="mb-4">Your Answer :</h4>
        <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
        <b-button @click="addAnswer()" class="mr-2 mb-5 mt-3" size="" variant="success">Submit</b-button>
      </b-col>
    </b-row>

  </b-container>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import QuestionSection from '@/components/QuestionSection.vue'
import AnswerSection from '@/components/AnswerSection.vue'
import axios from '../api/server'
import Swal from 'sweetalert2'

export default {
  components: {
    QuestionSection,
    AnswerSection
  },
  data () {
    return {
      editor: ClassicEditor,
      editorData: '',
      editorConfig: {
        placeholder: 'Write your answer here...'
      },
      questionData: {}
    }
  },
  methods: {
    addAnswer () {
      axios({
        method: 'post',
        url: '/answers',
        data: {
          QuestionId: this.$route.params.id,
          description: this.editorData
        },
        headers: {
          Authorization: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          console.log(data, '<<<<<<<<<<')
          this.fetchQuestionDetail()
          this.editorData = ''
        })
        .catch(err => {
          console.log(err.response, 'masuk')
          Swal.fire(
            'Wait!',
            'You must be logged in to answer a question!',
            'error'
          )
        })
    },
    fetchQuestionDetail () {
      axios({
        method: 'get',
        url: `/questions/${this.$route.params.id}`,
        headers: {
          Authorization: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          console.log(data, '<<<<<<<<<<<<<<<')
          this.questionData = data
        })
        .catch(err => { console.log(err.response) })
    }
  },
  created () {
    this.fetchQuestionDetail()
  }
}
</script>

<style scope>
.ck-content { height:200px;}
</style>
