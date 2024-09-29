<template>
  <!-- DEMOGRAFI SOSIAL -->
  <div class="card aos-init aos-animate" data-aos="fade-up" data-aos-delay="100">
    <div class="flex-wrap card-header d-flex justify-content-between bg-info custom-accordion2" block v-b-toggle.accordion-demografi-sosial>
      <div class="header-title" style="display: flex; align-items: center">
        <h4 class="card-title text-white mb-3" style="font-weight: bolder; margin-right: 10px">DEMOGRAFI PENDUDUK</h4>

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

    <b-collapse id="accordion-demografi-sosial" role="tabpanel" visible>
      <div class="card-body">
        <div class="row">
          <div class="col-xl-3 col-lg-3 col-md-12">
            <div class="card" data-aos="fade-up" data-aos-delay="400">
              <div class="flex-wrap card-header d-flex justify-content-between bg-secondary">
                <div class="header-title">
                  <h5 class="card-title text-white mb-3" style="font-weight: bolder; text-transform: capitalize">Jumlah Penduduk</h5>
                </div>
              </div>
              <div class="card-body">
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                  <div class="d-flex flex-wrap align-items-center justify-content-center">
                    <h1>981,822</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-xl-3 col-lg-3 col-md-12">
            <div class="card" data-aos="fade-up" data-aos-delay="400">
              <div class="flex-wrap card-header d-flex justify-content-between bg-secondary">
                <div class="header-title">
                  <h5 class="card-title text-white mb-3" style="font-weight: bolder; text-transform: capitalize">Jumlah Warga Miskin</h5>
                </div>
              </div>
              <div class="card-body">
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                  <div class="d-flex flex-wrap align-items-center justify-content-center">
                    <h1>50,164</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-xl-3 col-lg-3 col-md-12">
            <div class="card" data-aos="fade-up" data-aos-delay="400">
              <div class="flex-wrap card-header d-flex justify-content-between bg-secondary">
                <div class="header-title">
                  <h5 class="card-title text-white mb-3" style="font-weight: bolder; text-transform: capitalize">Jumlah Kelurahan</h5>
                </div>
              </div>
              <div class="card-body">
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                  <div class="d-flex flex-wrap align-items-center justify-content-center">
                    <h1>21</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-xl-3 col-lg-3 col-md-12">
            <div class="card" data-aos="fade-up" data-aos-delay="400">
              <div class="flex-wrap card-header d-flex justify-content-between bg-secondary">
                <div class="header-title">
                  <h5 class="card-title text-white mb-3" style="font-weight: bolder; text-transform: capitalize">Jumlah Desa</h5>
                </div>
              </div>
              <div class="card-body">
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                  <div class="d-flex flex-wrap align-items-center justify-content-center">
                    <h1>803</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-xl-4 col-lg-4 col-md-12">
            <div class="card" data-aos="fade-up" data-aos-delay="400">
              <div class="flex-wrap card-header d-flex justify-content-between bg-secondary">
                <div class="header-title">
                  <h5 class="card-title text-white mb-3" style="font-weight: bolder; text-transform: capitalize">Statistik Gender Penduduk</h5>
                </div>
              </div>
              <div class="card-body">
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                  <div class="d-flex flex-wrap align-items-center justify-content-center">
                    <apexchart width="460" type="pie" :options="chartGender.options" :series="chartGender.series"></apexchart>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-xl-8 col-lg-8 col-md-12">
            <div class="card" data-aos="fade-up" data-aos-delay="400">
              <div class="flex-wrap card-header d-flex justify-content-between bg-secondary">
                <div class="header-title">
                  <h5 class="card-title text-white mb-3" style="font-weight: bolder; text-transform: capitalize">Rentang Usia Penduduk</h5>
                </div>
              </div>
              <div class="card-body">
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                  <div class="d-flex flex-wrap align-items-center justify-content-center">
                    <apexchart type="bar" height="295" :options="chartRentangUsiaPenduduk.chartOptions" :series="chartRentangUsiaPenduduk.series" style="width: 100% !important"></apexchart>
                    <!-- <apexchart height="300" type="bar" :options="chartRentangUsiaPenduduk.options" :series="chartRentangUsiaPenduduk.series" style="width: 100% !important"></apexchart> -->
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
      chartGender: {
        options: {
          labels: ['Laki-laki', 'Perempuan']
        },
        series: [516242, 465580]
      },

      chartRentangUsiaPenduduk: {
        series: [
          {
            data: [110, 104, 98, 93, 95, 97, 92, 77, 62, 50, 37, 26, 16, 9, 5, 4]
          }
        ],
        chartOptions: {
          chart: {
            height: 350,
          },
          plotOptions: {
            bar: {
              columnWidth: '45%',
              distributed: true
            }
          },
          dataLabels: {
            enabled: false
          },
          legend: {
            show: false
          },
          xaxis: {
            categories: ['0-4', '5-9', '10-14', '15-19', '20-24', '25-29', '30-34', '35-39', '40-44', '45-49', '50-54', '55-59', '60-64', '65-69', '70-74', '75+'],
            labels: {
              style: {
                fontSize: '12px'
              }
            }
          }
        }
      }
    }
  }
}
</script>
