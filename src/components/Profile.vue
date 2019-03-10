<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 text-xs-center mt-5 mb-3>
        <h1 class="display-2 font-weight-bold">{{ $t('myProfile.TITLE') }}</h1>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3>
        <v-dialog v-model="dialog" max-width="400px">
          <template v-slot:activator="{ on }">
            <v-flex text-xs-center>
              <v-btn color="white" small flat v-on="on">{{
                $t('myProfile.CHANGE_MY_PASSWORD')
              }}</v-btn>
            </v-flex>
          </template>
          <v-card>
            <form @submit.prevent="save">
              <v-card-title>
                <span class="headline">
                  {{ $t('myProfile.CHANGE_MY_PASSWORD') }}
                </span>
              </v-card-title>
              <v-card-text>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex xs12>
                      <v-text-field
                        id="oldPassword"
                        name="oldPassword"
                        type="password"
                        :label="$t('myProfile.CURRENT_PASSWORD')"
                        v-model="oldPassword"
                        :data-vv-as="$t('myProfile.CURRENT_PASSWORD')"
                        :error="errors.has('oldPassword')"
                        :error-messages="errors.collect('oldPassword')"
                        v-validate.disable="'required|min:5'"
                        autocomplete="off"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field
                        id="newPassword"
                        name="newPassword"
                        type="password"
                        :label="$t('myProfile.NEW_PASSWORD')"
                        v-model="newPassword"
                        :data-vv-as="$t('myProfile.NEW_PASSWORD')"
                        :error="errors.has('newPassword')"
                        :error-messages="errors.collect('newPassword')"
                        v-validate.disable="'required|min:5'"
                        ref="password"
                        autocomplete="off"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        :label="$t('myProfile.CONFIRM_NEW_PASSWORD')"
                        v-model="confirmPassword"
                        :data-vv-as="$t('myProfile.NEW_PASSWORD')"
                        :error="errors.has('confirmPassword')"
                        :error-messages="errors.collect('confirmPassword')"
                        v-validate.disable="'required|min:5|confirmed:password'"
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
                <v-btn
                  color="yellow lighten3"
                  flat
                  type="submit"
                  :disabled="disabledButton"
                  >{{ $t('dataTable.SAVE') }}</v-btn
                >
              </v-card-actions>
            </form>
          </v-card>
        </v-dialog>
        <form @submit.prevent="submit">
          <v-layout column>
            <error-message />
            <v-flex>
              <v-text-field
                id="email"
                name="email"
                type="email"
                :label="$t('myProfile.EMAIL')"
                v-model="email"
                :data-vv-as="$t('myProfile.EMAIL')"
                :error="errors.has('email')"
                :error-messages="errors.collect('email')"
                v-validate.disable="'required|email'"
                disabled
                autocomplete="off"
              ></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field
                id="name"
                name="name"
                type="text"
                :label="$t('myProfile.NAME')"
                v-model="name"
                :data-vv-as="$t('myProfile.NAME')"
                :error="errors.has('name')"
                :error-messages="errors.collect('name')"
                v-validate.disable="'required'"
                autocomplete="off"
              ></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field
                id="phone"
                name="phone"
                type="tel"
                :label="$t('myProfile.PHONE')"
                v-model="phone"
                :data-vv-as="$t('myProfile.PHONE')"
                :error="errors.has('phone')"
                :error-messages="errors.collect('phone')"
                v-validate.disable="'required'"
                autocomplete="off"
              ></v-text-field>
            </v-flex>
            <v-flex>
              <v-autocomplete
                id="city"
                name="city"
                :label="$t('myProfile.CITY')"
                :search-input.sync="searchInput"
                v-model="city"
                :items="allCities"
                clearable
                :data-vv-as="$t('myProfile.CITY')"
                :error="errors.has('city')"
                :error-messages="errors.collect('city')"
                v-validate.disable="'required'"
                autocomplete="off"
              />
            </v-flex>
            <v-flex>
              <v-text-field
                id="country"
                name="country"
                type="text"
                :label="$t('myProfile.COUNTRY')"
                v-model="country"
                :data-vv-as="$t('myProfile.COUNTRY')"
                :error="errors.has('country')"
                :error-messages="errors.collect('country')"
                v-validate.disable="'required'"
                autocomplete="off"
              ></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field
                id="urlTwitter"
                name="urlTwitter"
                type="url"
                label="Twitter"
                v-model="urlTwitter"
                data-vv-as="Twitter"
                :error="errors.has('urlTwitter')"
                :error-messages="errors.collect('urlTwitter')"
                v-validate.disable="'url'"
                autocomplete="off"
              ></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field
                id="urlGitHub"
                name="urlGitHub"
                type="url"
                label="GitHub"
                v-model="urlGitHub"
                data-vv-as="GitHub"
                :error="errors.has('urlGitHub')"
                :error-messages="errors.collect('urlGitHub')"
                v-validate.disable="'url'"
                autocomplete="off"
              ></v-text-field>
            </v-flex>
            <v-flex text-xs-center mt-5>
              <v-btn
                color="secondary"
                type="submit"
                :disabled="disabledButton"
                >{{ $t('myProfile.SAVE') }}</v-btn
              >
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
      <success-message />
    </v-layout>
  </v-container>
</template>

<script>
import ErrorMessage from '@/components/ErrorMessage.vue'
import SuccessMessage from '@/components/SuccessMessage.vue'
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      dialog: false,
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      searchInput: ''
    }
  },
  components: {
    ErrorMessage,
    SuccessMessage
  },
  computed: {
    name: {
      get() {
        return this.$store.state.profile.profile.name
      },
      set(value) {
        const data = {
          key: 'name',
          value: value
        }
        this.addProfileData(data)
      }
    },
    email() {
      return this.$store.state.profile.profile.email
    },
    phone: {
      get() {
        return this.$store.state.profile.profile.phone
      },
      set(value) {
        const data = {
          key: 'phone',
          value: value
        }
        this.addProfileData(data)
      }
    },
    allCities() {
      return this.$store.state.cities.allCities
    },
    city: {
      get() {
        return this.$store.state.profile.profile.city
      },
      set(value) {
        const data = {
          key: 'city',
          value: value
        }
        this.addProfileData(data)
      }
    },
    country: {
      get() {
        return this.$store.state.profile.profile.country
      },
      set(value) {
        const data = {
          key: 'country',
          value: value
        }
        this.addProfileData(data)
      }
    },
    urlTwitter: {
      get() {
        return this.$store.state.profile.profile.urlTwitter
      },
      set(value) {
        const data = {
          key: 'urlTwitter',
          value: value
        }
        this.addProfileData(data)
      }
    },
    urlGitHub: {
      get() {
        return this.$store.state.profile.profile.urlGitHub
      },
      set(value) {
        const data = {
          key: 'urlGitHub',
          value: value
        }
        this.addProfileData(data)
      }
    },
    disabledButton() {
      return this.$store.state.loading.showLoading
    }
  },
  methods: {
    ...mapActions([
      'changeMyPassword',
      'getProfile',
      'getAllCities',
      'addProfileData',
      'saveProfile'
    ]),
    async submit() {
      try {
        const valid = await this.$validator.validateAll()
        if (valid) {
          await this.saveProfile({
            name: this.name,
            phone: this.phone,
            city: this.city,
            country: this.country,
            urlTwitter: this.urlTwitter,
            urlGitHub: this.urlGitHub
          })
          return
        }
      } catch (error) {
        return
      }
    },
    close() {
      this.dialog = false
    },
    async save() {
      try {
        const valid = await this.$validator.validateAll()
        if (valid) {
          await this.changeMyPassword({
            oldPassword: this.oldPassword,
            newPassword: this.newPassword
          })
          this.close()
          return
        }
      } catch (error) {
        this.close()
        return
      }
    }
  },
  async created() {
    try {
      await this.getProfile()
      await this.getAllCities()
    } catch (error) {
      return
    }
  }
}
</script>
