<template>
  <!-- Footer Section Start -->
  <footer :class="`footer ${footerStyle}`">
    <div class="footer-body">
      <ul class="left-panel list-inline mb-0 p-0">
        <!-- <li class="list-inline-item"><router-link :to="{ path: '/' }">Privacy Policy</router-link></li> -->
        <!-- <li class="list-inline-item"><router-link :to="{ path: '/' }">Terms of Use</router-link></li> -->
      </ul>
      <div class="right-panel">
        ©{{ currentYear }}
        <span data-setting="app_name">EIS</span>, Made by B & T .
      </div>
    </div>
  </footer>
</template>

<script>
import { computed, watch, ref } from 'vue'
import { useStore } from 'vuex'
import ShareOffcanvas from '@/components/widgets/ShareOffcanvasNew.vue'
export default {
  components: { ShareOffcanvas },
  setup() {
    const store = useStore()
    const footerStyle = computed(() => store.getters['setting/footer_style'])

    // Bottom Canvas
    const shareOffcanvas = ref(false)
    watch(
      () => store.getters.shareOffcanvas,
      (newValue) => {
        shareOffcanvas.value = newValue
      }
    )
    const hideShareOffcanvas = () => {
      store.dispatch('openBottomCanvasAction', { name: 'shareOffcanvas', value: false })
    }
    return {
      footerStyle,
      shareOffcanvas,
      hideShareOffcanvas,
      currentYear: new Date().getFullYear(),
    }
  }
}
</script>
