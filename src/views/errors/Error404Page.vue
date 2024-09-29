<template>
  <div class="gradient">
    <b-container>
      <img src="@/assets/images/error/404.png" class="img-fluid mb-4 w-50" alt="400" loading="lazy" />
      <h2 class="mb-0 mt-4 text-white">Oops! This Page is Not Found.</h2>
      <p class="mt-2 text-white">The requested page dose not exist.</p>
      <a class="btn bg-white text-primary d-inline-flex align-items-center" :href="getHomeLink()">Back to Home</a>
    </b-container>
    <div class="box">
      <div class="c xl-circle">
        <div class="c lg-circle">
          <div class="c md-circle">
            <div class="c sm-circle">
              <div class="c xs-circle"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    getHomeLink() {
      const userRole = localStorage.getItem('role')

      // Check the user's role and generate the appropriate link
      if (userRole === 'relawan') {
        return '/relawan'
      } else if (userRole === 'admin') {
        return '/dashboard' // Change this to the appropriate admin route
      } else {
        return '/' // Default link for other roles
      }
    }
  }
}
</script>
