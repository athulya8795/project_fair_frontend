import axios from "axios"

export const commonApi = async (httpRequest, url, reqBody, reqHearder) => {
    const reqConfig = {
        method: httpRequest,
        url,
        data: reqBody,
        headers: reqHearder ? reqHearder : { "Content-Type": "application/json" }
    }
    return await axios(reqConfig).then((result) => {
        return result
    }).catch((err) => {
        return err
    })
}