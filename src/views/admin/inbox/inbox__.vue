<template>
  <b-row>
    <!-- SUBMENU -->
    <b-col lg="12" class="pt-3">
      <b-card class="bg-primary">
        <div class="d-flex flex-wrap align-items-center justify-content-between mt-4">
          <div class="d-flex flex-wrap align-items-center">
            <div class="profile-img position-relative me-3 mb-3 mb-lg-0 profile-logo profile-logo1">
              <img class="bg-soft-primary rounded img-fluid avatar-100 me-3" :src="require('@/assets/images/avatars/05.png')" alt="profile" loading="lazy" v-if="role === 'admin'" />
              <img class="bg-soft-primary rounded img-fluid avatar-100 me-3" :src="require('@/assets/images/avatars/03.png')" alt="profile" loading="lazy" v-if="role === 'koordinator'" />
              <img class="bg-soft-primary rounded img-fluid avatar-100 me-3" :src="require('@/assets/images/avatars/01.png')" alt="profile" loading="lazy" v-if="role === 'user'" />
            </div>
            <div class="d-flex flex-wrap align-items-center mb-3 mb-sm-0">
              <h4 class="me-2 h4 text-white" style="text-transform: capitalize; font-weight: bolder">{{ name }}</h4>
            </div>
          </div>
          <ul class="d-flex nav nav-pills mb-0 text-center profile-tab" data-toggle="slider-tab" id="profile-pills-tab" role="tablist">
            <li class="nav-item">
              <a class="nav-link" data-bs-toggle="tab" href="#inbox-initial" role="tab" aria-selected="false" style="border: 3px solid white">History</a>
            </li>
            <li class="nav-item active show">
              <a class="nav-link" data-bs-toggle="tab" href="#inbox-message" role="tab" aria-selected="false" style="border: 3px solid white">Pesan</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" data-bs-toggle="tab" href="#inbox-profile" role="tab" aria-selected="false" style="border: 3px solid white">Profil</a>
            </li>
          </ul>
        </div>
      </b-card>
    </b-col>

    <b-col xl="4" lg="12" md="6" sm="12">
      <b-card no-body>
        <b-card-header class="bg-primary pb-3" style="border-bottom: 10px solid rgb(210, 210, 210)">
          <div class="header-title">
            <button type="submit" class="btn btn-secondary w-100" @click="validationInput()">BROADCAST RELAWAN</button>
            <h4 class="text-white card-title mt-4" style="font-weight: bolder">Pilih Kontak</h4>
          </div>
        </b-card-header>

        <b-card-body>
          <ul class="list-inline m-0 p-0">
            <li class="d-flex mb-4 align-items-center" v-for="(item, index) in kontakData" :key="index">
              <img :src="require('@/assets/images/avatars/05.png')" alt="story-img" class="rounded-pill avatar-40" loading="lazy" v-if="item.role === 'admin'" />
              <img :src="require('@/assets/images/avatars/03.png')" alt="story-img" class="rounded-pill avatar-40" loading="lazy" v-if="item.role === 'koordinator'" />
              <img :src="require('@/assets/images/avatars/01.png')" alt="story-img" class="rounded-pill avatar-40" loading="lazy" v-if="item.role === 'relawan'" />
              <div class="ms-3 flex-grow-1">
                <h6 style="text-transform: capitalize">{{ item.name }}</h6>
                <small class="mb-0">{{ item.email }}</small>
              </div>
              <div class="dropdown">
                <span class="dropdown-toggle" id="dropdownMenuButton9" data-bs-toggle="dropdown" aria-expanded="false" role="button"> </span>
                <div class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton9">
                  <a class="dropdown-item" href="#inbox-message" @click="msgTrigger(item.id)">Kirim Pesan</a>
                  <a class="dropdown-item" href="javascript:void(0);" @click="profileTrigger(item.id)">Lihat Profile</a>
                </div>
              </div>
            </li>
          </ul>
        </b-card-body>
      </b-card>
    </b-col>

    <b-col xl="8" lg="12" md="6" sm="12">
      <div class="inbox-content tab-content iq-tab-fade-up">
        <div id="inbox-contact" class="tab-pane fade">
          <b-card no-body>
            <b-card-header class="bg-primary pb-3" style="border-bottom: 10px solid rgb(210, 210, 210)">
              <div class="header-title">
                <h1 class="card-title" style="font-weight: bolder">Kontak</h1>
              </div>
            </b-card-header>

            <b-card-body>
              <ul class="list-inline m-0 p-0">
                <li class="d-flex mb-4 align-items-center" v-for="(item, index) in listKontak" :key="index">
                  <img :src="require('@/assets/images/avatars/05.png')" alt="story-img" class="rounded-pill avatar-40" loading="lazy" v-if="item.role === 'admin'" />
                  <img :src="require('@/assets/images/avatars/03.png')" alt="story-img" class="rounded-pill avatar-40" loading="lazy" v-if="item.role === 'koordinator'" />
                  <img :src="require('@/assets/images/avatars/01.png')" alt="story-img" class="rounded-pill avatar-40" loading="lazy" v-if="item.role === 'user'" />
                  <div class="ms-3 flex-grow-1">
                    <h6 style="text-transform: capitalize">{{ item.name }}</h6>
                    <small class="mb-0">{{ item.email }}</small>
                  </div>
                  <div class="dropdown">
                    <span class="dropdown-toggle" id="dropdownMenuButton9" data-bs-toggle="dropdown" aria-expanded="false" role="button"> </span>
                    <div class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton9">
                      <a class="dropdown-item" href="#inbox-message" @click="msgTrigger(item.id)">Kirim Pesan</a>
                      <a class="dropdown-item" href="javascript:void(0);" @click="profileTrigger(item.id)">Lihat Profile</a>
                    </div>
                  </div>
                </li>
              </ul>
            </b-card-body>
          </b-card>
        </div>

        <div id="inbox-initial" class="tab-pane">
          <initial-message-widget />
        </div>

        <div id="inbox-message" class="tab-pane fade active show" v-for="(sender, index) in inboxData" :key="index++">
          <b-card class="bg-primary" style="border-radius: 30px" v-if="sender.messages.reply_message_id === null">
            <b-card-heder class="d-flex bg-light align-items-center justify-content-between pb-4" style="padding: 20px; border-radius: 20px; border-bottom: 10px solid rgb(210, 210, 210)">
              <div class="header-title">
                <div class="d-flex flex-wrap">
                  <div class="media-support-user-img me-3">
                    <img class="rounded-pill img-fluid avatar-60 p-1 bg-soft-info" src="@/assets/images/avatars/05.png" alt="" v-if="sender.messages.from_user.role === 'admin'" />
                    <img class="rounded-pill img-fluid avatar-60 p-1 bg-soft-info" src="@/assets/images/avatars/03.png" alt="" v-if="sender.messages.from_user.role === 'koordinator'" />
                    <img class="rounded-pill img-fluid avatar-60 p-1 bg-soft-info" src="@/assets/images/avatars/01.png" alt="" v-if="sender.messages.from_user.role === 'user'" />
                  </div>

                  <!-- PENGIRIM -->
                  <div class="media-support-info mt-2">
                    <span class="mb-0 text-black" style="text-transform: uppercase; font-weight: bolder">{{ sender.messages.from_user.name }} - {{ sender.messages.from_user.role }}</span>
                    <p class="mb-0 text-dark">{{ sender.messages.from_user.email }}</p>
                  </div>
                </div>
              </div>
            </b-card-heder>

            <!-- LIST PENERIMA -->
            <b-card-heder class="d-flex bg-soft-light align-items-center justify-content-between pb-4 mt-2" style="border-radius: 20px">
              <div class="header-title text-center">
                <div class="d-flex flex-wrap">
                  <div class="mt-3" v-for="(recipient, recipientIndex) in sender.messages.recipients" :key="recipientIndex">
                    <div v-if="recipient.to_user">
                      <p class="mb-0 bg-primary text-light" style="padding: 10px; border-radius: 10px; margin-left: 20px; text-transform: uppercase">{{ recipient.to }} 🚀 {{ recipient.to_user.name }}</p>
                    </div>
                    <div v-else>
                      <p class="mb-0 bg-dark text-light" style="padding: 10px; border-radius: 10px; margin-left: 20px">{{ recipient.to_user ? `` : `${recipient.to} 💥 USER DELETED` }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </b-card-heder>

            <!-- KOLOM CHAT -->
            <b-card-body class="p-0 pt-2">
              <div class="bg-light comment-area p-3" style="padding: 40px; border-radius: 20px">
                <ul class="list-inline p-0 m-0">
                  <li class="mb-1 mt-1">
                    <div class="d-flex">
                      <img src="@/assets/images/avatars/05.png" class="avatar-60 p-1 bg-soft-info rounded-pill img-fluid" loading="lazy" v-if="sender.messages.from_user.role === 'admin'" />
                      <img src="@/assets/images/avatars/03.png" class="avatar-60 p-1 bg-soft-info rounded-pill img-fluid" loading="lazy" v-if="sender.messages.from_user.role === 'koordinatpr'" />
                      <img src="@/assets/images/avatars/01.png" class="avatar-60 p-1 bg-soft-info rounded-pill img-fluid" loading="lazy" v-if="sender.messages.from_user.role === 'relawan'" />
                      <div class="ms-3">
                        <!-- PESAN PENGIRIM  -->
                        <h5 class="mt-2 mb-2" style="font-weight: bold; text-transform: uppercase">{{ sender.messages.from_user.name }}</h5>
                        <h6 class="mb-1" style="font-weight: bold; text-transform: uppercase">JUDUL : {{ sender.messages.title }}</h6>
                        <hr />
                        <h6 class="mb-2">{{ sender.messages.message_html }}</h6>
                        <div class="d-flex flex-wrap align-items-center mb-1">
                          <a href="javascript:void(0);" class="me-3">
                            <svg width="20" height="20" class="me-1" viewBox="0 0 24 24">
                              <path fill="currentColor" d="M8,9.8V10.7L9.7,11C12.3,11.4 14.2,12.4 15.6,13.7C13.9,13.2 12.1,12.9 10,12.9H8V14.2L5.8,12L8,9.8M10,5L3,12L10,19V14.9C15,14.9 18.5,16.5 21,20C20,15 17,10 10,9" />
                            </svg>
                            reply
                          </a>
                        </div>
                      </div>
                    </div>
                  </li>

                  <!-- BALASAN  -->
                  <li class="mb-1 mt-1" v-for="(reply, index) in inboxData" :key="index++">
                    <div class="d-flex" v-if="reply.messages.reply_message_id !== null && parseInt(reply.messages.reply_message_id) === parseInt(sender.message_id)">
                      {{ sender.message_id }} = {{ reply.messages.reply_message_id }}
                      <div class="ms-3 mt-3 ms-auto text-end" style="margin-right: 10px">
                        <h5 class="text-black mb-1" style="font-weight: bold; text-transform: uppercase">{{ reply.messages.from_user.role }} - {{ reply.messages.from_user.name }}</h5>
                        <h6 class="mb-1" style="font-weight: bold; text-transform: uppercase">{{ reply.messages.title }}</h6>
                        <hr />
                        <h6 class="mb-4">{{ reply.messages.message_html }}</h6>
                      </div>
                      <img src="@/assets/images/avatars/05.png" class="mt-2 avatar-60 p-1 bg-soft-warning rounded-pill img-fluid" loading="lazy" v-if="sender.messages.from_user.role === 'admin'" />
                      <img src="@/assets/images/avatars/03.png" class="mt-2 avatar-60 p-1 bg-soft-warning rounded-pill img-fluid" loading="lazy" v-if="sender.messages.from_user.role === 'koordinatpr'" />
                      <img src="@/assets/images/avatars/01.png" class="mt-2 avatar-60 p-1 bg-soft-warning rounded-pill img-fluid" loading="lazy" v-if="sender.messages.from_user.role === 'relawan'" />
                    </div>
                  </li>
                </ul>

                <form class="comment-text d-flex align-items-center mt-3" action="javascript:void(0);">
                  <input type="text" class="form-control rounded" placeholder="..." />
                  <div class="comment-attagement d-flex" style="margin-right: 20px">
                    <a href="javascript:void(0);" class="me-2 text-body">
                      <svg class="icon-20" width="20" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12M22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12M10,9.5C10,10.3 9.3,11 8.5,11C7.7,11 7,10.3 7,9.5C7,8.7 7.7,8 8.5,8C9.3,8 10,8.7 10,9.5M17,9.5C17,10.3 16.3,11 15.5,11C14.7,11 14,10.3 14,9.5C14,8.7 14.7,8 15.5,8C16.3,8 17,8.7 17,9.5M12,17.23C10.25,17.23 8.71,16.5 7.81,15.42L9.23,14C9.68,14.72 10.75,15.23 12,15.23C13.25,15.23 14.32,14.72 14.77,14L16.19,15.42C15.29,16.5 13.75,17.23 12,17.23Z" />
                      </svg>
                    </a>
                    <a href="javascript:void(0);" class="text-body">
                      <svg class="icon-20" width="20" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M20,4H16.83L15,2H9L7.17,4H4A2,2 0 0,0 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6A2,2 0 0,0 20,4M20,18H4V6H8.05L9.88,4H14.12L15.95,6H20V18M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7M12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15Z" />
                      </svg>
                    </a>
                  </div>
                </form>
              </div>
            </b-card-body>
          </b-card>
        </div>

        <div id="inbox-profile" class="tab-pane fade">
          <b-card no-body>
            <b-card-header>
              <div class="header-title">
                <h4 class="card-title">Profile</h4>
              </div>
            </b-card-header>
            <b-card-body>
              <div class="text-center">
                <div>
                  <img src="@/assets/images/avatars/05.png" alt="profile-img" class="rounded-pill avatar-130 img-fluid" loading="lazy" v-if="role === 'admin'" />
                  <img src="@/assets/images/avatars/03.png" alt="profile-img" class="rounded-pill avatar-130 img-fluid" loading="lazy" v-if="role === 'koordinator'" />
                  <img src="@/assets/images/avatars/01.png" alt="profile-img" class="rounded-pill avatar-130 img-fluid" loading="lazy" v-if="role === 'user'" />
                </div>
                <div class="mt-5">
                  <h3 class="d-inline-block" style="text-transform: capitalize">{{ name }}</h3>
                  <p class="mt-2 mb-2">{{ role }} ⚡ {{ email }}</p>
                </div>
              </div>
            </b-card-body>
          </b-card>
          <b-card>
            <b-card-header>
              <div class="header-title">
                <h4 class="card-title">Tentang Pengguna</h4>
              </div>
            </b-card-header>
            <b-card-body>
              <div class="mt-4">
                <h6 class="mb-1">Terdaftar :</h6>
                <p>{{ date }}</p>
              </div>
              <div class="mt-4">
                <h6 class="mb-1">No HP :</h6>
                <p>{{ location }}</p>
              </div>
              <div class="mt-4">
                <h6 class="mb-1">Asal Kelahiran :</h6>
                <p></p>
              </div>
              <div class="mt-4">
                <h6 class="mb-1">Tanggal Lahir :</h6>
                <p></p>
              </div>
              <div class="mt-4">
                <h6 class="mb-1">Gender :</h6>
                <p></p>
              </div>
            </b-card-body>
          </b-card>
        </div>
      </div>
    </b-col>

    <b-col xl="12" lg="6" md="6" sm="12">
      <div class="inbox-content tab-content iq-tab-fade-up">
        <div id="inbox-message" class="tab-pane fade active show" v-for="(sender, index) in inboxData" :key="index++">
          <b-card class="bg-primary" style="border-radius: 30px" v-if="sender.messages.reply_message_id === null">
            <b-card-heder class="d-flex bg-light align-items-center justify-content-between pb-4" style="padding: 20px; border-radius: 20px; border-bottom: 10px solid rgb(210, 210, 210)">
              <div class="header-title">
                <div class="d-flex flex-wrap">
                  <div class="media-support-user-img me-3">
                    <img class="rounded-pill img-fluid avatar-60 p-1 bg-soft-info" src="@/assets/images/avatars/05.png" alt="" v-if="role === 'admin'" />
                    <img class="rounded-pill img-fluid avatar-60 p-1 bg-soft-info" src="@/assets/images/avatars/03.png" alt="" v-if="role === 'koordinator'" />
                    <img class="rounded-pill img-fluid avatar-60 p-1 bg-soft-info" src="@/assets/images/avatars/01.png" alt="" v-if="role === 'user'" />
                  </div>
                  <div class="media-support-info mt-2">
                    <!-- PENGIRIM -->
                    <h5 class="mb-0" style="text-transform: uppercase">{{ sender.messages.from }} - {{ sender.messages.from_user.name }} - {{ sender.messages.from_user.role }}</h5>
                    <p class="mb-0 text-dark">{{ sender.messages.from_user.email }}</p>
                    <hr />

                    <!-- PENERIMA -->
                    <p class="mt-3">KE USER :</p>
                    <div class="mt-3 bg-soft-dark" v-for="(recipient, recipientIndex) in sender.messages.recipients" :key="recipientIndex">
                      {{ recipient.to_user ? `` : `${recipient.to} - USER NOT FOUND` }}
                      <div v-if="recipient.to_user">
                        <p class="mb-0 text-dark">{{ recipient.to }} {{ recipient.to_user.name }} - {{ recipient.to_user.email }}</p>
                      </div>
                    </div>
                    <hr />

                    <!-- ISI PESAN -->
                    <p class="mt-2 text-dark">ID MSG: {{ sender.message_id }}</p>
                    <p class="mt-2 text-dark">{{ sender.messages.created_at }}</p>
                    <p class="mb-0 text-dark">
                      <span style="font-weight: bold">{{ sender.messages.title }}</span> - {{ sender.messages.message_html }}
                    </p>
                  </div>

                  <!-- BALASAN -->
                  <b-col xl="12" lg="12" md="12" sm="12" class="mt-5">
                    <div id="inbox-message" class="tab-pane fade active show" v-for="(reply, index) in inboxData" :key="index++">
                      <b-card class="bg-warning" style="border-radius: 30px" v-if="reply.messages.reply_message_id !== null && parseInt(reply.messages.reply_message_id) === parseInt(sender.message_id)">
                        <b-card-heder class="d-flex bg-light align-items-center justify-content-between pb-4" style="padding: 20px; border-radius: 20px; border-bottom: 10px solid rgb(210, 210, 210)">
                          {{ sender.message_id }}
                          {{ reply.messages.reply_message_id }}
                          <div class="header-title">
                            <div class="d-flex flex-wrap">
                              <div class="media-support-user-img me-3">
                                <img class="rounded-pill img-fluid avatar-60 p-1 bg-soft-info" src="@/assets/images/avatars/05.png" alt="" v-if="role === 'admin'" />
                                <img class="rounded-pill img-fluid avatar-60 p-1 bg-soft-info" src="@/assets/images/avatars/03.png" alt="" v-if="role === 'koordinator'" />
                                <img class="rounded-pill img-fluid avatar-60 p-1 bg-soft-info" src="@/assets/images/avatars/01.png" alt="" v-if="role === 'user'" />
                              </div>
                              <div class="media-support-info mt-2">
                                <h5 class="mb-0" style="text-transform: uppercase">{{ reply.messages.from }} - {{ reply.messages.from_user.name }} - {{ reply.messages.from_user.role }}</h5>
                                <p class="mb-0 text-dark">{{ reply.messages.from_user.email }}</p>
                                <hr />
                                <p class="mt-3">KE USER :</p>
                                <div class="bg-soft-dark" v-for="(recipient, recipientIndex) in reply.messages.recipients" :key="recipientIndex">
                                  {{ recipient.to_user ? `` : `${recipient.to} - USER NOT FOUND` }}

                                  <div v-if="recipient.to_user">
                                    <p class="mb-0 text-dark">{{ recipient.to }} {{ recipient.to_user.name }} - {{ recipient.to_user.email }}</p>
                                  </div>
                                </div>
                                <hr />
                                <p class="mt-2 text-dark">ID MSG : {{ reply.message_id }} to {{ reply.messages.reply_message_id }}</p>
                                <p class="mt-2 text-dark">{{ reply.messages.created_at }}</p>
                                <p class="mb-0 text-dark">
                                  <span style="font-weight: bolder">{{ reply.messages.title }}</span> - {{ reply.messages.message_html }}
                                </p>
                              </div>
                            </div>
                          </div>
                        </b-card-heder>
                        <!-- </div> -->
                      </b-card>
                    </div>
                  </b-col>
                </div>
              </div>
            </b-card-heder>
          </b-card>
        </div>

        <div id="inbox-profile" class="tab-pane fade">
          <b-card no-body>
            <b-card-header>
              <div class="header-title">
                <h4 class="card-title">Profile</h4>
              </div>
            </b-card-header>
            <b-card-body>
              <div class="text-center">
                <div>
                  <img src="@/assets/images/avatars/05.png" alt="profile-img" class="rounded-pill avatar-130 img-fluid" loading="lazy" v-if="role === 'admin'" />
                  <img src="@/assets/images/avatars/03.png" alt="profile-img" class="rounded-pill avatar-130 img-fluid" loading="lazy" v-if="role === 'koordinator'" />
                  <img src="@/assets/images/avatars/01.png" alt="profile-img" class="rounded-pill avatar-130 img-fluid" loading="lazy" v-if="role === 'user'" />
                </div>
                <div class="mt-5">
                  <h3 class="d-inline-block" style="text-transform: capitalize">{{ name }}</h3>
                  <p class="mt-2 mb-2">{{ role }} ⚡ {{ email }}</p>
                </div>
              </div>
            </b-card-body>
          </b-card>
          <b-card>
            <b-card-header>
              <div class="header-title">
                <h4 class="card-title">Tentang Pengguna</h4>
              </div>
            </b-card-header>
            <b-card-body>
              <div class="mt-4">
                <h6 class="mb-1">Terdaftar :</h6>
                <p>{{ date }}</p>
              </div>
              <div class="mt-4">
                <h6 class="mb-1">No HP :</h6>
                <p>{{ location }}</p>
              </div>
              <div class="mt-4">
                <h6 class="mb-1">Asal Kelahiran :</h6>
                <p></p>
              </div>
              <div class="mt-4">
                <h6 class="mb-1">Tanggal Lahir :</h6>
                <p></p>
              </div>
              <div class="mt-4">
                <h6 class="mb-1">Gender :</h6>
                <p></p>
              </div>
            </b-card-body>
          </b-card>
        </div>
      </div>
    </b-col>
  </b-row>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

import ContactWidget from '@/components/_admin/widgetInbox/ContactWidget.vue'
import InitialMessageWidget from '@/components/_admin/widgetInbox/InitialMessageWidget.vue'
import MessageWidget from '@/components/_admin/widgetInbox/MessageWidget.vue'
import SuggestionWidget from '@/components/_admin/widgetInbox/SuggestionWidget.vue'
import ActivityWidget from '@/components/_admin/widgetInbox/ActivityWidget.vue'
import ProfileWidget from '@/components/_admin/widgetInbox/ProfileWidget.vue'

export default {
  components: {
    ContactWidget,
    MessageWidget,
    SuggestionWidget,
    ActivityWidget,
    ProfileWidget,
    InitialMessageWidget
  },

  data() {
    return {
      role: localStorage.getItem('role'),
      name: localStorage.getItem('name'),
      email: localStorage.getItem('email'),
      kontakData: [],
      inboxData: []
    }
  },

  mounted() {
    this.fetchContact(), this.fetchInbox()
  },

  methods: {
    async fetchContact() {
      try {
        const config = { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } }
        const response = await axios.get('/api/profile', config)

        this.kontakData = response.data.data

        console.log('DATA KONTAK fetched', this.kontakData)
      } catch (error) {
        console.error('Failed to fetch USER:', error.message)
      }
    },

    async fetchInbox() {
      try {
        const config = { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } }
        const response = await axios.get('/api/messages/inbox?page=1&limit=10000', config)

        this.inboxData = response.data.data.data

        console.log('DATA INBOX fetched', this.inboxData)
      } catch (error) {
        console.error('Failed to fetch USER:', error.message)
      }
    }
  }
}
</script>
