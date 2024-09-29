<template>
  <div class="row">
    <div class="col-xl-12">
      <div class="row">
        <!-- HISTORY SURVEY -->
        <div class="col-xl-12 mobile-custom" data-aos="fade-up" data-aos-delay="100">
          <div class="card aos-init aos-animate bg-info">
            <b-card class="bg-info mb-0">
              <div class="d-flex align-items-center justify-content-between flex-wrap">
                <b-col xl="4" lg="8" md="8" sm="6">
                  <b-card-title>
                    <span class="text-white" style="font-weight: bold">HISTORY SURVEY </span>
                  </b-card-title>
                </b-col>
                <b-col xl="12" lg="12" md="12" sm="12" class="mt-3">
                  <input type="text" class="form-control border-0" placeholder="Pencarian (Jenis / Nama / No HP / Wilayah Penugasan)" v-model="searchQuerySurvey" />
                </b-col>
              </div>
            </b-card>
            <div class="card-body p-0">
              <div class="table-responsive">
                <table id="basic-table" class="table mb-0" role="grid">
                  <thead>
                    <tr class="bg-soft-secondary text-white">
                      <th style="font-weight: bolder">NO</th>
                      <th class="text-center" style="font-weight: bolder">JENIS</th>
                      <th style="font-weight: bolder">NAMA</th>
                      <th style="font-weight: bolder">WILAYAH PENUGASAN</th>
                      <th style="font-weight: bolder">TANGGAL</th>
                      <th style="width: 100px; font-weight: bolder"></th>
                    </tr>
                  </thead>
                  <tbody class="bg-white">
                    <tr v-if="surveyDataNasional.length === 0">
                      <td class="text-center bg-dark text-light" colspan="5" style="font-weight: bolder">SURVEY MASIH KOSONG</td>
                    </tr>
                    <tr v-for="(item, index) in paginatedSurveyData" :key="index" v-else>
                      <td class="bg-info text-center" width="3%" style="font-weight: bolder">
                        <h6 class="text-white">{{ (currentPageSurvey - 1) * itemsPerPage + index + 1 }}</h6>
                      </td>
                      <td class="text-center" style="text-transform: uppercase">
                        <small class="bg-primary text-white rounded px-2 py-1" v-if="item.master.title === 'survey nasional'"> {{ item.master.title }} </small>
                        <small class="bg-warning text-white rounded px-2 py-1" v-if="item.master.title === 'survey jogja'"> {{ item.master.title }} </small>
                        <small class="bg-secondary text-white rounded px-2 py-1" v-if="item.master.title === 'survey papua'"> {{ item.master.title }} </small>
                      </td>
                      <td style="text-transform: uppercase">
                        <span style="font-weight: bolder">{{ item.name }}</span>
                        <small>
                          (<strong>{{ item.age }} </strong> tahun)
                        </small>
                        <br />
                        <small>
                          <strong v-if="item.phone">📱 {{ item.phone }}</strong>
                          <strong v-else>📱 <span class="badge bg-info p-1"> NO HP KOSONG </span></strong>
                        </small>
                      </td>
                      <td>
                        <strong>{{ item?.province?.name }}</strong> <br />
                        {{ item?.city?.name ? item.city.name + ', ' : '' }}
                        {{ item?.district?.name ? item.district.name + ', ' : '' }}
                        {{ item?.village?.name ? item.village.name + ', ' : '' }}
                        <span style="text-transform: uppercase">{{ item.additional_data }}</span> <br />
                        <small>RT {{ item?.rt }}/RW {{ item?.rw }}</small>
                      </td>
                      <td>{{ formatDateTime(item.created_at) }}</td>
                      <td>
                        <button type="button" class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#modalAnswer" @click="showSurveyDetails(item.responden_answers)">JAWABAN</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div class="pagination-container p-3 bg-info" style="border-radius: 0px 0px 10px 10px">
                  <!-- Previous button -->
                  <button @click="currentPageSurvey -= 1" :disabled="currentPageSurvey === 1" class="prev-next-button"><span>&#9665;</span> Previous</button>

                  <!-- Numbered page buttons -->
                  <button v-for="page in totalPagesSurvey" :key="page" @click="currentPageSurvey = page" :disabled="currentPageSurvey === page" :class="{ 'pagination-button': true, active: currentPageSurvey === page }">
                    {{ page }}
                  </button>

                  <!-- Next button -->
                  <button @click="currentPageSurvey += 1" :disabled="currentPageSurvey === totalPagesSurvey" class="prev-next-button">Next <span>&#9655;</span></button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- HISTORY ISU -->
        <div class="col-xl-12 mb-3" data-aos="fade-up" data-aos-delay="200">
          <div class="card aos-init aos-animate bg-primary">
            <b-card class="bg-primary mb-0">
              <div class="d-flex align-items-center justify-content-between flex-wrap">
                <b-col xl="4" lg="8" md="8" sm="6">
                  <b-card-title>
                    <span class="text-white" style="font-weight: bold">HISTORY ISU</span>
                  </b-card-title>
                </b-col>
                <b-col xl="12" lg="12" md="12" sm="12" class="mt-3">
                  <input type="text" class="form-control border-0" placeholder="Pencarian (Deskripsi / Wilayah / Kategori)" v-model="searchQueryIsu" />
                </b-col>
              </div>
            </b-card>
            <div class="p-0 card-body">
              <div class="table-responsive">
                <table id="basic-table" class="table mb-0" role="grid">
                  <thead>
                    <tr class="bg-soft-secondary text-white">
                      <th style="font-weight: bolder" class="text-center">NO</th>
                      <!-- <th style="font-weight: bolder">JUDUL</th> -->
                      <th style="font-weight: bolder">DESKRIPSI ISU</th>
                      <th style="font-weight: bolder">WILAYAH</th>
                      <th style="font-weight: bolder">KATEGORI</th>
                    </tr>
                  </thead>
                  <tbody class="bg-white">
                    <tr v-if="isuData.length === 0">
                      <td class="text-center bg-dark text-light" colspan="5" style="font-weight: bolder">ISU MASIH KOSONG</td>
                    </tr>

                    <tr v-for="(item, index) in paginatedIsuData" :key="index" v-else>
                      <td class="bg-primary text-center" width="3%" style="font-weight: bolder">
                        <h6 class="text-white">
                          {{ (currentPageIsu - 1) * itemsPerPage + index + 1 }}
                        </h6>
                      </td>
                      <!-- <td style="text-transform: uppercase">{{ item.title }}</td> -->
                      <td>{{ item.description_text }}</td>
                      <td>
                        <strong>{{ item.province.name }}</strong
                        >, {{ item?.city?.name }}, {{ item?.district?.name }}, {{ item?.village?.name }}, RT {{ item?.rt }}/RW {{ item?.rw }}
                      </td>
                      <td style="text-transform: uppercase">{{ item.issue_category.name }}</td>
                    </tr>
                  </tbody>
                </table>

                <div class="pagination-container p-3 bg-primary" style="border-radius: 0px 0px 10px 10px">
                  <!-- Previous button -->
                  <button @click="currentPageIsu -= 1" :disabled="currentPageIsu === 1" class="prev-next-button"><span>&#9665;</span> Previous</button>

                  <!-- Numbered page buttons -->
                  <button v-for="page in totalPagesIsu" :key="page" @click="currentPageIsu = page" :disabled="currentPageIsu === page" :class="{ 'pagination-button': true, active: currentPageIsu === page }">
                    {{ page }}
                  </button>

                  <!-- Next button -->
                  <button @click="currentPageIsu += 1" :disabled="currentPageIsu === totalPagesIsu" class="prev-next-button">Next <span>&#9655;</span></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="modal fade" id="modalAnswer" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-xl modal-dialog-scrollable" style="min-width: 1500px !important; overflow: auto">
          <div class="modal-content">
            <div class="modal-header bg-primary">
              <h4 class="modal-title text-white mt-4" style="font-weight: bold">JAWABAN RESPONDEN</h4>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <table id="basic-table" class="table table-hover" role="grid">
                <thead>
                  <tr class="bg-soft-primary text-dark" style="color: white">
                    <th style="font-weight: bolder">NO</th>
                    <th style="font-weight: bolder">SOAL</th>
                    <th class="text-center" style="font-weight: bolder">JAWABAN</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in selectedRespondenAnswers" :key="index++">
                    <td>
                      <div class="d-flex align-items-center">
                        {{ index }}
                      </div>
                    </td>
                    <td style="text-transform: uppercase; width: 100px !important">
                      {{ item.question.question }}
                    </td>
                    <td style="font-weight: bolder; text-transform: uppercase">
                      <div class="text-center bg-soft-danger rounded p-2" v-if="item.answer_value === 'tidak menjawab'">
                        {{ item.answer_value }}
                      </div>
                      <div class="text-center bg-soft-warning rounded p-2" v-else-if="item.answer_value === 'sedang'">
                        {{ item.answer_value }}
                      </div>
                      <div class="text-center bg-soft-info rounded p-2" v-else>
                        {{ item.answer_value }}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import { Navigation } from 'swiper'
import axios from 'axios'
import Swal from 'sweetalert2'
import AOS from 'aos'
import '@/assets/custom-vue/css/pagination.css'

export default {
  data() {
    return {
      searchQueryIsu: '',
      searchQuerySurvey: '',

      currentPageIsu: 1,
      itemsPerPageIsu: 5,

      currentPageSurvey: 1,
      itemsPerPage: 5,

      isuData: [],
      surveyDataNasional: [],
      surveyAnswerDataNasional: [],
      selectedRespondenAnswers: [],
      visible: false
    }
  },

  setup() {
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
    // ISU
    filteredIsuData() {
      this.currentPageIsu = 1

      const query = this.searchQueryIsu.toLowerCase()
      return this.isuData.filter((item) => (item.description_text && item.description_text.toLowerCase().includes(query)) || (item.province?.name && item.province.name.toLowerCase().includes(query)) || (item.city?.name && item.city.name.toLowerCase().includes(query)) || (item.district?.name && item.district.name.toLowerCase().includes(query)) || (item.village?.name && item.village.name.toLowerCase().includes(query)) || (item.additional_data && item.additional_data.toLowerCase().includes(query)) || (item.issue_category.name && item.issue_category.name.toLowerCase().includes(query)))
    },

    paginatedIsuData() {
      const startIdx = (this.currentPageIsu - 1) * this.itemsPerPageIsu
      const endIdx = startIdx + this.itemsPerPageIsu

      return this.filteredIsuData.slice(startIdx, endIdx)
    },

    totalPagesIsu() {
      return Math.ceil(this.filteredIsuData.length / this.itemsPerPageIsu)
    },

    // SURVEY
    filteredSurveyData() {
      this.currentPageSurvey = 1

      const query = this.searchQuerySurvey.toLowerCase()
      return this.surveyDataNasional.filter((item) => (item.master.title && item.master.title.toLowerCase().includes(query)) || (item.name && item.name.toLowerCase().includes(query)) || (item.phone && item.phone.toLowerCase().includes(query)) || (item.province?.name && item.province.name.toLowerCase().includes(query)) || (item.city?.name && item.city.name.toLowerCase().includes(query)) || (item.district?.name && item.district.name.toLowerCase().includes(query)) || (item.village?.name && item.village.name.toLowerCase().includes(query)) || (item.additional_data && item.additional_data.toLowerCase().includes(query)))
    },

    paginatedSurveyData() {
      const startIdx = (this.currentPageSurvey - 1) * this.itemsPerPage
      const endIdx = startIdx + this.itemsPerPage

      return this.filteredSurveyData.slice(startIdx, endIdx)
    },

    totalPagesSurvey() {
      return Math.ceil(this.filteredSurveyData.length / this.itemsPerPage)
    }
  },

  mounted() {
    this.fetchIsu(), this.fetchSurvey()
  },

  methods: {
    async fetchIsu() {
      try {
        const config = { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } }
        const response = await axios.get('/api/issue-reports?page=1&limit=10000000', config)

        this.isuData = response.data.data
        console.log('💚 Data ISU retrieved successfully', this.isuData)
      } catch (error) {
        console.error('Error fetching data:', error)
        return []
      }
    },
    async fetchSurvey() {
      try {
        const config = { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } }
        const response = await axios.get('/api/survey/view_respondens_by_user', config)

        this.surveyDataNasional = response.data.data.data
        this.surveyAnswerDatNasional = response.data.data.data

        console.log('💚 Data SURVEY retrieved successfully', this.surveyDataNasional)
        console.log('💚 Data ANSWER retrieved successfully', this.surveyAnswerDatNasional)
      } catch (error) {
        console.error('Error fetching data:', error)
        return []
      }
    },

    formatDateTime(dateTimeString) {
      const dateObject = new Date(dateTimeString)
      return dateObject.toLocaleString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
    },

    showSurveyDetails(item) {
      console.log(item)

      this.selectedRespondenAnswers = item
      $('#modalAnswer').modal('show') // Bootstrap modal show
    }
  }
}
</script>

<style>
@media only screen and (max-width: 765px) {
  .mobile-custom {
    margin-top: 100px;
  }
}
</style>
