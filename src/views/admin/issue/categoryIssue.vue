<template>
  <b-row>
    <b-col xl="3" lg="3" md="12" sm="12">
      <a href="#" @click="addCategory()">
        <b-card class="bg-primary addCard">
          <div class="d-flex align-items-center justify-content-between">
            <h6 class="text-white" style="font-weight: bold">Tambah Kategori</h6>
            <b-dropdown id="dropdown-3" class="dropdown" variant="link text-body p-0" toggle-class="text-decoration-none" no-caret dropleft> </b-dropdown>
            <icon-component class="text-white" type="solid" icon-name="plus" :size="20"></icon-component>
          </div>
        </b-card>
      </a>
    </b-col>
    <b-col xl="3" lg="3" md="12" sm="12" v-for="item in categoryData" :key="item.id">
      <b-card>
        <div class="d-flex align-items-center justify-content-between" style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI'">
          <h6 :class="`text-${variant} mb-0`" style="text-transform: capitalize">{{ item.name }}</h6>
          <b-dropdown id="dropdown-3" text="" class="dropdown" variant="link text-body p-0" toggle-class="text-decoration-none" no-caret dropleft>
            <template #button-content>
              <icon-component type="outlined" icon-name="three-dots" :size="20"></icon-component>
            </template>
            <b-dropdown-item @click="editCategory(item.id, item.name)"> <icon-component type="dual-tone" icon-name="pencil" :size="20"></icon-component> Edit </b-dropdown-item>
            <b-dropdown-item @click="deleteCategory(item.id)"> <icon-component type="dual-tone" icon-name="trash" :size="20"></icon-component> Hapus </b-dropdown-item>
          </b-dropdown>
        </div>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  data() {
    return {
      variant: 'primary',
      categoryData: []
    }
  },

  mounted() {
    this.fetchCategory()
  },

  methods: {
    async fetchCategory() {
      try {
        const config = { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } }
        const response = await axios.get('/api/categories', config)

        this.categoryData = response.data.data

        // Sort the categoryData array by the 'name' property in ascending order
        this.categoryData.sort((a, b) => a.name.localeCompare(b.name))

        console.log('Data kategori retrieved successfully')
      } catch (error) {
        console.error('Failed to fetch 💀:', error.message)
      }
    },

    async addCategory() {
      Swal.fire({
        title: 'Tambah Kategori',
        input: 'text',
        confirmButtonText: 'Simpan',
        showCancelButton: true,
        preConfirm: (inputValue) => {
          if (!inputValue) {
            Swal.showValidationMessage('Nama kategori harus diisi')
          } else {
            this.saveCategory(inputValue)
          }
        }
      })
    },

    async editCategory(id, name) {
      Swal.fire({
        title: 'Edit Kategori',
        input: 'text',
        inputValue: name,
        confirmButtonText: 'Simpan',
        showCancelButton: true,
        preConfirm: (inputValue) => {
          if (!inputValue) {
            Swal.showValidationMessage('Nama kategori harus diisi')
          } else {
            this.saveEditedCategory(id, inputValue)
          }
        }
      })
    },

    async deleteCategory(id) {
      const config = {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
      }

      Swal.fire({
        icon: 'warning',
        title: 'Yakin ingin menghapus?',
        text: 'Tidak akan bisa dikembalikan!',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete('/api/categories/' + id, config)
            .then((response) => {
              console.log(response)
              Swal.fire('Delete', 'User telah berhasil dihapus.', 'success')

              this.fetchCategory()
            })
            .catch((error) => {
              Swal.fire('Error', 'error')
              console.error('Failed to delete category:', error)
            })
        } else {
          Swal.fire('Cancelled')
        }
      })
    },

    async saveCategory(categoryName) {
      const config = {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
      }

      const cname = {
        name: categoryName
      }

      await axios
        .post('/api/categories', cname, config)
        .then((response) => {
          console.log('Category saved successfully:')

          Swal.fire({
            title: 'Berhasil menyimpan kategori!',
            icon: 'success',
            showConfirmButton: false,
            timer: 2000
          })

          this.fetchCategory()
        })
        .catch((error) => {
          Swal.fire('Error', 'Kategori sudah terdaftar sebelumnya', 'error')
          console.error('Failed to save category:', error)
        })
    },

    async saveEditedCategory(id, categoryName) {
      const config = {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
      }

      const cname = {
        name: categoryName,
        _method: 'PATCH'
      }

      await axios
        .post('/api/categories/' + id, cname, config)
        .then((response) => {
          console.log('Category updated successfully:')

          Swal.fire({
            title: 'Berhasil edit kategori!',
            icon: 'success',
            showConfirmButton: false,
            timer: 2000
          })

          this.fetchCategory()
        })
        .catch((error) => {
          Swal.fire('Error', 'Kategori sudah terdaftar sebelumnya', 'error')
          console.error('Failed to edit category:', error)
        })
    }
  }
}
</script>

<style lang="scss">
.dropdown-toggle-no-caret::after {
  content: unset;
  border: 0;
}
.ghost {
  opacity: 0.5;
}
.list-group-item {
  cursor: move;
}
.list-group-item i {
  cursor: pointer;
}

.addCard:hover {
  background-color: rgba(0, 0, 0, 0.637) !important;
}
</style>
