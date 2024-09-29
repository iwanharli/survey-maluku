<template>
  <section class="login-content">
    <div class="row m-0 align-items-center vh-100 gradient-bg" style="background-color: #5acbff">
      <b-col md="6">
        <b-row class="justify-content-center">
          <b-col md="10">
            <b-card class="gradient-bg shadow-none d-flex justify-content-center mb-0 auth-card iq-auth-form" style="border-radius: 20px; border: 3px solid rgba(255, 255, 255, 0.284)">
              <router-link :to="{ name: 'auth.login' }" class="navbar-brand d-flex justify-content-center align-items-center mb-3 text-primary">
                <!-- <brand-logo></brand-logo> -->
                <div class="d-flex justify-content-center align-items-center">
                  <h3 class="d-flex justify-content-center align-items-center" style="background: #1e255865; padding: 20px; color: white; border-radius: 20px; font-weight: bolder; width: 100%"><img class="small-logo" src="@/assets/images/letter-v.png" style="width: 50px; height: 50px" /> &nbsp; EIS - LOGIN</h3>
                </div>
                &nbsp; &nbsp;
              </router-link>
              <br />
              <!-- <h2 class="mb-2 text-center">
                LOGIN
                <a @click="authShow()">📢</a>
              </h2>
              <p class="text-center">Login to stay <a @click="showAuth">connected.</a></p> -->

              <form @submit.prevent="submitLogin">
                <div class="row">
                  <div class="col-lg-12">
                    <div class="form-group">
                      <label for="email" class="form-label text-white" style="font-weight: bolder">Email</label>
                      <input type="email" class="form-control text-black" id="email" aria-describedby="email" placeholder=" " autocomplete="username" v-model="userData.email" />
                    </div>
                  </div>
                  <div class="col-lg-12">
                    <div class="form-group">
                      <label for="password" class="form-label text-white" style="font-weight: bolder">Password</label>
                      <b-input-group size="md" class="mb-2">
                        <b-form-input v-model="userData.password" :type="showPassword ? 'text' : 'password'" class="form-control text-black" id="password" aria-describedby="password"></b-form-input>
                        <b-input-group-append is-text>
                          <b-form-checkbox switch class="mr-n2" @click="togglePasswordVisibility"> </b-form-checkbox>
                        </b-input-group-append>
                      </b-input-group>
                    </div>
                  </div>
                  <div class="col-lg-12 d-flex justify-content-between">
                    <div class="form-check"></div>
                    <!-- <a href="/reset-password">Lupa Password?</a> -->
                  </div>
                </div>
                <div class="d-flex justify-content-center mb-5" style="border: 3px solid white; border-radius: 20px">
                  <button type="submit" class="btn btn-secondary" style="width: 100%; font-weight: bolder">MASUK</button>
                </div>
                <!-- <p class="mt-3 text-center">Tidak punya akun? &nbsp; Silahkan daftar <a href="/register" class="text-underline">disini</a></p> -->
              </form>
            </b-card>

            <div id="my-div" v-if="show" v-cloak>
              <div>
                ADMIN <br />
                (master@gmail.com | master)
              </div>
              <hr />
              <div>
                KOORDINATOR <br />
                (koordinator@gmail.com | koordinator)
              </div>
              <hr />
              <div>
                RELAWAN <br />
                (relawan@gmail.com | relawan)
              </div>
            </div>
          </b-col>
        </b-row>
        <div class="sign-bg">
          <svg width="280" height="230" viewBox="0 0 431 398" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.05">
              <rect x="-157.085" y="193.773" width="543" height="77.5714" rx="38.7857" transform="rotate(-45 -157.085 193.773)" fill="#3B8AFF" />
              <rect x="7.46875" y="358.327" width="543" height="77.5714" rx="38.7857" transform="rotate(-45 7.46875 358.327)" fill="#3B8AFF" />
              <rect x="61.9355" y="138.545" width="310.286" height="77.5714" rx="38.7857" transform="rotate(45 61.9355 138.545)" fill="#3B8AFF" />
              <rect x="62.3154" y="-190.173" width="543" height="77.5714" rx="38.7857" transform="rotate(45 62.3154 -190.173)" fill="#3B8AFF" />
            </g>
          </svg>
        </div>
      </b-col>
      <div class="col-md-6 d-md-block d-none bg-primary p-0 vh-50 overflow-hidden" style="border-radius: 20px 0px 0px 20px">
        <img src="@/assets/images/auth2.png" class="img-fluid gradient-main animated-scaleX" alt="images" loading="lazy" />
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'LoginPage',
  data() {
    return {
      show: false,
      userData: {
        email: '',
        password: ''
      },
      showPassword: false
    }
  },

  methods: {
    async submitLogin() {
      console.log(this.userData)

      axios
        .post('/api/login', this.userData)
        .then((response) => {
          console.clear('')
          console.log('Login successful!')
          console.log('⚙ \t', response.status)
          console.log('🚀 \t', response.data.data.token)
          console.log('🐣 \t', response.data.data.data.id)
          console.log('⚓ \t', response.data.data.data.role)
          console.log('👽 \t', response.data.data.name)
          console.log('✨ \t', response.data.data.data.email)
          console.log('📌 \t', response.data.data.data.province.code)
          console.log('📌 \t', response.data.data.data.province.name)

          localStorage.setItem('authenticated', true)
          localStorage.setItem('token', response.data.data.token)
          localStorage.setItem('uid', response.data.data.data.id)
          localStorage.setItem('role', response.data.data.data.role)
          localStorage.setItem('name', response.data.data.data.name)
          localStorage.setItem('email', response.data.data.data.email)
          localStorage.setItem('rid', response.data.data.data.province.code)
          localStorage.setItem('rname', response.data.data.data.province.name)

          // console.log(response)
          var userRole = response.data.data.data.role

          setTimeout(() => {
            if (userRole === 'admin') {
              this.$router.push({ name: 'admin.dashboard' })
            } else if (userRole === 'koordinator') {
              this.$router.push({ name: 'koordinator.dashboard' })
            } else if (userRole === 'relawan') {
              this.$router.push({ name: 'relawan.dashboard' })
            }
          }, 1000) 

          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer
              toast.onmouseleave = Swal.resumeTimer
            }
          })
          Toast.fire({
            icon: 'success',
            title: 'Signed in successfully'
          })
        })
        .catch((error) => {
          console.log(error)

          localStorage.setItem('authenticated', false)
          console.error('Login failed:', error.message)

          Swal.fire({
            title: 'Error!',
            text: 'Email / Password anda salah!',
            icon: 'error',
            confirmButtonText: '😪 COBA LAGI'
          })
        })
    },

    authShow() {
      this.show = !this.show
    },

    togglePasswordVisibility() {
      this.showPassword = !this.showPassword
    }
  }
}
</script>

<style lang="scss" scoped>
.small-logo {
  width: 100%;
  height: auto;
  border-radius: 20px;
}

@media (max-width: 1000px) {
  .small-logo {
    width: 100%;
    height: auto;
  }
}

@media (max-width: 767px) {
  .small-logo {
    width: 100%;
    height: auto;
  }
}

.gradient-bg {
  background: linear-gradient(45deg, #273289, #e18030, #10aede, #1e2558);
  background-size: 400% 400%;
  animation: gradientChange 7s infinite; /* Adjust the duration as needed */
  color: white;
  font-weight: bolder;
  width: 100%;
}

.small-logo {
  width: 50px;
  height: 50px;
}

@keyframes gradientChange {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
