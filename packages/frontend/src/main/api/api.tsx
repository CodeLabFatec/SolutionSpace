/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/return-await */
import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true
})

export const createSession = async (email: string, password: string) => {
  return api.post('/auth', { email, password })
}

export const createRequest = async (userid: string, title: string, description: string, requestType: string) => {
  return api.post('/createRequest/' + userid, { title, description, requestType })
}

export const createRiskAnalysisRating = async (user_id: string, rating: string, title: string, description: string) => {
  const requestStep = 'Analise de risco'
  const targetGroup = null
  return api.post('/', { user_id, requestStep, rating, title, description, targetGroup })
}

export const createStrategicAlignmentRating = async (
  user_id: string,
  rating: string,
  title: string,
  description: string,
  targetGroup: string
) => {
  const requestStep = 'Alinhamento estratégico'
  return api.post('/', { user_id, requestStep, rating, title, description, targetGroup })
}

export const getAllRequests = async () => {
  return api.get('/listRequests')
}

export const getAllRequestsByUser = async (userid: string) => {
  return api.get('/listRequestsByUser/' + userid)
}

export const getRatingsByRequest = async (requestid: string) => {
  return api.get('/listRatingsByRequestId/' + requestid)
}
