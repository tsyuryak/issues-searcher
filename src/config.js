import axios from 'axios'

export const appName = 'github-issues'
export const baseURL = 'https://api.github.com'
export const axiosInst = axios.create({
  baseURL,
})
