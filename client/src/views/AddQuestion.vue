<template>
  <b-container>
    <p class="h2 mt-5 mb-4">Your Question</p>
    <b-form @submit.prevent="postQuestion()">
      <b-form-group>
        <b-form-input v-model="title" placeholder="Question Title" required></b-form-input>
      </b-form-group>
      <b-row>
        <b-col>
          <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
        </b-col>
      </b-row>
      <b-button type="submit" class="mr-2 mt-3" size="" variant="success">Submit</b-button>
    </b-form>
  </b-container>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import axios from '../api/server'

export default {
  data () {
    return {
      editor: ClassicEditor,
      editorData: '',
      editorConfig: {
        placeholder: 'Write your answer here...'
      },
      title: ''
    }
  },
  methods: {
    postQuestion () {
      axios({
        method: 'post',
        url: '/questions',
        data: {
          title: this.title,
          description: this.editorData
        },
        headers: {
          Authorization: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          console.log(data)
          this.$router.push({ path: `/question/${data._id}` })
        })
        .catch(err => {
          console.log(err.response, 'masuk')
        })
    }
  }
}
</script>

<style>

</style>
