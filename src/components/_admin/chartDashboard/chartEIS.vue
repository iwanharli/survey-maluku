<template>
    <!-- EIS -->
    <div class="card aos-init aos-animate" data-aos="fade-up" data-aos-delay="100">
      <div class="flex-wrap card-header d-flex justify-content-between bg-info custom-accordion2" block v-b-toggle.accordion-eis>
        <div class="header-title" style="display: flex; align-items: center">
          <h4 class="card-title text-white mb-3" style="font-weight: bolder; margin-right: 10px">EIS</h4>
  
          <svg fill="#ffffff" width="40px" height="40px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff" style="margin-top: -15px">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <g data-name="Layer 2">
                <g data-name="chevron-down">
                  <rect width="24" height="24" opacity="0"></rect>
                  <path d="M12 15.5a1 1 0 0 1-.71-.29l-4-4a1 1 0 1 1 1.42-1.42L12 13.1l3.3-3.18a1 1 0 1 1 1.38 1.44l-4 3.86a1 1 0 0 1-.68.28z"></path>
                </g>
              </g>
            </g>
          </svg>
        </div>
      </div>
  
      <hr style="margin: 0px; color: #3cc7d3; border-top: 10px solid; opacity: 1" />
  
      <b-collapse id="accordion-eis" role="tabpanel" visible>
        <div class="card-body">
          <div class="row"></div>
        </div>
      </b-collapse>
    </div>
  </template>