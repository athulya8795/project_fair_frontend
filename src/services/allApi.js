import { commonApi } from "./commonApi"
import { serverUrl } from "./serverUrl"

// register
export const registerApi = async (reqBody) => {
    return await commonApi('POST', `${serverUrl}/register`, reqBody, "")
}

// login 
export const loginApi = async (reqBody) => {
    return await commonApi('POST', `${serverUrl}/login`, reqBody, "")
}

// add project 
export const addProjectApi = async (reqBody, reqHeader) => {
    return await commonApi('POST', `${serverUrl}/add-project`, reqBody, reqHeader)
}

// get home project
export const homeProjectApi = async () => {
    return await commonApi('GET', `${serverUrl}/home-project`)
}

// get all project
//query parameter = baseurl?key=value
//id parameter = baseurl/id=baseurl/:id
export const allProjectApi = async (searchKey, reqHeader) => {
    return await commonApi('GET', `${serverUrl}/all-project?search=${searchKey}`, "", reqHeader)
}

// get user project
export const userProjectApi = async (reqHeader) => {
    return await commonApi('GET', `${serverUrl}/user-project`, "", reqHeader)
}

// remove user project
export const removeUserProjectApi = async (id, reqHeader) => {
    return await commonApi('DELETE', `${serverUrl}/remove-userproject/${id}`, {}, reqHeader)
}

// update project
export const updateUserProjectApi = async (id, reqBody, reqHeader) => {
    return await commonApi('PUT', `${serverUrl}/update-userproject/${id}`, reqBody, reqHeader)
}

//update profile
export const updateUserProfileApi = async(reqBody,reqHeader)=>{
    return await commonApi('PUT',`${serverUrl}/update-userprofile`,reqBody,reqHeader)
}