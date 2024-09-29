<template>
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
                <input type="text" class="form-control border-0" placeholder="Pencarian (Jenis / Nama / No HP / Wilayah Penugasan)" v-model="searchQuery" />
              </b-col>
            </b-row>
          </div>
        </b-card-header>

        <div class="card-body px-0 pt-0">
          <div class="table-responsive">
            <table id="user-list-table" class="table table-hover table-bordered mb-0" role="grid" data-toggle="data-table">
              <thead>
                <tr class="bg-secondary text-white">
                  <th class="text-center" style="font-weight: bolder; width: 5px">NO</th>
                  <th style="font-weight: bolder">NAMA</th>
                  <th style="font-weight: bolder">WILAYAH PENUGASAN</th>
                  <th class="text-center" style="font-weight: bolder">TANGGAL</th>
                  <th style="width: 100px; font-weight: bolder"></th>
                </tr>
              </thead>
              <tbody v-if="respondenData.length">
                <tr v-for="(respondent, index) in respondenData" :key="index++">
                  <td class="text-center bg-soft-secondary">
                    {{ index }}
                  </td>
                  <td style="text-transform: uppercase">
                    {{ respondent.name }}
                    <small>
                      (<strong>{{ respondent.age }} </strong>)
                    </small>
                    <br />
                    <small>
                      <strong v-if="respondent.phone">📱 {{ respondent.phone }}</strong>
                      <strong v-else>📱 <span class="badge bg-info p-1"> NO HP KOSONG </span></strong>
                    </small>
                  </td>
                  <td>
                    <strong>{{ respondent?.province?.name }}</strong> <br />

                    <!-- City -->
                    <a :href="linkToCity(respondent.city?.name)" target="_blank">
                      <span v-if="respondent?.city?.name">{{ respondent.city.name + ', ' }}</span>
                      <span v-else class="badge bg-soft-danger text-danger p-1" style="margin-right: 5px">Kota Kosong</span>
                    </a>

                    <!-- District -->
                    <a :href="linkToDistrict(respondent.district?.name)" target="_blank">
                      <span v-if="respondent?.district?.name">{{ respondent.district.name + ', ' }}</span>
                      <span v-else class="badge bg-soft-danger text-danger p-1" style="margin-right: 5px">Kecamatan Kosong</span>
                    </a>

                    <!-- Village -->
                    <span v-if="respondent?.village?.name">{{ respondent.village.name + ', ' }}</span>
                    <span v-else class="badge bg-soft-danger text-danger p-1" style="margin-right: 5px">Kelurahan Kosong</span>

                    <!-- Additional Data -->
                    <span style="text-transform: uppercase">{{ respondent.additional_data }}</span> <br />

                    <!-- RT/RW -->
                    <small>RT {{ respondent?.rt }}/RW {{ respondent?.rw }}</small>
                  </td>

                  <td class="text-center">{{ formatDateTime(respondent.created_at) }}</td>
                  <td class="text-center bg-soft-secondary">
                    <button type="button" class="btn btn-md btn-primary" data-bs-toggle="modal" data-bs-target="#modalAnswer" @click="showSurveyDetails(respondent.responden_answers)">HASIL SURVEY</button>
                  </td>
                </tr>
              </tbody>
            </table>

            <!-- Pagination Component -->
            <div class="pagination-container p-3 bg-secondary" style="border-radius: 0px 0px 20px 20px">
              <!-- Previous button -->
              <button @click="goToPreviousPage" :disabled="currentPage === 1" class="prev-next-button"><span>&#9665;</span> Previous</button>

              <!-- Numbered page buttons -->
              <button v-for="page in totalPages" :key="page" @click="goToPage(page)" :disabled="currentPage === page" :class="{ 'pagination-button': true, active: currentPage === page }">
                {{ page }}
              </button>

              <!-- Next button -->
              <button @click="goToNextPage" :disabled="currentPage === totalPages" class="prev-next-button">Next <span>&#9655;</span></button>
            </div>
          </div>
        </div>
      </div>

      <div class="modal fade" id="modalAnswer" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable modal-custom">
          <div class="modal-content">
            <div class="modal-header bg-primary">
              <h4 class="modal-title text-white mt-4" style="font-weight: bold">JAWABAN RESPONDEN</h4>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <table style="width: 100%">
                <thead>
                  <tr class="bg-soft-primary text-dark" style="font-weight: bold; color: white">
                    <th style="width: 50px !important">NO</th>
                    <th style="width: 100px !important">SOAL</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in selectedRespondenAnswers" :key="index++">
                    <td style="font-weight: bolder; text-transform: uppercase; width: 50px !important">
                      <div class="d-flex align-items-center" style="width: 50px">
                        {{ index }}
                      </div>
                    </td>
                    <td style="text-transform: uppercase; width: 100px !important; word-wrap: break-word">
                      {{ item.question.question }}
                    </td>
                    <td style="font-weight: bolder; text-transform: uppercase; width: 250px">
                      <div class="text-center bg-soft-danger rounded" v-if="item.answer_value === 'tidak menjawab'">
                        {{ item.answer_value }}
                      </div>
                      <div class="text-center bg-soft-warning rounded" v-else-if="item.answer_value === 'sedang'">
                        {{ item.answer_value }}
                      </div>
                      <div class="text-center bg-soft-info rounded" v-else>
                        {{ item.answer_value }}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="modal-footer mt-4">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
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
      currentPage: 1, // Start at page 1
      totalPages: 1, // Initialize total pages (will be updated)
      limit: 1, // Number of respondents per page
      loading: false, // Loading indicator
      error: null,

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
      return this.respondenData.filter((item) => (item.master.title && item.master.title.toLowerCase().includes(query)) || (item.name && item.name.toLowerCase().includes(query)) || (item.age && item.age.toLowerCase().includes(query)) || (item.phone && item.phone.toLowerCase().includes(query)) || (item.province?.name && item.province.name.toLowerCase().includes(query)) || (item.city?.name && item.city.name.toLowerCase().includes(query)) || (item.district?.name && item.district.name.toLowerCase().includes(query)) || (item.village?.name && item.village.name.toLowerCase().includes(query)) || (item.additional_data && item.additional_data.toLowerCase().includes(query)))
    }
  },

  mounted() {
    this.fetchRespondents()
  },

  methods: {
    async fetchRespondents() {
      this.loading = true
      this.error = null // Reset error state

      const config = {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }

      try {
        const response = await axios.get(`/api/survey/view_respondens_by_survey/2?page=${this.currentPage}&limit=${this.limit}`, config)

        console.log('API Response:', response.data) // Debugging

        // Assign respondents data
        this.respondenData = response.data.data.data || []

        // Retrieve total number of respondents
        const total = response.data.data.total

        if (total !== undefined && !isNaN(total)) {
          this.totalPages = Math.max(Math.ceil(total / this.limit), 1)
        } else {
          // Fallback if total is not provided
          this.totalPages = Math.max(Math.ceil(this.respondenData.length / this.limit), 1)
          console.warn('Total respondents not provided. Calculated totalPages based on respondents length.')
        }

        // Show success notification using Swal
        Swal.fire({
          icon: 'success',
          title: `Respondents page ${this.currentPage}`,
          toast: true,
          position: 'top-right',
          timer: 3000, // 3 seconds timer
          timerProgressBar: true,
          showConfirmButton: false
        })
      } catch (error) {
        console.error('Error fetching respondents:', error)
        this.error = 'Failed to load respondents. Please try again later.'
        this.totalPages = 1
        this.respondenData = []
      } finally {
        this.loading = false
      }
    },

    // Navigate to the next page
    goToNextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage += 1
        this.fetchRespondents() // Fetch new page data
      }
    },

    // Navigate to the previous page
    goToPreviousPage() {
      if (this.currentPage > 1) {
        this.currentPage -= 1
        this.fetchRespondents() // Fetch new page data
      }
    },

    // Go to a specific page
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page
        this.fetchRespondents() // Fetch new page data
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
