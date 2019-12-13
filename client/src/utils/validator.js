export const strEmpty = (str) => !str || str.trim().length === 0

export const idxNotSelected = (idx) => idx === -1

export const isArrayEmpty = (list) => !list.length

export const strLengthCheck = (str, maxLen) => str.length > maxLen

export const isNumber = (key) => key.replace(/[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣]/g, '').length

export default {
    strEmpty,
    idxNotSelected,
    isArrayEmpty,
    strLengthCheck,
    isNumber
}