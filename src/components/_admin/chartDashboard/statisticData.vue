<template>
  <div class="row row-cols-1" data-aos="fade-up" data-aos-delay="100">
    <div class="d-slider1 overflow-hidden swiper-container-initialized swiper-container-horizontal swiper-container-pointer-events">
      <Swiper
        class="p-0 m-0 mb-2 swiper-wrapper list-inline"
        :modules="modules"
        :slide-per-view="4"
        :space-between="45"
        :breakpoints="{
          320: { slidesPerView: 1 },
          550: { slidesPerView: 2 },
          991: { slidesPerView: 3 },
          1500: { slidesPerView: 4 },
          1920: { slidesPerView: 4 },
          2040: { slidesPerView: 4 },
          2440: { slidesPerView: 4 }
        }"
        :navigation="{
          nextEl: '#blog-tranding-next',
          prevEl: '#blog-tranding-prev'
        }">
        <SwiperSlide class="swiper-slide card card-slide">
          <b-card-body>
            <div class="progress-widget">
              <analytics-widget :index="index" :size="30" :sub-title="'TODAY ISSUES'" :value="statistic.issue_today" :color="primary">
                <svg class="card-slie-arrow" width="24" height="24px" viewBox="0 0 24 24" v-if="index % 2">
                  <path fill="currentColor" d="M19,6.41L17.59,5L7,15.59V9H5V19H15V17H8.41L19,6.41Z"></path>
                </svg>
                <svg class="card-slie-arrow" width="24" height="24" viewBox="0 0 24 24" v-else>
                  <path fill="currentColor" d="M5,17.59L15.59,7H9V5H19V15H17V8.41L6.41,19L5,17.59Z"></path>
                </svg>
              </analytics-widget>
              <div class="progress-detail">
                <p class="mb-2" style="font-weight: bold">ISU HARI INI</p>
                <h4 class="counter">{{ statistic.issue_today }}</h4>
              </div>
            </div>
          </b-card-body>
        </SwiperSlide>
        <SwiperSlide class="swiper-slide card card-slide">
          <b-card-body>
            <div class="progress-widget">
              <analytics-widget :index="index" :size="50" :sub-title="'TOTAL ISSUES'" :value="statistic.issue_total" :color="'info'" :isAmmount="'50K'">
                <svg class="card-slie-arrow" width="24" height="24px" viewBox="0 0 24 24" v-if="index % 2">
                  <path fill="currentColor" d="M19,6.41L17.59,5L7,15.59V9H5V19H15V17H8.41L19,6.41Z"></path>
                </svg>
                <svg class="card-slie-arrow" width="24" height="24" viewBox="0 0 24 24" v-else>
                  <path fill="currentColor" d="M5,17.59L15.59,7H9V5H19V15H17V8.41L6.41,19L5,17.59Z"></path>
                </svg>
              </analytics-widget>
              <div class="progress-detail">
                <p class="mb-2" style="font-weight: bold">TOTAL ISU</p>
                <h4 class="counter">{{ statistic.issue_total }}</h4>
              </div>
            </div>
          </b-card-body>
        </SwiperSlide>
        <SwiperSlide class="swiper-slide card card-slide">
          <b-card-body>
            <div class="progress-widget">
              <analytics-widget :index="index" :size="45" :sub-title="'TOTAL SURVEY'" :value="statistic.responden_total" :color="'warning'">
                <svg class="card-slie-arrow" width="24" height="24px" viewBox="0 0 24 24" v-if="index % 2">
                  <path fill="currentColor" d="M19,6.41L17.59,5L7,15.59V9H5V19H15V17H8.41L19,6.41Z"></path>
                </svg>
                <svg class="card-slie-arrow" width="24" height="24" viewBox="0 0 24 24" v-else>
                  <path fill="currentColor" d="M5,17.59L15.59,7H9V5H19V15H17V8.41L6.41,19L5,17.59Z"></path>
                </svg>
              </analytics-widget>
              <div class="progress-detail">
                <p class="mb-2" style="font-weight: bold">TOTAL SURVEY</p>
                <h4 class="counter">{{ statistic.responden_total }}</h4>
              </div>
            </div>
          </b-card-body>
        </SwiperSlide>
        <SwiperSlide class="swiper-slide card card-slide">
          <b-card-body>
            <div class="progress-widget">
              <analytics-widget :index="index" :size="4" :sub-title="'JUMLAH RELAWAN'" :value="statistic.users" :color="'danger'">
                <svg class="card-slie-arrow" width="24" height="24px" viewBox="0 0 24 24" v-if="index % 2">
                  <path fill="currentColor" d="M19,6.41L17.59,5L7,15.59V9H5V19H15V17H8.41L19,6.41Z"></path>
                </svg>
                <svg class="card-slie-arrow" width="24" height="24" viewBox="0 0 24 24" v-else>
                  <path fill="currentColor" d="M5,17.59L15.59,7H9V5H19V15H17V8.41L6.41,19L5,17.59Z"></path>
                </svg>
              </analytics-widget>
              <div class="progress-detail">
                <p class="mb-2" style="font-weight: bold">JUMLAH RELAWAN</p>
                <h4 class="counter">{{ statistic.users }}</h4>
              </div>
            </div>
          </b-card-body>
        </SwiperSlide>
      </Swiper>
      <div class="swiper-button swiper-button-next" id="blog-tranding-next"></div>
      <div class="swiper-button swiper-button-prev" id="blog-tranding-prev"></div>
      <span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import { Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'

import AnalyticsWidget from '@/components/widgets/AnalyticsWidget.vue'

import axios from 'axios'
import AOS from 'aos'

export default {
  components: {
    Swiper,
    SwiperSlide,
    AnalyticsWidget
  },

  data() {
    return {
      statistic: []
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
    this.fetchStatistic()
  },

  methods: {
    async fetchStatistic() {
      try {
        const config = { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } }
        const ress1 = await axios.get('/api/visualization/dashboard', config)
        // const ress2 = await axios.get('/api/visualization/survey_chart', config)

        this.statistic = ress1.data.data

        // console.log('💚 STATISTIC ')
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
  }
}
</script>
