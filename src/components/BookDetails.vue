<template>
  <h3>Book Details</h3>
  <div class="container">
    <div class="row">
      <div class="col">
      <div class="text-center ml-24">
      <div v-if="isLoading">
      <img src="../assets/loading.gif" alt="loader" />
      </div>
        <div v-if="!isLoading && Object.keys(book)" class="card" style="width: 18rem">
          <img
            class="card-img-top"
            :src="book?.formats && book?.formats['image/jpeg']"
            alt="Card image cap"
          />
          <div class="card-body">
            <h5 class="card-text">Title : {{ book?.title }}</h5>
            <h5 class="card-text">Author : {{ book?.authors[0]?.name }}</h5>
            <a href="#" class="btn btn-primary"><router-link to="/" class="text-decoration-none text-white"> Go Back </router-link></a>
          </div>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import { BookLists } from "@/services/BooksLists";

export default {
  name: "BookDetails",
  data: function () {
    return {
      isLoading: false,
      book: {},
      errorMessage: null,
    };
  },
  // methods: {},
  created: async function () {
    const selectedBookId = this.$route.params.id;
    try {
      this.isLoading = true;
      const response = await BookLists.getBooks();
      this.isLoading = false;
      this.book = response?.data?.results.find(
        (book) => book.id == selectedBookId
      );
      this.next = response?.data?.next;
    } catch (error) {
      this.errorMessage = error.message;
    }
  },
};
</script>
