<template>
  <div>
    <v-layout wrap>
      <v-flex xs12 sm12 md4 mt-3 pl-3>
        <v-toolbar-title>{{ $t('cities.TITLE') }}</v-toolbar-title>
      </v-flex>
      <v-flex xs12 sm6 md4 px-3>
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-flex>
      <v-flex xs12 sm6 md4 text-xs-right mb-2 mt-2 pr-2>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="secondary" v-on="on">
              {{ $t('dataTable.NEW_ITEM') }}
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 md6 v-if="editedItem._id">
                    <label for="createdAt">{{ $t('common.CREATED') }}</label>
                    <div name="createdAt">
                      {{
                        editedItem.createdAt
                          | moment('ddd, MMMM D YYYY, h:mm a')
                      }}
                    </div>
                  </v-flex>
                  <v-flex xs12 md6 v-if="editedItem._id">
                    <label for="updatedAt">{{ $t('common.UPDATED') }}</label>
                    <div name="updatedAt">
                      {{
                        editedItem.updatedAt
                          | moment('ddd, MMMM D YYYY, h:mm a')
                      }}
                    </div>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field
                      id="name"
                      name="name"
                      v-model="editedItem.name"
                      :label="$t('cities.headers.NAME')"
                      :data-vv-as="$t('cities.headers.NAME')"
                      :error="errors.has('name')"
                      :error-messages="errors.collect('name')"
                      v-validate.disable="'required'"
                      autocomplete="off"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red lighten3" flat @click="close">
                {{ $t('dataTable.CANCEL') }}
              </v-btn>
              <v-btn color="yellow lighten3" flat @click="save">
                {{ $t('dataTable.SAVE') }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-flex>
    </v-layout>
    <error-message />
    <v-data-table
      must-sort
      :loading="dataTableLoading"
      :rows-per-page-text="$t('dataTable.ROWS_PER_PAGE')"
      :no-data-text="$t('dataTable.NO_DATA')"
      :no-results-text="$t('dataTable.NO_RESULTS')"
      :rows-per-page-items="[5, 10, 25]"
      :headers="headers"
      :items="items"
      :pagination.sync="pagination"
      :total-items="totalItems"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td class="justify-center layout px-0">
          <v-tooltip bottom>
            <v-icon
              slot="activator"
              class="mt-3 mr-2"
              small
              @click="editItem(props.item)"
              >edit</v-icon
            >
            <span>{{ $t('dataTable.EDIT') }}</span>
          </v-tooltip>
          <v-tooltip bottom>
            <v-icon
              slot="activator"
              class="mt-3"
              small
              @click="deleteItem(props.item)"
              >delete</v-icon
            >
            <span>{{ $t('dataTable.DELETE') }}</span>
          </v-tooltip>
        </td>
        <td>{{ props.item.name }}</td>
        <td>
          {{ props.item.createdAt | moment('dddd, MMMM D YYYY, h:mm a') }}
        </td>
        <td>
          {{ props.item.updatedAt | moment('dddd, MMMM D YYYY, h:mm a') }}
        </td>
      </template>
      <template v-slot:pageText="props">
        {{ props.pageStart }} - {{ props.pageStop }} {{ $t('dataTable.OF') }}
        {{ props.itemsLength }}
      </template>
      <template v-slot:no-data>{{ $t('dataTable.NO_DATA') }}</template>
      <template v-slot:no-results>{{ $t('dataTable.NO_RESULTS') }}</template>
    </v-data-table>
    <success-message />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import ErrorMessage from '@/components/ErrorMessage.vue'
import SuccessMessage from '@/components/SuccessMessage.vue'
import { buildPayloadPagination } from '../utils/utils.js'

export default {
  components: {
    ErrorMessage,
    SuccessMessage
  },
  data() {
    return {
      dataTableLoading: true,
      delayTimer: null,
      dialog: false,
      search: '',
      pagination: {},
      editedItem: {},
      defaultItem: {},
      fieldsToSearch: ['name']
    }
  },
  computed: {
    formTitle() {
      return this.editedItem._id
        ? this.$t('dataTable.EDIT_ITEM')
        : this.$t('dataTable.NEW_ITEM')
    },
    headers() {
      return [
        {
          text: this.$i18n.t('dataTable.ACTIONS'),
          value: '_id',
          sortable: false,
          width: 100
        },
        {
          text: this.$i18n.t('cities.headers.NAME'),
          align: 'left',
          sortable: true,
          value: 'name'
        },
        {
          text: this.$i18n.t('common.CREATED'),
          align: 'left',
          sortable: true,
          value: 'createdAt'
        },
        {
          text: this.$i18n.t('common.UPDATED'),
          align: 'left',
          sortable: true,
          value: 'updatedAt'
        }
      ]
    },
    items() {
      return this.$store.state.adminCities.cities
    },
    totalItems() {
      return this.$store.state.adminCities.totalCities
    }
  },
  watch: {
    dialog(value) {
      value || this.close()
    },
    pagination: {
      async handler() {
        this.dataTableLoading = true
        await this.getCities(
          buildPayloadPagination(this.pagination, this.buildSearch())
        )
        this.dataTableLoading = false
      },
      deep: true
    },
    async search() {
      clearTimeout(this.delayTimer)
      this.delayTimer = setTimeout(() => {
        this.doSearch()
      }, 400)
    }
  },
  methods: {
    ...mapActions(['getCities', 'editCity', 'saveCity', 'deleteCity']),
    async doSearch() {
      this.dataTableLoading = true
      await this.getCities(
        buildPayloadPagination(this.pagination, this.buildSearch())
      )
      this.dataTableLoading = false
    },
    buildSearch() {
      return this.search
        ? { query: this.search, fields: this.fieldsToSearch.join(',') }
        : {}
    },
    editItem(item) {
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    async deleteItem(item) {
      const response = await this.$confirm(
        this.$t('common.DO_YOU_REALLY_WANT_TO_DELETE_THIS_ITEM'),
        {
          title: this.$t('common.WARNING'),
          buttonTrueText: this.$t('common.DELETE'),
          buttonFalseText: this.$t('common.CANCEL'),
          buttonTrueColor: 'red lighten3',
          buttonFalseColor: 'yellow lighten3'
        }
      )
      if (response) {
        this.dataTableLoading = true
        await this.deleteCity(item._id)
        await this.getCities(
          buildPayloadPagination(this.pagination, this.buildSearch())
        )
        this.dataTableLoading = false
      }
    },
    close() {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
      }, 300)
    },
    async save() {
      const valid = await this.$validator.validateAll()
      if (valid) {
        this.dataTableLoading = true
        // Updating item
        if (this.editedItem._id) {
          await this.editCity(this.editedItem)
          await this.getCities(
            buildPayloadPagination(this.pagination, this.buildSearch())
          )
          this.dataTableLoading = false
        } else {
          // Creating new item
          await this.saveCity(this.editedItem)
          await this.getCities(
            buildPayloadPagination(this.pagination, this.buildSearch())
          )
          this.dataTableLoading = false
        }
        this.close()
      }
    }
  }
}
</script>
