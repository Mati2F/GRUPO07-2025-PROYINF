import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const port = process.env.PORT || 3000

const URI = `http://localhost:${port}/images/`