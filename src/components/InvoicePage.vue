<template>
  <div id="invoice-page">
    <section>
      <b-table :bordered="false"
               :striped="true"
               :narrowed="true"
               :hoverable="true"
               :mobile-cards="false"
               :loading="loading"
               :data="indexedData">
        <template slot-scope="props">

          <b-table-column label="項次"
                          width="60"
                          centered>
            {{ perPage * (currentPage - 1) + props.row.index }}
          </b-table-column>

          <b-table-column label="銷售日期"
                          centered
                          width="100">
            {{ props.row.date }}
          </b-table-column>

          <b-table-column label="區域"
                          width="60"
                          centered>
            {{ props.row.areaId }}
          </b-table-column>

          <b-table-column label="公司名稱">
            {{ props.row.companyName }}
          </b-table-column>

          <b-table-column label="聯絡人">
            {{ props.row.contact }}
          </b-table-column>

          <b-table-column label="品名">
            {{ props.row.productName }}
          </b-table-column>

          <b-table-column label="售價"
                          numeric>
            {{ props.row.price|currency }}
          </b-table-column>

          <b-table-column label="數量"
                          numeric>
            {{ props.row.quantity|quantity }}
          </b-table-column>

          <b-table-column label="單位"
                          centered
                          width="60">
            {{ props.row.unit }}
          </b-table-column>

          <b-table-column label="總額"
                          numeric>
            {{ (props.row.price*props.row.quantity)|currency }}
          </b-table-column>

          <b-table-column label="業務"
                          centered
                          width="80">
            {{ props.row.employeeId }}
          </b-table-column>
        </template>

        <template slot="empty">
          <section class="section">
            <div class="content has-text-grey has-text-centered">
              <p v-if="loading">系統正在讀取銷售資料</p>
              <p v-else>未發現可顯示銷售資料</p>
            </div>
          </section>
        </template>

        <template slot="footer"
                  v-if="!isEmpty">
          <th>
            <div class="th-wrap is-centered">
              項次
            </div>
          </th>
          <th>
            <div class="th-wrap is-centered">
              銷售日期
            </div>
          </th>
          <th>
            <div class="th-wrap is-centered">
              區域
            </div>
          </th>
          <th>
            <div class="th-wrap">
              公司名稱
            </div>
          </th>
          <th>
            <div class="th-wrap">
              聯絡人
            </div>
          </th>
          <th>
            <div class="th-wrap">
              品名
            </div>
          </th>
          <th>
            <div class="th-wrap is-numeric">
              售價
            </div>
          </th>
          <th>
            <div class="th-wrap is-numeric">
              數量
            </div>
          </th>
          <th>
            <div class="th-wrap is-centered">
              單位
            </div>
          </th>
          <th>
            <div class="th-wrap is-numeric">
              總額
            </div>
          </th>
          <th>
            <div class="th-wrap is-centered">
              業務
            </div>
          </th>
        </template>
      </b-table>
    </section>
  </div>
</template>

<script>
import numeral from 'numeral'
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'

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
    }),
    ...mapState({
      startDate: 'startDate',
      endDate: 'endDate',
    }),
    indexedData () {
      return this.data.map((record, index) => {
        record.index = index + 1
        return record
      })
    },
    isEmpty () { return this.totalRecords === 0 },
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
    this.reset()
  },
  methods: {
    ...mapActions('invoices', { fetch: 'fetch' }),
    ...mapMutations('invoices', { reset: 'reset' }),
    getLiveData () {
      return this
        .fetch()
        .catch(error => {
          console.error(error)
          return this.displayErrorDialog('銷售資料表讀取異常')
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
  },
}
</script>
