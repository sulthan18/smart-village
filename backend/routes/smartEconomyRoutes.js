import express from 'express';
import * as smartEconomyController from '../controllers/smartEconomyController';

const router = express.Router();

router.get('/products', smartEconomyController.getProducts);
router.get('/products/:productId', smartEconomyController.getProductDetails);
router.post('/products/:productId/purchase', smartEconomyController.purchaseProduct);

export default router;
