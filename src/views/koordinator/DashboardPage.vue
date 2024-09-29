<template>
  <div class="row">
    <div class="col-xl-12">
      <div class="row">
        <!-- HISTORY ISU -->
        <div class="col-xl-12 mb-5 mobile-custom" data-aos="fade-up" data-aos-delay="100">
          <div class="card aos-init aos-animate">
            <b-card class="bg-primary">
              <div class="d-flex align-items-center justify-content-between flex-wrap">
                <b-col xl="4" lg="8" md="8" sm="6">
                  <b-card-title>
                    <span class="text-white" style="font-weight: bold">RESPONDEN ISU</span>
                  </b-card-title>
                </b-col>
              </div>
            </b-card>
            <div class="p-0 card-body">
              <div class="table-responsive">
                <table id="basic-table" class="table mb-0" role="grid">
                  <thead>
                    <tr class="bg-soft-primary">
                      <th>NO</th>
                      <th>JUDUL</th>
                      <th>DESKRIPSI</th>
                      <th>WILAYAH</th>
                      <th>KATEGORI</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in isuData" :key="index++">
                      <td>
                        <h6>{{ index }}</h6>
                      </td>
                      <td style="text-transform: uppercase">{{ item.title }}</td>
                      <td>{{ item.description_text }}</td>
                      <td>
                        <strong>{{ item.province.name }}</strong
                        >, {{ item.city.name }}, {{ item.district.name }}, {{ item.village.name }}, RT {{ item.rt }}/RW {{ item.rw }}
                      </td>
                      <td style="text-transform: uppercase">{{ item.issue_category.name }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <!-- HISTORY SURVEY -->
        <div class="col-xl-12" data-aos="fade-up" data-aos-delay="200">
          <div class="card aos-init aos-animate">
            <b-card class="bg-primary">
              <div class="d-flex align-items-center justify-content-between flex-wrap">
                <b-col xl="4" lg="8" md="8" sm="6">
                  <b-card-title>
                    <span class="text-white" style="font-weight: bold">RESPONDEN SURVEY</span>
                  </b-card-title>
                </b-col>
              </div>
            </b-card>
            <div class="p-0 card-body">
              <div class="table-responsive">
                <table id="basic-table" class="table mb-0" role="grid">
                  <thead>
                    <tr class="bg-soft-primary">
                      <th>NO</th>
                      <th>NAMA</th>
                      <th class="text-center">UMUR</th>
                      <th class="text-center">NOMOR HP</th>
                      <th>WILAYAH PENUGASAN</th>
                      <th class="text-center">TANGGAL</th>
                      <th style="width: 100px"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in surveyData" :key="index++">
                      <td>
                        <div class="d-flex align-items-center">
                          {{ index }}
                        </div>
                      </td>
                      <td style="text-transform: uppercase">
                        {{ item.name }}
                      </td>
                      <td class="text-center">{{ item.age }}</td>
                      <td class="text-center">{{ item.phone }}</td>
                      <td>
                        <strong>{{ item.province.name }}</strong
                        >, {{ item.city.name }}, {{ item.district.name }}, {{ item.village.name }}, RT {{ item.rt }}/RW {{ item.rw }}
                      </td>
                      <td>{{ formatDateTime(item.created_at) }}</td>
                      <td>
                        <button type="button" class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#modalAnswer" @click="showSurveyDetails(item.responden_answers)">HASIL SURVEY</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
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
                  <tr class="bg-soft-primary text-dark" style="font-weight: bolder; color: white">
                    <th>NO</th>
                    <th>SOAL</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in selectedRespondenAnswers" :key="index++">
                    <td>
                      <div class="d-flex align-items-center">
                        {{ item.question_id }}
                      </div>
                    </td>
                    <td style="text-transform: uppercase; width: 100px !important">
                      {{ item.question.question }}
                    </td>
                    <td style="font-weight: bolder; text-transform: uppercase">
                      <div class="text-center bg-soft-danger rounded p-3" v-if="item.answer_value === 'tidak menjawab'">
                        {{ item.answer_value }}
                      </div>
                      <div class="text-center bg-soft-warning rounded p-3" v-else-if="item.answer_value === 'sedang'">
                        {{ item.answer_value }}
                      </div>
                      <div class="text-center bg-soft-info rounded p-3" v-else>
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
import AOS from 'aos'

export default {
  data() {
    return {
      isuData: [],
      surveyData: [],
      surveyAnswerData: [],
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
        const response = await axios.get('/api/survey/view_respondens_by_user?page=1&limit=10000', config)

        this.surveyData = response.data.data.data
        this.surveyAnswerData = response.data.data.data

        console.log('💚 Data SURVEY retrieved successfully', this.surveyData)
        console.log('💚 Data ANSWER retrieved successfully', this.surveyAnswerData)
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
