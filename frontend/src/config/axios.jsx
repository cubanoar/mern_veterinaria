import axios from 'axios'

//creamos una url base
const clienteAxios = axios.create({
    baseURL: `${import.meta.env.VITE_URL_BACKEND}/api`
})

export default clienteAxios