<template>
  <!-- <b-row>
      <b-col sm="12">
        <div class="card">
          <b-card class="bg-primary mb-0" style="border-radius: 20px 20px 0px 0px">
            <div class="d-flex align-items-center justify-content-between flex-wrap">
              <div class="d-flex align-items-center flex-wrap">
                <b-row>
                  <b-col xl="6" lg="8" md="8" sm="6">
                    <b-card-title>
                      <span class="text-white" style="font-weight: bold">RESPONDEN SURVEY ({{ surveyCount }})</span>
                    </b-card-title>
                  </b-col>
                  <b-col xl="2" lg="4" md="12" sm="12" class="mb-2">
                    <b-form-input type="date" v-model="inputDateStart"></b-form-input>
                  </b-col>
                  <b-col xl="2" lg="4" md="12" sm="12" class="mb-2">
                    <b-form-input type="date" v-model="inputDateEnd"></b-form-input>
                  </b-col>
                  <b-col xl="2" lg="4" md="12" sm="12" class="d-flex align-items-center justify-content-end mb-2">
                    <button class="btn btn-warning btn-md" type="button" @click="exportCSV" style="margin-left: 10px; font-weight: bold; width: 100%">EXPORT CSV</button>
                  </b-col>
                  <b-col xl="12" lg="12" md="12" sm="12" class="mt-3">
                    <input type="text" class="form-control border-0" placeholder="Pencarian (Nama / No HP / Wilayah)" v-model="searchQuery" />
                  </b-col>
                </b-row>
              </div>
            </div>
          </b-card> -->
  <b-row>
    <b-col xl="12" class="bg-transparent">
      <div class="card bg-soft-light">
        <b-card-header class="bg-primary text-light pb-4">
          <div class="header-title">
            <b-row>
              <b-col xl="6" lg="8" md="7" sm="7">
                <h4 style="font-weight: bold; color: white">RESPONDEN SURVEY ({{ surveyCount }})</h4>
              </b-col>
              <b-col xl="2" lg="4" md="12" sm="12" class="mb-2">
                <b-form-input type="date" v-model="inputDateStart"></b-form-input>
              </b-col>
              <b-col xl="2" lg="4" md="12" sm="12" class="mb-2">
                <b-form-input type="date" v-model="inputDateEnd"></b-form-input>
              </b-col>
              <b-col xl="2" lg="4" md="5" sm="5" class="d-flex justify-content-end custom-export">
                <button class="btn btn-warning btn-md" type="button" @click="exportCSV" style="margin-left: 10px; font-weight: bold; width: 100%; height: 90%">EXPORT CSV</button>
              </b-col>
              <b-col xl="12" lg="12" md="12" sm="12" class="mt-3">
                <input type="text" class="form-control border-0" placeholder="Pencarian (Nama / Status Kesehatan / Wilayah)" v-model="searchQuery" />
              </b-col>
            </b-row>
          </div>
        </b-card-header>

        <div class="card-body px-0 pt-0">
          <div class="table-responsive">
            <table id="user-list-table" class="table table-hover table-bordered mb-0" role="grid" data-toggle="data-table">
              <thead>
                <tr class="bg-secondary text-white">
                  <th class="text-center" style="font-weight: bolder">NO</th>
                  <!-- <th class="text-center" style="font-weight: bolder">JENIS</th> -->
                  <th style="font-weight: bolder">NAMA</th>
                  <th style="font-weight: bolder">TINGGI & BERAT</th>
                  <th style="font-weight: bolder">ALAMAT</th>
                  <th class="text-center" style="font-weight: bolder">TANGGAL</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in filteredSurveyData" :key="index">
                  <td class="text-center bg-soft-secondary">
                    {{ (currentPage - 1) * itemsPerPage + index + 1 }}
                  </td>
                  <!-- <td class="text-center" style="text-transform: uppercase">
                      <small class="bg-primary text-white rounded px-2 py-1" v-if="item.master.title === 'survey nasional'"> {{ item.master.title }} </small>
                      <small class="bg-warning text-white rounded px-2 py-1" v-if="item.master.title === 'survey jogja'"> {{ item.master.title }} </small>
                      <small class="bg-secondary text-white rounded px-2 py-1" v-if="item.master.title === 'survey papua'"> {{ item.master.title }} </small>
                    </td> -->
                  <td style="text-transform: capitalize">
                    {{ item.fullname }}
                    <small>
                      (<strong>{{ item.age }} bulan</strong>)
                    </small>
                    <br />
                    <small>
                      <span class="font-style: italic;">{{ formatBirthdate(item.birthdate) }}</span> 
                      (<strong>{{ item.age_in_year }} th</strong>)
                    </small>
                  </td>
                  <td style="text-transform: uppercase">
                    {{ item.height }} cm - {{ item.weight }} kg
                    <br />
                    <small>
                      <strong>
                        <span :class="['badge', 'p-1', badgeHealth(item.health_status)]">{{ item.health_status }}</span>
                      </strong>
                    </small>
                  </td>
                  <td>
                    <strong>{{ item?.province?.name }}</strong> <br />
                    <a :href="linkToCity(item.city?.name)" target="_blank"> {{ item?.city?.name ? item.city.name + ', ' : '' }} </a>
                    <a :href="linkToDistrict(item.district?.name)" target="_blank"> {{ item?.district?.name ? item.district.name + ', ' : '' }} </a>
                    {{ item?.village?.name ? item.village.name + ', ' : '' }}
                    <span style="text-transform: uppercase">{{ item.additional_data }}</span>
                  </td>
                  <td class="text-center">{{ formatDateTime(item.created_at) }}</td>
                </tr>
              </tbody>
            </table>

            <div class="pagination-container p-3 bg-secondary" style="border-radius: 0px 0px 20px 20px">
              <!-- Previous button -->
              <button @click="currentPage -= 1" :disabled="currentPage === 1" class="prev-next-button"><span>&#9665;</span> Previous</button>

              <!-- Numbered page buttons -->
              <!-- <button v-for="page in totalPages" :key="page" @click="currentPage = page" :disabled="currentPage === page" :class="{ 'pagination-button': true, active: currentPage === page }">
                  {{ page }}
                </button> -->

              <!-- Next button -->
              <button @click="currentPage += 1" :disabled="currentPage === totalPages" class="prev-next-button">Next <span>&#9655;</span></button>
            </div>
          </div>
        </div>
      </div>
    </b-col>
  </b-row>
</template>

<script>
// import TableWidget from '@/components/_admin/masterTable/TableWidget.vue'
import axios from 'axios'
import Swal from 'sweetalert2'

import '@/assets/custom-vue/css/pagination.css'

export default {
  data() {
    // Function to format date as YYYY-MM-DD
    const formatDate = (date) => {
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      return `${year}-${month}-${day}`
    }

    // Get the current date
    const currentDate = new Date()

    // Calculate the date for a week ago
    const weekAgoDate = new Date(currentDate)
    weekAgoDate.setDate(weekAgoDate.getDate() - 7)

    return {
      searchQuery: '',
      currentPage: 1,
      itemsPerPage: 10,

      respondenData: [],
      surveyCount: 0,
      questionAnswerData: [],
      selectedRespondenAnswers: [],

      inputDateStart: formatDate(weekAgoDate),
      inputDateEnd: formatDate(currentDate)
    }
  },

  computed: {
    filteredSurveyData() {
      this.currentPage = 1

      const query = this.searchQuery.toLowerCase()
      return this.respondenData.filter((item) => (item.fullname && item.fullname.toLowerCase().includes(query)) || (item.health_status && item.health_status.toLowerCase().includes(query)) || (item.province?.name && item.province.name.toLowerCase().includes(query)) || (item.city?.name && item.city.name.toLowerCase().includes(query)) || (item.district?.name && item.district.name.toLowerCase().includes(query)) || (item.village?.name && item.village.name.toLowerCase().includes(query)))
    },

    paginatedSurveyData() {
      const startIdx = (this.currentPage - 1) * this.itemsPerPage
      const endIdx = startIdx + this.itemsPerPage

      return this.filteredSurveyData.slice(startIdx, endIdx)
    },

    totalPages() {
      return Math.ceil(this.filteredSurveyData.length / this.itemsPerPage)
    }
  },

  mounted() {
    this.fetchRespondenSurvey()
  },

  methods: {
    async fetchRespondenSurvey() {
      try {
        const config = { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } }
        const response = await axios.get('/api/stunting-reports?page=1&limit=10', config)

        this.respondenData = response.data.data

        console.log(this.respondenData)

        this.surveyCount = this.respondenData.length
        console.log('💚 DAFTAR ANAK', this.respondenData)
      } catch (error) {
        console.error('Error fetching data:', error)
        return []
      }
    },

    formatDateTime(dateTimeString) {
      const options = {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
        // omit second field
      }

      const dateTime = new Date(dateTimeString)
      const formattedDateTime = dateTime.toLocaleString('en-US', options)

      return formattedDateTime
    },

    formatDateTime2(dateTimeString) {
      const options = {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit'
      }

      const dateTime = new Date(dateTimeString)
      const formattedDateTime = dateTime.toLocaleString('en-US', options)

      return formattedDateTime
    },

    showSurveyDetails(item) {
      console.log(item)
      this.selectedRespondenAnswers = item
    },

    // EXPORT
    async exportCSV() {
      if (!this.inputDateStart || !this.inputDateEnd) {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer
            toast.onmouseleave = Swal.resumeTimer
          }
        })
        Toast.fire({
          icon: 'warning',
          title: 'Tolong input rentang tanggal'
        })
        return
      }

      // Filter respondenData based on date range
      const filteredData = this.respondenData.filter((item) => {
        const FormatingCreatedAt = this.formatDateTime2(item.created_at)
        const createdAt = new Date(FormatingCreatedAt).getTime()
        const startDate = new Date(this.inputDateStart).getTime()
        const endDate = new Date(this.inputDateEnd).getTime()

        console.log(createdAt, startDate, endDate)
        return createdAt >= startDate && createdAt <= endDate
      })

      console.log(filteredData)

      // Check if filteredData is empty
      if (filteredData.length === 0) {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer
            toast.onmouseleave = Swal.resumeTimer
          }
        })
        Toast.fire({
          icon: 'warning',
          title: 'Tidak ada data'
        })
        return
      }

      // Generate CSV content (replace this with your CSV generation logic)
      const csvContent = this.generateCSVContent(filteredData)

      // // Create a Blob with the CSV content
      const blob = new Blob([csvContent], { type: 'text/csv' })

      const formatDate = (date) => {
        const options = { day: 'numeric', month: '2-digit', year: 'numeric' }
        return new Date(date).toLocaleDateString('en-US', options).replace(/\//g, '-')
      }

      const formattedStartDate = formatDate(this.inputDateStart)
      const formattedEndDate = formatDate(this.inputDateEnd)
      const fileName = `RESPONDEN_SURVEY_${formattedStartDate}_to_${formattedEndDate}.csv`

      // Create a link element and trigger a download
      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = fileName
      link.click()
    },

    generateCSVContent(data) {
      const header = `id, nama responden, nomor responden, usia responden, provinsi, kota, kecamatan, kelurahan, rt, rw, tanggal dibuat, nama relawan, email relawan, no hp relawan, s1, s2, s3, s4\n`

      const rows = data.map((item) => {
        const cleanedName = item.name ? item.name.replace(/,/g, '') : ''

        const answers = Array.from({ length: 4 }, (_, index) => {
          const questionId = index + 23
          const answerObj = item.responden_answers.find((answer) => answer.question_id === questionId)
          return answerObj ? answerObj.answer_value : ''
        })

        return `${item.id}, ${cleanedName}, ${item.phone}, ${item.age}, ${item.province?.name || ''}, ${item.city?.name || ''}, ${item.district?.name || ''}, ${item.village?.name || ''}, ${item.rt || ''}, ${item.rw || ''}, ${item.created_at || ''}, ${item.relawan?.name || ''}, ${item.relawan?.email || ''}, ${item.relawan?.phone || ''}, ${answers.join(', ')}\n`
      })
      return header + rows.join('')
    },

    linkToCity(city) {
      return 'https://www.google.com/search?q=' + city + '&rlz=1C1CHBF_enID1046ID1046&sourceid=chrome&ie=UTF-8#eim=CAE'
    },

    linkToDistrict(district) {
      return 'https://www.google.com/maps/place/KECAMATAN ' + district
    },

    badgeHealth(status) {
      if (status === 'sehat') {
        return 'bg-primary'
      } else if (status === 'stunting') {
        return 'bg-warning'
      } else if (status === 'gizi buruk') {
        return 'bg-danger'
      } else if (status === 'kurus') {
        return 'bg-info'
      } else {
        return '' // Default color if status is not recognized
      }
    },

    formatBirthdate(dateString) {
      if (!dateString) return '' // Return empty string if dateString is undefined or null
      const date = new Date(dateString)
      const day = date.getDate().toString().padStart(2, '0') // Ensure two digits
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      const month = months[date.getMonth()] // Get month name from array
      const year = date.getFullYear()
      return `${day}-${month}-${year}` // Format to 01-May-2024 style
    }
  }
}
</script>

<style scoped>
th {
  font-weight: bold;
}

th,
td {
  padding: 15px; /* Adjust the padding value as needed */
}

.modal-custom {
  min-width: 1500px;
}

@media (max-width: 1500px) {
  .modal-custom {
    min-width: 1000px;
  }
}

@media (max-width: 1000px) {
  .modal-custom {
    min-width: 800px;
  }
}

@media (max-width: 800px) {
  .modal-custom {
    min-width: 500px;
  }
}

@media (max-width: 600px) {
  .modal-custom {
    min-width: 300px;
  }
}
</style>
