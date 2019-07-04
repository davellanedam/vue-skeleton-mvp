<template>
  <div>
    <v-layout wrap>
      <v-flex xs12 sm12 md4 mt-3 pl-4>
        <v-toolbar-title>{{ $t('users.TITLE') }}</v-toolbar-title>
      </v-flex>
      <v-flex xs12 sm6 md4 px-3>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          :label="$t('dataTable.SEARCH')"
          single-line
          hide-details
          clearable
          clear-icon="mdi-close"
        ></v-text-field>
      </v-flex>
      <v-flex xs12 sm6 md4 text-xs-right mb-2 mt-2 pr-2>
        <v-dialog
          v-model="dialog"
          max-width="800px"
          content-class="dlgNewEditItem"
        >
          <template v-slot:activator="{ on }">
            <v-btn color="secondary" v-on="on" class="btnNewItem pr-4">
              <v-icon class="mr-2">mdi-plus</v-icon>
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
                  <template v-if="editedItem._id">
                    <v-flex xs12 md4>
                      <label for="createdAt">{{ $t('common.CREATED') }}</label>
                      <div name="createdAt">
                        {{ getFormat(editedItem.createdAt) }}
                      </div>
                    </v-flex>
                    <v-flex xs12 md4>
                      <label for="updatedAt">{{ $t('common.UPDATED') }}</label>
                      <div name="updatedAt">
                        {{ getFormat(editedItem.updatedAt) }}
                      </div>
                    </v-flex>
                    <v-flex xs12 md4>
                      <label for="verified">{{
                        $t('users.headers.VERIFIED')
                      }}</label>
                      <div
                        name="verified"
                        v-html="trueFalse(editedItem.verified)"
                      ></div>
                    </v-flex>
                  </template>
                  <v-flex xs12 md6>
                    <v-text-field
                      id="name"
                      name="name"
                      v-model="editedItem.name"
                      :label="$t('users.headers.NAME')"
                      :data-vv-as="$t('users.headers.NAME')"
                      :error="errors.has('name')"
                      :error-messages="errors.collect('name')"
                      v-validate.disable="'required'"
                      autocomplete="off"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-text-field
                      id="email"
                      name="email"
                      type="email"
                      v-model="editedItem.email"
                      :label="$t('users.headers.EMAIL')"
                      :data-vv-as="$t('users.headers.EMAIL')"
                      :error="errors.has('email')"
                      :error-messages="errors.collect('email')"
                      v-validate.disable="'required|email'"
                      autocomplete="off"
                    ></v-text-field>
                  </v-flex>
                  <template v-if="!editedItem._id">
                    <v-flex xs12 md6>
                      <v-text-field
                        id="password"
                        name="password"
                        type="password"
                        :label="$t('users.PASSWORD')"
                        v-model="editedItem.password"
                        :data-vv-as="$t('users.PASSWORD')"
                        :error="errors.has('password')"
                        :error-messages="errors.collect('password')"
                        key="password"
                        v-validate.disable="'required|min:5'"
                        ref="password"
                        autocomplete="off"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 md6>
                      <v-text-field
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        :label="$t('users.CONFIRM_PASSWORD')"
                        v-model="editedItem.confirmPassword"
                        :data-vv-as="$t('users.PASSWORD')"
                        :error="errors.has('confirmPassword')"
                        :error-messages="errors.collect('confirmPassword')"
                        key="confirmPassword"
                        v-validate.disable="'required|min:5|confirmed:password'"
                        autocomplete="off"
                      ></v-text-field>
                    </v-flex>
                  </template>
                  <v-flex xs12 md6>
                    <v-select
                      clearable
                      id="role"
                      name="role"
                      v-model="editedItem.role"
                      :items="roles"
                      item-text="name"
                      item-value="value"
                      :label="$t('users.headers.ROLE')"
                      :data-vv-as="$t('users.headers.ROLE')"
                      :error="errors.has('role')"
                      :error-messages="errors.collect('role')"
                      v-validate.disable="'required'"
                      class="inputRole"
                    ></v-select>
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-autocomplete
                      id="city"
                      name="city"
                      :label="$t('users.headers.CITY')"
                      :search-input.sync="searchInput"
                      v-model="editedItem.city"
                      :items="allCities"
                      clearable
                      :data-vv-as="$t('users.headers.CITY')"
                      :error="errors.has('city')"
                      :error-messages="errors.collect('city')"
                      v-validate.disable="'required'"
                      autocomplete="off"
                      class="inputCity"
                    />
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-text-field
                      id="country"
                      name="country"
                      v-model="editedItem.country"
                      :label="$t('users.headers.COUNTRY')"
                      :data-vv-as="$t('users.headers.COUNTRY')"
                      :error="errors.has('country')"
                      :error-messages="errors.collect('country')"
                      v-validate.disable="'required'"
                      autocomplete="off"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-text-field
                      id="phone"
                      name="phone"
                      type="tel"
                      v-model="editedItem.phone"
                      :label="$t('users.headers.PHONE')"
                      :data-vv-as="$t('users.headers.PHONE')"
                      :error="errors.has('phone')"
                      :error-messages="errors.collect('phone')"
                      v-validate.disable="'required'"
                      autocomplete="off"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="red lighten3"
                flat
                @click="close"
                class="btnCancel"
                >{{ $t('dataTable.CANCEL') }}</v-btn
              >
              <v-btn
                color="yellow lighten3"
                flat
                @click="save"
                class="btnSave"
                >{{ $t('dataTable.SAVE') }}</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-flex>
    </v-layout>
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
        <td class="fill-height px-0">
          <v-layout class="justify-center">
            <v-tooltip top>
              <v-btn
                icon
                class="mx-0"
                slot="activator"
                @click="editItem(props.item)"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <span>{{ $t('dataTable.EDIT') }}</span>
            </v-tooltip>
            <v-tooltip top>
              <v-btn
                icon
                class="mx-0"
                slot="activator"
                @click="deleteItem(props.item)"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
              <span>{{ $t('dataTable.DELETE') }}</span>
            </v-tooltip>
          </v-layout>
        </td>
        <td>{{ props.item.name }}</td>
        <td>{{ props.item.email }}</td>
        <td>{{ roleName(props.item.role) }}</td>
        <td v-html="trueFalse(props.item.verified)"></td>
        <td>{{ props.item.city }}</td>
        <td>{{ props.item.country }}</td>
        <td>{{ props.item.phone }}</td>
        <td>{{ getFormat(props.item.createdAt) }}</td>
        <td>{{ getFormat(props.item.updatedAt) }}</td>
      </template>
      <template v-slot:pageText="props">
        {{ props.pageStart }} - {{ props.pageStop }} {{ $t('dataTable.OF') }}
        {{ props.itemsLength }}
      </template>
      <template v-slot:no-data>{{ $t('dataTable.NO_DATA') }}</template>
      <template v-slot:no-results>{{ $t('dataTable.NO_RESULTS') }}</template>
    </v-data-table>
    <ErrorMessage />
    <SuccessMessage />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { getFormat, buildPayloadPagination } from '@/utils/utils.js'

export default {
  metaInfo() {
    return {
      title: this.$store.getters.appTitle,
      titleTemplate: `${this.$t('users.TITLE')} - %s`
    }
  },
  data() {
    return {
      searchInput: '',
      dataTableLoading: true,
      delayTimer: null,
      dialog: false,
      search: '',
      pagination: {},
      editedItem: {},
      defaultItem: {},
      fieldsToSearch: ['name', 'email', 'role', 'city', 'country', 'phone']
    }
  },
  computed: {
    roles() {
      return [
        { name: this.$t('roles.ADMIN'), value: 'admin' },
        { name: this.$t('roles.USER'), value: 'user' }
      ]
    },
    allCities() {
      return this.$store.state.cities.allCities
    },
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
          text: this.$i18n.t('users.headers.NAME'),
          align: 'left',
          sortable: true,
          value: 'name'
        },
        {
          text: this.$i18n.t('users.headers.EMAIL'),
          align: 'left',
          sortable: true,
          value: 'email'
        },
        {
          text: this.$i18n.t('users.headers.ROLE'),
          align: 'left',
          sortable: true,
          value: 'role'
        },
        {
          text: this.$i18n.t('users.headers.VERIFIED'),
          align: 'left',
          sortable: true,
          value: 'verified'
        },
        {
          text: this.$i18n.t('users.headers.CITY'),
          align: 'left',
          sortable: true,
          value: 'city'
        },
        {
          text: this.$i18n.t('users.headers.COUNTRY'),
          align: 'left',
          sortable: true,
          value: 'country'
        },
        {
          text: this.$i18n.t('users.headers.PHONE'),
          align: 'left',
          sortable: true,
          value: 'phone'
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
      return this.$store.state.adminUsers.users
    },
    totalItems() {
      return this.$store.state.adminUsers.totalUsers
    }
  },
  watch: {
    dialog(value) {
      return value ? true : this.close()
    },
    pagination: {
      async handler() {
        try {
          this.dataTableLoading = true
          await this.getUsers(
            buildPayloadPagination(this.pagination, this.buildSearch())
          )
          this.dataTableLoading = false
          // eslint-disable-next-line no-unused-vars
        } catch (error) {
          this.dataTableLoading = false
        }
      },
      deep: true
    },
    search() {
      clearTimeout(this.delayTimer)
      this.delayTimer = setTimeout(() => {
        this.doSearch()
      }, 400)
    }
  },
  methods: {
    ...mapActions([
      'getAllCities',
      'getUsers',
      'editUser',
      'saveUser',
      'deleteUser'
    ]),
    getFormat(date) {
      window.__localeId__ = this.$store.getters.locale
      return getFormat(date, 'ddd, MMMM D YYYY, h:mm a')
    },
    roleName(value) {
      return value === 'admin' ? this.$t('roles.ADMIN') : this.$t('roles.USER')
    },
    trueFalse(value) {
      return value
        ? '<i aria-hidden="true" class="v-icon mdi mdi-check green--text" style="font-size: 16px;"></i>'
        : '<i aria-hidden="true" class="v-icon mdi mdi-close red--text" style="font-size: 16px;"></i>'
    },
    async doSearch() {
      try {
        this.dataTableLoading = true
        await this.getUsers(
          buildPayloadPagination(this.pagination, this.buildSearch())
        )
        this.dataTableLoading = false
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        this.dataTableLoading = false
      }
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
      try {
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
          await this.deleteUser(item._id)
          await this.getUsers(
            buildPayloadPagination(this.pagination, this.buildSearch())
          )
          this.dataTableLoading = false
        }
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
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
      try {
        const valid = await this.$validator.validateAll()
        if (valid) {
          this.dataTableLoading = true
          // Updating item
          if (this.editedItem._id) {
            await this.editUser(this.editedItem)
            await this.getUsers(
              buildPayloadPagination(this.pagination, this.buildSearch())
            )
            this.dataTableLoading = false
          } else {
            // Creating new item
            await this.saveUser({
              name: this.editedItem.name,
              email: this.editedItem.email,
              password: this.editedItem.password,
              role: this.editedItem.role,
              phone: this.editedItem.phone,
              city: this.editedItem.city,
              country: this.editedItem.country
            })
            await this.getUsers(
              buildPayloadPagination(this.pagination, this.buildSearch())
            )
            this.dataTableLoading = false
          }
          this.close()
          return
        }
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        this.dataTableLoading = false
        this.close()
      }
    }
  },
  async mounted() {
    await this.getAllCities()
  }
}
</script>

<style>
table.v-table {
  max-width: none;
}
</style>
