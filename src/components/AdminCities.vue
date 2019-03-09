<template>
  <div>
    <v-toolbar flat>
      <v-toolbar-title>{{ $t('cities.TITLE') }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">
          <v-btn color="secondary" class="mb-2" v-on="on">{{
            $t('dataTable.NEW_ITEM')
          }}</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field
                    id="name"
                    name="name"
                    v-model="editedItem.name"
                    :label="$t('cities.headers.NAME')"
                    :data-vv-as="$t('cities.headers.NAME')"
                    :error="errors.has('name')"
                    :error-messages="errors.collect('name')"
                    v-validate="'required'"
                    autocomplete="off"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red lighten3" flat @click="close">{{
              $t('dataTable.CANCEL')
            }}</v-btn>
            <v-btn color="yellow lighten3" flat @click="save">{{
              $t('dataTable.SAVE')
            }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <error-message />
    <success-message />
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
            >
              edit
            </v-icon>
            <span>{{ $t('dataTable.EDIT') }}</span>
          </v-tooltip>
          <v-tooltip bottom>
            <v-icon
              slot="activator"
              class="mt-3"
              small
              @click="deleteItem(props.item)"
            >
              delete
            </v-icon>
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
      <template v-slot:no-data>
        {{ $t('dataTable.NO_DATA') }}
      </template>
      <template v-slot:no-results>
        {{ $t('dataTable.NO_RESULTS') }}
      </template>
    </v-data-table>
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
      dialog: false,
      pagination: {},
      editedItem: {
        _id: '',
        name: ''
      },
      defaultItem: {
        name: ''
      }
    }
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? this.$t('dataTable.NEW_ITEM')
        : this.$t('dataTable.EDIT_ITEM')
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
          text: this.$i18n.t('cities.headers.CREATED'),
          align: 'left',
          sortable: true,
          value: 'createdAt'
        },
        {
          text: this.$i18n.t('cities.headers.UPDATED'),
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
      handler() {
        this.getDataFromApi().then(() => {
          this.dataTableLoading = false
        })
      },
      deep: true
    }
  },
  methods: {
    ...mapActions(['getCities', 'editCity', 'saveCity', 'deleteCity']),
    refresh() {
      // this.pagination.page = 27843
      this.$emit('update:pagination', this.pagination)
    },
    getDataFromApi() {
      this.dataTableLoading = true
      return new Promise(resolve => {
        resolve(this.getCities(buildPayloadPagination(this.pagination)))
      })
    },
    editDataFromApi(item) {
      return new Promise(resolve => {
        resolve(this.editCity(item))
      })
    },
    saveDataFromApi(item) {
      return new Promise(resolve => {
        resolve(this.saveCity(item))
      })
    },
    deleteDataFromApi(id) {
      return new Promise(resolve => {
        resolve(this.deleteCity(id))
      })
    },
    editItem(item) {
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem(item) {
      this.dataTableLoading = true
      this.deleteDataFromApi(item._id).then(() => {
        this.dataTableLoading = false
      })
    },
    close() {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
      }, 300)
    },
    save() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.dataTableLoading = true
          // Updating item
          if (this.editedItem._id) {
            this.editDataFromApi(this.editedItem).then(() => {
              this.dataTableLoading = false
              this.refresh(this.pagination)
            })
          } else {
            // Creating new item
            this.saveDataFromApi(this.editedItem).then(() => {
              this.dataTableLoading = false
            })
          }
          this.close()
        }
      })
    }
  }
}
</script>
