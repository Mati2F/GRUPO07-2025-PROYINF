import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getImage } from '../../../Backend/controllers/imagesController.js'

const port = process.env.PORT || 3000

const URI = `http://localhost:${port}/images/`

const compShowImages = () => {
    const [Iamges, setImages] = useState([])

    useEffect( () => {
        getImage()
    }, [])

    const getImage = async () => {
        const res = await axios.get(URI)
        setImages(res.data)
    }

    return(
    <div>

    </div>
    )
}