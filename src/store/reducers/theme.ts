import { SET_THEME } from '@/constants'

export const INITIAL_STATE: String = 'light'

export default function user(state = INITIAL_STATE, action: { type: string; value: any }) {
  switch (action.type) {
    case SET_THEME:
      return {
        ...state,
        ...action.value
      }
    default:
      return state
  }
}
