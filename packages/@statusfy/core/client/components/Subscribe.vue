<template>
  <div>
    <button
      class="btn"
      @click="toggleModal">{{ $t('notifications.subscribe') }}</button>

    <div
      v-show="isModalActive"
      class="modal-container"
      @click.self="toggleModal">
      <div class="modal-body">
        <div class="tabs-header">
          <span
            v-for="(tab, key) in tabs"
            :key="key"
            :class="{'active': selectedTab === key}"
            @click="switchTab(key)">
            {{ $t(`notifications.items.${key}.title`) }}
          </span>
          <span @click="toggleModal">{{ $t('notifications.close') }}</span>
        </div>

        <div class="tabs-container">
          <div
            v-if="tabs.twitter"
            v-show="selectedTab === 'twitter'">
            <a
              :href="`https://twitter.com/${$statusfy.notifications.twitter[$i18n.locale]}?ref_src=twsrc%5Etfw`"
              :data-lang="$i18n.locale"
              data-size="large"
              class="twitter-follow-button"
              data-show-count="false">Follow @{{ $statusfy.notifications.twitter[$i18n.locale] }}</a>
            <script
              async
              src="https://platform.twitter.com/widgets.js"
              charset="utf-8"/>
            &nbsp;
            <span v-html="$t('notifications.items.twitter.description', { username: tabs.twitter[$i18n.locale] })"/>
          </div>
          <div
            v-if="tabs.support"
            v-show="selectedTab === 'support'">
            <span v-html="$t('notifications.items.support.description', { url: tabs.support[$i18n.locale] })"/>
          </div>
          <div
            v-if="tabs.icalendar && icalendarUrl"
            v-show="selectedTab === 'icalendar'">
            <span v-html="$t('notifications.items.icalendar.description', { url: icalendarUrl })"/>
          </div>
          <div
            v-if="tabs.feeds"
            v-show="selectedTab === 'feeds'">
            <span v-html="$t('notifications.items.feeds.description', { atom_url: feedsUrls.atom, rss_url: feedsUrls.rss })"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isModalActive: false,
      selectedTab: null
    }
  },
  computed: {
    tabs () {
      const results = {}
      const keys = Object.keys(this.$statusfy.notifications)

      keys.forEach(key => {
        if (this.$statusfy.notifications[key]) {
          results[key] = this.$statusfy.notifications[key]
        }
      })

      this.switchTab(Object.keys(results)[0])

      return results
    },
    icalendarUrl () {
      if (process.client) {
        return `webcal://${window.location.hostname}/calendars/scheduled.${this.$i18n.locale}.ics`
      } else {
        return null
      }
    },
    feedsUrls () {
      const atom = `//${window.location.hostname}/feeds/incidents.${this.$i18n.locale}.atom`
      const rss = `//${window.location.hostname}/feeds/incidents.${this.$i18n.locale}.xml`

      return {
        atom,
        rss
      }
    }
  },
  methods: {
    toggleModal () {
      this.isModalActive = !this.isModalActive
    },
    switchTab (key) {
      this.selectedTab = key
    }
  }
}
</script>
