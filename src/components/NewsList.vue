<template>
  <div class="bg-white px-4 pt-8 pb-8 sm:px-6 lg:px-8 lg:pt-8 lg:pb-8">
    <div class="mx-auto max-w-7xl sm:py-16 lg:flex lg:justify-between">
      <div class="max-w-xl">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          News
        </h2>
        <p class="text-xl text-gray-500">Breaking News & Top Stories.</p>
      </div>
      <div class="mt-10 flex items-center justify-end gap-3 w-full max-w-xs">
        <label for="currency" class="block text-base font-medium text-gray-500"
          >Per Page</label
        >
        <div class="relative mt-1.5">
          <select
            @change="onPage($event)"
            v-model="pageSize.size"
            id="per_page"
            name="per_page"
            class="block w-full appearance-none rounded-md border border-gray-300 bg-white bg-none py-2 pl-3 pr-10 text-base text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          >
            <option value="5">5 Articles</option>
            <option value="10">10 Articles</option>
            <option value="20">20 Articles</option>
          </select>
          <div
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2"
          >
            <ChevronDownIcon class="h-4 w-4 text-gray-400" aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
    <Loading v-if="this.loading === true" />
    <div
      v-else
      class="relative mx-auto max-w-lg divide-y-2 divide-gray-200 lg:max-w-7xl"
    >
      <div>
        <div
          class="my-3 sm:mt-4 lg:grid lg:grid-cols-2 lg:items-center lg:justify-between lg:gap-5"
        >
          <p class="text-xl text-gray-500">Search for Article</p>
          <form
            @submit.prevent="searchSubmit"
            class="mt-6 flex flex-col sm:flex-row lg:mt-0 lg:flex-grow"
          >
            <div class="w-full">
              <label for="term" class="sr-only">Search Article</label>
              <input
                v-model="search.input"
                id="term"
                name="term"
                type="search"
                autocomplete="search"
                class="w-full appearance-none rounded-md border border-gray-300 bg-white px-4 py-2 text-base text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                placeholder="Search..."
              />
            </div>
            <div
              class="mt-2 flex w-full flex-shrink-0 rounded-md shadow-sm sm:mt-0 sm:ml-3 sm:inline-flex sm:w-auto"
            >
              <button
                type="submit"
                class="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:inline-flex sm:w-auto"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
      <div v-if="results.totalResults > 0">
        <div
          class="mt-6 grid gap-16 pt-10 lg:grid-cols-2 lg:gap-x-5 lg:gap-y-12"
        >
          <NewsItem v-for="post in posts" :post="post" :key="post.id" />
        </div>
        <Pagination
          :currentResults="results.currentResults"
          :totalResults="results.totalResults"
          :pageSize="pageSize.size"
          :pageNr="pageSize.nr"
          @pageNr="onUpdatePageNr($event)"
          @currentResults="onUpdateCurrentResults($event)"
        />
      </div>
      <NewsNotFound v-else />
    </div>
  </div>
</template>

<script>
import { ChevronDownIcon } from "@heroicons/vue/20/solid";
import { searchPosts } from "@services/news";
import NewsItem from "@components/NewsItem.vue";
import NewsNotFound from "@components/NewsNotFound.vue";
import Loading from "@components/Loading.vue";
import Pagination from "@components/Pagination.vue";

export default {
  name: "PostLists",
  data() {
    return {
      loading: true,
      posts: [],
      search: {
        input: "",
        query: "news",
      },
      pageSize: {
        size: 10,
        nr: 1,
      },
      results: {
        currentResults: 1,
        totalResults: 0,
      },
    };
  },

  components: {
    ChevronDownIcon,
    NewsItem,
    NewsNotFound,
    Loading,
    Pagination,
  },
  methods: {
    async fetchPosts() {
      this.loading = true;
      const q = this.search.query;
      const pageSize = this.pageSize.size;
      const page = this.pageSize.nr;
      const response = await searchPosts(q, pageSize, page);
      this.posts = response.articles;
      this.loading = false;
      this.results.totalResults = response.totalResults;
    },
    searchSubmit() {
      this.search.query = this.search.input;
    },
    onPage(event) {
      this.pageSize.size = Number(event.target.value);
    },
    onUpdatePageNr(value) {
      this.pageSize.nr = value;
    },
    onUpdateCurrentResults(value) {
      this.results.currentResults = value;
    },
  },
  watch: {
    "search.query": function (newVal, oldVal) {
      this.fetchPosts();
    },
    pageSize: {
      handler: function (newVal, oldVal) {
        this.fetchPosts();
      },
      deep: true,
    },
  },
  async mounted() {
    await this.fetchPosts();
  },
};
</script>
