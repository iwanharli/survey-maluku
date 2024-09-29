<template>
  <b-row class="mb-5">
    <b-col md="12">
      <b-card class="bg-primary">
        <b-row>
          <b-col xl="6" lg="3" md="12" sm="12">
            <b-card-title>
              <span class="text-white" style="font-weight: bold">RESPONDEN ISU</span>
            </b-card-title>
          </b-col>
          <b-col xl="2" lg="3" md="12" sm="12" class="mb-2">
            <b-form-input type="date" v-model="inputDateStart"></b-form-input>
          </b-col>
          <b-col xl="2" lg="3" md="12" sm="12" class="mb-2">
            <b-form-input type="date" v-model="inputDateEnd"></b-form-input>
          </b-col>
          <b-col xl="2" lg="3" md="12" sm="12" class="d-flex justify-content-end custom-export">
            <button class="btn btn-warning btn-md" type="button" @click="exportCSV" style="font-weight: bold; width: 100%; height: 90%">EXPORT CSV</button>
          </b-col>
          <b-col xl="12" lg="12" md="12" sm="12" class="mt-3">
            <input type="text" class="form-control border-0" placeholder="Pencarian (Nama Relawan / Kategori Isu / Provinsi)" v-model="searchQuery" />
          </b-col>
        </b-row>
      </b-card>
    </b-col>

    <!-- RESPONDEN  -->
    <b-col xl="6" lg="12" md="12" sm="12" class="pb-4" v-for="item in paginatedIsuData" :key="item.id">
      <div style="max-height: 210px; overflow-y: auto">
        <div class="bg-primary d-grid grid-flow-col align-items-center justify-content-between" style="padding: 10px; border-radius: 10px 10px 0px 0px; border: 5px solid #001f4d">
          <div class="d-flex align-items-center text-white" style="font-weight: bolder; text-transform: uppercase">
            {{ item.user_relawan.name }}
          </div>
          <div v-if="item.issue_category && item.issue_category.name" class="bg-white text-primary text-center" style="padding: 5px; border-radius: 10px; min-width: 100px; font-weight: bolder">
            {{ item.issue_category.name }}
          </div>
          <div v-else class="bg-white text-primary d-flex align-items-center" style="padding: 5px; border-radius: 10px">
            <button class="btn btn-soft-secondary btn-sm" @click="editCategory(item.id, item.name)" style="font-weight: bold">🚩</button>
          </div>
        </div>

        <div class="bg-soft-secondary d-grid grid-flow-col align-items-center justify-content-between" style="border-left: 5px solid #001f4d; border-right: 5px solid #001f4d">
          <!-- <h6 style="padding: 10px; font-weight: bolder; text-transform: uppercase;">{{ item.title }}</h6> -->
          <h6 class="mt-2 mb-2" style="padding: 10px; text-transform: uppercase; text-align: justify">{{ item.description_text }}</h6>
        </div>

        <!-- Move the block to the bottom of the b-card -->
        <div class="bg-secondary d-grid grid-flow-col align-items-center justify-content-between p-2" style="border-radius: 0px 0px 10px 10px; border: 7px solid #001f4d">
          <div class="bg-soft-light text-light px-2" style="border-radius: 10px">
            <small> 📆 {{ formatDateTime(item.created_at) }}</small>
          </div>
          <div class="bg-light text-black px-2" style="font-weight: bolder; border-radius: 10px">
            <small> 📌 {{ item.province.name }}</small>
          </div>

          <div class="text-primary" style="border-radius: 10px">
            <!-- <b-button :href="`https://drive.google.com/file/d/${item.gdrive_file_id}`" variant="icon btn-soft-primary me-2" style="margin-right: 5px" target="_blank">
              <icon-component type="solid" icon-name="photograph" :size="20" />
            </b-button> -->
            <b-button class="btn btn-sm" variant="icon btn-outline-light me-2" data-bs-toggle="modal" data-bs-target="#modalDetailIsu" @click="showIsuDetail(item)" style="border-radius: 20px">
              <icon-component type="solid" icon-name="eye" :size="20" />
            </b-button>
          </div>
        </div>
      </div>
    </b-col>

    <b-col md="12">
      <div class="pagination-container p-3 bg-soft-secondary" style="border-radius: 0px 0px 20px 20px">
        <!-- Previous button -->
        <button @click="currentPage -= 1" :disabled="currentPage === 1" class="prev-next-button"><span>&#9665;</span> Previous</button>

        <!-- Numbered page buttons -->
        <button v-for="page in totalPages" :key="page" @click="currentPage = page" :disabled="currentPage === page" :class="{ 'pagination-button': true, active: currentPage === page }">
          {{ page }}
        </button>

        <!-- Next button -->
        <button @click="currentPage += 1" :disabled="currentPage === totalPages" class="prev-next-button">Next <span>&#9655;</span></button>
      </div>
    </b-col>

    <div class="modal fade" id="modalDetailIsu" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-xl modal-dialog-scrollable modal-custom">
        <div class="modal-content">
          <div class="modal-header bg-primary">
            <h4 class="modal-title text-white mt-4" style="font-weight: bold">DETAIL ISU</h4>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body" v-if="selectedIsu">
            <div class="bg-secondary text-white mb-4 p-2">
              <h4 style="display: none">
                <span style="text-transform: uppercase; color: white">{{ selectedIsu.title }}</span>
              </h4>
              {{ selectedIsu.description_text }}
            </div>

            <div class="table-responsive mb-2 mt-3">
              <table id="basic-table" class="table" role="grid">
                <thead>
                  <tr class="bg-warning text-white" style="font-weight: bold; color: white">
                    <th>PROVINSI</th>
                    <th>KOTA</th>
                    <th>KECAMATAN</th>
                    <th>KELURAHAN</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style="text-transform: uppercase; width: 100px !important">
                      {{ selectedIsu.province?.name }}
                    </td>
                    <td style="text-transform: uppercase; width: 100px !important">
                      {{ selectedIsu.city?.name }}
                    </td>
                    <td style="text-transform: uppercase; width: 100px !important">
                      {{ selectedIsu.district?.name }}
                    </td>
                    <td style="text-transform: uppercase; width: 250px">
                      {{ selectedIsu.village?.name }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="table-responsive">
              <!-- <h3 class="mb-2" style="font-weight: bolder">RESPONDEN</h3> -->
              <table id="basic-table" class="table" role="grid">
                <thead>
                  <tr class="bg-primary text-white" style="font-weight: bold; color: white">
                    <th>NAMA</th>
                    <th>EMAIL</th>
                    <th>ROLE</th>
                    <th>NO HP</th>
                    <th>TEMPAT LAHIR</th>
                    <th>TANGGAL LAHIR</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style="font-weight: bolder; text-transform: uppercase; width: 50px">
                      <div class="d-flex align-items-center">
                        {{ selectedIsu.user_relawan.name }}
                      </div>
                    </td>
                    <td style="text-transform: uppercase; width: 100px !important">
                      {{ selectedIsu.user_relawan.email }}
                    </td>
                    <td style="text-transform: uppercase; width: 100px !important">
                      {{ selectedIsu.user_relawan.role }}
                    </td>
                    <td style="text-transform: uppercase; width: 100px !important">
                      {{ selectedIsu.user_relawan.phone }}
                    </td>
                    <td style="text-transform: uppercase; width: 250px">
                      {{ selectedIsu.user_relawan.birthplace }}
                    </td>
                    <td style="text-transform: uppercase; width: 250px">
                      {{ selectedIsu.user_relawan.birthdate }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="modal-footer mt-4">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </b-row>
</template>

<script>
import { onMounted, ref } from 'vue'
import AnalyticsWidget from '@/components/widgets/AnalyticsWidget.vue'
import '@/assets/custom-vue/css/pagination.css'

import axios from 'axios'
import Swal from 'sweetalert2'
import AOS from 'aos'

export default {
  data() {
    return {
      searchQuery: '',
      currentPage: 1,
      itemsPerPage: 8,

      inputDateStart: '',
      inputDateEnd: '',

      respondenData: [],
      selectedResponden: [],
      categoryData: [],
      selectedIsu: null
    }
  },

  components: {
    AnalyticsWidget
  },

  setup() {
    function getRandomData(length) {
      return Array.from({ length }, () => Math.floor(Math.random() * 100))
    }

    const modules = [Navigation]
    onMounted(() => {
      AOS.init({
        disable: function () {
          var maxWidth = 996
          return window.innerWidth < maxWidth
        },
        once: true,
        duration: 800
      })
    })
    return { modules }
  },

  computed: {
    filteredIsuData() {
      this.currentPage = 1

      const query = this.searchQuery.toLowerCase()
      return this.respondenData.filter((item) => item.user_relawan.name && item.user_relawan.name.toLowerCase().includes(query) || item.issue_category.name && item.issue_category.name.toLowerCase().includes(query) || item.province.name && item.province.name.toLowerCase().includes(query))
    },

    paginatedIsuData() {
      const startIdx = (this.currentPage - 1) * this.itemsPerPage
      const endIdx = startIdx + this.itemsPerPage

      return this.filteredIsuData.slice(startIdx, endIdx)
    },

    totalPages() {
      return Math.ceil(this.filteredIsuData.length / this.itemsPerPage)
    }
  },

  mounted() {
    this.fetchResponden(), this.fetchCategory()
  },

  methods: {
    async fetchResponden() {
      try {
        const config = { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } }
        const response = await axios.get('/api/issue-reports/all?page=1&limit=1000', config)

        this.respondenData = response.data.data

        console.log(this.respondenData)
      } catch (error) {
        console.error('Error fetching data:', error)
        return []
      }
    },

    async fetchCategory() {
      try {
        const config = { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } }
        const response = await axios.get('/api/categories', config)

        this.categoryData = response.data.data

        // Sort the categoryData array by the 'name' property in ascending order
        this.categoryData.sort((a, b) => a.name.localeCompare(b.name))

        console.log('Data kategori retrieved successfully', this.categoryData)
      } catch (error) {
        console.error('Failed to fetch 💀:', error.message)
      }
    },

    showRespondenDetail(item) {
      this.selectedResponden = item
    },

    showIsuDetail(item) {
      console.log(item)
      this.selectedIsu = item
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

    async editCategory(id, name) {
      console.log(this.categoryData)

      Swal.fire({
        title: 'Edit Kategori',
        input: 'select',
        inputValue: name,
        inputOptions: {
          option1: 'Option 1',
          option2: 'Option 2',
          option3: 'Option 3'
          // Add your options here based on your needs
        },
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

      // Create a Blob with the CSV content
      const blob = new Blob([csvContent], { type: 'text/csv' })

      const formatDate = (date) => {
        const options = { day: 'numeric', month: '2-digit', year: 'numeric' }
        return new Date(date).toLocaleDateString('en-US', options).replace(/\//g, '-')
      }

      const formattedStartDate = formatDate(this.inputDateStart)
      const formattedEndDate = formatDate(this.inputDateEnd)
      const fileName = `RESPONDEN_ISU_${formattedStartDate}_to_${formattedEndDate}.csv`

      // Create a link element and trigger a download
      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = fileName
      link.click()
    },

    generateCSVContent(data) {
      const header = 'id, judul, deskripsi, kategori, provinsi, kota, kecamatan, kelurahan, gdrive_file_id, tanggal dibuat, nama relawan, email relawan, no hp relawan\n'

      const rows = data.map((item) => {
        const file = `https://drive.google.com/file/d/${item.gdrive_file_id}`

        // Use optional chaining to check if issue_category and name are present
        const categoryName = item.issue_category?.name || 'N/A'

        return `${item.id},${item.title},${item.description_text},${categoryName},${item.province.name},${item.city.name},${item.district.name},${item.village.name},${file}, ${item.created_at}, ${item.user_relawan.name}, ${item.user_relawan.email}, ${item.user_relawan.phone}\n`
      })

      return header + rows.join('')
    }
  }
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

table {
  width: 50px;
}

th {
  font-weight: bold;
}

th,
td {
  padding: 15px; /* Adjust the padding value as needed */

  word-break: break-all;
}

.modal-custom {
  min-width: 1200px;
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

.card-title {
  color: #262626;
  font-size: 1.5em;
  line-height: normal;
  font-weight: 700;
  margin-bottom: 0.5em;
}

.small-desc {
  font-size: 1em;
  font-weight: 400;
  line-height: 1.5em;
  color: #452c2c;
}

.small-desc {
  font-size: 1em;
}

.go-corner {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 2em;
  height: 2em;
  overflow: hidden;
  top: 0;
  right: 0;
  background: linear-gradient(135deg, #6293c8, #384c6c);
  border-radius: 0 4px 0 32px;
}

.go-arrow {
  margin-top: -4px;
  margin-right: -4px;
  color: white;
  font-family: courier, sans;
}

.card-responden {
  display: block;
  position: relative;
  max-width: 350px;
  max-height: 320px;
  background-color: #f2f8f9;
  border-radius: 10px;
  padding: 2em 1.2em;
  margin: 12px;
  text-decoration: none;
  z-index: 0;
  overflow: hidden;
  background: linear-gradient(to bottom, #c3e6ec, #a7d1d9);
  font-family: Arial, Helvetica, sans-serif;
}

.card-responden:before {
  content: '';
  position: absolute;
  z-index: -1;
  top: -16px;
  right: -16px;
  background: linear-gradient(135deg, #364a60, #384c6c);
  height: 32px;
  width: 32px;
  border-radius: 32px;
  transform: scale(1);
  transform-origin: 50% 50%;
  transition: transform 0.35s ease-out;
}

.card-responden:hover:before {
  transform: scale(28);
}

.card-responden:hover .small-desc {
  transition: all 0.5s ease-out;
  color: rgba(255, 255, 255, 0.8);
}

.card-responden:hover .card-title {
  transition: all 0.5s ease-out;
  color: #ffffff;
}
</style>

<!-- <script>
import { onMounted, ref } from 'vue'
import AnalyticsWidget from '@/components/widgets/AnalyticsWidget.vue'
import axios from 'axios'
import AOS from 'aos'

export default {
  data() {
    return {
      respondenData: []
    }
  },

  components: {
    AnalyticsWidget
  },
  setup() {
    function getRandomData(length) {
      return Array.from({ length }, () => Math.floor(Math.random() * 100))
    }

    const modules = [Navigation]
    onMounted(() => {
      AOS.init({
        disable: function () {
          var maxWidth = 996
          return window.innerWidth < maxWidth
        },
        once: true,
        duration: 800
      })
    })
    return { modules }
  },

  mounted() {
    this.fetchResponden()
  },

  methods: {
    async fetchResponden() {
      try {
        const config = { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } }
        const response = await axios.get('/api/issue-reports/all?page=1&limit=1000', config)

        this.respondenData = response.data.data

        console.log(this.respondenData)
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
        minute: '2-digit',
        second: '2-digit'
      }

      const dateTime = new Date(dateTimeString)
      const formattedDateTime = dateTime.toLocaleString('en-US', options)

      return formattedDateTime
    }
  }
}
</script> -->
