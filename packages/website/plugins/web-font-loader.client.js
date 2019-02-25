// Lazy load
import('webfontloader').then(WebFont => {
  WebFont.load({
    google: {
      families: ['Open Sans:100,200,300,400,500,600,700,800,900']
    }
  })
})
