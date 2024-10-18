import { createAction, createReducer } from '@reduxjs/toolkit'

export const set = createAction('SET')
export const clear = createAction('CLEAR')

const initialState = {
	id: -1,
	fullName: "",
	email: "",
	isLoggedIn: false
}

const userReducer = createReducer(initialState, (builder) => {
	builder.addCase(set, (state, action) => {
		return { ...state, ...action.payload }
	})
  builder.addCase(clear, () => {
		return { ...initialState }
	})
})

export default userReducer
