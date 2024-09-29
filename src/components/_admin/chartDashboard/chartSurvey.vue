<template>
  <!-- SURVEY NASIONAL  -->
  <!-- <div class="card aos-init aos-animate" data-aos="fade-up" data-aos-delay="100">
    <div class="flex-wrap card-header d-flex justify-content-between bg-primary" block v-b-toggle.accordion-survey-nasional>
      <div class="header-title">
        <h4 class="card-title text-white mb-3" style="font-weight: bolder">HASIL SURVEY NASIONAL</h4>
      </div>
    </div>

    <b-collapse id="accordion-survey-nasional" role="tabpanel" visible>
      <div class="card-body">
        <div class="row">
          <div class="col-xl-6" v-for="(chartNasional, i) in nationalSurveyCharts" :key="i++">
            <div class="card aos-init aos-animate">
              <div class="flex-wrap card-header d-flex justify-content-between bg-soft-primary">
                <div class="header-title">
                  <h6 class="card-title text-dark mb-3" style="font-weight: bolder">{{ i }}. {{ chartNasional.question }}</h6>
                </div>
              </div>
              <div class="card-body">
                <apexchart :height="245" type="bar" :id="`d-main-${i}`" :options="chartNasional.options" :series="chartNasional.series" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </b-collapse>
  </div> -->

  <!-- SURVEY JOGJA  -->
  <!-- <div class="card aos-init aos-animate" data-aos="fade-up" data-aos-delay="100">
    <div class="flex-wrap card-header d-flex justify-content-between bg-primary custom-accordion" block v-b-toggle.accordion-survey-jogja>
      <div class="header-title" style="display: flex; align-items: center">
        <h4 class="card-title text-white mb-3" style="font-weight: bolder; margin-right: 10px">HASIL SURVEY JOGJA</h4>

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

    <hr style="margin: 0px; color: rgb(111, 127, 231); border-top: 10px solid; opacity: 1" />

    <b-collapse id="accordion-survey-jogja" role="tabpanel" visible>
      <div class="card-body bg-primary">
        <div class="row">
          <div class="col-xl-6" v-for="(chartJogja, i) in jogjaSurveyCharts" :key="i++">
            <div class="card">
              <div class="flex-wrap card-header d-flex justify-content-between bg-soft-primary">
                <div class="header-title" style="height:50px">
                  <h6 class="card-title text-dark mb-3" style="font-weight: bolder">{{ i }}. {{ chartJogja.question }}</h6>
                </div>
              </div>
              <div class="card-body">
                <apexchart :height="500" type="bar" :id="`d-main-${i}`" :options="chartJogja.options" :series="chartJogja.series" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </b-collapse>
  </div> -->

  <!-- SURVEY PAPUA  -->
  <div class="card aos-init aos-animate" data-aos="fade-up" data-aos-delay="100">
    <div class="flex-wrap card-header d-flex justify-content-between bg-info custom-accordion2" block v-b-toggle.accordion-survey-papua>
      <div class="header-title" style="display: flex; align-items: center">
        <h4 class="card-title text-white mb-3" style="font-weight: bolder; margin-right: 10px">SURVEY PAPUA</h4>

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

    <b-collapse id="accordion-survey-papua" role="tabpanel">
      <div class="card-body">
        <div class="row">
          <div class="col-xl-4" v-for="(chartPapua, i) in papuaSurveyCharts" :key="i++">
            <div class="card aos-init aos-animate">
              <div class="flex-wrap card-header d-flex justify-content-between bg-soft-primary">
                <div class="header-title">
                  <h6 class="card-title text-dark mb-3" style="font-weight: bolder">{{ i }}. {{ chartPapua.question }}</h6>
                </div>
              </div>
              <div class="card-body">
                <apexchart :height="245" type="bar" :id="`d-main-${i}`" :options="chartPapua.options" :series="chartPapua.series" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </b-collapse>
  </div>

  <!-- SURVEY PAPUA SEHAT -->
  <div class="card aos-init aos-animate" data-aos="fade-up" data-aos-delay="100">
    <div class="flex-wrap card-header d-flex justify-content-between bg-info custom-accordion2" block v-b-toggle.accordion-survey-papua-sehat>
      <div class="header-title" style="display: flex; align-items: center">
        <h4 class="card-title text-white mb-3" style="font-weight: bolder; margin-right: 10px">SURVEY PAPUA SEHAT</h4>

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

    <b-collapse id="accordion-survey-papua-sehat" role="tabpanel">
      <div class="card-body">
        <div class="row">
          <!-- CHART PAPUA SEHAT -->
          <div class="col-xl-4 col-lg-4 col-md-12" v-for="(chartChildPapua, i) in papuaChildCharts" :key="i++">
            <div class="card" data-aos="fade-up" data-aos-delay="400">
              <div class="flex-wrap card-header d-flex justify-content-between bg-secondary">
                <div class="header-title">
                  <h5 class="card-title text-white mb-3" style="font-weight: bolder; text-transform: capitalize">{{ chartChildPapua.title }}</h5>
                </div>
              </div>
              <div class="card-body">
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                  <div class="d-flex flex-wrap align-items-center justify-content-center">
                    <apexchart type="pie" :options="chartChildPapua.chartOptions" :series="chartChildPapua.series" style="width: 83%"></apexchart>
                  </div>
                </div>
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
      nationalSurveyCharts: [],
      papuaSurveyCharts: [],
      jogjaSurveyCharts: [],
      papuaChildCharts: []
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
      this.fetchJogjaSurveyStatistic()
      this.fetchNasionalSurveyStatistic()
      this.fetchPapuaSurveyStatistic()
      this.fetchPapuaChildStatistic()
    }, 200)
  },

  methods: {
    async fetchNasionalSurveyStatistic() {
      try {
        const config = { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } }
        const response = await axios.get('/api/visualization/survey_chart/1', config)

        this.NasionalSurveyChart = response.data.data.chart

        this.nationalSurveyCharts = []

        for (let i = 1; i <= 7; i++) {
          const questionNumber = `question_${i}`

          // Create chart data object
          const chartNasional = {
            question: this.NasionalSurveyChart[questionNumber].question,
            series: this.NasionalSurveyChart[questionNumber].series,
            options: {
              xaxis: {
                categories: this.NasionalSurveyChart[questionNumber].categories
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

          // Push chart data object to nationalSurveyCharts array
          this.nationalSurveyCharts.push(chartNasional)
        }

        console.log('💚 SURVEY NASIONAL')
      } catch (error) {
        console.error('💥 SURVEY NASIONAL Error:', error)
      }
    },

    async fetchPapuaSurveyStatistic() {
      try {
        const config = { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } }
        const response = await axios.get('/api/visualization/survey_chart/2', config)

        this.papuaSurveyChart = response.data.data.chart

        this.papuaSurveyCharts = []

        for (let i = 8; i <= 22; i++) {
          const questionNumberPapua = `question_${i}`

          // Create chart data object
          const chartPapua = {
            question: this.papuaSurveyChart[questionNumberPapua].question,
            series: this.papuaSurveyChart[questionNumberPapua].series,
            options: {
              xaxis: {
                categories: this.papuaSurveyChart[questionNumberPapua].categories
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

          // Push chart data object to papuaSurveyChart array
          this.papuaSurveyCharts.push(chartPapua)
        }

        console.log('💚 SURVEY PAPUA')
      } catch (error) {
        console.error('💥 SURVEY PAPUA Error:', error)
      }
    },

    async fetchJogjaSurveyStatistic() {
      try {
        const config = { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } }
        const response = await axios.get('/api/visualization/survey_chart/3', config)

        this.jogjaSurveyChart = response.data.data.chart

        // console.log('jogja', this.jogjaSurveyChart)

        this.jogjaSurveyCharts = []

        for (let i = 23; i <= 26; i++) {
          const questionNumberJogja = `question_${i}`

          // Create chart data object
          const chartJogja = {
            question: this.jogjaSurveyChart[questionNumberJogja].question,
            series: this.jogjaSurveyChart[questionNumberJogja].series,
            options: {
              xaxis: {
                categories: this.jogjaSurveyChart[questionNumberJogja].categories
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
                stacked: true,
                stackType: '100%'
              }
            }
          }

          // Push chart data object to jogjaSurveyChart array
          this.jogjaSurveyCharts.push(chartJogja)
        }

        console.log('💚 SURVEY JOGJA')
      } catch (error) {
        console.error('💥 SURVEY JOGJA Error:', error)
      }
    },

    async fetchPapuaChildStatistic() {
      try {
        const config = { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } }
        const response = await axios.get('/api/visualization/stunting-chart', config)

        this.papuaChildChart = response.data
        console.log(this.papuaChildChart)

        this.papuaChildCharts = []

        for (let i = 1; i <= 6; i++) {
          const chartPapuaChildren = {
            title: this.papuaChildChart.data[i].title,
            series: this.papuaChildChart.data[i].values,
            chartOptions: {
              chart: {
                type: 'pie'
              },
              legend: {
                position: 'bottom'
              },
              labels: this.papuaChildChart.data[i].names,
              tooltip: {
                x: {
                  show: true
                }
              },
              colors: ['#3a57e8', '#f16a1b', '#08b1ba', '#c03221'] // Custom color palette with two colors
            }
          }

          // Push chart data object to papuaSurveyChart array
          this.papuaChildCharts.push(chartPapuaChildren)
        }

        console.log('💚 SURVEY PAPUA')
      } catch (error) {
        console.error('💥 SURVEY PAPUA Error:', error)
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
