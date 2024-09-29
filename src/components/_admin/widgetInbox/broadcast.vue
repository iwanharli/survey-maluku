<template>
  <b-col lg="8" xl="9">
    <b-card class="bg-secondary" style="border-radius: 20px; border: 5px solid white">
      <div class="d-flex flex-wrap">
        <b-col xl="8" lg="8" md="12" sm="12">
          <b-card-title>
            <span class="text-white" style="font-weight: bold">🚀 KIRIM PESAN</span>
          </b-card-title>
        </b-col>
        <b-col xl="12" lg="12" md="12" sm="12" class="mt-4 custom-search">
          <b-form-input type="text" v-model="search" placeholder="Cari Kontak.."></b-form-input>
        </b-col>
      </div>
      <div class="card-body bg-light text-dark mt-3" style="border-radius: 20px">
        <div class="table-responsive" style="max-height: 1000px; overflow-y: auto">
          <table id="user-list-table" class="table table-hover" role="grid" data-toggle="data-table">
            <thead>
              <tr class="bg-soft-primary">
                <th class="text-center" style="min-width: 20px">
                  <input type="checkbox" @change="selectAllRows" v-model="selectAll" />
                </th>
                <th class="text-center" width="1px">🌅</th>
                <th>NAMA</th>
                <th class="text-center">ROLE</th>
                <th class="text-center"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in filteredUserData" :key="index++">
                <td class="text-center">
                  <input type="checkbox" v-model="selectedUser" :value="item" />
                </td>
                <td class="text-center">
                  <img class="bg-soft-primary rounded img-fluid avatar-40" :src="require('@/assets/images/avatars/05.png')" alt="profile" loading="lazy" v-if="item.role === 'admin'" />
                  <img class="bg-soft-primary rounded img-fluid avatar-40" :src="require('@/assets/images/avatars/03.png')" alt="profile" loading="lazy" v-if="item.role === 'koordinator'" />
                  <img class="bg-soft-primary rounded img-fluid avatar-40" :src="require('@/assets/images/avatars/01.png')" alt="profile" loading="lazy" v-if="item.role === 'relawan'" />
                </td>
                <td style="text-transform: uppercase">
                  <div style="font-weight: bolder">{{ item.name }}</div>
                  <div>
                    <small>{{ item.email }}</small>
                  </div>
                  <div style="color: rgb(48, 109, 109)">{{ item.province.name }}</div>
                </td>
                <td class="text-center" style="text-transform: uppercase">
                  <span :class="{ badge: true, 'bg-secondary': item.role === 'relawan', 'bg-warning': item.role === 'koordinator', 'bg-danger': item.role === 'admin' }">{{ item.role }}</span>
                </td>
                <td class="text-center">
                  <a class="btn btn-primary btn-sm gap-2 align-items-center" aria-current="page" data-bs-toggle="modal" data-bs-target="#modalChat" @click="chat(item)">
                    <svg fill="none" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                      <path d="M15.8325 8.17463L10.109 13.9592L3.59944 9.88767C2.66675 9.30414 2.86077 7.88744 3.91572 7.57893L19.3712 3.05277C20.3373 2.76963 21.2326 3.67283 20.9456 4.642L16.3731 20.0868C16.0598 21.1432 14.6512 21.332 14.0732 20.3953L10.106 13.9602" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="card-body bg-light text-dark mt-4" style="border-radius: 20px">
        BROADCAST KE USER :
        <br />
        <span v-for="item in selectedUser" :key="item.id">
          <span :class="{ badge: true, 'bg-secondary': item.role === 'relawan', 'bg-warning': item.role === 'koordinator', 'bg-danger': item.role === 'admin' }">🚀 {{ item.name }} </span> &nbsp;
        </span>
        <br />
      </div>

      <button type="button" class="btn btn-warning mt-4" data-bs-toggle="modal" data-bs-target="#modalBroadcast" @click="broadcast(selectedUser)" style="width: 100%">ISI PESAN</button>
    </b-card>
  </b-col>

  <!-- MODAL CHAT -->
  <div class="modal fade" id="modalChat" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-scrollable modal-custom">
      <div class="modal-content">
        <div class="modal-header bg-primary">
          <h4 class="modal-title text-white mt-4" style="font-weight: bold">KIRIM PESAN</h4>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="card bg-light">
            <div class="card-body">
              <b-row>
                <b-col md="12" class="form-group">
                  <label class="form-label">Judul Pesan:</label>
                  <input type="text" class="form-control" v-model="inputJudulPesan" placeholder="..." />
                </b-col>
                <b-col md="12" class="form-group">
                  <label class="form-label">Deskripsi Pesan:</label>
                  <textarea type="text" class="form-control" v-model="inputDeskripsiPesan" placeholder="..." />
                </b-col>
              </b-row>
            </div>
          </div>
        </div>
        <div class="modal-footer mt-4">
          <button type="button" class="btn btn-primary" @click="sendChat()" data-bs-dismiss="modal">KIRIM</button>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>

  <!-- MODAL BROADCAST -->
  <div class="modal fade" id="modalBroadcast" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-scrollable modal-custom">
      <div class="modal-content">
        <div class="modal-header bg-primary">
          <h4 class="modal-title text-white mt-4" style="font-weight: bold">KIRIM PESAN</h4>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="card bg-light">
            <div class="card-body">
              <b-row>
                <b-col md="12" class="form-group">
                  <label class="form-label">Judul Pesan:</label>
                  <input type="text" class="form-control" v-model="inputJudulPesan" placeholder="..." />
                </b-col>
                <b-col md="12" class="form-group">
                  <label class="form-label">Deskripsi Pesan:</label>
                  <textarea type="text" class="form-control" v-model="inputDeskripsiPesan" placeholder="..." />
                </b-col>
              </b-row>
            </div>
          </div>
        </div>
        <div class="modal-footer mt-4">
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="sendBroadcast()">KIRIM</button>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">TUTUP</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  data() {
    return {
      uid: localStorage.getItem('uid'),
      role: localStorage.getItem('role'),
      name: localStorage.getItem('name'),
      email: localStorage.getItem('email'),
      userData: [],
      selectAll: false,
      selectedUser: [],
      selectedUserIds: [],
      receiverData: [],
      search: '',

      inputJudulPesan: '',
      inputDeskripsiPesan: ''
    }
  },

  mounted() {
    this.fetchUser()
  },

  computed: {
    filteredUserData() {
      return this.userData.filter((item) => item.name.toLowerCase().includes(this.search.toLowerCase()) || item.email.toLowerCase().includes(this.search.toLowerCase()) || item.province.name.toLowerCase().includes(this.search.toLowerCase()))
    }
  },

  methods: {
    async fetchUser() {
      try {
        const config = { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } }
        const response = await axios.get('/api/profile?limit=100', config)

        this.userData = response.data.data.data

        this.userData.sort((a, b) => {
          const roleOrder = { admin: 1, koordinator: 2, relawan: 3 }

          return roleOrder[a.role] - roleOrder[b.role]
        })

        console.log('💚 USER FETCHED', this.userData)
      } catch (error) {
        console.error('FAILED FETCH USER:', error.message)
      }
    },

    selectAllRows() {
      if (this.selectAll) {
        this.selectedUser = this.userData.slice()

        console.log('💚 USER BROADCAST', this.selectedUser)
      } else {
        this.selectedUser = [] // Deselect all rows
      }
    },

    chat(item) {
      this.receiverData = item

      console.log('💚 USER DETAIL FETCHED', this.receiverData)
    },

    broadcast(selectedUsers) {
      this.selectedUserIds = selectedUsers.map((user) => user.id)

      console.log('💚 USER BROADCAST', this.selectedUserIds)
    },

    async sendChat() {
      const postMsg = {
        from: this.uid,
        to: this.receiverData.id,
        title: this.inputJudulPesan,
        message_html: this.inputDeskripsiPesan
      }

      // console.log(postMsg)

      try {
        const config = {
          headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
        }

        const response = await axios.post(`/api/messages`, postMsg, config)

        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer
            toast.onmouseleave = Swal.resumeTimer
          }
        })
        Toast.fire({
          icon: 'success',
          title: 'Berhasil Mengirim Pesan'
        })

        setTimeout(function () {
          window.location.reload()
        }, 2000)

        console.log('💚 PESAN TERKIRIM:', response.data)
      } catch (error) {
        const Toast = Swal.mixin({
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer
            toast.onmouseleave = Swal.resumeTimer
          }
        })
        Toast.fire({
          icon: 'error',
          title: '(GAGAL MENGIRIM PESAN)'
        })

        console.error('Error SEND MESSAGE:', error)
      }
    },

    async sendBroadcast() {
      const resultString = this.selectedUserIds.join(',')

      const postMsg = {
        from: this.uid,
        to: resultString,
        title: this.inputJudulPesan,
        message_html: this.inputDeskripsiPesan
      }

      // console.log(postMsg)

      try {
        const config = {
          headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
        }

        const response = await axios.post(`/api/messages`, postMsg, config)

        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer
            toast.onmouseleave = Swal.resumeTimer
          }
        })
        Toast.fire({
          icon: 'success',
          title: 'Berhasil Mengirim Broadcast'
        })

        setTimeout(function () {
          window.location.reload()
        }, 2000)

        console.log('💚 BROADCAST TERKIRIM:', response.data)
      } catch (error) {
        const Toast = Swal.mixin({
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer
            toast.onmouseleave = Swal.resumeTimer
          }
        })
        Toast.fire({
          icon: 'error',
          title: '(Silahkan Pilih Kontak)'
        })

        console.error('Error SEND BROADCAST:', error)
      }
    },

    dateFormat(date) {
      let dateObject = new Date(date)

      let day = dateObject.getUTCDate()
      let month = dateObject.getUTCMonth() + 1
      let year = dateObject.getUTCFullYear()

      const formattedDate = `${day}-${month < 10 ? '0' : ''}${month}-${year}`

      return formattedDate
    }
  }
}
</script>
