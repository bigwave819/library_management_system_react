import express from "express"


const router = express.Router();

import { 
    createBook, 
    getBookById, 
    getAllBooks, 
    updateBook, 
    deleteBook  
} from "../controllers/bookController.js";



router.get('/', getAllBooks);
router.get('/:id', getBookById);
router.post('/',  createBook);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);

export default router;
