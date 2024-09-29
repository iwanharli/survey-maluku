<template>
  <fieldset>
    <div class="form-card text-start">
      <h3 class="text-center bg-soft-warning mb-4" style="line-height: 60px; padding: 10px 20px 10px 20px; border-radius: 20px;"> APA ANDA YAKIN INGIN SUBMIT ISU TERSEBUT DENGAN KLIK TOMBOL SUBMIT, DENGAN INI SAYA BERTANGGUNG JAWAB ATAS APA YANG SAYA SUBMIT</h3>


      <!-- <b-row class="mb-5">
        <div class="col-12">
          <h6 class="steps">👉 Bagian 3-3 &nbsp;|&nbsp; <span style="color: red">Harap masukan dokumen bukti*</span></h6>
        </div>
      </b-row>
      <div class="form-group">
        <label class="form-label" style="font-weight: bold">* Maksimal Ukuran File yang di ijinkan adalah 2MB</label>
        <br/>
        <label class="form-label" style="font-weight: bold">* Dokumen yang diperbolehkan : zip, rar, 7z, png, jpg, jpeg, mp4, pdf, pptx, docx, xlsx, mp3, wav</label>
        <input type="file" class="form-control" accept=".png, .jpg, .jpeg, .pdf, .mp4" ref="fileInput" @change="handleFileUpload" />
      </div> -->
    </div>
    <!-- <b-form-file multiple>
      <template slot="file-name" slot-scope="{ names }">
        <b-badge v-if="names && names.length > 0" variant="dark">{{ names[0] }}</b-badge>
        <b-badge v-if="names && names.length > 1" variant="dark" class="ml-1"> + {{ names.length - 1 }} More files </b-badge>
      </template>
    </b-form-file> -->

    <a href="#finish" @click="changeTab(4)" class="btn btn-primary next action-button float-end mt-4" value="Submit">Submit</a>
    <a href="#isu" @click="changeTab(2)" class="btn btn-dark previous action-button-previous float-end mt-4 me-3" value="Kembali">Kembali</a>
  </fieldset>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'ImageComponent',
  setup(props, { emit }) {
    const changeTab = (value) => {
      emit('onClick', value)
    }
    return { props, changeTab }
  },

  data() {
    return {
      file_upload: null
    }
  },

  methods: {
    async handleFileUpload(event) {
      const fileInput = this.$refs.fileInput

      return   // without handler document

      if (fileInput.files.length > 0) {
        const selectedFile = fileInput.files[0]
        const allowedExtensions = ['.png', '.jpg', '.jpeg', '.pdf', '.mp4']
        const fileExtension = selectedFile.name.split('.').pop().toLowerCase()

        if (!allowedExtensions.includes('.' + fileExtension)) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Jenis file tidak diijinkan 🤓!'
          })
          fileInput.value = ''
          return
        } else {
          this.file_upload = event.target.files[0]
          console.log('File selected:', this.file_upload)
        }
      }
    },

    async submitFormIsu(tabIndex) {
      console.log('DETAIL DAERAH \t👉', localStorage.getItem('provinsi'), localStorage.getItem('kota'), localStorage.getItem('kecamatan'), localStorage.getItem('kelurahan'))
      console.log('DETAIL ISU \t\t👉', localStorage.getItem('judul'), localStorage.getItem('kategori'), localStorage.getItem('deskripsi'))

      const config = {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
      }

      const formData = new FormData()
      formData.append('title', localStorage.getItem('judul'))
      formData.append('issue_category_id', localStorage.getItem('kategori'))
      formData.append('description_text', localStorage.getItem('deskripsi'))
      // formData.append('upload_file', this.file_upload)
      formData.append('indonesia_province_code', localStorage.getItem('provinsi'))
      formData.append('indonesia_city_code', localStorage.getItem('kota'))
      formData.append('indonesia_district_code', localStorage.getItem('kecamatan'))
      formData.append('indonesia_village_code', localStorage.getItem('kelurahan'))
      formData.append('rt', localStorage.getItem('rt'))
      formData.append('rw', localStorage.getItem('rw'))

      console.log(formData, config)

      await axios
        .post('/api/issue-reports', formData, config)
        .then((response) => {
          // console.clear()
          console.log('ISSUE SUBMITTED', response.data.data)
          console.log('DELETING LOCALSTORAGE__')

          localStorage.removeItem('judul')
          localStorage.removeItem('kategori')
          localStorage.removeItem('deskripsi')
          localStorage.removeItem('provinsi')
          localStorage.removeItem('kota')
          localStorage.removeItem('kecamatan')
          localStorage.removeItem('kelurahan')
          localStorage.removeItem('rt')
          localStorage.removeItem('rw')

          this.$emit('onClick', tabIndex)

          Swal.fire({
            title: 'Terimakasih!',
            text: 'Berhasil menambahkan isu😊',
            icon: 'success',
            showCancelButton: true,
            confirmButtonText: 'Lihat List Isu',
            cancelButtonText: 'Input Isu Lagi'
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = '/responden-issue'
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              window.location.href = '/input-issue'
            }
          })
        })
        .catch((error) => {
          if ((error.response.status = 400)) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Tolong isi semua data!'
            })
          } else {
            Swal.fire({
              icon: 'warning',
              title: 'Oops...',
              text: 'Error, gagal menyimpan data'
            })
          }

          console.error('Error SUBMIT:', error)
        })
    },

    validateOptions() {
      return true

      return this.file_upload !== null
    },

    changeTab(tabIndex) {
      if (this.validateOptions() === true) {
        this.submitFormIsu(tabIndex)
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Tolong lengkapi datanya sebelum melanjutkan!'
        })
      }
    }
  }
}
</script>
