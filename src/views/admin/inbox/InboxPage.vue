<template>
  <b-row>
    <!-- DAFTAR KONTAK  -->
    <b-col lg="4" xl="3" class="custom-mobile">
      <div class="card bg-secondary" style="border-radius: 25px; border: 10px solid #001f4d">
        <b-card no-body>
          <b-card-header class="bg-secondary pb-4">
            <div class="header-title">
              <button type="submit" class="btn btn-primary w-100 mb-3" style="font-weight: bold; width: 100%" @click="showContent('inbox')">INBOX</button>
              <button type="submit" class="btn btn-info w-100 mb-3" style="font-weight: bold; width: 100%" @click="showContent('sent')">TERKIRIM</button>
              <button type="submit" class="btn btn-outline-warning w-100 mt-3" style="font-weight: bold; width: 100%" @click="showContent('broadcast')">🚀 KIRIM PESAN</button>
            </div>
          </b-card-header>
        </b-card>
      </div>
    </b-col>

    <inboxList v-if="activeContent === 'inbox'" />
    <sentList v-else-if="activeContent === 'sent'" />
    <broadcastComponent v-else-if="activeContent === 'broadcast'" />
  </b-row>
</template>

<script>
import inboxList from '@/components/_admin/widgetInbox/inboxList.vue'
import sentList from '@/components/_admin/widgetInbox/sentList.vue'
import broadcastComponent from '@/components/_admin/widgetInbox/broadcast.vue'

import { StreamChat } from 'stream-chat'

import axios from 'axios'
import Swal from 'sweetalert2'
import Talk from 'talkjs'


export default {
  props: {
    currentUser: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      uid: localStorage.getItem('uid'),
      role: localStorage.getItem('role'),
      name: localStorage.getItem('name'),
      email: localStorage.getItem('email'),

      activeContent: 'inbox',
      
    }
  },

  methods: {
    showContent(contentType) {
      this.activeContent = contentType
    }
  },

  async mounted() {
    await Talk.ready
  },

  components: {
    // contactList,
    inboxList,
    sentList,
    broadcastComponent
  }
}
</script>

<style scoped>
@media only screen and (max-width: 950px) {
  .custom-mobile {
    margin-top: 120px !important;
  }

  .custom-search {
    width: 100%;
  }
}

.inbox-custom:hover {
  background-color: red;
}
</style>
