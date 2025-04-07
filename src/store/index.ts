import { configureStore } from "@reduxjs/toolkit";
import builderReducer from "./features/builderSlice";
import { loadState, saveState } from "../utils/localStorage";
import { defaultSections } from "../builderTemplates/sections";

const loadedBuilderState = loadState();
const preloadedState = {
  builder: loadedBuilderState || { sections: defaultSections, selectedElement: null },
};

const store = configureStore({
  reducer: {
    builder: builderReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  saveState(store.getState().builder);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
