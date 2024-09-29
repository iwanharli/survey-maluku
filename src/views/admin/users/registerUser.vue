<template>
  <b-row>
    <b-col md="12" class="form-group mb-3 text-center">
      <div class="card">
        <div class="card-header d-flex justify-content-between pb-3" style="border-bottom: 10px solid rgb(173, 10, 10)">
          <div class="header-title">
            <b-card-title><span style="font-weight: bold">TAMBAH USER &nbsp; &nbsp; </span><span style="color: red; font-size: medium">(*) diwajibkan diisi❗</span></b-card-title>
          </div>
        </div>
      </div>
    </b-col>

    <b-col xl="6" lg="4">
      <!-- ROLE  -->
      <div class="card">
        <div class="card-header d-flex justify-content-between">
          <div class="header-title">
            <b-card-title style="font-weight: bold; font-size: 20px">HAK AKSES <span style="color: red">*</span></b-card-title>
          </div>
        </div>
        <hr />
        <div class="card-body">
          <div class="form-group">
            <label class="form-label">User Role:</label>
            <select name="type" class="selectpicker form-control" v-model="selectedRole">
              <option value="">- Pilih User Role -</option>
              <option value="admin">Admin</option>
              <option value="koordinator">Koordinator</option>
              <option value="relawan">Relawan</option>
            </select>
          </div>
        </div>
      </div>

      <!-- BIODATA  -->
      <div class="card">
        <div class="card-header d-flex justify-content-between">
          <div class="header-title">
            <h4 class="card-title" style="font-weight: bold; font-size: 20px">BIODATA PENGGUNA <span style="color: red">*</span></h4>
          </div>
        </div>
        <hr />
        <div class="card-body">
          <b-row>
            <b-col md="6" class="form-group">
              <label class="form-label">Nama:</label>
              <input type="text" class="form-control" v-model="inputNama" />
            </b-col>
            <b-col md="6" class="form-group">
              <label class="form-label">No HP:</label>
              <input type="number" class="form-control" placeholder="08xx-xxxx-xxxx" v-model="inputNoHp" />
            </b-col>
            <b-col md="4" class="form-group">
              <label class="form-label">Kota Kelahiran:</label>
              <input type="text" class="form-control" v-model="inputTempatLahir" />
            </b-col>
            <b-col md="5" class="form-group">
              <label class="form-label">Tanggal Lahir</label>
              <input type="date" class="form-control" v-model="inputTanggalLahir" @input="validateBirthdate" />
              <small v-if="!validateBirthdate()" style="color: red">Minimal 17 tahun.</small>
            </b-col>
            <b-col md="3" class="form-group">
              <label class="form-label">Jenis Kelamin</label>
              <select name="type" class="selectpicker form-control" v-model="selectedJenisKelamin">
                <option value="">- Pilih -</option>
                <option value="male">Laki-Laki</option>
                <option value="female">Perempuan</option>
              </select>
            </b-col>
          </b-row>
        </div>
      </div>
    </b-col>

    <b-col xl="6" lg="8">
      <!-- WILAYAH  -->
      <div class="card">
        <div class="card-header d-flex justify-content-between">
          <div class="header-title">
            <h4 class="card-title" style="font-weight: bold; font-size: 20px">ASAL/PENUGASAN</h4>
          </div>
        </div>
        <hr />
        <div class="card-body">
          <b-row>
            <b-col md="6" class="mt-2">
              <b-form-group label="Provinsi: *">
                <b-form-select v-model="selectedProvince" @change="fetchCities" :disabled="!ProvinceFetched">
                  <option :value="null" disabled>Pilih Provinsi</option>
                  <option v-for="province in this.provinces" :key="province.code" :value="province.code">{{ province.name }}</option>
                </b-form-select>
              </b-form-group>
            </b-col>
            <b-col md="6" class="mt-2">
              <b-form-group label="Kota/Kabupaten: *">
                <b-form-select v-model="selectedCity" @change="fetchDistricts" :disabled="!selectedProvince || !cityFetched">
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
                <b-form-select v-model="selectedVillage" @change="gatheringRegion" :disabled="!selectedDistrict || !villageFetched">
                  <option :value="null" disabled>Pilih Kelurahan</option>
                  <option v-for="village in villages" :key="village.code" :value="village.code">{{ village.name }}</option>
                </b-form-select>
              </b-form-group>
            </b-col>
          </b-row>
        </div>
      </div>

      <!-- KEAMANAN  -->
      <div class="card">
        <div class="card-header d-flex justify-content-between">
          <div class="header-title">
            <h4 class="card-title" style="font-weight: bold; font-size: 20px">KEAMANAN <span style="color: red">*</span></h4>
          </div>
        </div>
        <hr />
        <div class="card-body">
          <b-row>
            <b-col md="12" class="form-group">
              <label class="form-label" for="email">Email:</label>
              <input type="email" class="form-control" v-model="inputEmail" @input="validateEmail" />
            </b-col>
            <b-col md="6" class="form-group">
              <label class="form-label" for="pass">Password:</label>
              <input type="password" class="form-control" v-model="inputPassword" />
            </b-col>
            <b-col md="6" class="form-group">
              <label class="form-label" for="rpass">Ulangi Password:</label>
              <input type="password" class="form-control" v-model="inputRepeatedPassword" />
            </b-col>
          </b-row>
        </div>
      </div>

      <b-col md="12" class="form-group mt-3 text-end">
        <button type="submit" class="btn btn-primary w-100" @click="validationInput()">Tambah User</button>
      </b-col>
    </b-col>
  </b-row>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
import cityBirthplaceData from '@/store/city.json'

export default {
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
      // inputRT: '',
      // inputRW: '',

      selectedRole: '',
      inputNama: '',
      inputNoHp: '',
      inputTempatLahir: '',
      inputTanggalLahir: '',
      selectedJenisKelamin: '',
      inputEmail: '',
      inputPassword: '',
      inputRepeatedPassword: ''
    }
  },

  mounted() {
    this.fetchProvinces()
  },

  watch: {
    selectedProvince: 'fetchCities',
    selectedCity: 'fetchDistricts',
    selectedDistrict: 'fetchVillages',
    selectedVillage: 'gatheringRegion'
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
      if (this.selectedProvince) {
        console.log('💚 PROVINCE', this.selectedProvince)

        axios
          .get(`/api/indonesia/cities?province_code=${this.selectedProvince}`)
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

        localStorage.setItem('provinsi', this.selectedProvince)
        localStorage.setItem('kota', this.selectedCity)
        localStorage.setItem('kecamatan', this.selectedDistrict)
        localStorage.setItem('kelurahan', this.selectedVillage)

        // console.clear()
        console.log('👉 ', localStorage.getItem('provinsi'), localStorage.getItem('kota'), localStorage.getItem('kecamatan'), localStorage.getItem('kelurahan'))
      }
    },

    // INPUT VALIDATION
    validationInput() {
      if (!this.selectedRole) {
        Swal.fire({
          icon: 'error',
          title: 'ROLE',
          text: '(tidak boleh kosong)',
          showConfirmButton: false,
          timer: 1500
        })
        return
      }

      if (!this.inputNama) {
        Swal.fire({
          icon: 'error',
          title: 'NAMA',
          text: '(tidak boleh kosong)',
          showConfirmButton: false,
          timer: 1500
        })
        return
      }

      if (!this.inputNoHp || this.inputNoHp === null) {
        Swal.fire({
          icon: 'error',
          title: 'NO HP',
          text: '(tidak boleh kosong)',
          showConfirmButton: false,
          timer: 1500
        })
        return
      }

      if (!this.inputTempatLahir) {
        Swal.fire({
          icon: 'error',
          title: 'Kota Kelahiran',
          text: '(tidak boleh kosong)',
          showConfirmButton: false,
          timer: 1500
        })

        return
      }

      if (!this.inputTanggalLahir) {
        Swal.fire({
          icon: 'error',
          title: 'Tanggal Lahir',
          text: '(tidak boleh kosong)',
          showConfirmButton: false,
          timer: 1500
        })

        return
      }

      if (!this.validateBirthdate()) {
        Swal.fire({
          icon: 'error',
          title: 'Umur',
          text: '(harus lebih dari 17 tahun)',
          showConfirmButton: false,
          timer: 1500
        })
        return
      }

      if (!this.selectedJenisKelamin) {
        Swal.fire({
          icon: 'error',
          title: 'Jenis Kelamin',
          text: '(tidak boleh kosong)',
          showConfirmButton: false,
          timer: 1500
        })
        return
      }

      if (!this.inputEmail) {
        Swal.fire({
          icon: 'error',
          title: 'EMAIL',
          text: '(tidak boleh kosong)',
          showConfirmButton: false,
          timer: 1500
        })
        return
      }

      if (!this.isEmailValid) {
        Swal.fire({
          icon: 'error',
          title: 'EMAIL',
          text: '(tidak valid)',
          showConfirmButton: false,
          timer: 1500
        })
        return
      }

      if (!this.inputPassword) {
        Swal.fire({
          icon: 'error',
          title: 'PASSWORD',
          text: '(tidak boleh kosong)',
          showConfirmButton: false,
          timer: 1500
        })
        return
      }

      if (!this.inputRepeatedPassword) {
        Swal.fire({
          icon: 'error',
          title: 'PASSWORD',
          text: '(tidak boleh kosong)',
          showConfirmButton: false,
          timer: 1500
        })
        return
      }

      if (this.inputPassword !== this.inputRepeatedPassword) {
        Swal.fire({
          icon: 'error',
          title: 'PASSWORD',
          text: '(tidak cocok)',
          showConfirmButton: false,
          timer: 1500
        })
        return
      }

      console.log('💚 Validation Passed')
      this.submitRegister()
    },

    validateBirthdate() {
      const birthdate = new Date(this.inputTanggalLahir)
      const currentDate = new Date()
      const age = currentDate.getFullYear() - birthdate.getFullYear()

      return age >= 17
    },

    validateEmail() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      this.isEmailValid = emailRegex.test(this.inputEmail)
    },

    // SUBMIT FORM
    async submitRegister() {
      const config = {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
      }

      const formData = new FormData()
      formData.append('role', this.selectedRole)
      formData.append('name', this.inputNama)
      formData.append('email', this.inputEmail)
      formData.append('password', this.inputPassword)
      formData.append('retype_password', this.inputRepeatedPassword)
      formData.append('phone', this.inputNoHp)
      formData.append('gender', this.selectedJenisKelamin)
      formData.append('birthdate', this.inputTanggalLahir)
      formData.append('birthplace', this.selectedTempatLahir)
      formData.append('indonesia_province_code', this.selectedProvince)
      formData.append('indonesia_city_code', this.selectedCity)
      formData.append('indonesia_district_code', this.selectedDistrict)
      formData.append('indonesia_village_code', this.selectedVillage)

      // console.log(formData, config)

      await axios
        .post('/api/register', formData, config)
        .then((response) => {
          // console.clear()
          console.log('💚 USER REGISTER SUCCESS', response.data.data)
          console.log('👽 DELETING LOCALSTORAGE__')
          Swal.fire({
            title: 'Berhasil!',
            text: 'menambahkan user😊',
            icon: 'success',
            showConfirmButton: false,
            timer: 1000
          })

          window.location.reload()
        })
        .catch((error) => {
          console.error('Error SUBMIT:', error)
        })
    }
  }
}
</script>
