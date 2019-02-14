<template>
  <main>
    <v-app>
      <v-navigation-drawer v-model="sidebar" app>
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
          <v-list-tile v-if="isAuthenticated" @click="userLogout">
            <v-list-tile-action>
              <v-icon>exit_to_app</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>Sign Out</v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar app>
        <span class="hidden-sm-and-up">
          <v-toolbar-side-icon
            @click="sidebar = !sidebar"
          ></v-toolbar-side-icon>
        </span>
        <v-toolbar-title class="headline text-uppercase">
          <router-link
            :to="{ name: 'home' }"
            tag="span"
            style="cursor: pointer"
            v-if="isAuthenticated"
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
        <v-toolbar-items class="hidden-xs-only">
          <v-btn
            flat
            v-for="(item, index) in menuItems"
            :key="index"
            :to="{ name: item.link }"
            exact
          >
            <v-icon>{{ item.icon }}</v-icon>
            &nbsp;{{ item.title }}
          </v-btn>
          <v-btn flat v-if="isAuthenticated" @click="userLogout">
            <v-icon left>exit_to_app</v-icon>Logout
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <v-content>
        <router-view />
      </v-content>
    </v-app>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  data() {
    return {
      sidebar: false
    }
  },
  computed: {
    ...mapGetters(['appTitle', 'isAuthenticated']),
    menuItems() {
      if (this.isAuthenticated) {
        return [
          { title: 'Home', link: 'home', icon: 'home' },
          { title: 'About', link: 'about', icon: 'help_outline' },
          { title: 'My Profile', link: 'profile', icon: 'face' }
        ]
      } else {
        return [
          { title: 'Home', link: 'landing', icon: 'home' },
          { title: 'About', link: 'about', icon: 'help_outline' },
          { title: 'Login', link: 'login', icon: 'lock' },
          { title: 'Sign Up', link: 'signup', icon: 'add_circle_outline' }
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
