import ImagesModel from "../models/ImagesModel.js";

export const getAllImagenes = async (req, res) => {
    try {
        const images = await ImagesModel.findAll()
        res.json(images)
    } catch (error) {
        res.json({message: error.message})
    }
}

export const getImage = async (req, res) => {
    try {
        const images = await ImagesModel.findAll({
            where: {
                id: req.params.id
            }
        })
        res.json(images[0])
    } catch (error) {
        res.json({message: error.message})
    }
}

export const createImage = async (req, res) =>{
    try {
        await ImagesModel.create(req.body)
        res.json({
            "message": "creao"
        })
    } catch (error) {
        res.json({message: error.message})
    }
}

export const updateImage = async (req, res) => {
    try {
        ImagesModel.update(req.body, {
            where: {id: req.params.id}
        })
        res.json({
            "message": "actualizao"
        })
    } catch (error) {
        res.json({message: error.message})
    }
}

export const deleteImage = async (req, res) => {
    try {
        await ImagesModel.destroy({
            where: {id: req.params.id }
        })
        res.json({
            "message": "borrao"
        })
    } catch (error) {
        res.json({message: error.message})
    }
}