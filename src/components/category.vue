<template>
  <div class="categories">
    <h2 class="section-title">Categories</h2>

    <nav class="page-nav">
      <router-link to="/category">List</router-link>
      <router-link to="/category/new">Create new</router-link>
    </nav>

    <section class="list" v-if="show.list">
      <ul v-if="show.categories">
        <li v-for="(category, index) in categories" v-bind:key="index">{{ category.name }}</li>
      </ul>

       <p v-else>No categories registered</p>
    </section>

    <section class="new" v-if="show.new">
      <h3 class="page-subtitle">Create new category</h3>

      <p class="message" v-if="message">{{ message }}</p>
      
      <form id="new-category" v-if="!savingCategory" class="basic-form" v-on:submit.prevent="saveNewCategory">
        <input type="text" class="input-name" placeholder="name" v-model="category.name">
        <input type="submit" class="input-save" value="save">
      </form>
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

        message: '',

        savingCategory: false,
        
        show: {
          list: false,
          categories: false,
          new: false
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

      categoryRoute() {
        this.urlParams.id = this.$route.params.id,
        this.urlParams.action = this.$route.params.action || null
      },

      saveNewCategory() {
        if (this.category.name !== '') {
          const formData = new FormData()
          formData.append("name", this.category.name)
          
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
              //router.push('/category')
            })
        }
      },

      setScreen() {
        this.resetScreen()

        let currentScreen = this.urlParams.action

        if (!this.urlParams.id && !this.urlParams.action) {
          this.getCategories()
          this.show.list = true
        }

        if (currentScreen === 'new') {
          this.show.new = true
        }
      },

      resetScreen() {
        this.show.list = false
        this.show.new = false
      }
    },

    created() {
      //this.categoryRoute()
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
</style>
