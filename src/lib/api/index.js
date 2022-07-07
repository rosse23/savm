import User from './user-requests';
import Client from './client-requests';
import Pet from './pet-requests';
import Sale from './sale-requests';
import Product from './product-requests';
import Visit from './visit-requests';
import Esthetic from './esthetic-requests';
import Activity from './activity-request';
import Stock from './stock-request';
import Auth from './auth-requests';

// Aqui tienes que cambiar a tu direccion IP
const apiUri = 'http://localhost:8000/api/';

export const AuthRequests = new Auth(apiUri);
export const UserRequests = new User(apiUri);
export const ClientRequests = new Client(apiUri);
export const PetRequests = new Pet(apiUri);
export const SaleRequests = new Sale(apiUri);
export const ProductRequests = new Product(apiUri);
export const VisitRequests = new Visit(apiUri);
export const EstheticRequests = new Esthetic(apiUri);
export const ActivityRequests = new Activity(apiUri);
export const StockRequests = new Stock(apiUri);
