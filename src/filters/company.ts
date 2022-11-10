import { COMPANY } from '../constant'

const regexp = new RegExp(`(${COMPANY.join('|')})`, 'i')

export const companyFilterFn = (item: string) => regexp.test(item)

export default companyFilterFn
