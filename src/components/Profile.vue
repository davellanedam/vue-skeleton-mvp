<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 text-xs-center mt-5 mb-3>
        <h1 class="display-2 font-weight-bold">
          {{ $t('myProfile.TITLE') }}
        </h1>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3>
        <form @submit.prevent="validateBeforeSubmit">
          <v-layout column>
            <error-message />
            <success-message />
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
                v-validate="'required|email'"
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
                v-validate="'required'"
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
                v-validate="'required'"
                autocomplete="off"
              ></v-text-field>
            </v-flex>
            <v-flex
              ><v-autocomplete
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
                v-validate="'required'"
                autocomplete="off"
            /></v-flex>
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
                v-validate="'required'"
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
                v-validate="'url'"
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
                v-validate="'url'"
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
      searchInput: ''
    }
  },
  created() {
    this.getProfile()
    this.getAllCities()
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
      return this.$store.state.profile.allCities
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
      'getProfile',
      'getAllCities',
      'addProfileData',
      'saveProfile'
    ]),
    validateBeforeSubmit() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.saveProfile({
            name: this.name,
            phone: this.phone,
            city: this.city,
            country: this.country,
            urlTwitter: this.urlTwitter,
            urlGitHub: this.urlGitHub
          })
          return
        }
      })
    }
  }
}
</script>
