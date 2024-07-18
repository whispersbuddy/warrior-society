import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { configureStore } from "@reduxjs/toolkit";
import combineReducer from "./combineReducer";
import { encryptTransform } from "redux-persist-transform-encrypt";

const encryptionOptions = {
  secretKey: "secretKeyTest-thrillfinder-secretKeyTest",
  onError: function (error) {
    // Handle encryption/decryption errors
  },
};

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["authReducer", "cartReducer"],
  blacklist: ["commonReducer"],
  transforms: [encryptTransform(encryptionOptions, ["authReducer"])],
};

const persistedReducer = persistReducer(persistConfig, combineReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export default store;
