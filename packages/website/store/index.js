export const state = () => ({
  partners: []
});

export const mutations = {
  SET_PARTNERS(state, partners) {
    state.partners = partners;
  }
};

