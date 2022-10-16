<template>
  <div>
    <!-- Loading Message -->
    <b-skeleton-table
      v-if="isLoading"
      :rows="10"
      :columns="6"
      :table-props="{ bordered: true, striped: true }"
    />

    <!-- Vue Data Table -->
    <vue-good-table v-else :columns="columns" :rows="data">
      <!-- Empty state slot -->
      <div slot="emptystate" class="empty-state d-flex justify-content-center">
        <div class="m-auto">
          <span>No News Have Been Registerd Yet</span>
        </div>
      </div>
    </vue-good-table>
  </div>
</template>

<script>
import "vue-good-table/dist/vue-good-table.css";
import { VueGoodTable } from "vue-good-table";

export default {
  components: {
    VueGoodTable,
  },
  props: {
    data: {
      type: [Array, Object],
    },
    isLoading: {
      type: [Boolean],
    },
  },
  data() {
    return {
      columns: [
        {
          label: "Title",
          field: "title",
        },
        {
          label: "Team",
          field: "team",
        },
        {
          label: "Tags",
          field: "tags",
        },
        {
          label: "Author",
          field: "author",
        },
        {
          label: "Publication Date",
          field: "publicationDate",
        },
        {
          label: "Description",
          field: "description",
        },
      ],
    };
  },
};
</script>
<style scoped>
.empty-state {
  height: calc(100vh - 270px);
}
</style>
