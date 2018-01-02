<template>
  <div id="product-page">
    <section>
      <b-table
        :bordered="false"
        :striped="true"
        :narrowed="false"
        :hoverable="true"
        :data="data"
        :loading="loading"
      >
        <template slot-scope="props">

          <b-table-column label="編號">
            {{ props.row.id }}
          </b-table-column>

          <b-table-column label="品名">
            {{ props.row.name }}
          </b-table-column>

          <b-table-column label="3M編號">
            <b-field
              grouped
              group-multiline
            >
              <div
                v-if="props.row.sapId!==props.row.conversionFactorId"
                class="control"
              >
                <b-taglist attached>
                  <b-tag type="is-success is-small">秀田</b-tag>
                  <b-tag type="is-danger is-small">{{ props.row.sapId }}</b-tag>
                </b-taglist>
              </div>
              <div class="control">
                <b-taglist attached>
                  <b-tag
                    v-if="props.row.sapId===props.row.conversionFactorId"
                    type="is-success is-small"
                  >秀田</b-tag>
                  <b-tag type="is-dark is-small">3M</b-tag>
                  <b-tag type="is-info is-small">{{ props.row.conversionFactorId }}</b-tag>
                </b-taglist>
              </div>
            </b-field>
          </b-table-column>

          <b-table-column
            label="庫存數"
            numeric
          >
            {{ props.row.stockQty }}
          </b-table-column>

          <b-table-column
            label="單位"
            centered
          >
            {{ props.row.unit }}
          </b-table-column>

          <b-table-column
            label="轉換率"
            width="80"
            centered
          >
            {{ props.row.conversionFactor }}
          </b-table-column>
        </template>
        <template slot="empty">
          <section class="section">
            <div class="content has-text-grey has-text-centered">
              <p v-if="loading">系統正在讀取產品資料</p>
              <p v-else>未發現可顯示產品資料</p>
            </div>
          </section>
        </template>
        <template
          slot="footer"
          v-if="!isEmpty"
        >
          <th>
            <div class="th-wrap">
              編號
            </div>
          </th>
          <th>
            <div class="th-wrap">
              品名
            </div>
          </th>
          <th>
            <div class="th-wrap">
              3M編號
            </div>
          </th>
          <th>
            <div class="th-wrap is-numeric">
              庫存數
            </div>
          </th>
          <th>
            <div class="th-wrap is-centered">
              單位
            </div>
          </th>
          <th>
            <div class="th-wrap is-centered">
              轉換率
            </div>
          </th>
        </template>
      </b-table>
    </section>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'

export default {
  name: 'ProductPage',
  components: {},
  data () { return {} },
  computed: {
    ...mapState('products', {
      loading: 'loading',
      data: 'data',
      totalRecords: 'totalRecords',
      perPage: 'perPage',
      totalPages: 'totalPages',
      currentPage: 'currentPage',
    }),
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
    ...mapActions('products', { fetch: 'fetch' }),
    ...mapMutations('products', { reset: 'reset' }),
  },
}
</script>

<style scoped>
ul {
  list-style: none;
}
div.content.has-text-grey {
  overflow: hidden;
}
</style>
