<template>
  <fieldset>
    <div class="form-card text-start">
      <b-row class="mb-5">
        <div class="col-12">
          <h6 class="steps">👉 Bagian 2-3 &nbsp;|&nbsp; <span style="color: red">Harap masukan informasi isu sesuai yang anda temukan di lapangan*</span></h6>
        </div>
      </b-row>
      <b-row>
        <b-col md="6" class="mt-2" style="display: none">
          <b-form-group label="Judul Isu: *">
            <b-form-input type="text" class="form-control" v-model="inputTitle" />
          </b-form-group>
        </b-col>
        <b-col md="4" class="mt-2">
          <b-form-group label="Kategori Isu: *">
            <b-form-select v-model="selectedCategory" :disabled="inputTitle">
              <option :value="null" disabled>Pilih Kategori</option>
              <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
            </b-form-select>
          </b-form-group>
        </b-col>
        <b-col md="12" class="mt-2">
          <b-form-group label="Deskripsi Isu: *">
            <b-form-textarea type="text" class="form-control" rows="4" v-model="inputDesc" :disabled="!selectedCategory" />
          </b-form-group>
        </b-col>
      </b-row>
    </div>
    <a href="#dokumen" @click="changeTab(3)" class="btn btn-primary next action-button float-end mt-4" value="Selanjutnya">Selanjutnya</a>
    <a href="#isu" @click="changeTab(1)" class="btn btn-dark previous action-button-previous float-end mt-4 me-3" value="Kembali">Kembali</a>
  </fieldset>
</template>
<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'PersonalComponent',
  setup(props, { emit }) {
    const changeTab = (value) => {
      emit('onClick', value)
    }
    return { props, changeTab }
  },

  data() {
    return {
      inputTitle: '-',
      selectedCategory: null,
      inputDesc: '',

      categories: null,
      gatherIsu: {}
    }
  },

  mounted() {
    this.fetchKategori()
  },

  methods: {
    fetchKategori() {
      const config = { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } }

      axios
        .get('/api/categories', config)
        .then((response) => {
          this.categories = response.data.data
          this.categories.sort((a, b) => a.id - b.id)

          console.log('💚 KATEGORI')
        })
        .catch((error) => {
          console.error('Failed to fetch categories:', error)
        })
    },

    gatheringIsu() {
      localStorage.setItem('judul', this.inputTitle)
      localStorage.setItem('kategori', this.selectedCategory)
      localStorage.setItem('deskripsi', this.inputDesc)

      console.clear()
      console.log('DETAIL DAERAH \t👉', localStorage.getItem('provinsi'), localStorage.getItem('kota'), localStorage.getItem('kecamatan'), localStorage.getItem('kelurahan'))
      console.log('DETAIL ISU \t\t👉', localStorage.getItem('judul'), localStorage.getItem('kategori'), localStorage.getItem('deskripsi'))
    },

    validateOptions() {
      return this.selectedKategori !== null && this.selectedKategori !== '' && this.inputDesc !== ''
    },

    changeTab(tabIndex) {
      if (tabIndex === 3) {
        this.gatheringIsu()

        if (this.validateOptions() === true) {
          this.$emit('onClick', tabIndex)
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Tolong lengkapi datanya sebelum melanjutkan!'
          })
        }
      } else {
        this.gatheringIsu()

        this.$emit('onClick', tabIndex)
      }
    }
  }
}
</script>
