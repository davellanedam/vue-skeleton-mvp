<template>
  <v-container fluid>
    <v-layout row wrap>
      <Heading :title="$t('myProfile.TITLE')" />
      <v-flex xs12 sm8 offset-sm2>
        <v-dialog v-model="dialog" max-width="400px">
          <template v-slot:activator="{ on }">
            <v-flex text-xs-center>
              <v-btn
                small
                text
                v-on="on"
                color="secondary"
                @click="triggerChangePassword = true"
                class="btnChangePassword"
                >{{ $t('myProfile.CHANGE_MY_PASSWORD') }}</v-btn
              >
            </v-flex>
          </template>
          <v-card>
            <ValidationObserver v-slot="{ handleSubmit }">
              <form @submit.prevent="handleSubmit(save)">
                <v-card-title>
                  <span class="headline">
                    {{ $t('myProfile.CHANGE_MY_PASSWORD') }}
                  </span>
                </v-card-title>
                <v-card-text>
                  <v-container grid-list-md>
                    <v-layout wrap>
                      <template v-if="triggerChangePassword">
                        <v-flex xs12>
                          <ValidationProvider
                            rules="required|min:5"
                            v-slot="{ errors }"
                          >
                            <v-text-field
                              id="oldPassword"
                              name="oldPassword"
                              type="password"
                              :label="$t('myProfile.CURRENT_PASSWORD')"
                              v-model="oldPassword"
                              :error="errors.length > 0"
                              :error-messages="errors[0]"
                              key="oldPassword"
                              autocomplete="off"
                            ></v-text-field>
                          </ValidationProvider>
                        </v-flex>
                        <v-flex xs12>
                          <ValidationProvider
                            rules="required|min:5"
                            v-slot="{ errors }"
                            vid="newPassword"
                          >
                            <v-text-field
                              id="newPassword"
                              name="newPassword"
                              type="password"
                              :label="$t('myProfile.NEW_PASSWORD')"
                              v-model="newPassword"
                              :error="errors.length > 0"
                              :error-messages="errors[0]"
                              key="newPassword"
                              ref="password"
                              autocomplete="off"
                            ></v-text-field>
                          </ValidationProvider>
                        </v-flex>
                        <v-flex xs12>
                          <ValidationProvider
                            rules="required|min:5|confirmed:newPassword"
                            v-slot="{ errors }"
                          >
                            <v-text-field
                              id="confirmPassword"
                              name="confirmPassword"
                              type="password"
                              :label="$t('myProfile.CONFIRM_NEW_PASSWORD')"
                              v-model="confirmPassword"
                              :error="errors.length > 0"
                              :error-messages="errors[0]"
                              key="confirmPassword"
                              autocomplete="off"
                            ></v-text-field>
                          </ValidationProvider>
                        </v-flex>
                      </template>
                    </v-layout>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="red lighten3" text @click="close">
                    {{ $t('dataTable.CANCEL') }}
                  </v-btn>
                  <SubmitButton
                    id="updatePassword"
                    text
                    :buttonText="$t('dataTable.SAVE')"
                    color="green"
                  />
                </v-card-actions>
              </form>
            </ValidationObserver>
          </v-card>
        </v-dialog>
        <ValidationObserver v-slot="{ handleSubmit }">
          <form @submit.prevent="handleSubmit(submit)">
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 md6>
                  <ValidationProvider
                    rules="required|email"
                    v-slot="{ errors }"
                  >
                    <v-text-field
                      id="email"
                      name="email"
                      type="email"
                      :label="$t('myProfile.EMAIL')"
                      v-model="email"
                      :error="errors.length > 0"
                      :error-messages="errors[0]"
                      disabled
                      autocomplete="off"
                    ></v-text-field>
                  </ValidationProvider>
                </v-flex>
                <v-flex xs12 md6>
                  <ValidationProvider rules="required" v-slot="{ errors }">
                    <v-text-field
                      id="name"
                      name="name"
                      type="text"
                      :label="$t('myProfile.NAME')"
                      v-model="name"
                      :error="errors.length > 0"
                      :error-messages="errors[0]"
                      autocomplete="off"
                    ></v-text-field>
                  </ValidationProvider>
                </v-flex>
                <v-flex xs12 md4>
                  <ValidationProvider rules="required" v-slot="{ errors }">
                    <v-text-field
                      id="phone"
                      name="phone"
                      type="tel"
                      :label="$t('myProfile.PHONE')"
                      clear-icon="mdi-close"
                      clearable
                      v-model="phone"
                      :error="errors.length > 0"
                      :error-messages="errors[0]"
                      autocomplete="off"
                    ></v-text-field>
                  </ValidationProvider>
                </v-flex>
                <v-flex xs12 md4>
                  <ValidationProvider rules="required" v-slot="{ errors }">
                    <v-autocomplete
                      id="city"
                      name="city"
                      :label="$t('myProfile.CITY')"
                      :search-input.sync="searchInput"
                      v-model="city"
                      :items="allCities"
                      clearable
                      clear-icon="mdi-close"
                      :no-data-text="$t('myProfile.NO_RESULTS_FOUND')"
                      :error="errors.length > 0"
                      :error-messages="errors[0]"
                      autocomplete="off"
                    />
                  </ValidationProvider>
                </v-flex>
                <v-flex xs12 md4>
                  <ValidationProvider rules="required" v-slot="{ errors }">
                    <v-text-field
                      id="country"
                      name="country"
                      type="text"
                      :label="$t('myProfile.COUNTRY')"
                      v-model="country"
                      :error="errors.length > 0"
                      :error-messages="errors[0]"
                      autocomplete="off"
                    ></v-text-field>
                  </ValidationProvider>
                </v-flex>
                <v-flex xs12 md6>
                  <ValidationProvider rules="url" v-slot="{ errors }">
                    <v-text-field
                      id="urlTwitter"
                      name="urlTwitter"
                      type="url"
                      label="Twitter"
                      v-model="urlTwitter"
                      :error="errors.length > 0"
                      :error-messages="errors[0]"
                      autocomplete="off"
                    ></v-text-field>
                  </ValidationProvider>
                </v-flex>
                <v-flex xs12 md6>
                  <ValidationProvider rules="url" v-slot="{ errors }">
                    <v-text-field
                      id="urlGitHub"
                      name="urlGitHub"
                      type="url"
                      label="GitHub"
                      v-model="urlGitHub"
                      :error="errors.length > 0"
                      :error-messages="errors[0]"
                      autocomplete="off"
                    ></v-text-field>
                  </ValidationProvider>
                </v-flex>
                <v-flex text-xs-center mt-5>
                  <SubmitButton
                    :buttonText="$t('myProfile.SAVE')"
                    customClass="btnSave"
                  />
                </v-flex>
              </v-layout>
            </v-container>
          </form>
        </ValidationObserver>
      </v-flex>
      <ErrorMessage />
      <SuccessMessage />
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  metaInfo() {
    return {
      title: this.$store.getters.appTitle,
      titleTemplate: `${this.$t('myProfile.TITLE')} - %s`
    }
  },
  data() {
    return {
      dialog: false,
      triggerChangePassword: false,
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      searchInput: ''
    }
  },
  computed: {
    name: {
      get() {
        return this.$store.state.profile.profile.name
      },
      set(value) {
        const data = {
          key: 'name',
          value
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
          value
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
          value
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
          value
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
          value
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
          value
        }
        this.addProfileData(data)
      }
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
      await this.saveProfile({
        name: this.name,
        phone: this.phone,
        city: this.city,
        country: this.country,
        urlTwitter: this.urlTwitter,
        urlGitHub: this.urlGitHub
      })
    },
    close() {
      this.triggerChangePassword = false
      this.dialog = false
    },
    async save() {
      try {
        await this.changeMyPassword({
          oldPassword: this.oldPassword,
          newPassword: this.newPassword
        })
        this.oldPassword = ''
        this.newPassword = ''
        this.confirmPassword = ''
        this.triggerChangePassword = false
        this.close()
        return
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        this.oldPassword = ''
        this.newPassword = ''
        this.confirmPassword = ''
        this.triggerChangePassword = false
        this.close()
      }
    }
  },
  async mounted() {
    await this.getProfile()
    await this.getAllCities()
  }
}
</script>
