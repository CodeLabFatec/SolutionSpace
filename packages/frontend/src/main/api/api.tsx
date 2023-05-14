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

export const verifyToken = async (token: string) => {
  return api.post('/verifyToken/' + token)
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

export const createUser = async (
  name: string,
  email: string,
  password: string,
  gender: string,
  team_id: string,
  group_id: string
) => {
  return api.post('/createUser', { name, email, password, gender, team_id, group_id })
}

export const createTeam = async (
  team_name: string,
  description: string,
  permissionCreateUsers: boolean,
  permissionCreateTeams: boolean,
  permissionCreateGroups: boolean,
  permissionEditRequests: boolean,
  permissionUnarchiveRequests: boolean,
  permissionConfigureStatus: boolean
) => {
  return api.post('/createTeam', { team_name, description, permissionCreateGroups, permissionCreateTeams, permissionCreateUsers, permissionEditRequests, permissionUnarchiveRequests, permissionConfigureStatus })
}

export const createGroup = async (
  team_id: string,
  group_name: string,
  description: string,
  canRequestFeatures: boolean,
  canRequestHotfix: boolean,
  canRateAnalise: boolean,
  mustRateAnalise: boolean,
  canRateAnalinhamento: boolean,
  mustRateAnalinhamento: boolean
) => {
  return api.post('/createGroup', { team_id, group_name, description, canRequestFeatures, canRequestHotfix, canRateAnalise, mustRateAnalise, canRateAnalinhamento, mustRateAnalinhamento })
}
export const getAllRequests = async () => {
  return api.get('/listRequests')
}

export const getAllArchivedRequests = async () => {
  return api.get('/listArchivedRequests')
}

export const getAllRequestsByUser = async (userid: string) => {
  return api.get('/listRequestsByUser/' + userid)
}

export const getRatingsByRequest = async (requestid: string) => {
  return api.get('/listRatingsByRequestId/' + requestid)
}

export const getAllTeams = async () => {
  return api.get('/listTeams')
}

export const getAllUsers = async () => {
  return api.get('/listUsers')
}

export const getAllGroups = async () => {
  return api.get('/listGroups')
}

export const getGroupsByTeam = async (teamId: string) => {
  return api.get('/getGroupsByTeam/' + teamId)
}

export const getStatusConfigurationByRequestStep = async (requestStep: string) => {
  return api.get('/statusByRequestStep/' + requestStep)
}

export const deleteUser = async (user_id: string) => {
  return api.delete('/deleteUser/' + user_id)
}

export const deleteTeam = async (team_id: string) => {
  return api.delete('/deleteTeam/' + team_id)
}

export const deleteGroup = async (group_id: string) => {
  return api.delete('/deleteGroup/' + group_id)
}

export const updateUser = async (
  user_id: string,
  name: string,
  email: string,
  password: string,
  gender: string,
  team_id: string,
  group_id: string) => {
  return api.put('/updateUser/' + user_id, { name, email, password, gender, team_id, group_id })
}

export const updateTeam = async (
  team_id: string,
  team_name: string,
  description: string,
  permissionCreateUsers: boolean,
  permissionCreateTeams: boolean,
  permissionCreateGroups: boolean,
  permissionEditRequests: boolean,
  permissionUnarchiveRequests: boolean,
  permissionConfigureStatus: boolean) => {
  return api.put('/updateTeam/' + team_id, { team_name, description, permissionCreateGroups, permissionCreateTeams, permissionCreateUsers, permissionEditRequests, permissionUnarchiveRequests, permissionConfigureStatus })
}

export const updateGroup = async (
  group_id: string,
  group_name: string,
  team_id: string,
  description: string,
  canRequestFeatures:boolean,
  canRequestHotfix:boolean,
  canRateAnalinhamento :boolean,
  canRateAnalise :boolean,
  mustRateAnalinhamento :boolean,
  mustRateAnalise :boolean
  ) => {
  return api.put('/updateGroup', { group_id, group_name, team_id, description, canRequestFeatures, canRequestHotfix, canRateAnalinhamento, canRateAnalise,mustRateAnalinhamento,mustRateAnalise })
}

export const updateStatusConfiguration = async (
  statuses: any[]
  ) => {
  return api.put('/updateStatus', statuses)
}

export const unarchiveRequest = async (request_id: string) => {
  return api.post('/unarchiveRequest/' + request_id)
}


export const readAllNotifications = async (
  user_id:string
  ) => {
  return api.get('/updateAllNotifications/' + user_id )
}