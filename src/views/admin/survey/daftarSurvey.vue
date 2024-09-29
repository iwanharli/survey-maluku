<template>
  <b-row>
    <b-col xl="6" lg="6" md="12">
      <div class="card">
        <b-card-header class="bg-primary text-light pb-4">
          <div class="header-title">
            <b-row>
              <b-card-title>
                <span style="font-weight: bold; color: white">DAFTAR SURVEY</span>
              </b-card-title>
            </b-row>
          </div>
        </b-card-header>
        <b-col class="bg-soft-light col-12" style="padding: 20px">
          <div v-for="(item, index) in surveyData" :key="index++">
            <a href="#" @click="showSurveyQuestion(item.id, item.title)">
              <b-card :class="{ 'bg-info': true, 'text-white': true, addCard: selectedSurvey === 1 }" :style="{ cursor: selectedSurvey === 1 ? 'not-allowed' : '' }">
                <b-row>
                  <b-col class="col-1">
                    <h6 :class="` text-white mb-0`" style="font-weight: bolder">{{ index }}</h6>
                  </b-col>
                  <b-col class="col-6">
                    <h6 :class="`text-white mb-0`" style="text-transform: uppercase; font-weight: bolder">{{ item.title }}</h6>
                  </b-col>
                  <b-col class="col-5">
                    <small :class="`text-white mb-0`">{{ formatUpdatedAt(item.updated_at) }}</small>
                  </b-col>
                  <b-col class="col-11 mt-4" offset="1">
                    <h6 :class="`text-white mb-0`" style="text-transform: capitalize">{{ item.description }}</h6>
                  </b-col>
                </b-row>
              </b-card>
            </a>
          </div>
        </b-col>
      </div>
    </b-col>

    <b-col xl="6" lg="6" md="12" sm="12">
      <b-card class="bg-secondary">
        <b-card-header class="bg-primary text-light pb-4" style="border-radius: 20px">
          <div class="header-title">
            <b-row>
              <b-card-title>
                <span style="font-weight: bold; color: white; text-transform: uppercase">SOAL {{ titleSurvey }} 🔐</span>
              </b-card-title>
            </b-row>
          </div>
        </b-card-header>
        <br />
        <div class="bg-white" style="border-radius: 20px">
          <div v-for="(item, index) in surveyQuestionData" :key="index++" style="padding: 20px">
            <div class="d-flex align-items-center justify-content-between">
              <b-row>
                <b-col class="col-1">
                  <h6 :class="`text-${variant} mb-0`" style="text-transform: capitalize; font-weight: bolder">{{ index }}</h6>
                </b-col>
                <b-col class="col-11">
                  <h6 :class="`text-${variant} mb-0`" style="text-transform: capitalize; font-weight: bolder">{{ item.question }}</h6>
                </b-col>
                <b-col class="col-11 mt-1 text-dark" offset="1">
                  <li v-for="answer in item.answers" :key="answer.id" style="list-style-type: none">{{ answer.option }}. {{ answer.answer }}</li>
                </b-col>
                <b-col class="col-11 text-dark mt-4" offset="1" style="border-bottom: 1px solid rgb(179, 179, 179)"> </b-col>
              </b-row>
            </div>
          </div>
        </div>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  data() {
    return {
      variant: 'dark',
      showQUestion: false,
      surveyData: [],
      surveyQuestionData: [],
      answers: [],

      titleSurvey: null,
      selectedSurvey: 0
    }
  },

  mounted() {
    this.fetchSurvey()
  },

  methods: {
    async fetchSurvey() {
      try {
        const config = { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } }
        const response = await axios.get('/api/survey/get_master_survey', config)

        this.surveyData = response.data.data
        // this.surveyData = this.surveyData.filter((item) => item.title === 'survey jogja')

        console.log('💚 SOAL SURVEY', this.surveyData)
      } catch (error) {
        console.error('Failed to fetch 💀:', error.message)
      }
    },

    async showSurveyQuestion(id, title) {
      this.selectedSurvey = 1

      try {
        const config = { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } }
        const response = await axios.get(`/api/survey/get_questions_answers/${id}`, config)

        this.surveyQuestionData = response.data.data
        this.showQUestion = !this.showQUestion

        this.titleSurvey = title

        console.log('Data Question ', id, ' retrieved successfully', this.surveyQuestionData)
      } catch (error) {
        console.error('Failed to fetch 💀:', error.message)
      }
    },

    formatUpdatedAt(updatedAt) {
      const dateObject = new Date(updatedAt)
      return dateObject.toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'UTC'
      })
    },

    async addCategory() {
      Swal.fire({
        title: 'Tambah Kategori',
        input: 'text',
        confirmButtonText: 'Simpan',
        showCancelButton: true,
        preConfirm: (inputValue) => {
          if (!inputValue) {
            Swal.showValidationMessage('Nama kategori harus diisi')
          } else {
            this.saveCategory(inputValue)
          }
        }
      })
    },

    async editCategory(id, name) {
      Swal.fire({
        title: 'Edit Kategori',
        input: 'text',
        inputValue: name,
        confirmButtonText: 'Simpan',
        showCancelButton: true,
        preConfirm: (inputValue) => {
          if (!inputValue) {
            Swal.showValidationMessage('Nama kategori harus diisi')
          } else {
            this.saveEditedCategory(id, inputValue)
          }
        }
      })
    },

    async deleteCategory(id) {
      const config = {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
      }

      await axios
        .delete('/api/categories/' + id, config)
        .then((response) => {
          console.log(response)

          if (response.data.message === 'Tidak bisa menghapus kategori ini karena dipakai di 3 issue.') {
            Swal.fire({
              title: 'Gagal!',
              text: 'Kategori digunakan oleh isu!',
              icon: 'error'
            })
          } else {
            console.log('Category deleted successfully:', response)

            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer
                toast.onmouseleave = Swal.resumeTimer
              }
            })
            Toast.fire({
              icon: 'success',
              title: 'Kategori berhasil dihapus'
            })

            this.fetchCategory()
          }
        })
        .catch((error) => {
          Swal.fire('Error', 'error')
          console.error('Failed to delete category:', error)
        })
    },

    async saveCategory(categoryName) {
      const config = {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
      }

      const cname = {
        name: categoryName
      }

      await axios
        .post('/api/categories', cname, config)
        .then((response) => {
          console.log('Category saved successfully:')

          Swal.fire({
            title: 'Berhasil menyimpan kategori!',
            icon: 'success',
            showConfirmButton: false,
            timer: 2000
          })

          this.fetchCategory()
        })
        .catch((error) => {
          Swal.fire('Error', 'Kategori sudah terdaftar sebelumnya', 'error')
          console.error('Failed to save category:', error)
        })
    },

    async saveEditedCategory(id, categoryName) {
      const config = {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
      }

      const cname = {
        name: categoryName,
        _method: 'PATCH'
      }

      await axios
        .post('/api/categories/' + id, cname, config)
        .then((response) => {
          console.log('Category updated successfully:')

          Swal.fire({
            title: 'Berhasil edit kategori!',
            icon: 'success',
            showConfirmButton: false,
            timer: 2000
          })

          this.fetchCategory()
        })
        .catch((error) => {
          Swal.fire('Error', 'Kategori sudah terdaftar sebelumnya', 'error')
          console.error('Failed to edit category:', error)
        })
    }
  },

  components: {}
}
</script>

<style lang="scss">
.dropdown-toggle-no-caret::after {
  content: unset;
  border: 0;
}
.ghost {
  opacity: 0.5;
}
.list-group-item {
  cursor: move;
}
.list-group-item i {
  cursor: pointer;
}

.addCard {
  background-color: rgba(0, 0, 0, 0.637) !important;
}
</style>
