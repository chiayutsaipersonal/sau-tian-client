<template>
  <div id="pagination-control"
       class="level">
    <div class="left-left">
      <div class="level-item" />
    </div>
    <div class="level-right">
      <div class="level-item">
        <button class="pagination-first button is-small is-outlined"
                @click="changePage(perPage, 1)"
                :disabled="currentPage===1||currentPage===null">
          <span class="icon is-small">
            <i class="fa fa-angle-double-left fa-lg" />
          </span>
        </button>
        <section>
          <b-pagination :total="totalRecords"
                        :per-page="perPage"
                        :current="currentPage"
                        :order="'is-centered'"
                        :size="'is-small'"
                        :simple="false"
                        @update:current="changePage(perPage, $event)" />
        </section>
        <button class="pagination-last button is-small is-outlined"
                @click="changePage(perPage, totalPages)"
                :disabled="(currentPage===totalPages) || (totalRecords===0)">
          <span class="icon is-small">
            <i class="fa fa-angle-double-right fa-lg" />
          </span>
        </button>
      </div>
      <div class="level-item">
        <b-select :placeholder="`第 ${currentPage.toString()} 頁`"
                  size="is-small"
                  :disabled="totalPages===1"
                  @input="changePage(perPage, $event)">
          <option v-for="pageNumber in totalPages"
                  :value="pageNumber"
                  :disabled="pageNumber===currentPage"
                  :key="pageNumber">
            第 {{ pageNumber }} 頁
          </option>
        </b-select>
      </div>
      <div class="level-item">
        <b-select :placeholder="`顯示 ${perPage.toString()} 筆資料`"
                  size="is-small"
                  @input="changePage($event, 1)">
          <option value="5"
                  :disabled="perPage===5">顯示 5 筆資料</option>
          <option value="10"
                  :disabled="perPage===10">顯示 10 筆資料</option>
          <option value="25"
                  :disabled="perPage===25">顯示 25 筆資料</option>
          <option value="50"
                  :disabled="perPage===50">顯示 50 筆資料</option>
          <option value="100"
                  :disabled="perPage===100">顯示 100 筆資料</option>
        </b-select>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'PaginationControl',
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
      loading: 'loading',
      totalRecords: 'totalRecords',
      perPage: 'perPage',
      totalPages: 'totalPages',
      currentPage: 'currentPage',
    }),
  },
  methods: {
    changePage (perPage, currentPage) {
      let paginationQuery = { perPage, currentPage }
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
#pagination-control {
  grid-area: p;
  justify-self: center;
}

.pagination-first {
  color: #7957d5;
  margin-right: 8px;
}
.pagination-last {
  color: #7957d5;
  margin-left: 8px;
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
