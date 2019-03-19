<template>
  <v-app dark>
    <v-navigation-drawer v-model="sidebar" app disable-resize-watcher>
      <v-list>
        <v-list-tile
          v-for="(item, index) in menuItems"
          :key="index"
          :to="{ name: item.link }"
          exact
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>

        <v-list-group v-if="admin" prepend-icon="build" no-action>
          <v-list-tile slot="activator">
            <v-list-tile-title>{{ $t('adminItems.ADMIN') }}</v-list-tile-title>
          </v-list-tile>
          <v-list-tile
            v-for="(item, index) in adminItems"
            :key="index"
            :to="{ name: item.link }"
            exact
          >
            <v-list-tile-content class="d-inline mt-3">
              <v-icon>{{ item.icon }}</v-icon>
              {{ item.title }}
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>

        <v-list-tile v-if="isTokenSet" @click="userLogout">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{
            $t('menuItems.LOGOUT')
          }}</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app>
      <span class="hidden-md-and-up">
        <v-toolbar-side-icon @click="sidebar = !sidebar"></v-toolbar-side-icon>
      </span>
      <v-toolbar-title class="headline text-uppercase ml-0">
        <router-link
          :to="{ name: 'home' }"
          tag="span"
          style="cursor: pointer"
          v-if="isTokenSet"
          >{{ appTitle }}</router-link
        >
        <router-link
          :to="{ name: 'landing' }"
          tag="span"
          style="cursor: pointer"
          v-else
          >{{ appTitle }}</router-link
        >
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn
          flat
          v-for="(item, index) in menuItems"
          :key="index"
          :to="{ name: item.link }"
          exact
          :class="['hidden-sm-and-down', item.class]"
        >
          <v-icon>{{ item.icon }}</v-icon>
          &nbsp;{{ item.title }}
        </v-btn>

        <v-menu v-if="admin" offset-y class="hidden-sm-and-down">
          <v-btn slot="activator" flat class="btnAdmin">
            <v-icon>build</v-icon>
            &nbsp;{{ $t('adminItems.ADMIN') }}
          </v-btn>
          <v-list>
            <v-list-tile
              active-class="white--text"
              v-for="(item, index) in adminItems"
              :key="index"
              :to="{ name: item.link }"
              exact
              :class="[item.class]"
            >
              <v-list-tile-title>
                <v-icon>{{ item.icon }}</v-icon>
                {{ item.title }}
              </v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>

        <v-btn
          flat
          v-if="isTokenSet"
          @click="userLogout"
          class="hidden-sm-and-down btnLogout"
        >
          <v-icon left>exit_to_app</v-icon>
          {{ $t('menuItems.LOGOUT') }}
        </v-btn>
        <LocaleChanger />
      </v-toolbar-items>
    </v-toolbar>

    <v-content>
      <loading />
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import LocaleChanger from './components/LocaleChanger'
import Loading from '@/components/Loading.vue'

export default {
  metaInfo() {
    return {
      title: this.$store.getters.appTitle
    }
  },
  name: 'App',
  components: {
    LocaleChanger,
    Loading
  },
  data() {
    return {
      sidebar: false
    }
  },
  computed: {
    ...mapGetters(['appTitle', 'isTokenSet', 'user']),
    admin() {
      return this.user !== null
        ? this.user.role === 'admin'
          ? true
          : false
        : false
    },
    adminItems() {
      return [
        {
          title: this.$t('adminItems.CITIES'),
          link: 'admin-cities',
          icon: 'location_city',
          class: 'btnAdminCities'
        },
        {
          title: this.$t('adminItems.USERS'),
          link: 'admin-users',
          icon: 'supervisor_account',
          class: 'btnAdminUsers'
        }
      ]
    },
    menuItems() {
      if (this.isTokenSet) {
        return [
          {
            title: this.$t('menuItems.HOME'),
            link: 'home',
            icon: 'home',
            class: 'btnHome'
          },
          {
            title: this.$t('menuItems.ABOUT'),
            link: 'about',
            icon: 'help_outline',
            class: 'btnAbout'
          },
          {
            title: this.$t('menuItems.MY_PROFILE'),
            link: 'profile',
            icon: 'face',
            class: 'btnProfile'
          }
        ]
      } else {
        return [
          { title: this.$t('menuItems.HOME'), link: 'landing', icon: 'home' },
          {
            title: this.$t('menuItems.ABOUT'),
            link: 'about',
            icon: 'help_outline',
            class: 'btnAbout'
          },
          {
            title: this.$t('menuItems.LOGIN'),
            link: 'login',
            icon: 'lock',
            class: 'btnLogin'
          },
          {
            title: this.$t('menuItems.SIGNUP'),
            link: 'signup',
            icon: 'add_circle_outline',
            class: 'btnLogin'
          }
        ]
      }
    }
  },
  methods: {
    userLogout() {
      this.$store.dispatch('userLogout')
    }
  }
}
</script>
