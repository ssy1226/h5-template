import { SET_THEME } from '@/constants'
export const setTeme = (theme: String) => {
  return {
    type: SET_THEME,
    value: theme
  }
}