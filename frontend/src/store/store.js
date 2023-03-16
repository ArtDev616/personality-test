import { useDispatch, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import rootReducer from "./rootReducer";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const useAppSelector = useSelector;

export const useAppDispatch = () => useDispatch();

export { store };
