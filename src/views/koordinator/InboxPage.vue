<template>
  <b-col lg="12">
    <b-card class="bg-primary" style="border-radius: 20px; border: 10px solid rgb(0, 30, 105)" v-if="detailInboxPanel === false">
      <div class="d-flex flex-wrap">
        <b-col xl="8" lg="8" md="12" sm="12">
          <b-card-title>
            <span class="text-white" style="font-weight: bold">INBOX</span>
          </b-card-title>
        </b-col>
        <!-- <b-col xl="12" lg="12" md="12" sm="12" class="mb-2 mt-2 custom-search">
          <b-form-input type="text" v-model="search" placeholder="Cari pesan.."></b-form-input>
        </b-col> -->
      </div>
      <hr />
      <div class="card-body bg-light text-dark mt-4" style="border-radius: 20px" v-for="(inbox, index) in inboxData" :key="index++">
        <a href="#" class="inbox-custom" @click="showDetail(inbox.from, inbox.from_user.id)" style="text-decoration: none">
          <b-row>
            <b-col xl="3" style="font-weight: bolder">
              <img class="bg-soft-primary rounded img-fluid avatar-40" :src="require('@/assets/images/avatars/05.png')" alt="profile" loading="lazy" v-if="inbox.from_user.role === 'admin'" />
              <img class="bg-soft-primary rounded img-fluid avatar-40" :src="require('@/assets/images/avatars/03.png')" alt="profile" loading="lazy" v-if="inbox.from_user.role === 'koordinator'" />
              <img class="bg-soft-primary rounded img-fluid avatar-40" :src="require('@/assets/images/avatars/01.png')" alt="profile" loading="lazy" v-if="inbox.from_user.role === 'relawan'" />
              <span style="margin-left: 10px; text-transform: capitalize">{{ inbox.from_user.name }}</span>
            </b-col>
            <b-col xl="7" class="mt-1">
              <span style="margin-left: 10px; font-weight: bolder"> {{ inbox.messages.title }} : {{ inbox.messages.message_html }} </span>
            </b-col>
            <b-col xl="2" class="mt-1"> {{ dateFormat(inbox.messages.updated_at) }} </b-col>
          </b-row>
        </a>
      </div>
    </b-card>

    <!-- INBOX DETAIL  -->
    <b-card class="bg-secondary" style="border-radius: 20px; border: 10px solid rgb(0, 30, 105)" v-if="detailInboxPanel === true">
      <div class="d-flex flex-wrap">
        <b-col xl="8" lg="8" md="12" sm="12">
          <b-card-title>
            <a href="#" class="text-white" style="font-size: 20px; font-weight: bolder" @click="showDetail()">
              <img src="@/assets/images/back.png" width="40" height="40" style="border: 2px solid white; border-radius: 20px" />
            </a>
          </b-card-title>
        </b-col>
      </div>
      <hr />
      <div class="card-body bg-light mt-4" style="border-radius: 20px; border: 4px solid rgb(10, 10, 119)" v-for="(dInbox, index) in detailInbox" :key="index++">
        <b-row>
          <b-col xl="9" md="6" style="font-weight: bolder">
            <img class="bg-soft-primary rounded img-fluid avatar-40" :src="require('@/assets/images/avatars/05.png')" alt="profile" loading="lazy" v-if="dInbox.messages.from_user.role === 'admin'" />
            <img class="bg-soft-primary rounded img-fluid avatar-40" :src="require('@/assets/images/avatars/03.png')" alt="profile" loading="lazy" v-if="dInbox.messages.from_user.role === 'koordinator'" />
            <img class="bg-soft-primary rounded img-fluid avatar-40" :src="require('@/assets/images/avatars/01.png')" alt="profile" loading="lazy" v-if="dInbox.messages.from_user.role === 'relawan'" />
            <span style="margin-left: 10px; text-transform: capitalize"> {{ dInbox.messages.from_user.name }} </span>
          </b-col>
          <b-col xl="3" md="6" class="mt-1 pb-2"> {{ dateFormat(dInbox.messages.updated_at) }} </b-col>
          <hr class="mt-3" />
          <b-col xl="12" class="mt-2 pb-2" style="font-weight: bolder; text-transform: capitalize"> {{ dInbox.messages.title }} </b-col>
          <b-col xl="12" class="mt-2 pb-2"> {{ dInbox.messages.message_html }} </b-col>
          <b-col xl="12" class="mt-2">
            <!-- <button type="submit" class="btn btn-sm btn-primary w-100" style="font-weight: bold" v-b-toggle="'accordion-reply-' + index">REPLY</button> -->

            <b-collapse :id="'accordion-reply-' + index" role="tabpanel">
              <b-row>
                <b-col lg="12 mt-4">
                  <div class="card">
                    <div class="card-header d-flex justify-content-between">
                      <div class="header-title">
                        <h4 class="card-title" style="font-weight: bold; font-size: 20px">BALAS PESAN <span style="color: red">*</span></h4>
                      </div>
                    </div>
                    <hr />
                    <div class="card-body">
                      <b-row>
                        <b-col md="12" class="form-group" style="display: none">
                          <label class="form-label">MSG ID:</label>
                          <input type="text" class="form-control" v-model="dInbox.message_id" />
                        </b-col>
                        <b-col md="12" class="form-group">
                          <label class="form-label">Judul:</label>
                          <input type="text" class="form-control" v-model="inputTitle" />
                        </b-col>
                        <b-col md="12" class="form-group">
                          <label class="form-label">Deskripsi:</label>
                          <input type="text" class="form-control" v-model="inputDesc" />
                        </b-col>
                        <b-col md="3" class="form-group">
                          <button type="submit" class="btn btn-sm btn-warning w-100" style="font-weight: bold" @click="sendReply(dInbox.message_id)">SUBMIT</button>
                        </b-col>
                      </b-row>
                    </div>
                  </div>
                </b-col>
              </b-row>
            </b-collapse>
          </b-col>
        </b-row>
      </div>
    </b-card>
  </b-col>
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
      inboxData: [],
      detailInbox: [],

      detailInboxPanel: false,

      inputJudulPesan: '',
      inputDeskripsiPesan: ''
    }
  },

  mounted() {
    this.fetchInbox()
  },

  methods: {
    async fetchInbox() {
      try {
        const config = { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } }
        const response = await axios.get('/api/messages/threads?page=1&limit=10', config)

        this.inboxData = response.data.data.data
        this.inboxData = this.inboxData.filter((item) => item.to === this.uid)

        console.log('💚 INBOX FETCHED', this.inboxData)
      } catch (error) {
        console.error('💥 INBOX ERROR:', error.message)
      }
    },

    async fetchInboxDetail(idDetail, idUser) {
      // console.log(idDetail, idUser)

      try {
        const config = { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } }
        const response = await axios.get(`/api/messages/threads/${idDetail}`, config)

        this.detailInbox = response.data.data.data

        this.detailInbox = this.detailInbox.filter((item) => item.messages.from_user.id === idUser)

        console.log('💚 INBOX DETAIL', this.detailInbox)
      } catch (error) {
        console.error('💥 INBOX DETAIL ERROR:', error.message)
      }
    },

    showDetail(idDetail, idUser) {
      this.fetchInboxDetail(idDetail, idUser)
      this.detailInboxPanel = !this.detailInboxPanel

      return
    },

    async sendReply(id) {
      const replyMsg = {
        from: this.uid,
        reply_message_id: id,
        title: this.inputTitle,
        message_html: this.inputDesc
      }

      try {
        const config = {
          headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
        }

        const response = await axios.post(`/api/messages/reply`, replyMsg, config)

        this.inputTitle = ''
        this.inputDesc = ''
        this.fetchInbox()
        this.detailInboxPanel = !this.detailInboxPanels

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
          title: 'Berhasil Mengirim Reply'
        })

        this.fetchInboxDetail()

        console.log('💚 REPLY TERKIRIM:', response.data)
      } catch (error) {
        console.error('Error send reply:', error)
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
