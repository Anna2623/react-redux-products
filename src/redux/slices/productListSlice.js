import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  filterStatus: false,
};

const productListSlice = createSlice({
  name: 'productList',
  initialState,
  reducers: {
    addItems(state, action) {
      const existingById = state.items.reduce((acc, it) => {
        acc[it.id] = it;
        return acc;
      }, {});

      state.items = action.payload.map((item) => {
        const pokemonId = item.url.split('/')[6];
        const existing = existingById[pokemonId];
        return {
          id: pokemonId,
          imgUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`,
          name: item.name,
          liked: existing ? existing.liked : false,
        };
      });
    },

    removeItem(state, action) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
    },

    setLikeStatus(state, action) { 
      const id = action.payload;
      const likeElementIndex = state.items.findIndex(item => item.id === id);
      state.items[likeElementIndex].liked = !state.items[likeElementIndex].liked;
    },

    setFilterStatus(state) {
      state.filterStatus = !state.filterStatus;
    },
  },
});

export const { addItems, removeItem, setLikeStatus, setFilterStatus } = productListSlice.actions;

export default productListSlice.reducer;
