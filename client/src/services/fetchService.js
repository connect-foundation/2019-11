import { Await, Option } from '../utils/fetchUtil.js'

export const getFetch = async (url, headerOption, params) => {
    const option = Option.get;
    option.params = params
    option.headers = Object.assign(option.headers, headerOption)
    const result = await Await(url, option)

    return result
}

export const postJsonFetch = async (url, headerOption, body) => {
    const option = Option.postJson
    option.body = JSON.stringify(body)
    option.headers = Object.assign(option.headers, headerOption)
    const result = await Await(url, option)

    return result
}

export const putJsonFetch = async (url, headerOption, body) => {
    const option = Option.putJson
    option.body = JSON.stringify(body)
    option.headers = Object.assign(option.headers, headerOption)
    const result = await Await(url, option)

    return result
}

export default { getFetch, postJsonFetch, putJsonFetch }