<template>
  <div class="news-page">
    <b-col class="d-flex justify-content-between mb-3">
      <b-button
        v-b-modal.modal-register-news
        @click="defalutNewsModel"
        variant="primary"
        size="sm"
      >
        Register News
      </b-button>
      <div class="d-flex">
        <b-dropdown
          ref="dateDropdown"
          menu-class="py-0"
          right
          variant="outline-dark"
          no-caret
          class="mr-2"
        >
          <template #button-content>
            <span
              class="d-flex w-100 justify-content-between align-items-center"
            >
              <b-icon-calendar2-day class="mr-1" />
              <span>
                {{ filterDate ? customFormatter(filterDate) : "Select Date" }}
              </span>
            </span>
          </template>
          <div>
            <vuejs-datepicker
              v-model="filterDate"
              bootstrap-styling
              :inline="true"
              :use-utc="false"
              :format="customFormatter"
            />
          </div>
        </b-dropdown>
        <b-form-tags
          input-id="tags-basic"
          class="filter-tag mr-2"
          v-model="filterTags"
        ></b-form-tags>
        <b-button @click="clearFilters">Clear Filters</b-button>
      </div>
    </b-col>
    <b-card class="my-50" no-body>
      <news-table :data="news" :is-loading="isLoading" />
    </b-card>
    <b-modal
      id="modal-small-delete"
      ok-title="Delete"
      cancel-title="Cancel"
      ok-variant="danger"
      cancel-variant="outline-secondary"
      centered
      size="md"
      title="Delete News"
      no-enforce-focus
      :hide-footer="!rowToDelete.isRemovable"
      @ok="triggerDelete"
    >
      <span v-if="rowToDelete.isRemovable">
        Are you sure you want to delete this
      </span>
      <span v-else>You can not delete this news :(</span>
    </b-modal>
    <b-modal
      id="modal-register-news"
      :title="!!newsModel.newsId ? 'Edit News' : 'Register News'"
      ok-title="Save"
      cancel-title="Cancel"
      centered
      cancel-variant="outline-secondary"
      no-enforce-focus
      :ok-disabled="saving"
      @show="getNewsModel"
      @ok="saveNews"
    >
      <b-form-group class="mb-2" label="Title">
        <b-form-input v-model="newsModel.title" type="text" />
      </b-form-group>
      <b-form-group class="mb-2" label="Team">
        <v-select
          v-model="newsModel.team"
          :clearable="false"
          :class="!!newsModel.newsId ? 'disabled' : ''"
          label="text"
          placeholder="Choose Team"
          :options="['Team A', 'Team B', 'Team C']"
        />
      </b-form-group>
      <b-form-group class="mb-2" label="Tags">
        <b-form-tags
          input-id="tags-basic"
          v-model="newsModel.tags"
        ></b-form-tags>
      </b-form-group>
      <b-form-group class="mb-2" label="Author">
        <b-form-input
          v-model="newsModel.author"
          :disabled="!!newsModel.newsId"
          type="text"
        />
      </b-form-group>
      <div class="d-flex flex-column">
        <span class="mb-50"> Publication Date </span>
        <b-dropdown
          ref="dateDropdown"
          menu-class="py-0"
          right
          variant="outline-dark"
          no-caret
        >
          <template #button-content>
            <span
              class="d-flex w-100 justify-content-between align-items-center"
            >
              {{
                newsModel.publicationDate
                  ? customFormatter(newsModel.publicationDate)
                  : "Select Date"
              }}
            </span>
          </template>
          <div>
            <vuejs-datepicker
              v-model="newsModel.publicationDate"
              bootstrap-styling
              :inline="true"
              :use-utc="false"
              :format="customFormatter"
            />
          </div>
        </b-dropdown>
      </div>
      <b-form-group label="Removable">
        <b-form-checkbox v-model="newsModel.isRemovable" />
      </b-form-group>
      <b-form-group class="mb-2" label="Description">
        <b-form-textarea
          v-model="newsModel.description"
          id="textarea-no-resize"
          placeholder="Description"
          rows="3"
          no-resize
        ></b-form-textarea>
      </b-form-group>
    </b-modal>
  </div>
</template>

<script>
import vuejsDatepicker from "vuejs-datepicker";
import moment from "moment";
import NewsTable from "./NewsTable.vue";

export default {
  name: "News",
  components: {
    vuejsDatepicker,
    NewsTable,
  },
  data() {
    return {
      isLoading: true,
      saving: false,
      newsModel: {},
      filterDate: null,
      filterTags: null,
    };
  },
  mounted() {
    this.getAllNews();
  },
  computed: {
    news() {
      let filteredByDate = {};
      if (this.filterDate && this.filterTags?.length) {
        filteredByDate = this.$store.getters.getNews.filter(
          (news) =>
            this.customFormatter(news.publicationDate) ===
            this.customFormatter(this.filterDate)
        );
        const filterdNews = filteredByDate.filter((news) =>
          news?.tags?.some((tag) => this.filterTags.includes(tag))
        );
        return filterdNews;
      } else if (this.filterDate) {
        filteredByDate = this.$store.getters.getNews.filter(
          (news) =>
            this.customFormatter(news.publicationDate) ===
            this.customFormatter(this.filterDate)
        );
        return filteredByDate;
      } else if (this.filterTags?.length) {
        const filterdNews = this.$store.getters.getNews.filter((news) =>
          news?.tags?.some((tag) => this.filterTags.includes(tag))
        );
        return filterdNews;
      }
      return this.$store.getters.getNews;
    },
    rowToDelete() {
      return this.$store.getters.rowToDelete;
    },
  },
  methods: {
    async saveNews() {
      this.saving = true;
      try {
        if (this.newsModel.newsId) {
          await this.$store.dispatch("editNews", this.newsModel);
        } else {
          await this.$store.dispatch("saveNews", this.newsModel);
        }
      } catch (err) {
        console.log(err);
      } finally {
        this.saving = false;
        await this.getAllNews();
      }
    },
    async getAllNews() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("getAllNews");
      } catch (err) {
        console.log(err);
      } finally {
        this.isLoading = false;
      }
    },
    clearFilters() {
      this.filterDate = null;
      this.filterTags = null;
    },
    getNewsModel() {
      this.newsModel = this.$store.getters.getNewsModel;
      this.defalutNewsModel();
    },
    defalutNewsModel() {
      this.$store.commit("setNewsModel", {
        title: "",
        team: "",
        tags: [],
        author: localStorage.userName || "Guest",
        publicationDate: Date.now(),
        isRemovable: true,
        description: "",
        authorId: localStorage.userId,
      });
    },
    async triggerDelete() {
      try {
        await this.$store.dispatch("deleteNews", this.rowToDelete);
      } catch (err) {
        console.log(err);
      } finally {
        await this.getAllNews();
      }
    },
    customFormatter(date) {
      return moment(date).format("DD-MM-YYYY");
    },
  },
};
</script>

<style>
.news-page {
  margin: 20px 50px;
}

.disabled {
  pointer-events: none;
  cursor: not-allowed;
}
.disabled .vs__dropdown-toggle {
  color: #bfcbd9;
  background-color: #eef1f6;
  border-color: #d1dbe5;
}
.filter-tag {
  width: 200px;
  height: 38px !important;
  overflow: auto;
}
</style>
