import { where } from "sequelize";
import ImagesModel from "../models/ImagesModel.js";

export const getAllImagenes = async (req, res) => {
    try {
        const images = await ImagesModel.findAll()
        res.json(images)
    } catch (error) {
        res.json({message: error.message})
    }
}

export const getImages = async (req, res) => {
    try {
        const images = ImagesModel.findAll({
            where: {
                id: req.params.id,
            }
        })
        res.json(images)
    } catch (error) {
        res.json({message: error.message})
    }
}

export const createImages = async (req, res) =>{
    try {
        await ImagesModel.create(req.body)
        res.json({
            "message": "si",
        })
    } catch (error) {
        res.json({message: error.message})
    }
}

export const updateImages = async (req, res) => {
    try {
        ImagesModel.update(req.body, {
            where: {id: req.params.id}
        })
        res.json({
            "message": "si",
        })
    } catch (error) {
        res.json({message: error.message})
    }
}

export const deleteImages = async (req, res) => {
    try {
        await ImagesModel.destroy({
            where: {id: req.params.id }
        })
        res.json({
            "message": "si",
        })
    } catch (error) {
        res.json({message: error.message})
    }
}