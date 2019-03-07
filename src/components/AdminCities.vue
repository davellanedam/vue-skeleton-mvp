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
                <v-flex xs12 sm6 md4>
                  <v-text-field
                    v-model="editedItem.name"
                    :label="$t('cities.headers.NAME')"
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
    <v-data-table
      :loading="dataTableLoading"
      :rows-per-page-text="$t('dataTable.ROWS_PER_PAGE')"
      :no-data-text="$t('dataTable.NO_DATA')"
      :no-results-text="$t('dataTable.NO_RESULTS')"
      :rows-per-page-items="[5, 10, 25]"
      :headers="headers"
      :items="items"
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
      </template>
      <template v-slot:pageText="props">
        {{ props.pageStart }} - {{ props.pageStop }} {{ $t('dataTable.OF') }}
        {{ props.itemsLength }}
      </template>
      <template v-slot:no-data>
        <v-btn color="secondary" @click="initialize">{{
          $t('dataTable.RESET')
        }}</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataTableLoading: true,
      dialog: false,
      items: [],
      editedIndex: -1,
      editedItem: {
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
          value: 'name',
          sortable: false,
          width: 100
        },
        {
          text: this.$i18n.t('cities.headers.NAME'),
          align: 'left',
          sortable: false,
          value: 'name'
        }
      ]
    }
  },
  watch: {
    dialog(val) {
      val || this.close()
    }
  },
  created() {
    this.initialize()
  },
  methods: {
    initialize() {
      this.items = [
        {
          name: 'Bogotá'
        },
        {
          name: 'Bucaramanga'
        },
        {
          name: 'New York'
        },
        {
          name: 'San Francisco'
        },
        {
          name: 'Oakland'
        },
        {
          name: 'San Leandro'
        },
        {
          name: 'Medellín'
        },
        {
          name: 'Cali'
        },
        {
          name: 'Barranquilla'
        },
        {
          name: 'Miami'
        }
      ]
    },
    editItem(item) {
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem(item) {
      const index = this.items.indexOf(item)
      confirm('Are you sure you want to delete this item?') &&
        this.items.splice(index, 1)
    },
    close() {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.items[this.editedIndex], this.editedItem)
      } else {
        this.items.push(this.editedItem)
      }
      this.close()
    }
  }
}
</script>
