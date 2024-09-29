<template>
  <!-- SURVEY MALUKU  -->
  <div class="card aos-init aos-animate" data-aos="fade-up" data-aos-delay="100">
    <div class="flex-wrap card-header d-flex justify-content-between bg-info custom-accordion2" block v-b-toggle.accordion-survey>
      <div class="header-title" style="display: flex; align-items: center">
        <h4 class="card-title text-white mb-3" style="font-weight: bolder; margin-right: 10px">HASIL SURVEY MALUKU</h4>

        <svg fill="#ffffff" width="40px" height="40px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff" style="margin-top: -15px">
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <g data-name="Layer 2">
              <g data-name="chevron-down">
                <rect width="24" height="24" opacity="0"></rect>
                <path d="M12 15.5a1 1 0 0 1-.71-.29l-4-4a1 1 0 1 1 1.42-1.42L12 13.1l3.3-3.18a1 1 0 1 1 1.38 1.44l-4 3.86a1 1 0 0 1-.68.28z"></path>
              </g>
            </g>
          </g>
        </svg>
      </div>
    </div>

    <hr style="margin: 0px; color: #3cc7d3; border-top: 10px solid; opacity: 1" />

    <b-collapse id="accordion-survey" role="tabpanel">
      <div class="card-body">
        <div class="row">
          <div class="col-xl-4" v-for="(chartMaluku, i) in malukuSurveyCharts" :key="i++">
            <div class="card aos-init aos-animate" style="box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); min-height: 420px">
              <div class="flex-wrap card-header d-flex justify-content-between bg-soft-primary">
                <div class="header-title">
                  <h6 class="card-title text-dark mb-3" style="font-weight: bolder">{{ i }}. {{ chartMaluku.question }}</h6>
                </div>
              </div>
              <div class="card-body">
                <apexchart :height="245" type="bar" :id="`d-main-${i}`" :options="chartMaluku.options" :series="chartMaluku.series" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </b-collapse>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'

import axios from 'axios'
import AOS from 'aos'

export default {
  data() {
    return {
      malukuSurveyCharts: []
    }
  },

  setup() {
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
  },

  created() {
    setTimeout(() => {
      this.fetchSurveyStatisticMaluku()
    }, 200)
  },

  methods: {
    async fetchSurveyStatisticMaluku() {
      try {
        const config = { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } }
        const response = await axios.get('/api/visualization/survey_chart/2', config)

        this.malukuSurveyChart = response.data.data.chart

        console.log(this.malukuSurveyChart)

        this.malukuSurveyCharts = []

        for (let i = 1; i <= 11; i++) {
          const questionNumber = `question_${i}`

          // Create chart data object
          const chartMaluku = {
            question: this.malukuSurveyChart[questionNumber].question,
            series: this.malukuSurveyChart[questionNumber].series,
            options: {
              xaxis: {
                categories: this.malukuSurveyChart[questionNumber].categories
              },
              chart: {
                fontFamily: '"Inter", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                height: 250,
                type: 'area',
                toolbar: {
                  show: true
                },
                sparkline: {
                  enabled: false
                },
                stacked: true
              }
            }
          }

          // Push chart data object to malukuSurveyChart array
          this.malukuSurveyCharts.push(chartMaluku)
        }

        console.log('💚 SURVEY MALUKU FETCHED')
      } catch (error) {
        console.error('💥 SURVEY MALUKU Error:', error)
      }
    }
  }
}
</script>

<style scoped>
@media only screen and (max-width: 500px) {
  .custom-mobile {
    margin-top: 50px;
  }
}
@media only screen and (max-width: 600px) {
  .custom-mobile {
    margin-top: 40px;
  }
}

@media only screen and (max-width: 700px) {
  .custom-mobile {
    margin-top: 50px;
  }

  .cq5 {
    display: none !important;
  }
}

.custom-accordion:hover {
  background: #2e46bb !important;
  cursor: pointer;
}

.custom-accordion2:hover {
  background: #078b92 !important;
  cursor: pointer;
}
</style>
