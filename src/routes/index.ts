import { Router } from "express";
import userRoutes from './auth'
import productRoutes from './product'
import categoryRoutes from './category'
import subCategoryRoutes from './subCategory'
import imgRoutes from './imgRoutes'
import orderRouter from './order'
import mp from './mercadopago'

const routes = Router();

routes.use('/auth',userRoutes);
routes.use('/products',productRoutes);
routes.use('/categories',categoryRoutes);
routes.use('/sub-categories',subCategoryRoutes);
routes.use('/img',imgRoutes);
routes.use('/mp',mp);
routes.use('/orders',orderRouter);
export default routes;
