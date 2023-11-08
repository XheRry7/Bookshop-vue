<template>
  <h3>List of Books</h3>
  <div class="container">
    <div class="row">
      <div class="col">
      <div v-if="errorMessage">
      <h3 class="text-warning"></h3>
      </div>
        <div v-if="isLoading">
          <img src="../assets/loading.gif" alt="loader" />
        </div>
        <div v-if="!isLoading && books.length > 0">
          <table class="table table-hover table-center table-striped">
            <thead>
              <tr class="bg-info text-white">
                <th>Sno</th>
                <th>Name</th>
                <th>Author</th>
                <th>Downloads</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="book in books" :key="book.id">
                <td>{{ book?.id }}</td>
                <td>{{ book?.title }}</td>
                <td>{{ book?.authors[0]?.name }}</td>
                <td>{{ book?.download_count }}</td>
                <td>
                  <router-link
                    :to="'/' + book.id"
                    class="text-decoration-none fw-bold text-success"
                    >View Details</router-link
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <button @click="getMoreBooks()" class="btn btn-info mb-3">Load More</button>
</template>

<script>
import { BookLists } from "@/services/BooksLists";

export default {
  name: "BooksList",
  data: function () {
    return {
      isLoading: false,
      books: [],
      next: null,
      errorMessage: null,
    };
  },
  methods: {
    getMoreBooks: async function () {
      try {
        const nextBooks = await BookLists.getMoreBooks(this.next);
        this.books = [...this.books, ...nextBooks?.data?.results];
        this.next = nextBooks?.data?.next;
      } catch (error) {
        this.errorMessage = error.message;
      }
    },
  },
  created: async function () {
    try {
      this.isLoading = true;
      const response = await BookLists.getBooks();
      this.isLoading = false;
      this.books = response?.data?.results;
      this.next = response?.data?.next;
    } catch (error) {
        this.isLoading = false;
      this.errorMessage = error.message;
    }
  },
};
</script>
