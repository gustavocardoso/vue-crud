<template>
  <div class="categories">
    <h2 class="section-title">Categories</h2>

    <nav class="page-nav">
      <router-link to="/category">List</router-link>
      <router-link to="/category/new">Create new</router-link>
    </nav>

    <section class="list" v-if="show.list">
      <ul v-if="show.categories">
        <li class="item" v-for="(category, index) in categories" v-bind:key="index" v-bind:class="isEven(index)"><router-link :to="`/category/edit/${category.id}`">{{ category.name }}</router-link></li>
      </ul>

       <p v-else>No categories registered</p>
    </section>

    <section class="new" v-if="show.newEdit">
      <h3 class="page-subtitle">Create new category</h3>

      <p class="message" v-if="message">{{ message }}</p>
      
      <form id="new-category" class="basic-form" v-on:submit.prevent="saveCategory">
        <input type="hidden" class="input-id" v-model="category.id" v-if="isEditing">
        <input type="text" class="input-name" placeholder="name" v-model="category.name">
        <input type="submit" class="input-save" value="save">
      </form>

      <a href="#" class="del" v-if="isEditing" v-on:click.prevent="deleteCategory">delete this category</a>
    </section>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'category',
    data () {
      return {
        apiUrl: 'http://localhost:3456/category',

        categories: [],

        category: {
          id: '',
          name: '',
        },

        isEditing: false,
        isCreating: false,

        message: '',
        
        show: {
          list: false,
          categories: false,
          newEdit: false
        },

        urlParams: {
          id: this.$route.params.id || false,
          action: this.$route.params.action || false
        }
      }
    },

    methods: {
      getCategories() {
        axios.get(this.apiUrl)
          .then(response => {
            if (response.data.categories.length > 0) {
              this.categories = response.data.categories
              this.show.categories = true
            }
          })
      },

      getCategory(id) {
        axios.get(`${this.apiUrl}/${id}`)
          .then(response => {
            if (response.data.error) {
              this.message = response.data.error
            } else {
              this.category.id = response.data.id
              this.category.name = response.data.name
            }
          })
      },

      categoryRoute() {
        this.urlParams.id = this.$route.params.id,
        this.urlParams.action = this.$route.params.action || null
      },

      deleteCategory() {
        if (window.confirm('Are you ure!?!')) {
          axios.delete(this.apiUrl, { params: { id: this.category.id }})
          .then(response => {
            setTimeout(() => {
              this.category.name = ''
              this.message = 'Category successfully deleted!'
            }, 1000)

            setTimeout(() => {
              this.$router.push({ path: '/category' })
              this.message = ''
            }, 3000)
          })
        }
      },

      saveCategory() {
        if (this.category.name !== '') {

          const formData = new FormData()
          formData.append("name", this.category.name)

          if (this.isCreating) {
            axios.post(this.apiUrl, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
            .then(response => {
              setTimeout(() => {
                this.category.name = ''
                this.message = 'Category successfully created!'
              }, 1000)

              setTimeout(() => {
                this.$router.push({ path: '/category' })
                this.message = ''
              }, 3000)
            })
          }

          if (this.isEditing) {
            formData.append("id", this.category.id)

            axios.put(this.apiUrl, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
            .then(response => {
              setTimeout(() => {
                this.message = 'Category successfully edited!'
              }, 1000)
            })
          }
        }
      },

      setScreen() {
        this.resetScreen()

        if (!this.urlParams.id && !this.urlParams.action) {
          this.getCategories()
          this.show.list = true
        }

        if (this.urlParams.action === 'new') {
          this.show.newEdit = true
          this.isCreating = true
          this.isEditing = false
          this.category.name = ''
          this.category.id = ''
        }

        if (this.urlParams.id && this.urlParams.action === 'edit') {
          this.show.newEdit = true
          this.isEditing = true
          this.isCreating = false
          this.getCategory(this.urlParams.id)
        }
      },

      resetScreen() {
        this.show.list = false
        this.show.newEdit = false
      },

      isEven(index) {
        if ((index + 1) % 2 === 0) return 'even'
      }
    },

    created() {
      this.setScreen()
    },

    watch: {
      '$route': 'categoryRoute',

      urlParams: {
        handler() {
          this.setScreen()
        },
        deep: true
      }
    },
  }
</script>

<style scoped>
  section {
    margin-bottom: 1em;
  }

  .page-nav {
    margin-bottom: 2em;
  }

  .section-title {
    font-size: 1.4em;
    font-weight: 700;
  }

  .page-subtitle {
    color: #546A7B;
    font-weight: normal;
  }

  .basic-form {
    padding: 1em;
  }

  .basic-form input, .basic-form label {
    display: block;
    margin: 0 auto 1em auto;
  }

   .basic-form label, .basic-form input[type=submit] {
     margin-bottom: 0;
   }

   .basic-form .input-name {
     font-size: 1.2em;
     text-align: center;
     color: #393D3F;
     background: #FDFDFF;
     border: 1px solid #42B983;
     padding: .4em;
   }

   .basic-form .input-save {
     font-size: 1.2em;
     text-align: center;
     font-weight: 700;
     color: #FDFDFF;
     background: #42B983;
     border: 0;
     border-radius: 8px;
     padding: .6em 1em;
   }

   .message {
     font-size: 0.8em;
     font-weight: 700;
     text-transform: uppercase;
     color: #c03;
     margin: 2em 0 1em 0;
   }

   .list {
     width: 60%;
     margin: 0 auto;
   }

   .list .item {
     font-size: 1em;
     padding: .3em .5em;
   }

   .list .item.even {
     background: #eee;
   }

   .list .item:hover {
     background: #C6C5B9;
   }

   .list .item:hover a {
     font-weight: 900;
     color: #FDFDFF;
   }

   .list .item a {
     text-decoration: none;
   }

   .del {
     display: inline-block;
     text-decoration: none;
     color: #c03;
     margin: 1em auto 0 0;
   }
</style>
