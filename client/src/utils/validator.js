export const strEmpty = (str) => !str || str.trim().length == 0

export const idxNotSelected = (idx) => idx == -1

export const isArrayEmpty = (list) => !list.length

export const strLengthCheck = (str, maxLen) => str.length > maxLen

export default {
    strEmpty,
    idxNotSelected,
    isArrayEmpty
}