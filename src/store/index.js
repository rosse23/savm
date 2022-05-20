import { configureStore } from "@reduxjs/toolkit";

import auth from "./auth";
import error from "./error";

const store = configureStore({ reducer: { auth: auth, error: error } });

export default store;
