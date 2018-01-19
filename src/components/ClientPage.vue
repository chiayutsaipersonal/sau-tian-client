<template>
  <div id="client-page">
    <section>
      <b-table :bordered="false"
               :striped="true"
               :narrowed="narrowRecords"
               :hoverable="true"
               :mobile-cards="false"
               :data="indexedData">
        <template slot-scope="props">

          <b-table-column label="項次"
                          width="60"
                          numeric
                          centered>
            {{ perPage * (currentPage - 1) + props.row.index }}
          </b-table-column>

          <b-table-column label="編號"
                          width="80">
            {{ props.row.id }}
          </b-table-column>

          <b-table-column label="區域"
                          width="60"
                          numeric
                          centered>
            {{ props.row.areaId }}
          </b-table-column>

          <b-table-column label="公司名稱">
            {{ props.row.name }}
          </b-table-column>

          <b-table-column label="聯絡人">
            {{ props.row.contact }}
          </b-table-column>

          <b-table-column label="電話">
            {{ props.row.telephone }}
          </b-table-column>

          <b-table-column label="傳真">
            {{ props.row.fax }}
          </b-table-column>

          <b-table-column label="地址">
            {{ props.row.address }}
          </b-table-column>

          <b-table-column label="郵遞區號">
            {{ props.row.zipCode }}
          </b-table-column>

          <b-table-column label="統編">
            {{ props.row.registrationId }}
          </b-table-column>

          <b-table-column label="種類">
            {{ props.row.type }}
          </b-table-column>
        </template>

        <template slot="empty">
          <section class="section">
            <div class="content has-text-grey has-text-centered">
              <p v-if="loading">系統正在讀取客戶資料</p>
              <p v-else>未發現可顯示客戶資料</p>
            </div>
          </section>
        </template>

        <template slot="footer"
                  v-if="!isEmpty">
          <th>
            <div class="th-wrap is-numeric is-centered">
              項次
            </div>
          </th>
          <th>
            <div class="th-wrap">
              編號
            </div>
          </th>
          <th>
            <div class="th-wrap is-numeric is-centered">
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
              電話
            </div>
          </th>
          <th>
            <div class="th-wrap">
              傳真
            </div>
          </th>
          <th>
            <div class="th-wrap">
              地址
            </div>
          </th>
          <th>
            <div class="th-wrap">
              郵遞區號
            </div>
          </th>
          <th>
            <div class="th-wrap">
              統編
            </div>
          </th>
          <th>
            <div class="th-wrap">
              種類
            </div>
          </th>
        </template>
      </b-table>
    </section>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'

import displayErrorDialog from '../mixins/displayErrorDialog'

export default {
  name: 'ClientPage',
  mixins: [displayErrorDialog],
  computed: {
    ...mapState({
      loading: 'loading',
      narrowRecords: 'narrowRecords',
    }),
    ...mapState('clients', {
      data: 'data',
      totalRecords: 'totalRecords',
      perPage: 'perPage',
      totalPages: 'totalPages',
      currentPage: 'currentPage',
    }),
    indexedData () {
      return this.data.map((record, index) => {
        record.index = index + 1
        return record
      })
    },
    isEmpty () { return this.totalRecords === 0 },
  },
  mounted: function () {
    if (this.isEmpty) {
      return this
        .fetch({
          perPage: this.perPage,
          currentPage: this.currentPage,
        })
        .catch(error => {
          console.error(error)
          return this.displayErrorDialog('客戶資料表讀取異常')
        })
    }
  },
  beforeDestroy: function () {
    this.reset()
  },
  methods: {
    ...mapActions('clients', { fetch: 'fetch' }),
    ...mapMutations('clients', { reset: 'reset' }),
  },
}
</script>
