<template>
  <div>
    <a href="#" class="mt-2 block">
      <p class="text-xl font-semibold text-gray-900">{{ post.title }}</p>
      <p class="mt-3 text-base text-gray-500" v-html="post.description"></p>
    </a>
    <div class="mt-6 flex items-center">
      <div class="flex-shrink-0">
        <a href="#">
          <span class="sr-only">{{ post.author }}</span>
          <img
            src="~/@assets/img/author.png"
            :alt="post.author"
            class="h-10 w-10 rounded-full"
          />
        </a>
      </div>
      <div class="ml-3 w-full">
        <p class="text-sm font-medium text-gray-900">
          <a href="#" class="hover:underline">{{ post.author }}</a>
        </p>
        <div class="flex justify-between w-full">
          <div class="flex space-x-1 text-sm text-gray-500">
            <time>{{ formatDate(post.publishedAt) }}</time>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: Object,
  },
  methods: {
    formatDate(date) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      const result = new Date(date);
      return result.toLocaleDateString("en-US", options);
    },
  },
};
</script>
