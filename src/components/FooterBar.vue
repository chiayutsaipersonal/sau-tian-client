
<template>
  <div
    id="footer-bar"
    class="level"
  >
    <div class="left-left">
      <div class="level-item" />
    </div>
    <div class="level-right">
      <div class="level-item">
        <button
          class="pagination-first button is-medium is-outlined"
          style="color:#7957d5;margin-right:8px;"
          @click="changePage(perPage, 1)"
          :disabled="current===1||current===null"
        >
          <span class="icon is-medium">
            <i class="fa fa-angle-double-left fa-lg" />
          </span>
        </button>
        <section>
          <b-pagination
            :total="total"
            :current="current"
            :order="'is-centered'"
            :size="'is-medium'"
            :simple="false"
            :per-page="perPage"
            @update:current="changePage(perPage, $event)"
          />
        </section>
        <button
          class="pagination-last button is-medium is-outlined"
          style="color:#7957d5;margin-left:8px;"
          @click="changePage(perPage, lastPage)"
          :disabled="current===lastPage"
        >
          <span class="icon is-medium">
            <i class="fa fa-angle-double-right fa-lg" />
          </span>
        </button>
      </div>
      <div class="level-item">
        <b-select
          placeholder="頁數"
          size="is-medium"
          @input="changePage(perPage, $event)"
          :disabled="current===null"
        >
          <template
            v-for="pageNumber in lastPage"
            :value="pageNumber"
          >
            <option
              v-if="pageNumber !== current"
              :key="pageNumber"
            >
              {{ pageNumber }}
            </option>
            <option
              v-else
              disabled
              :key="pageNumber"
            >
              {{ pageNumber }}
            </option>
          </template>
        </b-select>
      </div>
      <div class="level-item">
        <b-select
          placeholder="資料筆數"
          size="is-medium"
          @input="changePage($event, 1)"
        >
          <option value="15">15</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="0">全數</option>
        </b-select>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'FooterBar',
  data () {
    return {
      labelLookup: {
        products: '產品',
        clients: '客戶',
        invoices: '銷售',
      },
    }
  },
  computed: {
    ...mapState('products', {
      total: 'recordCount',
      lastPage: 'pageCount',
      current: 'current',
      perPage: 'perPage',
    }),
  },
  methods: {
    changePage (recordsPerPage, pageNumber) {
      let paginationQuery = recordsPerPage === '0'
        ? null
        : {
          perPage: recordsPerPage,
          page: pageNumber,
        }
      return this.$store
        .dispatch(`${this.$route.name}/fetch`, paginationQuery)
        .then(() => Promise.resolve())
        .catch(error => {
          console.error(error)
          return this.$dialog.alert({
            title: '錯誤',
            message: `${this.labelLookup[this.$route.name]}資料表讀取異常`,
            type: 'is-danger',
            hasIcon: true,
            icon: 'times-circle',
            iconPack: 'fa',
          })
        })
    },
  },
}
</script>

<style scoped>
#footer-bar {
  grid-column: 1 / -1;
}

.pagination-first[disabled],
.pagination-last[disabled] {
  border-color: #dbdbdb;
  background-color: #dbdbdb;
}

.pagination-first[disabled] > span > i,
.pagination-last[disabled] > span > i {
  color: #7a7a7a;
}

select option:disabled {
  background-color: #7957d5;
  color: white;
}
</style>
