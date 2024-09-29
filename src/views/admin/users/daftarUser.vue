<template>
  <b-row>
    <b-col sm="12">
      <div class="card">
        <b-card-header class="bg-primary text-light pb-4">
          <div class="header-title">
            <b-row>
              <b-col xl="10" lg="8" md="7" sm="7">
                <h4 style="font-weight: bold; color: white">DAFTAR USER</h4>
              </b-col>
              <b-col xl="2" lg="4" md="5" sm="5" class="d-flex justify-content-end custom-export">
                <button class="btn btn-warning btn-md" type="button" @click="downloadFile()" style="margin-left: 10px; font-weight: bold; width: 100%; height: 90%">EXPORT CSV</button>
              </b-col>
              <b-col xl="12" lg="12" md="12" sm="12" class="mt-3">
                <input type="text" class="form-control border-0" placeholder="Pencarian (Nama / Role / Email/ Wilayah Penugasan)" v-model="searchQuery" />
              </b-col>
            </b-row>
          </div>
        </b-card-header>
        <div class="card-body px-0 pt-0">
          <div class="table-responsive">
            <table id="user-list-table" class="table table-hover" role="grid" data-toggle="data-table">
              <thead>
                <tr class="bg-secondary text-white">
                  <th class="text-center" width="1px">🌅</th>
                  <th>NAMA</th>
                  <th class="text-center">ROLE</th>
                  <!-- <th class="text-center">NO HP</th> -->
                  <th>EMAIL</th>
                  <th class="text-center">ASAL/PENUGASAN</th>
                  <th style="min-width: 100px"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in paginatedUserData" :key="index++">
                  <td class="text-center">
                    <img class="bg-soft-primary rounded img-fluid avatar-40" :src="require('@/assets/images/avatars/05.png')" alt="profile" loading="lazy" v-if="item.role === 'admin'" />
                    <img class="bg-soft-primary rounded img-fluid avatar-40" :src="require('@/assets/images/avatars/03.png')" alt="profile" loading="lazy" v-if="item.role === 'koordinator'" />
                    <img class="bg-soft-primary rounded img-fluid avatar-40" :src="require('@/assets/images/avatars/01.png')" alt="profile" loading="lazy" v-if="item.role === 'relawan'" />
                  </td>
                  <td style="text-transform: uppercase">{{ item.name }}</td>
                  <td class="text-center" style="text-transform: uppercase">
                    <span :class="{ badge: true, 'bg-secondary': item.role === 'relawan', 'bg-warning': item.role === 'koordinator', 'bg-danger': item.role === 'admin' }">{{ item.role === 'user' ? 'relawan' : item.role }}</span>
                  </td>
                  <td>{{ item.email }}</td>
                  <td class="text-center">{{ item.province.name }}</td>
                  <td class="text-center">
                    <button type="button" class="btn btn-sm btn-warning" data-bs-toggle="modal" data-bs-target="#modalEdit" @click="editUser(item)">EDIT</button>
                  </td>
                </tr>
              </tbody>
            </table>

            <div class="pagination-container p-3 bg-soft-secondary" style="border-radius: 0px 0px 20px 20px">
              <!-- Previous button -->
              <button @click="currentPage -= 1" :disabled="currentPage === 1" class="prev-next-button"><span>&#9665;</span> Previous</button>

              <!-- Numbered page buttons -->
              <button v-for="page in totalPages" :key="page" @click="currentPage = page" :disabled="currentPage === page" :class="{ 'pagination-button': true, active: currentPage === page }">
                {{ page }}
              </button>

              <!-- Next button -->
              <button @click="currentPage += 1" :disabled="currentPage === totalPages" class="prev-next-button">Next <span>&#9655;</span></button>
            </div>
          </div>
        </div>
      </div>
    </b-col>

    <div class="modal fade" id="modalEdit" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-lg modal-dialog-scrollable modal-custom">
        <div class="modal-content" v-if="selectedUser">
          <div class="modal-header bg-primary">
            <h4 class="modal-title text-white mt-4" style="font-weight: bold">EDIT USER</h4>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          <div class="modal-body">
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
                  <select name="type" class="selectpicker form-control" v-model="selectedUser.role" disabled>
                    <option value="">- Pilih User Role -</option>
                    <option value="admin">Admin</option>
                    <option value="koordinator">Koordinator</option>
                    <option value="relawan">Relawan</option>
                  </select>
                </div>
                <b-col class="form-group">
                  <label class="form-label">Email:</label>
                  <input type="text" class="form-control" v-model="selectedUser.email" />
                </b-col>
              </div>
            </div>

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
                    <input type="text" class="form-control" v-model="selectedUser.name" />
                  </b-col>
                  <b-col md="6" class="form-group">
                    <label class="form-label">No HP:</label>
                    <input type="number" class="form-control" v-model="selectedUser.phone" />
                  </b-col>
                  <b-col md="6" class="form-group">
                    <label class="form-label">Tanggal Lahir</label>
                    <input type="date" class="form-control" v-model="selectedUser.birthdate" />
                  </b-col>
                  <b-col md="6" class="form-group">
                    <label class="form-label">Jenis Kelamin</label>
                    <select name="type" class="selectpicker form-control" v-model="selectedUser.gender">
                      <option value="">- Pilih -</option>
                      <option value="male">Laki-Laki</option>
                      <option value="female">Perempuan</option>
                    </select>
                  </b-col>
                </b-row>
              </div>
            </div>

            <div class="modal-footer mt-4">
              <button type="button" class="btn btn-primary" @click="updateUserData(selectedUser.id)" data-bs-dismiss="modal">Update</button>
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </b-row>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
import exportFromJSON from 'export-from-json'

import '@/assets/custom-vue/css/pagination.css'

export default {
  data() {
    return {
      searchQuery: '',
      currentPage: 1,
      itemsPerPage: 10,

      userData: [],
      selectedUser: {
        role: '',
        email: '',
        name: '',
        phone: '',
        birthplace: '',
        birthdate: '',
        gender: ''
      },

      provinsiList: null,
      kotaList: null,
      kecamatanList: null,
      kelurahanList: null,
      selectedRegion: {},

      investorsList: [
        {
          id: 0,
          name: 'Gautam',
          email: 'gautam@example.com',
          investment: 'Stocks'
        },
        {
          id: 1,
          name: 'Sam',
          email: 'sam@example.com',
          investment: 'Bonds'
        },
        {
          id: 2,
          name: 'Tim',
          email: 'tim@example.com',
          investment: 'Options'
        },
        {
          id: 3,
          name: 'Kim',
          email: 'kim@example.com',
          investment: 'Stocks'
        },
        {
          id: 4,
          name: 'John',
          email: 'john@example.com',
          investment: 'Options'
        },
        {
          id: 5,
          name: 'Lee',
          email: 'lee@example.com',
          investment: 'Stocks'
        },
        {
          id: 6,
          name: 'Charlotte',
          email: 'charlotte@example.com',
          investment: 'Options'
        },
        {
          id: 7,
          name: 'Amy',
          email: 'amy@example.com',
          investment: 'Stocks'
        },
        {
          id: 8,
          name: 'Mark',
          email: 'mark@example.com',
          investment: 'Bonds'
        },
        {
          id: 9,
          name: 'Rose',
          email: 'rose@example.com',
          investment: 'Stocks'
        }
      ]
    }
  },

  computed: {
    filteredUserData() {
      this.currentPage = 1

      const query = this.searchQuery.toLowerCase()
      return this.userData.filter((user) => user.name.toLowerCase().includes(query) || user.role.toLowerCase().includes(query) || user.email.toLowerCase().includes(query) || user.province.name.toLowerCase().includes(query))
    },

    paginatedUserData() {
      const startIdx = (this.currentPage - 1) * this.itemsPerPage
      const endIdx = startIdx + this.itemsPerPage
      return this.filteredUserData.slice(startIdx, endIdx)
    },

    totalPages() {
      return Math.ceil(this.filteredUserData.length / this.itemsPerPage)
    }
  },

  methods: {
    async fetchUser() {
      try {
        const config = { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } }
        const response = await axios.get('/api/profile?limit=100', config)

        // Update the userData with the retrieved data
        this.userData = response.data.data.data

        // Sort userData based on the role
        this.userData.sort((a, b) => {
          const roleOrder = { admin: 1, koordinator: 2, relawan: 3 }

          return roleOrder[a.role] - roleOrder[b.role]
        })

        console.log('Data 💀 retrieved successfully', this.userData)
      } catch (error) {
        console.error('Failed to fetch USER:', error.message)
      }
    },

    editUser(item) {
      console.log(item)
      this.selectedUser = item
    },

    async updateUserData(id) {
      try {
        const config = {
          headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
        }

        const response = await axios.patch(`/api/profile/${id}`, this.selectedUser, config)

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
          title: 'User berhasil diedit'
        })

        console.log('💚 User updated successfully:', response.data)
      } catch (error) {
        console.error('Error updating user:', error)
      }
    },

    downloadFile() {
      const data = this.userData
      const fileName = 'USER_LIST'
      const exportType = exportFromJSON.types.csv
      const fields = ['Name', 'Author', 'Subject']

      if (data) exportFromJSON({ data, fileName, fields, exportType })
    }
  },
  mounted() {
    this.fetchUser()
  }
}
</script>

<style scoped>
th {
  font-weight: bold;
}

th,
td {
  padding: 15px; /* Adjust the padding value as needed */
}
</style>
