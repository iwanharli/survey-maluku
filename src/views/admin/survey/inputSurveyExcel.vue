<template>
  <b-row>
    <b-col xl="12" lg="12" md="12" sm="12" class="custom-mobile" style="border-radius: 2px solid blue">
      <b-card>
        <div class="card-header d-flex justify-content-between">
          <div class="header-title">
            <h4 class="card-title" style="font-weight: bold; font-size: 20px">INPUT EXCEL</h4>
          </div>
        </div>
        <hr />
        <div class="p-4">
          <div class="custom-file">
            <input type="file" ref="excelInput" class="custom-file-input" accept=".xlsx, .xls" @change="handleFileChange" id="customFile" />
          </div>
          <br />
          <div class="input-group-append" v-if="excelData.length > 0">
            <button @click="uploadExcel" class="btn btn-warning btn-md">Upload</button>
          </div>
        </div>
      </b-card>
    </b-col>

    <b-col xl="12" lg="12" md="12" sm="12" v-if="excelData.length > 0">
      <b-card>
        <div class="card-header d-flex justify-content-between">
          <div class="header-title">
            <h4 class="card-title" style="font-weight: bold; font-size: 20px">EXCEL VIEWER</h4>
          </div>
        </div>
        <hr />
        <div>
          <div class="table-responsive">
            <table id="user-list-table" class="table table-hover table-bordered mb-0" role="grid" data-toggle="data-table">
              <thead>
                <tr class="bg-primary text-white">
                  <th>Property</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(value, key) in excelProperties" :key="key">
                  <td>{{ key }}</td>
                  <td>{{ value }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <hr />
          <div class="table-responsive">
            <table id="user-list-table" class="table table-hover table-bordered mb-0" role="grid" data-toggle="data-table">
              <!-- <thead>
                <tr class="bg-secondary text-white">
                  <th v-for="header in excelData[0]" :key="header">{{ header }}</th>
                </tr>
              </thead> -->
              <tbody>
                <tr v-for="(row, index) in excelData" :key="index">
                  <td v-for="value in row" :key="value">{{ value }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
import * as XLSX from 'xlsx'

export default {
  data() {
    return {
      excelProperties: {},
      excelData: [],
      headerColors: []
    }
  },

  methods: {
    handleFileChange(event) {
      this.excelProperties = {}
      const file = event.target.files[0]

      if (file) {
        console.log(file)
        this.readExcel(file)

        const fileSize = file.size
        const formattedSize = this.formatFileSize(fileSize)

        this.excelProperties = {
          'File Name': file.name,
          'File Size': formattedSize,
          'Last Modified': file.lastModifiedDate,
          Type: file.type
        }

        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer
            toast.onmouseleave = Swal.resumeTimer
          }
        })

        Toast.fire({
          icon: 'success',
          title: `MENAMPILKAN EXCEL`
        })
      }
    },
    formatFileSize(sizeInBytes) {
      const KB = 1024
      const MB = KB * KB

      if (sizeInBytes < KB) {
        return sizeInBytes + ' B'
      } else if (sizeInBytes < MB) {
        return (sizeInBytes / KB).toFixed(2) + ' KB'
      } else {
        return (sizeInBytes / MB).toFixed(2) + ' MB'
      }
    },

    readExcel(file) {
      const reader = new FileReader()

      reader.onload = (e) => {
        const data = e.target.result
        const workbook = XLSX.read(data, { type: 'binary' })
        const sheetName = workbook.SheetNames[0]
        const sheet = workbook.Sheets[sheetName]
        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 })

        this.excelData = jsonData
      }

      reader.readAsBinaryString(file)
    },

    uploadExcel() {
      const fileInput = this.$refs.excelInput
      const file = fileInput.files[0]

      if (file) {
        const formData = new FormData()
        formData.append('survey_file', file)

        const config = {
          headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
        }

        axios
          .post('/api/survey/import/excel', formData, config)
          .then((response) => {
            console.log(response)

            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer
                toast.onmouseleave = Swal.resumeTimer
              }
            })
            Toast.fire({
              icon: 'success',
              title: `BERHASIL UPLOAD DATA`
            })
          })
          .catch((error) => {
            console.error(error)

            Swal.fire({
              icon: 'error',
              title: 'GAGAL UPLOAD',
              text: error.response.data.message,
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'OK'
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload()
              } else {
                // console.log('Cancelled')
              }
            })
          })
      } else {
        console.warn('No file selected')
      }
    }
  }
}
</script>

<style>
@media only screen and (max-width: 950px) {
  .custom-mobile {
    margin-top: 120px !important;
  }
}
</style>
