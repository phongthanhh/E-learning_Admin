const RADIX = 16
const NUMBER_TO_SLICE = 2

export const uid = () => Math.random().toString(RADIX).slice(NUMBER_TO_SLICE)
