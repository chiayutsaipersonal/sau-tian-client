<template>
  <div id="product-page">
    <section>
      <b-table :bordered="false"
               :striped="true"
               :narrowed="true"
               :hoverable="true"
               :mobile-cards="false"
               :data="indexedData"
               :opened-detailed="editPaneInView"
               detailed
               detail-key="id">

        <template slot-scope="props">
          <b-table-column label="項次"
                          width="60"
                          numeric
                          centered>
            {{ perPage * (currentPage - 1) + props.row.index }}
          </b-table-column>

          <b-table-column label="3M 編號">
            <b-field grouped
                     group-multiline>
              <div v-if="props.row.sapId!==props.row.conversionFactorId"
                   class="control">
                <b-taglist attached>
                  <b-tag type="is-success is-small">秀田</b-tag>
                  <b-tag type="is-danger is-small">{{ props.row.sapId }}</b-tag>
                </b-taglist>
              </div>
              <div class="control">
                <b-taglist attached>
                  <b-tag v-if="props.row.sapId===props.row.conversionFactorId"
                         type="is-success is-small">秀田</b-tag>
                  <b-tag type="is-dark is-small">3M</b-tag>
                  <b-tag type="is-info is-small">{{ props.row.conversionFactorId }}</b-tag>
                </b-taglist>
              </div>
            </b-field>
          </b-table-column>

          <b-table-column label="產編">
            {{ props.row.id }}
          </b-table-column>

          <b-table-column label="品名">
            {{ props.row.name }}
          </b-table-column>

          <b-table-column label="庫存數"
                          numeric>
            {{ props.row.stockQty }}
          </b-table-column>

          <b-table-column label="單位"
                          centered>
            {{ props.row.unit }}
          </b-table-column>

          <b-table-column label="轉換率"
                          width="80"
                          centered>
            {{ props.row.conversionFactor }}
          </b-table-column>
        </template>

        <template slot="detail"
                  slot-scope="props">
          <product-edit-pane :id="props.row.id"
                             :name="props.row.name"
                             :conversion-factor-id="props.row.conversionFactorId"
                             :conversion-factor="props.row.conversionFactor"
                             @close="closeEditPane($event)"
                             @edit="editConversionFactor($event)"
                             @clear="clearConversionFactor($event)" />
        </template>

        <template slot="empty">
          <section class="section">
            <div class="content has-text-grey has-text-centered">
              <p v-if="loading">系統正在讀取產品資料</p>
              <p v-else>未發現可顯示產品資料</p>
            </div>
          </section>
        </template>

        <template slot="footer"
                  v-if="!isEmpty">
          <th/>
          <th>
            <div class="th-wrap is-numeric is-centered"> 項次 </div>
          </th>
          <th>
            <div class="th-wrap"> 3M 編號 </div>
          </th>
          <th>
            <div class="th-wrap"> 產編 </div>
          </th>
          <th>
            <div class="th-wrap"> 品名 </div>
          </th>
          <th>
            <div class="th-wrap is-numeric"> 庫存數 </div>
          </th>
          <th>
            <div class="th-wrap is-centered"> 單位 </div>
          </th>
          <th>
            <div class="th-wrap is-centered"> 轉換率 </div>
          </th>
        </template>
      </b-table>
    </section>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'

import ProductEditPane from './ProductEditPane'

import displayErrorDialog from '../mixins/displayErrorDialog'

export default {
  name: 'ProductPage',
  components: { ProductEditPane },
  mixins: [displayErrorDialog],
  data () {
    return {
      editPaneInView: [],
    }
  },
  computed: {
    ...mapState({ loading: 'loading' }),
    ...mapState('products', {
      data: 'data',
      totalRecords: 'totalRecords',
      perPage: 'perPage',
      totalPages: 'totalPages',
      currentPage: 'currentPage',
    }),
    indexedData: function () {
      return this.data.map((record, index) => {
        record.index = index + 1
        return record
      })
    },
    isEmpty: function () { return this.totalRecords === 0 },
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
          return this.$dialog.alert({
            title: '錯誤',
            message: '產品資料表讀取異常',
            type: 'is-danger',
            hasIcon: true,
            icon: 'times-circle',
            iconPack: 'fa',
          })
        })
    }
  },
  beforeDestroy: function () {
    this.reset()
  },
  methods: {
    ...mapActions('products', {
      clear: 'clear',
      fetch: 'fetch',
      upsert: 'upsert',
    }),
    ...mapMutations('products', { reset: 'reset' }),
    closeEditPane (id) {
      let index = this.editPaneInView.findIndex(idInView => idInView === id)
      this.editPaneInView.splice(index, 1)
    },
    clearConversionFactor (productId) {
      return this.clear(productId)
        .then(() => {
          this.$dialog.alert('產品轉換率重置成功')
          return this
            .fetch({
              perPage: this.perPage,
              currentPage: this.currentPage,
            })
            .then(() => Promise.resolve())
            .catch(error => {
              console.error(error)
              return this.displayErrorDialog('產品資料表讀取異常')
            })
        })
        .catch(error => {
          console.error(error)
          return this.displayErrorDialog('產品轉換率寫入異常')
        })
    },
    editConversionFactor (payload) {
      return this.upsert(payload)
        .then(() => {
          this.$dialog.alert('產品轉換率寫入成功')
          return this
            .fetch({
              perPage: this.perPage,
              currentPage: this.currentPage,
            })
            .then(() => Promise.resolve())
            .catch(error => {
              console.error(error)
              return this.displayErrorDialog('產品資料表讀取異常')
            })
        })
        .catch(error => {
          console.error(error)
          return this.displayErrorDialog('產品轉換率寫入異常')
        })
    },
  },
}
</script>

<style scoped>
#product-page {
  padding-right: 10px;
}

div.content.has-text-grey {
  overflow: hidden;
}
</style>
