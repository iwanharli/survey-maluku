<template>
  <div class="card aos-init aos-animate" data-aos="fade-up" data-aos-delay="100">
    <div class="flex-wrap card-header d-flex justify-content-between bg-info custom-accordion2" block v-b-toggle.accordion-peta-bencana>
      <div class="header-title" style="display: flex; align-items: center">
        <h4 class="card-title text-white mb-3" style="font-weight: bolder; margin-right: 10px">STATISTIK BENCANA</h4>

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

    <b-collapse id="accordion-peta-bencana" role="tabpanel" visible>
      <div class="card-body">
        <div class="row">
          <div class="col-xl-4 col-lg-4 col-md-12">
            <div class="card" data-aos="fade-up" data-aos-delay="400">
              <div class="flex-wrap card-header d-flex justify-content-between bg-secondary">
                <div class="header-title mb-3">
                  <h5 class="card-title text-white" style="font-weight: bolder; text-transform: capitalize">Waktu Bencana</h5>
                  (2015-2024)
                </div>
              </div>
              <div class="card-body">
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                  <div class="d-flex flex-wrap align-items-center justify-content-center">
                    <apexchart height="300" type="bar" :options="chartWaktuBencana.options" :series="chartWaktuBencana.series" style="width: 100% !important"></apexchart>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-xl-4 col-lg-4 col-md-12">
            <div class="card" data-aos="fade-up" data-aos-delay="400">
              <div class="flex-wrap card-header d-flex justify-content-between bg-secondary">
                <div class="header-title mb-3">
                  <h5 class="card-title text-white" style="font-weight: bolder; text-transform: capitalize">Jenis Bencana</h5>
                  (2015-2024)
                </div>
              </div>
              <div class="card-body">
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                  <div class="d-flex flex-wrap align-items-center justify-content-center">
                    <apexchart height="300" type="bar" :options="chartJenisBencana.options" :series="chartJenisBencana.series" style="width: 100% !important"></apexchart>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-xl-4 col-lg-4 col-md-12">
            <div class="card" data-aos="fade-up" data-aos-delay="400">
              <div class="flex-wrap card-header d-flex justify-content-between bg-secondary">
                <div class="header-title mb-3">
                  <h5 class="card-title text-white" style="font-weight: bolder; text-transform: capitalize">Statistik Tahun Ini</h5>
                  (2015-2024)
                </div>
              </div>
              <div class="card-body">
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                  <div class="d-flex flex-wrap align-items-center justify-content-center">
                    <apexchart height="300" type="bar" :options="chartBencanaTerbaru.options" :series="chartBencanaTerbaru.series" style="width: 100% !important"></apexchart>
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
import { Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import axios from 'axios'
import AOS from 'aos'

export default {
  data() {
    return {
      chartWaktuBencana: {
        options: {
          xaxis: {
            categories: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024']
          }
        },
        series: [
          {
            name: 'Jumlah Bencana',
            data: [8, 5, 20, 14, 17, 9, 13, 17, 12, 5]
          }
        ]
      },

      chartJenisBencana: {
        options: {
          xaxis: {
            categories: ['Banjir', 'Tanah Longsor', 'Gelombang Pasang & Abrasi', 'Cuaca Ekstrem', 'Kekeringan', 'Kebakaran Hutan']
          }
        },
        series: [
          {
            name: 'Jumlah Bencana',
            data: [71, 13, 8, 5, 8, 1]
          }
        ]
      },

      chartBencanaTerbaru: {
        options: {
          xaxis: {
            categories: ['Banjir', 'Gelombang Pasang & Abrasi', 'Cuaca Ekstrem']
          }
        },
        series: [
          {
            name: 'Jumlah Bencana',
            data: [3, 1, 1]
          }
        ]
      }
    }
  }
}
</script>
