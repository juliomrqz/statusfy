<template>
  <nav
    :class="$store.state.navbarStyle"
    class="flex items-center justify-between flex-wrap bg-white p-6 py-2"
  >
    <div class="flex items-center flex-no-shrink mr-6">
      <nuxt-link :to="localePath('index')">
        <img
          v-if="$store.state.navbarStyle === 'dark'"
          :height="1049 / 2.5"
          :width="363 / 2.5"
          src="~/assets/img/logo-light.svg"
          alt="Statusfy Logo"
        >
        <img
          v-else
          :height="1049 / 2.5"
          :width="363 / 2.5"
          src="~/assets/img/logo.svg"
          alt="Statusfy Logo"
        >
      </nuxt-link>
    </div>
    <div class="block lg:hidden">
      <button
        class="menu-toggler flex items-center px-3 py-2 border rounded text-blue border-blue border-2 focus:outline-none hover:text-black hover:border-black"
        @click="showMenu = !showMenu"
      >
        <span v-if="!showMenu">Menu</span>
        <svgicon
          v-else
          name="fortawesome/times-solid"
          class="svg-inline--fa fa-w-16"
        />
      </button>
    </div>
    <transition
      enter-active-class="animated zoomIn"
      leave-active-class="animated zoomOut"
    >
      <div
        :key="showMenu"
        :class="{
          // Toggle
          block: showMenu,
          hidden: !showMenu,
          // Large Screens
          'flex-grow lg:block lg:flex lg:items-center lg:w-auto lg:text-right': true,
          // Small Screens
          'absolute bg-black rounded-lg p-2 text-left lg:bg-transparent lg:static lg:p-0 lg:static lg:block lg:opacity-100': true,
          // Global Message
          'global-message': $t('globalMessage') && $t('globalMessage') !== ''
        }"
        class="menu-container"
      >
        <div class="text-sm lg:flex-grow px-4">
          <a
            :href="$t('links.documentation.url')"
            class="menu-item">
            {{ $t('links.documentation.title') }}
          </a>
          <nuxt-link
            :to="localePath('blog')"
            class="menu-item">
            {{ $t('blog.title') }}
          </nuxt-link>
          <a
            :href="$t('links.demo.url')"
            class="menu-item">
            {{ $t('links.demo.title') }}
          </a>
          <span class="lg:hidden">
            <a
              :href="$t('links.getStarted.url')"
              class="menu-item">
              {{ $t('links.getStarted.title') }}
            </a>
          </span>
        </div>
        <div class="hidden lg:block">
          <a
            :href="$t('links.getStarted.url')"
            class="btn btn-blue border-2 border-blue mt-4 lg:mt-0"
          >
            {{ $t('links.getStarted.title') }}
          </a>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script>
import '~/components/icons/fortawesome/times-solid'

export default {
  data() {
    return {
      showMenu: false
    }
  }
}
</script>

<style scoped>
@import 'animate.css/source/zooming_entrances/zoomIn';
@import 'animate.css/source/zooming_exits/zoomOut';

.menu-toggler {
  transition: all 150ms ease 0s;
}

.menu-container {
  left: 23px;
  top: 80px;
  width: calc(100% - 46px);
  transform-origin: right top 0px;

  &.global-message {
    top: 140px;
  }

  &.zoomIn {
    animation-duration: 300ms;
  }

  &.zoomOut {
    animation-duration: 150ms;
  }
}

.menu-item {
  @apply block my-4 text-grey-light text-lg mr-4;

  &::hover {
    @apply text-white;
  }
}

@screen lg {
  .menu-container {
    width: auto !important;
  }

  .menu-item {
    @apply my-0 text-blue inline-block mt-0;

    &::hover {
      @apply text-black;
    }
  }
}

/* Dark */
nav.dark {
  @apply bg-black;

  .menu-container {
    @apply border-black border-2 bg-white;

    .menu-item {
      @apply text-grey-darkest;

      &:hover {
        @apply text-black;
      }
    }
  }

  .btn,
  .menu-toggler {
    @apply bg-transparent text-grey border-grey-dark border-2;

    &:hover {
      @apply text-grey-lighter border-grey-lighter;
    }
  }

  @screen lg {
    .menu-container {
      @apply bg-transparent;

      .menu-item {
        @apply text-grey;

        &:hover {
          @apply text-grey-lighter;
        }
      }
    }
  }
}
</style>
