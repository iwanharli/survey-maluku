<template>
  <!-- <loader-component :show="isLoader"></loader-component> -->

  <!-- Sidebar Component Start Here-->
  <!-- <koordinator-sidebar-component v-if="userRole === 'koordinator'"></koordinator-sidebar-component> -->
  <!-- <relawan-sidebar-component v-if="userRole === 'relawan'"></relawan-sidebar-component> -->
  <!-- Sidebar Component End Here-->

  <main class="main-content">
    <div :class="`position-relative  ${isBanner ? 'iq-banner ' + bannerStyle : ''}`">
      <!-- Header Component Start Here -->
      <header-component></header-component>

      <template v-if="isBanner">
        <sub-header :name="name" :role="userRole"></sub-header>
      </template>
      <!-- Header Component End Here -->
    </div>

    <!-- Main Content Start Here -->
    <main-content-component>
      <router-view></router-view>
    </main-content-component>
    <!-- Main Content Start Here -->

    <footer-component></footer-component>
  </main>

  <setting-offcanvas></setting-offcanvas>
</template>

<script setup>
// Library
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

// Components
import KoordinatorSidebarComponent from '@/components/partials/SidebarKoordinatorComponent.vue'
import RelawanSidebarComponent from '@/components/partials/SidebarRelawanComponent.vue'

import HeaderComponent from '@/components/partials/HeaderComponent.vue'
import SubHeader from '@/components/custom/header/SubHeader.vue'

import MainContentComponent from '@/components/partials/MainContentComponent.vue'

import FooterComponent from '@/components/partials/FooterComponent.vue'

import SettingOffcanvas from '@/components/setting/SettingOffcanvas.vue'
import LoaderComponent from '@/components/custom/loader/LoaderComponent.vue'

const route = useRoute()
const store = useStore()
const isBanner = computed(() => route.meta.isBanner)
const bannerStyle = computed(() => store.getters['setting/header_banner'])
// const isLoader = ref(true)

// onMounted(() => {
//   setTimeout(() => {
//     isLoader.value = false
//   }, 300)
// })

const token = localStorage.getItem('token')
const uid = localStorage.getItem('uid')
const name = localStorage.getItem('name')
const userRole = localStorage.getItem('role')
</script>

<style></style>
