export const state = () => ({
  navbarStyle: 'light'
})

export const mutations = {
  SET_NAVBAR_STYLE(state, style) {
    state.navbarStyle = style
  }
}
