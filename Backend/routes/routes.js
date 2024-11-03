import express from 'express'
import { createImages, deleteImages, getAllImagenes, getImages, updateImages } from '../controllers/imagesController.js'
const router = express.Router()

router.get('/', getAllImagenes)
router.get('/:id', getImages)
router.post('/', createImages)
router.delete('/:id', deleteImages)
router.put('/:id', updateImages)

export default router