<template>
  <div>
    <HomeCover />

    <Features />

    <HowItWorks />

    <GetStarted />

    <LatestPosts />
  </div>
</template>

<script>
import HomeCover from '~/components/common/HomeCover'
import Features from '~/components/common/Features'
import HowItWorks from '~/components/common/HowItWorks'
import LatestPosts from '~/components/common/LatestPosts'
import GetStarted from '~/components/common/GetStarted'

export default {
  components: {
    HomeCover,
    Features,
    HowItWorks,
    LatestPosts,
    GetStarted
  }
}
</script>
