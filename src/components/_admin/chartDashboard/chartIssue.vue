<template>
  <div class="card aos-init aos-animate" data-aos="fade-up" data-aos-delay="100">
    <div class="flex-wrap card-header d-flex justify-content-between bg-primary custom-accordion" block v-b-toggle.accordion-issue>
      <div class="header-title" style="display: flex; align-items: center">
        <h4 class="card-title text-white mb-3" style="font-weight: bolder; margin-right: 10px">PANEL ISU</h4>

        <svg fill="#ffffff" width="40px" height="40px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff" class="rotate" style="margin-top: -15px; float: right">
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
    <b-collapse id="accordion-issue" role="tabpanel">
      <div class="card-body bg-primary">
        <div class="row">
          <!-- DAFTAR ISU TERBARU -->
          <div class="col-xl-6 col-lg-6">
            <div class="card" data-aos="fade-up" data-aos-delay="200">
              <div class="flex-wrap card-header d-flex justify-content-between bg-secondary">
                <div class="header-title pb-3">
                  <h5 class="card-title text-white" style="font-weight: bolder">ISU TERBARU</h5>
                </div>
              </div>
              <div class="card-body custom-daftar-isu">
                <div class="mb-2 d-flex align-items-top" v-for="item in latestIsu" :key="item.id">
                  🚀
                  <div class="ms-4">
                    <h6 style="text-transform: capitalize; text-align: left">{{ item.description_text }}</h6>
                    <small class="text-muted">{{ item.created_at }}</small>
                    <hr />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-xl-6 col-lg-6">
            <!-- CHART ISU PROVINSI  -->
            <div class="col-xl-12 col-lg-12">
              <div class="card" data-aos="fade-up" data-aos-delay="200">
                <div class="flex-wrap card-header d-flex justify-content-between bg-secondary">
                  <div class="header-title">
                    <h5 class="card-title text-white mb-3" style="font-weight: bolder">ISU PER PROVINSI</h5>
                  </div>
                </div>
                <div class="card-body">
                  <apexchart :height="700" type="bar" class="dactivity1" id="dactivity1" :options="chartProvince.options" :series="chartProvince.series" />
                </div>
              </div>
            </div>

            <!-- CHART ISSUE KATEGORI -->
            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
              <div class="card" data-aos="fade-up" data-aos-delay="400">
                <div class="flex-wrap card-header d-flex justify-content-between bg-secondary">
                  <div class="header-title">
                    <h5 class="card-title text-white mb-3" style="font-weight: bolder">ISU PER KATEGORI</h5>
                  </div>
                </div>
                <div class="card-body">
                  <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                    <div class="d-flex flex-wrap align-items-center justify-content-center">
                      <apexchart type="pie" :options="chartCategory.chartOptions" :series="chartCategory.series" style="width: 83%"></apexchart>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- CHART ISU PERHARI  -->
          <div class="col-xl-12 col-lg-12">
            <div class="card" data-aos="fade-up" data-aos-delay="500">
              <div class="flex-wrap card-header d-flex justify-content-between bg-secondary">
                <div class="header-title">
                  <h4 class="mb-4 card-title text-white" style="font-weight: bolder">JUMLAH ISU PER HARI</h4>
                </div>
              </div>
              <div class="card-body">
                <apexchart type="line" height="350" :options="chartDateIsu.chartOptions" :series="chartDateIsu.series"></apexchart>
                <!-- <apexchart :height="270" type="bar" class="dactivity1" id="dactivity1" :options="chartDateIsu.options" :series="chartDateIsu.series" /> -->
              </div>
            </div>
          </div>

          <div class="col-xl-12 col-lg-12">
            <div class="card" data-aos="fade-up" data-aos-delay="500" style="border-radius: 50px">
              <div class="flex-wrap card-header d-flex justify-content-center align-items-center" style="background: #fffa10; border-radius: 50px">
                <div class="header-title text-center">
                  <h4 class="mb-4 card-title text-dark" style="font-weight: bolder; text-transform: capitalize">visualisasi diatas hanyalah preview, tidak mempresentasikan hasil yang sebenarnya</h4>
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
      latestIsu: [
        { id: 1, description_text: 'Kebijakan Pemulihan Ekonomi Pasca Pandemi', created_at: '2024-09-25' },
        { id: 2, description_text: 'Isu Lingkungan Hidup: Kebakaran Hutan', created_at: '2024-09-24' },
        { id: 3, description_text: 'Pendidikan Jarak Jauh di Era Digital', created_at: '2024-09-23' },
        { id: 4, description_text: 'Penanganan Kasus Kekerasan Terhadap Perempuan', created_at: '2024-09-22' },
        { id: 5, description_text: 'Investasi Asing di Sektor Infrastruktur', created_at: '2024-09-21' },
        { id: 6, description_text: 'Pertumbuhan Ekonomi Digital', created_at: '2024-09-20' },
        { id: 7, description_text: 'Isu Keamanan Siber di Tengah Transformasi Digital', created_at: '2024-09-19' },
        { id: 8, description_text: 'Konservasi Biodiversitas di Indonesia', created_at: '2024-09-18' },
        { id: 9, description_text: 'Pengembangan Energi Terbarukan', created_at: '2024-09-17' },
        { id: 10, description_text: 'Pembangunan Wilayah Terpencil', created_at: '2024-09-16' },
        { id: 11, description_text: 'Reformasi Sistem Pendidikan di Indonesia', created_at: '2024-09-15' },
        { id: 12, description_text: 'Krisis Air Bersih di Beberapa Daerah', created_at: '2024-09-14' },
        { id: 13, description_text: 'Perubahan Iklim dan Dampaknya', created_at: '2024-09-13' },
        { id: 14, description_text: 'Isu Perumahan Terjangkau', created_at: '2024-09-12' },
        { id: 15, description_text: 'Peningkatan Kualitas Layanan Kesehatan', created_at: '2024-09-11' },
        { id: 16, description_text: 'Perlindungan Anak dari Kekerasan', created_at: '2024-09-10' },
        { id: 17, description_text: 'Kemandirian Energi Nasional', created_at: '2024-09-09' },
        { id: 18, description_text: 'Isu Kesetaraan Gender di Tempat Kerja', created_at: '2024-09-08' },
        { id: 19, description_text: 'Kebijakan Pajak dan Pengaruhnya pada Masyarakat', created_at: '2024-09-07' },
        { id: 20, description_text: 'Pengaruh Teknologi Terhadap Kehidupan Sehari-hari', created_at: '2024-09-06' }
      ],
      statisticIsu: [],
      rotated: false
    }
  },

  setup() {
    function getRandomData(length) {
      return Array.from({ length }, () => Math.floor(Math.random() * 100))
    }

    const modules = [Navigation]

    const chartProvince = ref({
      series: [
        {
          data: []
        }
      ],
      options: {
        chart: {
          type: 'bar',
          height: 120,
          stacked: false,
          toolbar: {
            show: true
          }
        },
        colors: ['#33b2df', '#546E7A', '#d4526e', '#13d8aa', '#A5978B', '#2b908f', '#f9a3a4', '#90ee7e', '#f48024', '#69d2e7'],
        plotOptions: {
          bar: {
            barHeight: '100%',
            distributed: true,
            horizontal: true,
            columnWidth: '28%',
            endingShape: 'rounded',
            borderRadius: 5,
            dataLabels: {
              position: 'bottom'
            }
          }
        },
        legend: {
          show: true
        },
        dataLabels: {
          enabled: true,
          textAnchor: 'start',
          style: {
            colors: ['#fff']
          },
          formatter: function (val, opt) {
            return opt.w.globals.labels[opt.dataPointIndex] + ':  ' + val
          },
          offsetX: 0,
          dropShadow: {
            enabled: true
          }
        },
        stroke: {
          width: 1,
          colors: ['#fff']
        },
        xaxis: {
          categories: []
        },
        yaxis: {
          labels: {
            show: false
          }
        },
        title: {
          text: '',
          align: 'center',
          floating: true
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          x: {
            show: true
          },
          y: {
            formatter: function (val) {
              return val + 'Pemilih'
            }
          }
        }
      }
    })

    const chartDateIsu = ref({
      series: [
        {
          name: 'Total',
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
        }
      ],
      chartOptions: {
        chart: {
          height: 350,
          type: 'line',
          zoom: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'straight'
        },
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
          }
        },
        xaxis: {
          categories: []
        }
      }
    })

    const chartCategory = ref({
      series: [],
      chartOptions: {
        chart: {
          type: 'pie'
        },
        legend: {
          position: 'bottom'
        },
        labels: [],
        tooltip: {
          x: {
            show: true
          }
        }
      }
    })

    // DUMMY CHARTDATE ISU
    const generateDummyData = () => {
      const invertedIssueNames = ['Issue A', 'Issue B', 'Issue C', 'Issue D', 'Issue E']
      const invertedIssueValues = [5, 15, 25, 10, 20]
      chartDateIsu.value.series[0].data = invertedIssueValues
      chartDateIsu.value.chartOptions.xaxis.categories = invertedIssueNames
    }
    generateDummyData()
    // DUMMY CHARTDATE ISU

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
    return { modules, chartProvince, chartDateIsu, chartCategory }
  },

  mounted() {
    this.fetchLatestIsu(), this.fetchIsuStatistic()
  },

  methods: {
    fetchLatestIsu() {
      const config = { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } }
      axios
        .get('/api/issue-reports/all?page=1&limit=150', config)
        .then((response) => {
          // this.latestIsu = response.data.data
          console.log('💚 LATEST ISU', response)
        })
        .catch((error) => {
          console.error('💥 LATEST ISSUE Error:', error)
        })
    },

    fetchIsuStatistic() {
      const config = { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } }
      axios
        .get('/api/visualization/dashboard', config)
        .then((response) => {
          this.statisticIsu = response.data.data
          const invertedIssueValues = this.statisticIsu.issue_chart.values.slice().reverse()
          const invertedIssueNames = this.statisticIsu.issue_chart.names.slice().reverse()

          console.log(this.statisticIsu)

          // DUMMY
          this.statisticIsu_Province_Dump = {
            province_chart: {
              names: ['Province A', 'Province B', 'Province C', 'Province D', 'Province E'],
              values: [10, 25, 15, 30, 20]
            }
          }

          this.statisticIsu_Category_Dump = {
            category_chart: {
              names: ['politik', 'ekonomi', 'keamanan', 'Lain-Lain'],
              values: [30, 20, 25, 15]
            }
          }
          // DUMMY

          this.chartProvince = {
            series: [
              {
                data: this.statisticIsu_Province_Dump.province_chart.values
              }
            ],
            options: {
              xaxis: {
                categories: this.statisticIsu_Province_Dump.province_chart.names
              }
            }
          }

          // this.chartDateIsu = ref({
          //   series: [
          //     {
          //       name: 'Total',
          //       data: invertedIssueValues
          //     }
          //   ],
          //   chartOptions: {
          //     xaxis: {
          //       categories: invertedIssueNames
          //     }
          //   }
          // })

          this.chartCategory = {
            series: this.statisticIsu_Category_Dump.category_chart.values,
            chartOptions: {
              labels: this.statisticIsu_Category_Dump.category_chart.names
            }
          }

          console.log('💚 STATISTIC ISU', this.chartCategory)
        })
        .catch((error) => {
          console.error('💥 STATISTIC ISU Error:', error)
        })
    },

    rotateSvg() {
      this.rotated = !this.rotated
    }
  }
}
</script>

<style scoped>
@media only screen and (min-width: 1501px) {
  .custom-daftar-isu {
    height: 1320px;
    overflow-y: auto;
  }
}

@media only screen and (max-width: 1500px) {
  .custom-daftar-isu {
    max-height: fit-content;
  }
}

@media only screen and (max-width: 445px) {
  .halo {
    display: none;
  }
  .mobile {
    display: none;
  }

  .mobile2 {
    display: contents;
  }
}

.custom-accordion:hover {
  background: #2e46bb !important;
  cursor: pointer;
}

.rotate {
  transition: transform 0.3s ease-out;
  /* transform: rotate(-20deg); */
}
</style>
