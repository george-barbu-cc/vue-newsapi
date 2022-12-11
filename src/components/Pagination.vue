<template>
  <nav
    class="flex flex-col items-center justify-around border-t border-gray-200 bg-white py-3 mt-20 sm:flex-row"
    aria-label="Pagination"
  >
    <div class="sm:flex mb-5">
      <p class="text-sm text-gray-700">
        Showing
        <span class="font-medium">{{ this.currentResults }}</span>
        to
        <span class="font-medium">{{ this.currentPageResults }}</span>
        of
        <span class="font-medium">{{ this.totalResults }}</span>
        results
      </p>
    </div>
    <div class="flex flex-1 justify-between w-full sm:justify-end">
      <button
        @click="page('prev')"
        type="button"
        class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        Previous
      </button>
      <button
        @click="page('next')"
        type="button"
        class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        Next
      </button>
    </div>
  </nav>
</template>

<script>
export default {
  props: {
    currentResults: Number,
    totalResults: Number,
    pageSize: Number,
    pageNr: Number,
  },
  computed: {
    currentPageResults: function () {
      return this.currentResults + Number(this.pageSize) - 1 < this.totalResults
        ? this.currentResults + Number(this.pageSize) - 1
        : this.totalResults;
    },
  },
  methods: {
    page(direction) {
      if (direction === "prev") {
        if (this.pageNr > 1) {
          this.$emit("pageNr", this.pageNr - 1);
          this.$emit(
            "currentResults",
            this.currentResults >= this.pageSize
              ? this.currentResults - this.pageSize
              : 1
          );
        }
      } else {
        if (
          Math.ceil(
            (this.totalResults - (this.currentResults - 1 + this.pageSize)) /
              this.pageSize
          ) > 0
        ) {
          this.$emit("pageNr", this.pageNr + 1);

          this.$emit("currentResults", this.currentResults + this.pageSize);
        }
      }
    },
  },
};
</script>
