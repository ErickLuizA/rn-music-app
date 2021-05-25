import Constants from 'expo-constants'
import axios from 'axios'

const api = axios.create({
  baseURL: Constants.manifest.packagerOpts?.dev
    ? `http://${Constants.manifest.debuggerHost
        ?.split(':')
        .shift()
        ?.concat(':3333/api')}`
    : 'api.example.com',
})

export default api
