<template>
  <b-row>
    <b-col sm="12">
      <b-card no-body>
        <b-card-header class="d-flex justify-content-between">
          <div class="header-title">
            <b-card-title style="font-weight: bold">FORM ISSUE KOORDINATOR</b-card-title>
          </div>
        </b-card-header>
        <b-card-body>
          <b-form id="form-wizard1" class="text-center mt-1">
            <ul id="top-tab-list" class="p-0 row list-inline">
              <!-- DETAIL DAERAH -->
              <li :class="`${currentindex == 1 ? 'active' : ''} ${currentindex > 1 ? 'done active' : ''} col-lg-4 col-md-6 mb-2 text-start `">
                <a href="javascript:void(0);" @click="changeTab(1)">
                  <div class="iq-icon me-3">
                    <svg class="svg-icon" xmlns="http://www.w3.org/2000/svg" height="20" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <span>Detail Daerah </span>
                </a>
              </li>
              <!-- DETAIL ISU -->
              <li :class="`${currentindex == 2 ? 'active' : ''} ${currentindex > 2 ? 'done active' : ''} col-lg-4 col-md-6 mb-2 text-start `">
                <a href="javascript:void(0);" @click="changeTab(2)">
                  <div class="iq-icon me-3">
                    <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                  </div>
                  <span class="dark-wizard">Detail Isu</span>
                </a>
              </li>
              <!-- DETAIL GAMBAR -->
              <li :class="`${currentindex == 3 ? 'active' : ''} ${currentindex > 3 ? 'done active' : ''} col-lg-4 col-md-6 mb-2 text-start `">
                <a href="javascript:void(0);" @click="changeTab(3)">
                  <div class="iq-icon me-3">
                    <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                  </div>
                  <span class="dark-wizard">Dokumen</span>
                </a>
              </li>
            </ul>
            <div :class="`${currentindex == 1 ? 'show' : 'd-none'}`">
              <daerah-component @onClick="changeTab"></daerah-component>
            </div>
            <div :class="`${currentindex == 2 ? 'show' : 'd-none'}`">
              <isu-component @onClick="changeTab"></isu-component>
            </div>
            <div :class="`${currentindex == 3 ? 'show' : 'd-none'}`">
              <dokumen-component @onClick="changeTab"></dokumen-component>
            </div>
          </b-form>
        </b-card-body>
      </b-card>
    </b-col>
  </b-row>
</template>
<script>
import DaerahComponent from '@/components/_koordinator/wizardIssue/DaerahComponent.vue'
import IsuComponent from '@/components/_koordinator/wizardIssue/IsuComponent.vue'
import DokumenComponent from '@/components/_koordinator/wizardIssue/DokumenComponent.vue'

export default {
  name: 'WizardPage',
  components: {
    DaerahComponent,
    IsuComponent,
    DokumenComponent,
  },
  data() {
    return {
      currentindex: 1
    }
  },
  methods: {
    changeTab(val) {
      this.currentindex = val
    },

    handleSelectedRegion(selectedRegion) {
      console.log('Selected region received:', selectedRegion)
      // Use the selectedRegion object here
    }
  }
}
</script>
