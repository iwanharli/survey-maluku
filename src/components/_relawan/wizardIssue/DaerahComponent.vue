<template>
  <fieldset>
    <div class="form-card text-start">
      <b-row class="mb-5">
        <div class="col-12">
          <h6 class="steps">👉 Bagian 1-3 &nbsp;|&nbsp; <span style="color: red">Harap masukan informasi alamat Anda*</span></h6>
        </div>
      </b-row>
      <b-row class="text-dark" style="font-weight: bolder">
        <b-col md="6" class="mt-2">
          <b-form-group label="Provinsi: *">
            <b-form-select v-model="this.rid" disabled>
              <option :value="this.rid" selected>{{ this.rname }}</option>
            </b-form-select>
          </b-form-group>
        </b-col>
        <b-col md="6" class="mt-2">
          <b-form-group label="Kota/Kabupaten: *">
            <b-form-select v-model="selectedCity" @change="fetchDistricts" :disabled="!cityFetched">
              <option :value="null" disabled>Pilih Kota/Kabupaten</option>
              <option v-for="city in cities" :key="city.code" :value="city.code">{{ city.name }}</option>
            </b-form-select>
          </b-form-group>
        </b-col>

        <b-col md="6" class="mt-2">
          <b-form-group label="Kecamatan: *">
            <b-form-select v-model="selectedDistrict" @change="fetchVillages" :disabled="!selectedCity || !districtFetched">
              <option :value="null" disabled>Pilih Kecamatan</option>
              <option v-for="district in districts" :key="district.code" :value="district.code">{{ district.name }}</option>
            </b-form-select>
          </b-form-group>
        </b-col>

        <b-col md="6" class="mt-2">
          <b-form-group label="Kelurahan: *">
            <b-form-select v-model="selectedVillage" :disabled="!selectedDistrict || !villageFetched">
              <option :value="null" disabled>Pilih Kelurahan</option>
              <option v-for="village in villages" :key="village.code" :value="village.code">{{ village.name }}</option>
            </b-form-select>
          </b-form-group>
        </b-col>

        <div class="mt-2 pt-4 pb-2" style="border-radius: 20px; background: #3a57e80d">
          <b-row>
            <b-col xl="6" lg="6" md="6" sm="6">
              <b-form-group label="RT: *">
                <b-form-input type="number" class="form-control" v-model="inputRT" :disabled="!selectedVillage" />
              </b-form-group>
            </b-col>
            <b-col xl="6" lg="6" md="6" sm="6">
              <b-form-group label="RW: *">
                <b-form-input type="number" class="form-control" v-model="inputRW" :disabled="!selectedVillage" />
              </b-form-group>
            </b-col>
          </b-row>
        </div>
      </b-row>
    </div>
    <a href="#isu" class="btn btn-primary next action-button float-end mt-4" @click="changeTab()" :disabled="!validateOptions()" value="Selanjutnya">Selanjutnya</a>
  </fieldset>
</template>
<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  setup(props, { emit }) {
    const changeTab = (value) => {
      emit('onClick', value)
    }
    return { props, changeTab }
  },

  data() {
    return {
      ProvinceFetched: false,
      cityFetched: false,
      districtFetched: false,
      villageFetched: false,

      provinces: [],
      cities: [],
      districts: [],
      villages: [],

      selectedProvince: null,
      selectedCity: null,
      selectedDistrict: null,
      selectedVillage: null,
      inputRT: '',
      inputRW: '',

      rid: localStorage.getItem('rid'),
      rname: localStorage.getItem('rname')
    }
  },

  async mounted() {
    this.fetchCities()
  },

  watch: {
    selectedCity: 'fetchDistricts',
    selectedDistrict: 'fetchVillages'
  },

  methods: {
    fetchProvinces() {
      this.ProvinceFetched = false
      axios
        .get('/api/indonesia/provinces')
        .then((response) => {
          this.provinces = response.data.data

          this.ProvinceFetched = true
        })
        .catch((error) => {
          console.error('Error fetching provinces', error)
        })
    },

    fetchCities() {
      this.cityFetched = false
      if (this.rid) {
        console.log('💚 PROVINCE', this.selectedProvince)

        axios
          .get(`/api/indonesia/cities?province_code=${this.rid}`)
          .then((response) => {
            this.cities = response.data.data
            this.districts = []
            this.villages = []

            this.cityFetched = true
          })
          .catch((error) => {
            console.error('Error fetching cities', error)
          })
      }
    },

    fetchDistricts() {
      this.districtFetched = false
      if (this.selectedCity) {
        console.log('💚 CITY', this.selectedCity)
        axios
          .get(`/api/indonesia/districts?city_code=${this.selectedCity}`)
          .then((response) => {
            this.districts = response.data.data
            this.villages = []

            this.districtFetched = true
          })
          .catch((error) => {
            console.error('Error fetching districts', error)
          })
      }
    },

    fetchVillages() {
      this.villageFetched = false
      if (this.selectedDistrict) {
        console.log('💚 DISTRICT', this.selectedDistrict)
        axios
          .get(`/api/indonesia/villages?district_code=${this.selectedDistrict}`)
          .then((response) => {
            this.villages = response.data.data

            this.villageFetched = true
          })
          .catch((error) => {
            console.error('Error fetching villages', error)
          })
      }
    },

    gatheringRegion() {
      if (this.selectedVillage) {
        console.log('💚 VILLAGE', this.selectedVillage)

        localStorage.setItem('provinsi', this.rid)
        localStorage.setItem('kota', this.selectedCity)
        localStorage.setItem('kecamatan', this.selectedDistrict)
        localStorage.setItem('kelurahan', this.selectedVillage)
        localStorage.setItem('rt', this.inputRT)
        localStorage.setItem('rw', this.inputRW)

        // console.clear()
        console.log('👉 ', localStorage.getItem('provinsi'), localStorage.getItem('kota'), localStorage.getItem('kecamatan'), localStorage.getItem('kelurahan'), localStorage.getItem('rt'), localStorage.getItem('rw'))
      }
    },

    validateOptions() {
      return this.selectedVillage !== null && this.selectedVillage !== '' && this.inputRT !== '' && this.inputRW !== ''
    },

    changeTab() {
      this.gatheringRegion()

      if (this.validateOptions() === true) {
        this.$emit('onClick', 2)
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Tolong lengkapi datanya sebelum melanjutkan!'
        })
      }
    },

    overlay() {
      setTimeout(() => {
        this.show = true

        // Set another timeout to hide the overlay after a short duration
        setTimeout(() => {
          this.show = false
        }, 1000) // Adjust this duration based on your requirement for how long you want the overlay to be visible
      }, 1000)
    }
  }
}
</script>
