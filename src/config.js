import axios from 'axios'

export const appName = 'github-issues'
export const axiosInst = axios.create({
  baseURL: 'https://api.github.com',
})
