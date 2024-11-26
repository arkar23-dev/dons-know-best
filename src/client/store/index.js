import { SimpleStore } from "@ombiel/aek-lib/simple-store";

const store = new SimpleStore({
  initialState: {
    filters: {
      time_of_day: null,
      fast_and_casual: null,
      cuasine: null,
      dessert: null,
      diet: null,
    },
  },
});

export default store;
