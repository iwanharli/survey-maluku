<template>
  <b-row>
    <b-col xl="12" lg="12" class="custom-mobile">
      <div class="card-header d-flex justify-content-between bg-info mt-4 mb-4" style="padding: 20px; border-radius: 20px; border: 5px solid white;">
        <div class="header-title">
          <h4 class="card-title text-white" style="font-weight: bold; font-size: 20px">BIODATA ANAK <span style="color: red">*</span></h4>
        </div>
      </div>
    </b-col>
    <b-col xl="6" lg="4">
      <!-- BIODATA ANAK-->
      <b-card>
        <div class="card-body" style="font-weight: bold">
          <b-row>
            <b-col md="12" class="form-group">
              <label class="form-label text-dark">Nama Anak:</label>
              <input type="text" class="form-control" v-model="inputNama" />
            </b-col>
            <b-col md="12" class="form-group">
              <label class="form-label text-dark">Tempat Lahir:</label>
              <input type="text" class="form-control" v-model="inputTempatLahir" />
            </b-col>
            <b-col md="12" class="form-group">
              <label class="form-label text-dark">Tanggal Lahir:</label>
              <input type="date" class="form-control" v-model="inputTanggalLahir" />
            </b-col>
            <b-col md="12" class="form-group mt-2">
              <label class="form-label text-dark">Jenis Kelamin</label>
              <select name="type" class="selectpicker form-control" v-model="selectedJenisKelamin">
                <option value="">- Pilih -</option>
                <option value="male">Laki-Laki</option>
                <option value="female">Perempuan</option>
              </select>
            </b-col>
            <b-col md="4" class="form-group mt-2">
              <label class="form-label text-dark">Usia (bulan)</label>
              <input type="number" class="form-control" v-model="inputUsia" @input="validateAge" />
              <small style="color: red" v-if="isAgeInvalid">Maksimal 59 bulan.</small>
            </b-col>
            <b-col md="4" class="form-group mt-2">
              <label class="form-label text-dark">Tinggi (cm)</label>
              <input type="number" class="form-control" v-model="inputTinggi" />
            </b-col>
            <b-col md="4" class="form-group mt-2">
              <label class="form-label text-dark">Berat (kg)</label>
              <input type="number" class="form-control" v-model="inputBerat" />
            </b-col>
            <b-col md="12" class="form-group mt-2">
              <label class="form-label text-dark">Upload Foto Anak</label> &nbsp;
              <input type="file" accept="image/*" @change="handleFileUpload" />
              <small style="color: red" v-if="invalidFile">Invalid file. Please upload an image (PNG, JPEG, JPG) with a maximum size of 1MB.</small>
            </b-col>
          </b-row>
        </div>
      </b-card>
    </b-col>

    <b-col xl="6" lg="8">
      <!-- WILAYAH  -->
      <b-card>
        <div class="card-body" style="font-weight: bold">
          <b-row class="text-dark" style="font-weight: bolder">
            <b-col md="12" class="form-group">
              <label class="form-label text-dark">Alamat:</label>
              <input type="text" class="form-control" v-model="inputAlamat" />
            </b-col>
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
      </b-card>

      <b-col md="12" class="form-group mt-3 text-end">
        <button type="submit" class="btn btn-primary w-100 mb-5" @click="validationInput()" style="font-weight: bolder">SUBMIT SURVEY</button>
      </b-col>
    </b-col>
  </b-row>
</template>
<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  data() {
    return {
      inputNama: '',
      inputTempatLahir: '',
      inputTanggalLahir: '',
      selectedJenisKelamin: '',
      inputUsia: '',
      inputTinggi: '',
      inputBerat: '',
      uploadedFoto: null,
      invalidFoto: false, // To track if the uploaded file is invalid

      inputAlamat: '',
      selectedProvince: null,
      selectedCity: null,
      selectedDistrict: null,
      selectedVillage: null,

      ProvinceFetched: false,
      cityFetched: false,
      districtFetched: false,
      villageFetched: false,

      provinces: [],
      cities: [],
      districts: [],
      villages: [],

      provinsiList: null,
      kotaList: null,
      kecamatanList: null,
      kelurahanList: null,

      buttonVariant: 'outline-primary',
      isAgeInvalid: false
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

        console.clear()
        console.log('👉 ', localStorage.getItem('provinsi'), localStorage.getItem('kota'), localStorage.getItem('kecamatan'), localStorage.getItem('kelurahan'))
      }
    },

    // FOTO
    handleFileUpload(event) {
      const file = event.target.files[0]
      if (file) {
        // Check if the file type is an image
        if (!file.type.startsWith('image/')) {
          this.invalidFoto = true
          return
        }

        // Check if the file size is greater than 1MB
        if (file.size > 1024 * 1024) {
          this.invalidFoto = true
          return
        }

        // Clear the error message if the file is valid
        this.invalidFoto = false

        // Store the uploaded file
        this.uploadedFoto = file
        console.log('Uploaded file:', file)
      }
    },

    // VALIDASI INPUT
    validationInput() {
      if (!this.inputNama) {
        Swal.fire({
          icon: 'error',
          title: 'NAMA ANAK',
          text: '(tidak boleh kosong)',
          showConfirmButton: false,
          timer: 1500
        })
        return
      }

      if (!this.inputTempatLahir) {
        Swal.fire({
          icon: 'error',
          title: 'TEMPAT LAHIR',
          text: '(tidak boleh kosong)',
          showConfirmButton: false,
          timer: 1500
        })
        return
      }

      if (!this.inputTanggalLahir) {
        Swal.fire({
          icon: 'error',
          title: 'TANGGAL LAHIR',
          text: '(tidak boleh kosong)',
          showConfirmButton: false,
          timer: 1500
        })
        return
      }

      if (!this.selectedJenisKelamin) {
        Swal.fire({
          icon: 'error',
          title: 'JENIS KELAMIN ANAK',
          text: '(tidak boleh kosong)',
          showConfirmButton: false,
          timer: 1500
        })
        return
      }

      if (!this.inputUsia) {
        Swal.fire({
          icon: 'error',
          title: 'USIA ANAK',
          text: '(tidak boleh kosong)',
          showConfirmButton: false,
          timer: 1500
        })
        return
      }

      if (!this.inputTinggi) {
        Swal.fire({
          icon: 'error',
          title: 'TINGGI ANAK',
          text: '(tidak boleh kosong)',
          showConfirmButton: false,
          timer: 1500
        })
        return
      }

      if (!this.inputBerat) {
        Swal.fire({
          icon: 'error',
          title: 'BERAT ANAK',
          text: '(tidak boleh kosong)',
          showConfirmButton: false,
          timer: 1500
        })
        return
      }

      if (!this.inputAlamat) {
        Swal.fire({
          icon: 'error',
          title: 'ALAMAT',
          text: '(tidak boleh kosong)',
          showConfirmButton: false,
          timer: 1500
        })
        return
      }

      if (!this.selectedProvince) {
        Swal.fire({
          icon: 'error',
          title: 'PROVINSI',
          text: '(tidak boleh kosong)',
          showConfirmButton: false,
          timer: 1500
        })
        return
      }

      if (!this.selectedCity) {
        Swal.fire({
          icon: 'error',
          title: 'KOTA',
          text: '(tidak boleh kosong)',
          showConfirmButton: false,
          timer: 1500
        })
        return
      }

      if (!this.selectedDistrict) {
        Swal.fire({
          icon: 'error',
          title: 'KECAMATAN',
          text: '(tidak boleh kosong)',
          showConfirmButton: false,
          timer: 1500
        })
        return
      }

      if (!this.selectedVillage) {
        Swal.fire({
          icon: 'error',
          title: 'KELURAHAN',
          text: '(tidak boleh kosong)',
          showConfirmButton: false,
          timer: 1500
        })
        return
      }

      console.log('💚 Validation Passed')
      this.submitSurvey()
    },

    // VALIDASI UMUR
    validateAge() {
      const enteredAge = parseInt(this.inputUsia, 10)
      this.isAgeInvalid = enteredAge > 59
    },

    // SUBMIT SURVEY
    async submitSurvey() {
      const config = {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
      }

      const formData = new FormData()
      formData.append('fullname', this.inputNama)
      formData.append('birthplace', this.inputTempatLahir)
      formData.append('birthdate', this.inputTanggalLahir)
      formData.append('gender', this.selectedJenisKelamin)
      formData.append('age', this.inputUsia)
      formData.append('height', this.inputTinggi)
      formData.append('weight', this.inputBerat)
      formData.append('address', this.inputAlamat)
      formData.append('upload_file', this.file)

      formData.append('indonesia_province_code', this.selectedProvince)
      formData.append('indonesia_city_code', this.selectedCity)
      formData.append('indonesia_district_code', this.selectedDistrict)
      formData.append('indonesia_village_code', this.selectedVillage)

      console.log(formData, config)

      await axios
        .post('/api/stunting-reports', formData, config)
        .then((response) => {
          // console.clear()
          console.log('💚 SURVEY PAPUA SUBMITTED', response.data.data)
          console.log('👽 RESETING FORM__')

          Swal.fire({
            title: 'Terimakasih!',
            text: 'Survey telah berhasil disimpan 😊',
            icon: 'success',
            showConfirmButton: false,
            timer: 3000
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

<style lang="scss">
@media only screen and (max-width: 950px) {
  .custom-mobile {
    margin-top: 120px !important;
  }
}

.dropdown-toggle-no-caret::after {
  content: unset;
  border: 0;
}
.ghost {
  opacity: 0.5;
}
.list-group-item {
  cursor: move;
}
.list-group-item i {
  cursor: pointer;
}

.addCard:hover {
  background-color: rgba(0, 0, 0, 0.637) !important;
}

.btnQuestion {
  margin-right: 10px;
  text-transform: uppercase;
  font-weight: bold;
}
</style>
