<template>
  <div id="product-page">
    <section>
      <b-table
        :data="isEmpty ? [] : productData"
        :bordered="false"
        :striped="true"
        :narrowed="true"
        :hoverable="true"
        :loading="loading"
        :mobile-cards="false"
        :selected.sync="selected"
        @update:selected="editMode=true"
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
              <p>
                <b-icon
                  icon="minus-circle"
                  size="is-large"
                />
              </p>
              <p>資料不存在</p>
            </div>
          </section>
        </template>
        <template slot="footer">
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

    <b-modal
      :active.sync="editMode"
      has-modal-card
    >
      <product-edit-form :record="selected" />
    </b-modal>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

import ProductEditForm from '@/components/ProductEditForm'

export default {
  name: 'ProductPage',
  components: { ProductEditForm },
  data () {
    return {
      editMode: false,
      selected: null,
    }
  },
  computed: {
    ...mapState('products', {
      loading: 'loading',
      productData: 'data',
    }),
    isEmpty: function () { return this.productData.length === 0 },
  },
  mounted: function () {
    if (this.productData.length === 0) {
      return this.fetchProductData({
        perPage: 15,
        page: 1,
      }).then(() => {
        return Promise.resolve()
      }).catch(error => {
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
  methods: {
    ...mapActions('products', { fetchProductData: 'fetch' }),
  },
}
</script>

<style scoped>
div.content.has-text-grey {
  overflow: hidden;
}
</style>
