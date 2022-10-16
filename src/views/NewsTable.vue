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
      <slot slot="table-row" slot-scope="data">
        <span v-if="data.column.field === 'tags'" class="d-flex flex-column">
          <span v-for="(tags, index) in data.formattedRow.tags" :key="index">
            {{ tags }}
          </span>
        </span>
        <span v-else-if="data.column.field === 'publicationDate'">
          {{ customFormatter(data.formattedRow.publicationDate) }}
        </span>
        <span v-else-if="data.column.field === 'description'">
          <div class="d-flex justify-content-between">
            <span class="align-self-center">
              {{ data.formattedRow.description }}
            </span>
            <span>
              <b-dropdown
                variant="link-light"
                toggle-class="text-decoration-none"
                no-caret
              >
                <template v-slot:button-content>
                  <b-icon-three-dots />
                </template>
                <b-dropdown-item
                  v-b-modal.modal-register-news
                  @click="setNewsModel(data.row)"
                >
                  <span>Edit</span>
                </b-dropdown-item>
                <b-dropdown-item
                  v-b-modal.modal-small-delete
                  @click="deleteNews(data.row)"
                >
                  <span>Delete</span>
                </b-dropdown-item>
              </b-dropdown>
            </span>
          </div>
        </span>
        <span v-else>
          {{ data.formattedRow[data.column.field] }}
        </span>
      </slot>
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
import moment from "moment";

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
  methods: {
    deleteNews(row) {
      this.$store.commit("setNewsToDelete", row);
    },
    setNewsModel(row) {
      this.$store.commit("setNewsModel", JSON.parse(JSON.stringify(row)));
    },
    customFormatter(date) {
      return moment(date).format("DD-MM-YYYY");
    },
  },
};
</script>
<style scoped>
.empty-state {
  height: calc(100vh - 270px);
}
</style>
