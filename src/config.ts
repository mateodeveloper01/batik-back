import "dotenv/config";

export const MONGODB_URL = process.env.MONGODB_URL;
export const PORT = process.env.PORT || 3001;
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
export const FRONTEND_CLIENT_URL = process.env.FRONTEND_CLIENT_URL;
export const FRONTEND_ADMIN_URL = process.env.FRONTEND_ADMIN_URL;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
export const CLOUDINARY_API_SECRET_NAME =
  process.env.CLOUDINARY_API_SECRET_NAME;
export const ACCES_TOKEN_MERCADOPAGO = process.env.ACCES_TOKEN_MERCADOPAGO;
export const LOCAL_URL = process.env.LOCAL_URL ;
export const HTTPS_URL = process.env.HTTPS_URL || null
