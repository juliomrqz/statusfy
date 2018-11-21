export default (ctx) => {
  // store partners
  ctx.store.commit('SET_PARTNERS', <%= serialize(options.partners) %>);
}
