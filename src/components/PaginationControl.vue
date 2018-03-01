<template>
  <div id="pagination-control"
       class="level">
    <div v-if="$route.name==='invoices'"
         class="level-left">
      <div class="level-item">
        <b-select v-if="unfilteredInvoiceData.length>0"
                  v-model="localProductFilter"
                  size="is-small"
                  placeholder="顯示所有產品"
                  :disabled="$route.name!=='invoices'"
                  @input="updateProductFilter($event)">
          <option :value="null">顯示所有產品</option>
          <option v-for="productId in uniqueProducts"
                  :value="productId"
                  :key="productId">
            僅顯示 {{ productId }}
          </option>
        </b-select>
        &nbsp;
        <b-select v-if="unfilteredInvoiceData.length>0"
                  v-model="localClientFilter"
                  size="is-small"
                  placeholder="顯示所有客戶"
                  :disabled="$route.name!=='invoices'"
                  @input="updateClientFilter($event)">
          <option :value="null">顯示所有客戶</option>
          <option v-for="(clientId, index) in patronList.map(patron=>patron.id)"
                  :value="clientId"
                  :key="clientId">
            僅顯示 【{{ clientId }}】 {{ patronList[index].name }}
          </option>
        </b-select>
        &nbsp;
        <b-select v-if="unfilteredInvoiceData.length>0"
                  v-model="localDeptFilter"
                  size="is-small"
                  :disabled="($route.name!=='invoices')||(localProductFilter!==null)"
                  @input="setDeptFilter($event)">
          <option :value="null">部門篩選</option>
          <option value="ipd">IPD</option>
          <option value="c3sd">C3SD</option>
        </b-select>
      </div>
      <div v-if="unfilteredInvoiceData.length>0"
           class="level-item">
        <b-field grouped
                 group-multiline>
          <div class="control">
            <b-taglist attached>
              <b-tag type="is-success is-small">實際銷售總額</b-tag>
              <b-tag type="is-info is-small"> {{ actualTotalSales|currency }} </b-tag>
            </b-taglist>
          </div>
          <div class="control">
            <b-taglist attached>
              <b-tag type="is-success is-small">操作銷售總額</b-tag>
              <b-tag type="is-info is-small"
                     :class="{'is-info': actualTotalSales===workingTotalSales, 'is-danger':actualTotalSales!==workingTotalSales}">
                {{ workingTotalSales|currency }}
              </b-tag>
            </b-taglist>
          </div>
        </b-field>
      </div>
      <div v-if="unfilteredInvoiceData.length>0"
           class="level-item">
        <b-field grouped
                 group-multiline>
          <div class="control">
            <b-taglist attached>
              <b-tag type="is-black is-small">實際銷售總量</b-tag>
              <b-tag type="is-info is-small"> {{ actualQuantitySoldTotal|quantity }} </b-tag>
            </b-taglist>
          </div>
          <div class="control">
            <b-taglist attached>
              <b-tag type="is-black is-small">操作銷售總量</b-tag>
              <b-tag type="is-info is-small"
                     :class="{'is-info': actualQuantitySoldTotal===workingQuantitySoldTotal, 'is-danger':actualQuantitySoldTotal!==workingQuantitySoldTotal}">
                {{ workingQuantitySoldTotal|quantity }}
              </b-tag>
            </b-taglist>
          </div>
        </b-field>
      </div>
    </div>
    <div v-else
         class="level-right" />
    <div v-if="$route.name==='invoices'"
         class="level-right" />
    <div v-else
         class="level-right">
      <div class="level-item">
        <button class="pagination-first button is-medium is-outlined"
                @click="changePage(perPage, 1)"
                :disabled="currentPage===1||currentPage===null">
          <span class="icon is-medium">
            <i class="fa fa-angle-double-left fa-lg" />
          </span>
        </button>
        <section>
          <b-pagination :total="totalRecords"
                        :per-page="perPage"
                        :current="currentPage"
                        :order="'is-centered'"
                        :size="'is-medium'"
                        :simple="false"
                        @update:current="changePage(perPage, $event)" />
        </section>
        <button class="pagination-last button is-medium is-outlined"
                @click="changePage(perPage, totalPages)"
                :disabled="(currentPage===totalPages) || (totalRecords===0)">
          <span class="icon is-medium">
            <i class="fa fa-angle-double-right fa-lg" />
          </span>
        </button>
      </div>
      <div class="level-item">
        <b-select v-model="localCurrentPage"
                  :placeholder="`第 ${currentPage.toString()} 頁`"
                  size="is-medium"
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
        <b-select v-model="localPerPage"
                  size="is-medium"
                  :placeholder="`顯示 ${perPage.toString()} 筆資料`"
                  :disabled="$route.name==='invoices'"
                  @input="changePage($event, 1)">
          <option value="5"
                  :disabled="perPage===5">
            顯示 5 筆資料
          </option>
          <option value="10"
                  :disabled="perPage===10">
            顯示 10 筆資料
          </option>
          <option value="25"
                  :disabled="perPage===25">
            顯示 25 筆資料
          </option>
          <option value="50"
                  :disabled="perPage===50">
            顯示 50 筆資料
          </option>
          <option value="100"
                  :disabled="perPage===100">
            顯示 100 筆資料
          </option>
        </b-select>
      </div>
    </div>
  </div>
</template>

<script>
import numeral from 'numeral'
import { mapGetters, mapMutations, mapState } from 'vuex'

import displayErrorDialog from '../mixins/displayErrorDialog'
import viewLabel from '../mixins/viewLabel'

export default {
  name: 'PaginationControl',
  filters: {
    currency (value) {
      if (value === null) return null
      return numeral(value).format('$ 0,0[.]00')
    },
    quantity (value) {
      if (value === null) return null
      return numeral(value).format('0,0[.]00')
    },
  },
  mixins: [displayErrorDialog, viewLabel],
  data () {
    return {
      localCurrentPage: null,
      localPerPage: null,
      localProductFilter: null,
      localClientFilter: null,
      localDeptFilter: null,
    }
  },
  computed: {
    ...mapGetters('invoices', {
      filteredData: 'filteredData',
      uniqueProducts: 'uniqueProducts',
    }),
    ...mapState('clients', { patronList: 'patronList' }),
    ...mapState('invoices', {
      unfilteredInvoiceData: 'data',
      clientFilter: 'clientFilter',
      productFilter: 'productFilter',
    }),
    actualTotalSales () {
      return this.filteredData.reduce((prevEntry, currentEntry) => {
        return prevEntry + currentEntry.actualInvoiceValue
      }, 0)
    },
    workingTotalSales () {
      return this.filteredData.reduce((prevEntry, currentEntry) => {
        return prevEntry + currentEntry.workingInvoiceValue
      }, 0)
    },
    actualQuantitySoldTotal () {
      return this.filteredData.reduce((prevEntry, currentEntry) => {
        return prevEntry + currentEntry.actualSalesQuantity
      }, 0)
    },
    workingQuantitySoldTotal () {
      return this.filteredData.reduce((prevEntry, currentEntry) => {
        return prevEntry + currentEntry.workingSalesQuantity
      }, 0)
    },
    totalRecords () {
      return this.$store.state[this.$route.name].totalRecords
    },
    perPage () {
      return this.$store.state[this.$route.name].perPage
    },
    totalPages () {
      return this.$store.state[this.$route.name].totalPages
    },
    currentPage () {
      return this.$store.state[this.$route.name].currentPage
    },
  },
  watch: {
    clientFilter (clientFilter) {
      this.localClientFilter = clientFilter
    },
    productFilter (productFilter) {
      this.localProductFilter = productFilter
    },
    currentPage (currentPage) {
      this.localCurrentPage = currentPage
    },
    perPage (perPage) {
      this.localPerPage = perPage
    },
  },
  methods: {
    ...mapMutations('invoices', {
      setClientFilter: 'setClientFilter',
      setDeptFilter: 'setDeptFilter',
      setProductFilter: 'setProductFilter',
    }),
    changePage (perPage, currentPage) {
      let paginationQuery = { perPage, currentPage }
      return this.$store
        .dispatch(`${this.$route.name}/fetch`, paginationQuery)
        .catch(error => {
          console.error(error)
          return this.displayErrorDialog(`${this.viewLabel()}資料表讀取異常`)
        })
    },
    updateProductFilter (event) {
      this.setProductFilter(event)
      this.localDeptFilter = null
      this.setDeptFilter(null)
    },
    updateClientFilter (event) {
      this.setClientFilter(event)
      this.localDeptFilter = null
      this.setDeptFilter(null)
    },
  },
}
</script>

<style scoped>
#pagination-control {
  grid-area: p;
}

.level-left {
  justify-self: start;
}

.level-right {
  justify-self: end;
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
