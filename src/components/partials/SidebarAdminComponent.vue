<template>
  <!-- Sidebar Component Start Here-->
  <default-sidebar>
    <ul class="navbar-nav iq-main-menu" id="sidebar-menu">
      <side-menu title="HOME" :static-item="true"></side-menu>
      <side-menu isTag="router-link" title="DASHBOARD" icon="view-grid" :route="{ to: 'admin.dashboard' }" style="font-weight: bolder"></side-menu>

      <br />
      <li><hr class="hr-horizontal" /></li>
      <side-menu title="LAPOR" :static-item="true" miniTitle=""></side-menu>
      <side-menu isTag="router-link" title="SUBMIT ISU" icon="square-plus" :icon-size="15" icon-type="solid" miniTitle="+" :route="{ to: 'admin.input-issue' }"></side-menu>

      <side-menu title="SUBMIT SURVEY" icon="square-plus" :icon-size="15" toggle-id="input" :caret-icon="true" :route="{ popup: 'false', to: 'input' }" @onClick="toggle" :active="currentRoute.includes('input')">
        <b-collapse tag="ul" class="sub-nav" id="input" accordion="sidebar-menu" :visible="currentRoute.includes('input')">
          <side-menu isTag="router-link" title="PAPUA" icon="circle" :icon-size="10" icon-type="solid" miniTitle="P" :route="{ to: 'admin.input-survey-papua' }"></side-menu>
          <side-menu isTag="router-link" title="PAPUA SEHAT" icon="circle" :icon-size="10" icon-type="solid" miniTitle="P" :route="{ to: 'admin.input-survey-papua-sehat' }"></side-menu>
          <!-- <side-menu isTag="router-link" title="JOGJA" icon="circle" :icon-size="10" icon-type="solid" miniTitle="J" :route="{ to: 'admin.input-survey-jogja' }"></side-menu> -->
          <!-- <side-menu isTag="router-link" title="BULK SURVEY" icon="circle" :icon-size="10" icon-type="solid" miniTitle="P" :route="{ to: 'admin.input-survey-excel' }"></side-menu> -->
        </b-collapse>
      </side-menu>

      <!-- <side-menu title="SUBMIT SURVEY" icon="square-plus" :icon-size="15" toggle-id="inputSurvey" :caret-icon="true" :route="{ popup: 'false', to: 'input' }" @onClick="toggle" :active="currentRoute.includes('input')">
        <b-collapse tag="ul" class="sub-nav" id="inputSurvey" accordion="sidebar-menu" :visible="currentRoute.includes('input')">
          <side-menu isTag="router-link" title="NASIONAL" icon="circle" :icon-size="10" icon-type="solid" miniTitle="N" :route="{ to: 'admin.input-survey-nasional' }"></side-menu>
          <side-menu isTag="router-link" title="JOGJA" icon="circle" :icon-size="10" icon-type="solid" miniTitle="J" :route="{ to: 'admin.input-survey-jogja' }"></side-menu>
          <side-menu isTag="router-link" title="PAPUA" icon="circle" :icon-size="10" icon-type="solid" miniTitle="P" :route="{ to: 'admin.input-survey-papua' }"></side-menu>
        </b-collapse>
      </side-menu> -->

      <router-link :to="{ name: 'admin.input-survey-nasional' }" @click.native="handleSurveyClick">
        <div class="side-menu-item">
          <!-- Your menu item content -->
        </div>
      </router-link>

      <br />
      <li><hr class="hr-horizontal" /></li>
      <side-menu title="MANAJEMEN" :static-item="true"></side-menu>

      <!-- ISSUE  -->
      <side-menu title="ISU" icon="file" :icon-size="15" toggle-id="issue" :caret-icon="true" :route="{ popup: 'false', to: 'issue' }" @onClick="toggle" :active="currentRoute.includes('issue')">
        <b-collapse tag="ul" class="sub-nav" id="issue" accordion="sidebar-menu" :visible="currentRoute.includes('issue')">
          <side-menu isTag="router-link" title="RESPONDEN" icon="circle" :icon-size="10" icon-type="solid" miniTitle="RI" :route="{ to: 'admin.responden-issue' }"></side-menu>
          <side-menu isTag="router-link" title="KATEGORI" icon="circle" :icon-size="10" icon-type="solid" miniTitle="KI" :route="{ to: 'admin.category-issue' }"></side-menu>
        </b-collapse>
      </side-menu>

      <!-- SURVEY  -->
      <side-menu title="SURVEY" icon="chart-square-bar" :icon-size="15" toggle-id="survey" :caret-icon="true" :route="{ popup: 'false', to: 'survey' }" @onClick="toggle" :active="currentRoute.includes('survey')">
        <b-collapse tag="ul" class="sub-nav" id="survey" accordion="sidebar-menu" :visible="currentRoute.includes('survey')">
          <!-- <side-menu isTag="router-link" title="RESPONDEN JOGJA" icon="circle" :icon-size="10" icon-type="solid" miniTitle="RS" :route="{ to: 'admin.responden-survey-jogja' }"></side-menu> -->
          <side-menu isTag="router-link" title="PAPUA" icon="circle" :icon-size="10" icon-type="solid" miniTitle="R" :route="{ to: 'admin.responden-survey-papua' }"></side-menu>
          <side-menu isTag="router-link" title="DAFTAR ANAK" icon="circle" :icon-size="10" icon-type="solid" miniTitle="DA" :route="{ to: 'admin.responden-survey-anak' }"></side-menu>
          <!-- <side-menu isTag="router-link" title="DAFTAR SURVEY" icon="circle" :icon-size="10" icon-type="solid" miniTitle="DS" :route="{ to: 'admin.daftar-survey' }"></side-menu> -->
        </b-collapse>
      </side-menu>

      <br />
      <li><hr class="hr-horizontal" /></li>
      <side-menu title="PENGGUNA" :static-item="true"></side-menu>
      <!-- USER  -->
      <side-menu title="USER" icon="user-group" :icon-size="15" toggle-id="users" :caret-icon="true" :route="{ popup: 'false', to: 'user' }" @onClick="toggle" :active="currentRoute.includes('user')">
        <b-collapse tag="ul" class="sub-nav" id="users" accordion="sidebar-menu" :visible="currentRoute.includes('user')">
          <side-menu isTag="router-link" title="Tambah" icon="user-add" :icon-size="10" icon-type="solid" miniTitle="+" :route="{ to: 'admin.register-user' }"></side-menu>
          <side-menu isTag="router-link" title="Daftar User" icon="user-group" :icon-size="10" icon-type="solid" miniTitle="U" :route="{ to: 'admin.daftar-user' }"></side-menu>
        </b-collapse>
      </side-menu>

      <br />
      <li><hr class="hr-horizontal" /></li>
      <side-menu title="PESAN" :static-item="true"></side-menu>
      <side-menu isTag="router-link" title="INBOX" icon="location-arrow" :icon-size="15" icon-type="solid" miniTitle="+" :route="{ to: 'admin.inbox-msg' }"></side-menu>

      <br />
      <br />
    </ul>
  </default-sidebar>
  <!-- Sidebar Component End Here-->
</template>

<script setup>
import Swal from 'sweetalert2'

import DefaultSidebar from '@/components/custom/sidebar/DefaultSidebar.vue'
import SideMenu from '@/components/custom/nav/SideMenu.vue'

import axios from 'axios'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const currentRoute = ref('')
const route = useRoute()
const toggle = (route) => {
  if (route === currentRoute.value && route.includes('.')) {
    const menu = currentRoute.value.split('.')
    return (currentRoute.value = menu[menu.length - 2])
  }
  if (route !== currentRoute.value && currentRoute.value.includes(route)) {
    return (currentRoute.value = '')
  }
  if (route !== currentRoute.value) {
    return (currentRoute.value = route)
  }
  if (route === currentRoute.value) {
    return (currentRoute.value = '')
  }
  return (currentRoute.value = '')
}

const handleSurveyClick = () => {
  const surveyChoice = ref(null)

  const swalOptions = {
    title: 'Choose Survey',
    text: 'Please choose a survey',
    icon: 'info',
    buttons: {
      inputSurvey: 'Input Survey',
      anotherSurvey: 'Another Survey',
      cancel: 'Cancel'
    }
  }

  const handleButtonClick = (value) => {
    surveyChoice.value = value

    if (value === 'inputSurvey') {
      // Navigate to input-survey route
      // You might need to adjust the route name based on your configuration
      $router.push({ name: 'admin.input-survey-nasional' })
    } else if (value === 'anotherSurvey') {
      // Handle another survey
    } else {
      // User canceled
    }
  }

  // Show SweetAlert when the router-link is clicked
  $swal(swalOptions).then(handleButtonClick)

  return { handleSurveyClick }
}

toggle(route.name)

const bearerToken = localStorage.getItem('token')
console.log(bearerToken)

// const unreadInboxCount = ref(0)

// const handleSSE = (event) => {
//   const eventData = JSON.parse(event)
//   unreadInboxCount.value = eventData.unread_message
// }

onMounted(() => {
  // const config = new Headers({
  //   Authorization: `Bearer ${bearerToken}`
  // })
  // const sseEndpoint = 'https://laporisubackend.puas.in/api/stream/unread_inbox'
  // const response = axios.get(sseEndpoint, config)
  // console.log(response)
  // const eventSource = new EventSource(sseEndpoint, { config });
  // eventSource.addEventListener('message', handleSSE)
  // eventSource.addEventListener('error', (error) => {
  //   console.error('SSE Error:', error)
  // })
  // return () => {
  //   eventSource.close()
  // }
})
</script>
