import { where } from "sequelize";
import BlogImages from "../models/BlogImages.js";

export const getAllImagenes = async (req, res) => {
    try {
        const images = await BlogImages.findAll()
        res.json(images)
    } catch (error) {
        res.json({message: error.message})
    }
}

export const getImages = async (req, res) => {
    try {
        const images = BlogImages.findAll({
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
        await BlogImages.create(req.body)
        res.json({
            "message": "si",
        })
    } catch (error) {
        res.json({message: error.message})
    }
}

export const updateImages = async (req, res) => {
    try {
        BlogImages.update(req.body, {
            where: {id: req.params.id}
        })
        res.json({
            "message": "si",
        })
    } catch (error) {
        res.json({message: error.message})
    }
}

export const deleteImages = async (req, ress) => {
    try {
        await BlogImages.destroy({
            where: {id: req.params.id }
        })
        res.json({
            "message": "si",
        })
    } catch (error) {
        res.json({message: error.message})
    }
}