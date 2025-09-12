import express from "express"
const router = express.Router();

import {
    getAllPublishers,
    getPublisherById,
    createPublisher,
    updatePublisher,
    deletePublisher
} from "../controllers/publisherController.js"



router.get('/', getAllPublishers);
router.get('/:id',getPublisherById);
router.post('/', createPublisher);
router.put('/:id', updatePublisher);
router.delete('/:id', deletePublisher);

export default router;
