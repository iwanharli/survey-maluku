<template>
  <div class="card aos-init aos-animate" data-aos="fade-up" data-aos-delay="100">
    <div class="flex-wrap card-header d-flex justify-content-between bg-info custom-accordion2" block v-b-toggle.accordion-potensi-daerah>
      <div class="header-title" style="display: flex; align-items: center">
        <h4 class="card-title text-white mb-3" style="font-weight: bolder; margin-right: 10px">PROFIL POTENSI DAERAH</h4>

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

    <b-collapse id="accordion-potensi-daerah" role="tabpanel" visible>
      <div class="card-body">
        <div class="row">
          <div class="col-xl-3 col-lg-3 col-md-12">
            <div class="card" data-aos="fade-up" data-aos-delay="400">
              <div class="flex-wrap card-header d-flex justify-content-between bg-secondary">
                <div class="header-title">
                  <h5 class="card-title text-white mb-3" style="font-weight: bolder; text-transform: capitalize">Jumlah Lokasi Kumuh</h5>
                </div>
              </div>
              <div class="card-body">
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                  <div class="d-flex flex-wrap align-items-center justify-content-center">
                    <h1> 0 </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-xl-3 col-lg-3 col-md-12">
            <div class="card" data-aos="fade-up" data-aos-delay="400">
              <div class="flex-wrap card-header d-flex justify-content-between bg-secondary">
                <div class="header-title">
                  <h5 class="card-title text-white mb-3" style="font-weight: bolder; text-transform: capitalize">Jumlah Bangunan Kumuh</h5>
                </div>
              </div>
              <div class="card-body">
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                  <div class="d-flex flex-wrap align-items-center justify-content-center">
                    <h1> 0 </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-xl-3 col-lg-3 col-md-12">
            <div class="card" data-aos="fade-up" data-aos-delay="400">
              <div class="flex-wrap card-header d-flex justify-content-between bg-secondary">
                <div class="header-title">
                  <h5 class="card-title text-white mb-3" style="font-weight: bolder; text-transform: capitalize">Jumlah Tempat Ibadah</h5>
                </div>
              </div>
              <div class="card-body">
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                  <div class="d-flex flex-wrap align-items-center justify-content-center">
                    <h1> 87 </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-xl-3 col-lg-3 col-md-12">
            <div class="card" data-aos="fade-up" data-aos-delay="400">
              <div class="flex-wrap card-header d-flex justify-content-between bg-secondary">
                <div class="header-title">
                  <h5 class="card-title text-white mb-3" style="font-weight: bolder; text-transform: capitalize">Jumlah Fasilitas Pendidikan</h5>
                </div>
              </div>
              <div class="card-body">
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                  <div class="d-flex flex-wrap align-items-center justify-content-center">
                    <h1> 63 </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-xl-4 col-lg-4 col-md-12">
            <div class="card" data-aos="fade-up" data-aos-delay="400">
              <div class="flex-wrap card-header d-flex justify-content-between bg-secondary">
                <div class="header-title">
                  <h5 class="card-title text-white mb-3" style="font-weight: bolder; text-transform: capitalize">Tempat Ibadah</h5>
                </div>
              </div>
              <div class="card-body">
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                  <div class="d-flex flex-wrap align-items-center justify-content-center">
                    <apexchart width="460" type="donut" :options="chartTempatIbadah.options" :series="chartTempatIbadah.series"></apexchart>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-xl-8 col-lg-8 col-md-12">
            <div class="card" data-aos="fade-up" data-aos-delay="400">
              <div class="flex-wrap card-header d-flex justify-content-between bg-secondary">
                <div class="header-title">
                  <h5 class="card-title text-white mb-3" style="font-weight: bolder; text-transform: capitalize">Fasilitas Kesehatan</h5>
                </div>
              </div>
              <div class="card-body">
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                  <div class="d-flex flex-wrap align-items-center justify-content-center">
                    <apexchart height="300" type="bar" :options="chartFasilitasKesehatan.options" :series="chartFasilitasKesehatan.series" style="width: 100% !important"></apexchart>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-xl-12 col-lg-12 col-md-12">
            <div class="card" data-aos="fade-up" data-aos-delay="400">
              <div class="flex-wrap card-header d-flex justify-content-between bg-secondary">
                <div class="header-title">
                  <h5 class="card-title text-white mb-3" style="font-weight: bolder; text-transform: capitalize">Fasilitas Pendidikan</h5>
                </div>
              </div>
              <div class="card-body">
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                  <div class="d-flex flex-wrap align-items-center justify-content-center">
                    <apexchart :height="400" type="bar" class="dactivity1" id="dactivity1" :options="chartFasilitasPendidikan.options" :series="chartFasilitasPendidikan.series" style="width: 100% !important" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-xl-4 col-lg-4 col-md-4">
            <div class="card" data-aos="fade-up" data-aos-delay="400">
              <div class="flex-wrap card-header d-flex justify-content-between bg-secondary">
                <div class="header-title">
                  <h5 class="card-title text-white mb-3" style="font-weight: bolder; text-transform: capitalize">Penderita Gizi Buruk di Kabupaten</h5>
                </div>
              </div>
              <div class="card-body">
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                  <div class="d-flex flex-wrap align-items-center justify-content-center">
                    <apexchart type="treemap" height="350" :options="chartGiziBurukKabupaten.chartOptions" :series="chartGiziBurukKabupaten.series" style="width: 100% !important"></apexchart>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-xl-4 col-lg-4 col-md-4">
            <div class="card" data-aos="fade-up" data-aos-delay="400">
              <div class="flex-wrap card-header d-flex justify-content-between bg-secondary">
                <div class="header-title">
                  <h5 class="card-title text-white mb-3" style="font-weight: bolder; text-transform: capitalize">Penderita Gizi Buruk di Kecamatan</h5>
                </div>
              </div>
              <div class="card-body">
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                  <div class="d-flex flex-wrap align-items-center justify-content-center">
                    <apexchart type="treemap" height="350" :options="chartGiziBurukKecamatan.chartOptions" :series="chartGiziBurukKecamatan.series" style="width: 100% !important"></apexchart>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-xl-4 col-lg-4 col-md-4">
            <div class="card" data-aos="fade-up" data-aos-delay="400">
              <div class="flex-wrap card-header d-flex justify-content-between bg-secondary">
                <div class="header-title">
                  <h5 class="card-title text-white mb-3" style="font-weight: bolder; text-transform: capitalize">Penderita Gizi Buruk di Kelurahan</h5>
                </div>
              </div>
              <div class="card-body">
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                  <div class="d-flex flex-wrap align-items-center justify-content-center">
                    <apexchart type="treemap" height="350" :options="chartGiziBurukKelurahan.chartOptions" :series="chartGiziBurukKelurahan.series" style="width: 100% !important"></apexchart>
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
      latestIsu: [],
      statisticIsu: [],

      rotated: false,

      chartTempatIbadah: {
        options: {
          labels: ['Masjid', 'Gereja', 'Pura', 'Vihara', 'Kelenteng']
        },
        series: [97, 55, 15, 20, 10]
      },

      chartFasilitasKesehatan: {
        options: {
          xaxis: {
            categories: ['RSU', 'Puskesmas', 'Klinik Pratama', 'Apotek', 'Klinik Kesehatan Kerja', 'Pusat Rehabilitasi Medis', 'Pusat Gizi', 'RSJ']
          }
        },
        series: [
          {
            name: 'series-1',
            data: [5, 40, 12, 68, 5, 3, 1, 4]
          }
        ]
      },

      chartFasilitasPendidikan: {
        series: [
          {
            data: [23, 17, 15, 2, 4, 15, 20]
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
          colors: ['#33b2df', '#546E7A', '#d4526e', '#13d8aa', '#A5978B', '#2b908f', '#f9a3a4', '#90ee7e', '#f48024', '#69d2e7', '#69d2e7'],
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
            categories: ['Sekolah Dasar (SD)', 'Sekolah Menengah Pertama (SMP)', 'Sekolah Menengah Atas (SMA)', 'Perguruan Tinggi', 'Pusat Pendidikan Non-Formal', 'Taman Kanak-Kanak (TK)', 'Sekolah Menengah Kejuruan (SMK)']
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
                return val + ' sekolah'
              }
            }
          }
        }
      },

      chartGiziBurukKabupaten: {
        series: [
          {
            data: [
              {
                x: 'Kabupaten Sorong',
                y: 218
              },
              {
                x: 'Kabupaten Manokwari',
                y: 149
              },
              {
                x: 'Kabupaten Fak Fak',
                y: 184
              },
              {
                x: 'Kabupaten Sorong Selatan',
                y: 55
              },
              {
                x: 'Kabupaten Raja Ampat',
                y: 84
              },
              {
                x: 'Kabupaten Teluk Bintuni',
                y: 31
              },
              {
                x: 'Kabupaten Teluk Wondama',
                y: 70
              },
              {
                x: 'Kabupaten Kaimana',
                y: 30
              },
              {
                x: 'Kabupaten Tambrauw',
                y: 44
              },
              {
                x: 'Kabupaten Maybrat',
                y: 68
              },
              {
                x: 'Kabupaten Manokwari Selatan',
                y: 28
              },
              {
                x: 'Pegunungan Arfak',
                y: 19
              },
              {
                x: 'Kota Sorong',
                y: 29
              }
            ]
          }
        ],
        chartOptions: {
          legend: {
            show: false
          },
          chart: {
            height: 350,
            type: 'treemap'
          },
          title: {
            text: ' ',
            align: 'center'
          },
          colors: ['#3B93A5', '#F7B844', '#ADD8C7', '#EC3C65', '#CDD7B6', '#C1F666', '#D43F97', '#1E5D8C', '#421243', '#7F94B0', '#EF6537', '#C0ADDB'],
          plotOptions: {
            treemap: {
              distributed: true,
              enableShades: false
            }
          }
        }
      },

      chartGiziBurukKecamatan: {
        series: [
          {
            data: [
              {
                x: 'Makbon',
                y: 218
              },
              {
                x: 'Salawati',
                y: 149
              },
              {
                x: 'Prafi',
                y: 184
              },
              {
                x: 'Masni',
                y: 55
              },
              {
                x: 'Teminabuan',
                y: 84
              },
              {
                x: 'Wayer',
                y: 31
              }
            ]
          }
        ],
        chartOptions: {
          legend: {
            show: false
          },
          chart: {
            height: 350,
            type: 'treemap'
          },
          title: {
            text: ' ',
            align: 'center'
          },
          colors: ['#3B93A5', '#F7B844', '#ADD8C7', '#EC3C65', '#CDD7B6', '#C1F666', '#D43F97', '#1E5D8C', '#421243', '#7F94B0', '#EF6537', '#C0ADDB'],
          plotOptions: {
            treemap: {
              distributed: true,
              enableShades: false
            }
          }
        }
      },

      chartGiziBurukKelurahan: {
        series: [
          {
            data: [
              {
                x: 'Sawian',
                y: 2
              },
              {
                x: 'Sungguer',
                y: 5
              },
              {
                x: 'Gewerpe',
                y: 7
              },
              {
                x: 'Asbaken',
                y: 1
              },
              {
                x: 'Klarion',
                y: 3
              },
              {
                x: 'Mobi',
                y: 3
              }
            ]
          }
        ],
        chartOptions: {
          legend: {
            show: false
          },
          chart: {
            height: 350,
            type: 'treemap'
          },
          title: {
            text: ' ',
            align: 'center'
          },
          colors: ['#3B93A5', '#F7B844', '#ADD8C7', '#EC3C65', '#CDD7B6', '#C1F666', '#D43F97', '#1E5D8C', '#421243', '#7F94B0', '#EF6537', '#C0ADDB'],
          plotOptions: {
            treemap: {
              distributed: true,
              enableShades: false
            }
          }
        }
      }
    }
  }
}
</script>
