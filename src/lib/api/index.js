import User from "./user-requests";
import Auth from "./auth-requests";

// Aqui tienes que cambiar a tu direccion IP
const apiUri = "http://localhost:8000/api/";

export const AuthRequests = new Auth(apiUri);
export const UserRequests = new User(apiUri);
