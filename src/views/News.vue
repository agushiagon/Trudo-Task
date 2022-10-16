<template>
  <div class="news-page">
    <b-col class="d-flex justify-content-between mb-3">
      <b-button v-b-modal.modal-register-news variant="primary" size="sm">
        Register News
      </b-button>
    </b-col>
    <b-card class="my-50" no-body>
      <news-table :data="news" :is-loading="isLoading" />
    </b-card>
    <b-modal
      id="modal-register-news"
      title="Register News"
      ok-title="Save"
      cancel-title="Cancel"
      centered
      cancel-variant="outline-secondary"
      no-enforce-focus
      :ok-disabled="saving"
      @ok="saveNews"
    >
      <b-form-group class="mb-2" label="Title">
        <b-form-input v-model="newsModel.title" type="text" />
      </b-form-group>
      <b-form-group class="mb-2" label="Team">
        <v-select
          v-model="newsModel.team"
          :clearable="false"
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
        <b-form-input v-model="newsModel.author" type="text" />
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
      newsModel: {
        title: "",
        team: "",
        tags: [],
        author: "",
        publicationDate: null,
        isRemovable: false,
        description: "",
        authorId: null,
      },
    };
  },
  mounted() {
    this.newsModel.author = localStorage.userName || "Guest";
    this.newsModel.authorId = localStorage.userId;
    this.getAllNews();
  },
  computed: {
    news() {
      return this.$store.getters.getNews;
    },
  },
  methods: {
    async saveNews() {
      this.saving = true;
      try {
        await this.$store.dispatch("saveNews", this.newsModel);
      } catch (err) {
        console.log(err);
      } finally {
        this.saving = false;
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
</style>
