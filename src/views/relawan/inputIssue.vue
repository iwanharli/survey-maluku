<template>
  <b-row>
    <b-col sm="12">
      <b-card no-body>
        <b-card-header class="bg-primary text-light pb-4">
          <div class="header-title">
            <b-row>
              <b-card-title>
                <span style="font-weight: bold; color: white">FORM ISSUE</span>
              </b-card-title>
            </b-row>
          </div>
        </b-card-header>
        <b-card-body>
          <b-form id="form-wizard1" class="text-center mt-1">
            <ul id="top-tab-list" class="p-0 row list-inline">
              <!-- DETAIL DAERAH -->
              <li :class="`${currentindex == 1 ? 'active' : ''} ${currentindex > 1 ? 'done active' : ''} col-lg-4 col-md-6 mb-2 text-start `">
                <a href="javascript:void(0);" @click="changeTab(1)">
                  <div class="iq-icon me-3">
                    <img src="@/assets/images/daerah.png" height="40" width="40" style="margin-top: -5px" />
                  </div>
                  <span class="dark-wizard" style="font-weight: bolder;">Detail Daerah </span>
                </a>
              </li>
              <!-- DETAIL ISU -->
              <li :class="`${currentindex == 2 ? 'active' : ''} ${currentindex > 2 ? 'done active' : ''} col-lg-4 col-md-6 mb-2 text-start `">
                <a href="javascript:void(0);" @click="changeTab(2)">
                  <div class="iq-icon me-3" style="background: white;">
                    <img src="@/assets/images/issue.png" height="40" width="40" style="margin-top: -5px" />
                  </div>
                  <span class="dark-wizard" style="font-weight: bolder;">Detail Isu</span>
                </a>
              </li>
              <!-- DETAIL GAMBAR -->
              <li :class="`${currentindex == 3 ? 'active' : ''} ${currentindex > 3 ? 'done active' : ''} col-lg-4 col-md-6 mb-2 text-start `">
                <a href="javascript:void(0);" @click="changeTab(3)">
                  <div class="iq-icon me-3" style="background: white;">
                    <img src="@/assets/images/upload.png" height="35" width="35" style="margin-top: -5px" />
                  </div>
                  <span class="dark-wizard" style="font-weight: bolder;">Konfirmasi</span>
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
import DaerahComponent from '@/components/_relawan/wizardIssue/DaerahComponent.vue'
import IsuComponent from '@/components/_relawan/wizardIssue/IsuComponent.vue'
import DokumenComponent from '@/components/_relawan/wizardIssue/DokumenComponent.vue'

export default {
  name: 'WizardPage',
  components: {
    DaerahComponent,
    IsuComponent,
    DokumenComponent
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
    }
  }
}
</script>
