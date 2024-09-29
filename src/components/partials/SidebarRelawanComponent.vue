<template>
  <!-- Sidebar Component Start Here-->
  <default-sidebar>
    <ul class="navbar-nav iq-main-menu" id="sidebar-menu">
      <side-menu title="HOME" :static-item="true"></side-menu>
      <side-menu isTag="router-link" title="DASHBOARD" icon="view-grid" :route="{ to: 'relawan.dashboard' }" style="font-weight: bolder"></side-menu>

      <br />
      <br />
      <li><hr class="hr-horizontal" /></li>
      <side-menu title="LAPOR" :static-item="true" miniTitle=""></side-menu>
      <side-menu isTag="router-link" title="SUBMIT ISU" icon="square-plus" :icon-size="15" icon-type="solid" miniTitle="+" :route="{ to: 'relawan.input-issue' }"></side-menu>
      <side-menu isTag="router-link" title="SUBMIT SURVEY" icon="file" :icon-size="15" icon-type="solid" miniTitle="IS" :route="{ to: 'relawan.input-survey-nasional' }"></side-menu>

      
    </ul>
  </default-sidebar>
  <!-- Sidebar Component End Here-->
</template>

<script setup>
import DefaultSidebar from '@/components/custom/sidebar/DefaultSidebar.vue'
import SideMenu from '@/components/custom/nav/SideMenu.vue'
import { ref } from 'vue'
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
toggle(route.name)
</script>
<style></style>
