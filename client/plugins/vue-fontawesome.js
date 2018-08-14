import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faClock,
  faCheckCircle,
  faExclamationCircle,
  faTimesCircle,
  faMinusCircle
} from '@fortawesome/free-solid-svg-icons'
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(
  faQuestionCircle,
  faClock,
  faCheckCircle,
  faExclamationCircle,
  faTimesCircle,
  faMinusCircle
)

Vue.component('font-awesome-icon', FontAwesomeIcon)
