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

export const createRequest = async (
  userid: string,
  title: string,
  description: string,
  requestType: string,
  files: any[]
) => {
  return api.post('/createRequest/' + userid, { title, description, requestType, files })
}

export const createRiskAnalysisRating = async (
  request_id: string,
  user_id: string,
  rating: string,
  title: string,
  description: string,
  files: any[]
) => {
  const requestStep = 'Analise de risco'
  const targetGroup = null
  return api.post('/createRating/' + request_id, {
    user_id,
    requestStep,
    rating,
    title,
    description,
    targetGroup,
    files
  })
}

export const createStrategicAlignmentRating = async (
  request_id: string,
  user_id: string,
  rating: string,
  title: string,
  description: string,
  targetGroup: string,
  files: any[]
) => {
  const requestStep = 'Alinhamento estratégico'
  return api.post('/createRating/' + request_id, {
    user_id,
    requestStep,
    rating,
    title,
    description,
    targetGroup,
    files
  })
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
