<template>
  <nav :class="`nav navbar navbar-expand-xl navbar-light iq-navbar ${headerNavbar}`">
    <!-- <nav :class="`nav navbar navbar-expand-xl navbar-light iq-navbar ${headerNavbar} ${navbarHide.join('')}`"> -->
    <div class="container-fluid navbar-inner">
      <slot></slot>
      <!-- <div class="input-group search-input" v-if="isSearch">
        <span class="input-group-text" id="search-input">
          <icon-component type="outlined" :size="18" icon-name="search"></icon-component>
        </span>
        <input type="search" class="form-control" placeholder="Search..." />
      </div>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon">
          <span class="mt-2 navbar-toggler-bar bar1"></span>
          <span class="navbar-toggler-bar bar2"></span>
          <span class="navbar-toggler-bar bar3"></span>
        </span>
      </button> -->
      <ul class="mb-2 navbar-nav ms-auto align-items-center navbar-list mb-lg-0">
        <li class="nav-item dropdown">
          <a class="nav-link py-0 d-flex align-items-center" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <img src="@/assets/images/avatars/05.png" alt="User-Profile" class="img-fluid avatar avatar-50 avatar-rounded" v-if="userRole === 'admin'" />
            <img src="@/assets/images/avatars/03.png" alt="User-Profile" class="img-fluid avatar avatar-50 avatar-rounded" v-if="userRole === 'koordinator'" />
            <img src="@/assets/images/avatars/01.png" alt="User-Profile" class="img-fluid avatar avatar-50 avatar-rounded" v-if="userRole === 'relawan'" />
            <div class="caption ms-3 d-none d-md-block">
              <h6 class="mb-0 caption-title" style="text-transform: capitalize">{{ name }}</h6>
              <p class="mb-0 caption-sub-title" style="text-transform: capitalize">{{ userRole }}</p>
            </div>
          </a>
          <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
            <!-- <li><router-link class="dropdown-item" :to="{ name: 'admin.user-profile' }">Profile</router-link></li>
            <li><hr class="dropdown-divider" /></li> -->
            <li><a href="/" class="dropdown-item" @click="logout()">Logout</a></li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useStore } from 'vuex'
export default {
  components: {},
  props: {
    isGoPro: {
      type: Boolean,
      default: false
    },
    isSearch: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const store = useStore()
    const headerNavbar = computed(() => store.getters['setting/header_navbar'])
    const isHidden = ref(false)

    const onscroll = () => {
      const yOffset = document.documentElement.scrollTop
      const navbar = document.querySelector('.navs-sticky')
      if (navbar !== null) {
        if (yOffset >= 100) {
          navbar.classList.add('menu-sticky')
        } else {
          navbar.classList.remove('menu-sticky')
        }
      }
    }

    const carts = computed(() => store.getters.carts)

    const token = localStorage.getItem('token')
    const uid = localStorage.getItem('uid')
    const name = localStorage.getItem('name')
    const userRole = localStorage.getItem('role')

    onMounted(() => {
      window.addEventListener('scroll', onscroll())
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', onscroll())
    })
    return {
      headerNavbar,
      isHidden,
      carts,
      emit,

      token,
      uid,
      name,
      userRole
    }
  },

  methods: {
    logout() {
      localStorage.clear()
      // this.$router.push({ name: 'auth.login' })
      console.log('💀 SESSION REMOVED')
    }
  }
}
</script>
