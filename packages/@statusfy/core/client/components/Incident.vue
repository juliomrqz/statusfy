<template>
  <div class="incident leading-normal p-4 pt-6 shadow rounded my-4 border">
    <div class="incident-head flex flex-col sm:flex-row justify-between">
      <div
        :class="{
          'flex items-start sm:items-center justify-between flex-row-reverse sm:flex-row': level > 0,
          'text-center': level === 0
        }"
        class="mb-4">
        <span
          :class="`bg-${resolved.color}`"
          class="block text-white rounded-full text-sm font-semibold py-1 p-3 sm:mr-2">
          {{ resolved.value ? $t('incidents.resolved') : $t('incidents.unresolved') }}
        </span>
        <nuxt-link
          v-if="level > 0"
          :to="localePath({ name: 'incidents-id', params: { id: incident.id } })">
          <component
            :is="`h${level}`"
            :class="!resolved.value ? `text-${resolved.color}` : 'text-grey-darkest'"
            class="text-lg block">
            {{ incident.title }}
          </component>
        </nuxt-link>
      </div>

      <div class="mb-2 text-center">
        <span
          v-for="system of incident.affectedsystems"
          :key="system"
          class="inline-block bg-grey-lighter rounded-full text-sm font-semibold text-grey-darker py-1 p-3 ml-2">
          {{ $t(`systems.items.${system}.title`) }}
        </span>
      </div>
    </div>

    <div class="incident-sub-head flex flex-col sm:flex-row items-center justify-between">
      <div
        :class="`text-${status.color}`"
        class="my-2 sm:mb-0">
        <svgicon
          :name="`fortawesome/${status.icon}-solid`"
          class="svg-inline--fa fa-w-16"/>
        {{ status.title }}
      </div>

      <div>
        <nice-date
          :date="incident.date"
          format="long" />
      </div>
    </div>

    <div class="incident-body">
      <div v-if="summary">
        <div v-if="incident.description">{{ incident.description }}</div>
      </div>

      <div
        v-else
        ref="content"
        class="markdown"
        v-html="incident.content"/>
    </div>

    <div class="hidden">
      <svgicon
        ref="external-link-icon"
        name="fortawesome/external-link-alt-solid"
        class="svg-inline--fa fa-w-12 ml-1"
      />
    </div>
  </div>
</template>

<script>
import { getStatusInfo } from '~/helpers/statuses'

import '~/components/icons/fortawesome/clock-solid'
import '~/components/icons/fortawesome/exclamation-circle-solid'
import '~/components/icons/fortawesome/minus-circle-solid'
import '~/components/icons/fortawesome/times-circle-solid'
import '~/components/icons/fortawesome/check-circle-solid'
import '~/components/icons/fortawesome/external-link-alt-solid'
import NiceDate from '~/components/NiceDate'

export default {
  components: {
    NiceDate
  },
  props: {
    incident: {
      type: Object,
      required: true
    },
    summary: {
      type: Boolean,
      default: false
    },
    level: {
      type: Number,
      default: 4,
      validator: (value) => {
        // The value must match one of these numbers
        return [0, 3, 4].indexOf(value) !== -1
      }
    }
  },
  data () {
    return {
      content: ''
    }
  },
  computed: {
    status () {
      const $t = this.$t.bind(this)
      return getStatusInfo($t, this.incident.severity)
    },
    resolved () {
      const $t = this.$t.bind(this)
      const statusKey = this.incident.resolved ? 'operational' : this.incident.severity

      return {
        value: this.incident.resolved,
        ...getStatusInfo($t, statusKey)
      }
    }
  },
  mounted () {
    const $t = this.$t.bind(this)

    if (this.$refs.content) {
      const blockElements = this.$refs.content.querySelectorAll('.update-block')
      const externalLinksElements = this.$refs.content.querySelectorAll('a.external')
      const iconElement = this.$refs['external-link-icon'].$el

      blockElements.forEach((el, i) => {
        const dateEl = el.querySelectorAll('.update-block-date')[0]
        const date = this.$statusfy.dayjs(dateEl.innerHTML)

        dateEl.innerHTML = date.locale(this.$i18n.locale).format($t(`dates.formats.long`))
      })

      externalLinksElements.forEach((el, i) => {
        el.appendChild(iconElement)
      })
    }
  }
}
</script>
