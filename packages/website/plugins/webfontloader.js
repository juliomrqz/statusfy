// Lazy load this package
import('webfontloader').then(WebFont => {
  WebFont.load({
    google: {
      families: ['Nunito:300']
    }
  })
})
