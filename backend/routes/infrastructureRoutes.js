import express from 'express';
import * as infrastructureController from '../controllers/infrastructureController';

const router = express.Router();

router.get('/infrastructure', infrastructureController.getInfrastructureInfo);
router.put('/infrastructure', infrastructureController.updateInfrastructureInfo);

export default router;
