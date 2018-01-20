<template>
  <div id="invoice-page">
    <section>
      <b-table :bordered="false"
               :narrowed="narrowRecords"
               :hoverable="false"
               :mobile-cards="false"
               :loading="loading"
               :data="indexedData"
               :checked-rows.sync="localPreservedDataEntries"
               checkable
               @check="processPreservationUpdate">
        <template slot-scope="props">

          <b-table-column label="項次"
                          centered>
            <b-tag type="is-small">
              {{ perPage * (currentPage - 1) + props.row.index }}
            </b-tag>
          </b-table-column>

          <b-table-column label="銷售日期"
                          centered>
            <b-tag type="is-small">
              {{ props.row.date }}
            </b-tag>
          </b-table-column>

          <b-table-column label="客戶">
            <div class="control">
              <b-taglist attached>
                <template v-if="props.row.areaId">
                  <b-tag type="is-success is-small">{{ props.row.areaId }}</b-tag>
                  <b-tag type="is-info is-small"> {{ props.row.companyName }} </b-tag>
                </template>
                <template v-else>
                  <b-tag type="is-small"> {{ props.row.companyName }} </b-tag>
                </template>
              </b-taglist>
            </div>
          </b-table-column>

          <b-table-column label="產品">
            <div class="control">
              <b-taglist attached>
                <b-tag type="is-warning is-small">
                  {{ props.row.productId }}
                </b-tag>
                <b-tag type="is-info is-small">
                  {{ props.row.conversionFactorId }}
                </b-tag>
                <b-tag type="is-small">
                  {{ props.row.productName }}
                </b-tag>
              </b-taglist>
            </div>
          </b-table-column>

          <b-table-column label="售價"
                          numeric>
            {{ props.row.unitPrice|currency }}
          </b-table-column>

          <b-table-column label="數量"
                          numeric>
            {{ props.row.quantity|quantity }}
          </b-table-column>

          <b-table-column label="單位"
                          centered>
            {{ props.row.unit }}
          </b-table-column>

          <b-table-column label="總額"
                          numeric>
            {{ (props.row.unitPrice*props.row.quantity)|currency }}
          </b-table-column>
        </template>

        <template slot="empty">
          <section class="section">
            <div class="content has-text-grey has-text-centered">
              <p v-if="!isValidDateRange">銷售資料查詢時間區間尚未設定</p>
              <p v-else-if="loading">系統正在讀取銷售資料</p>
              <p v-else>未發現可顯示銷售資料</p>
            </div>
          </section>
        </template>

        <template v-if="!isEmpty"
                  slot="footer">
          <th/>
          <th>
            <div class="th-wrap is-centered"> 項次 </div>
          </th>
          <th>
            <div class="th-wrap is-centered"> 銷售日期 </div>
          </th>
          <th>
            <div class="th-wrap"> 客戶 </div>
          </th>
          <th>
            <div class="th-wrap"> 產品 </div>
          </th>
          <th>
            <div class="th-wrap is-numeric"> 售價 </div>
          </th>
          <th>
            <div class="th-wrap is-numeric"> 數量 </div>
          </th>
          <th>
            <div class="th-wrap is-centered"> 單位 </div>
          </th>
          <th>
            <div class="th-wrap is-numeric"> 總額 </div>
          </th>
        </template>
      </b-table>
    </section>
  </div>
</template>

<script>
import numeral from 'numeral'
import { mapGetters, mapState } from 'vuex'

import displayErrorDialog from '../mixins/displayErrorDialog'

export default {
  name: 'InvoicePage',
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
  mixins: [displayErrorDialog],
  data () {
    return {
      localPreservedDataEntries: [],
    }
  },
  computed: {
    ...mapGetters({
      invoiceQueryPeriod: 'invoiceQueryPeriod',
      isValidDateRange: 'isValidDateRange',
    }),
    ...mapState('invoices', {
      loading: 'loading',
      data: 'data',
      totalRecords: 'totalRecords',
      perPage: 'perPage',
      totalPages: 'totalPages',
      currentPage: 'currentPage',
      productFilter: 'productFilter',
    }),
    ...mapState({
      startDate: 'startDate',
      endDate: 'endDate',
      narrowRecords: 'narrowRecords',
    }),
    indexedData () {
      return this.data.map((record, index) => {
        record.index = index + 1
        return record
      }).filter(record => {
        return this.productFilter
          ? record.productId === this.productFilter
          : true
      })
    },
    isEmpty () { return this.totalRecords === 0 },
    preservedIndexList () {
      return this.localPreservedDataEntries.map(entry => {
        return entry.index
      })
    },
  },
  watch: {
    invoiceQueryPeriod (invoiceQueryPeriod) {
      if (invoiceQueryPeriod && this.isValidDateRange) this.avoidLengthQuery()
    },
  },
  mounted () {
    if (this.isValidDateRange && this.isEmpty) {
      this.avoidLengthQuery()
    }
  },
  beforeDestroy: function () {
    this.$store.commit('clients/reset')
    this.$store.commit('invoices/reset')
  },
  methods: {
    getLiveData () {
      this.$store.commit('invoices/setProductFilter', null)
      return this.$store
        .dispatch('clients/fetch')
        .catch(error => {
          console.error(error)
          return this.displayErrorDialog('客戶資料表讀取異常')
        })
        .then(() => {
          return this.$store
            .dispatch('invoices/fetch')
            .catch(error => {
              console.error(error)
              return this.displayErrorDialog('銷售資料表讀取異常')
            })
        })
        .then(() => {
          this.indexedData.forEach((entry, index) => {
            if (entry._preserved !== null) {
              if (entry._preserved) this.localPreservedDataEntries.push(this.indexedData[index])
            } else {
              if ((entry.areaId !== null) && ((entry.areaId >= 1) && (entry.areaId <= 4))) {
                this.localPreservedDataEntries.push(this.indexedData[index])
              }
            }
          })
        })
    },
    avoidLengthQuery () {
      if (this.invoiceQueryPeriod > 62) {
        this.$dialog.confirm({
          title: '查閱時間區段大於預設結算週期',
          message: `目前設定時間區段為 ${this.invoiceQueryPeriod} 日，請確認進行以避免長時間等待`,
          type: 'is-danger',
          hasIcon: true,
          icon: 'exclamation-circle',
          iconPack: 'fa',
          onConfirm: () => this.getLiveData(),
        })
      } else {
        this.getLiveData()
      }
    },
    markUnpreservedRecord (row, index) {
      return this.preservedIndexList.indexOf(row.index) === -1 ? 'not-preserved' : ''
    },
    processPreservationUpdate (preservationList, updatedEntry) {
      let preservationState = this.preservedIndexList.indexOf(updatedEntry.index) === -1
      this.$store.dispatch('invoices/upsert', Object.assign({}, updatedEntry, { _preserved: preservationState }))
    },
  },
}
</script>

<style>
th.checkbox-cell label {
  visibility: hidden;
}

.is-checked {
  font-weight: bold;
  color: blue;
  background-color: aquamarine;
}
</style>
