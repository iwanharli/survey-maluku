<template>
  <div class="row custom-mobile">
    <!-- STATISTIK -->
    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
      <StatisticData />
    </div>

    <!-- ISU CHART -->
    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
      <IssueChart />
    </div>

    <!-- SURVEY PAPUA & PAPUA SEHAT  -->
    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
      <SurveyChart />
    </div>

    <!-- DEMOGRAFI SOSIAL PENDUDUK  -->
    <!-- <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
      <SocialChart />
    </div> -->

    <!-- PROFIL POTENSI DAERAH  -->
    <!-- <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
      <ProfilPotensiDaerahChart />
    </div> -->

    <!-- PETA BENCANA  -->
    <!-- <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
      <PetaBencanaChart />
    </div> -->

    <!-- EIS  -->
    <!-- <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
      <EisChart />
    </div> -->
  </div>
</template>

<script>
import StatisticData from '@/components/_admin/chartDashboard/statisticData.vue'
import IssueChart from '@/components/_admin/chartDashboard/chartIssue.vue'
import SurveyChart from '@/components/_admin/chartDashboard/chartSurvey.vue'
import SocialChart from '@/components/_admin/chartDashboard/chartDemografiSosial.vue'
import ProfilPotensiDaerahChart from '@/components/_admin/chartDashboard/chartProfilPotensiDaerah.vue'
import PetaBencanaChart from '@/components/_admin/chartDashboard/chartPetaBencana.vue'
import EisChart from '@/components/_admin/chartDashboard/chartEIS.vue'

import Swal from 'sweetalert2'

export default {
  mounted() {},

  components: {
    StatisticData,
    IssueChart,
    SurveyChart,
    SocialChart,
    ProfilPotensiDaerahChart,
    PetaBencanaChart,
    EisChart
  }
}
</script>

<style scoped>
@media only screen and (max-width: 500px) {
  .custom-mobile {
    margin-top: 50px;
  }
}
@media only screen and (max-width: 600px) {
  .custom-mobile {
    margin-top: 40px;
  }
}

@media only screen and (max-width: 700px) {
  .custom-mobile {
    margin-top: 50px;
  }

  .cq5 {
    display: none !important;
  }
}

@media only screen and (max-width: 445px) {
  .custom-mobile {
    margin-top: 100px;
  }
}
</style>
