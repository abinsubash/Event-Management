import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export type userRole = 'user'|'owner'|'employees'
export interface IUser {
  name: string;
  phone_number: number;
  email: string;
  role: userRole;
}
 interface UserState{
    user:IUser|null
    accessToken:string|null
}

const initialState: UserState = {
  user: null,
  accessToken: null,
};

const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        setLogin:(state,action:PayloadAction<{ user: IUser; accessToken: string }>)=>{
            state.user = action.payload.user,
            state.accessToken = action.payload.accessToken
        },
        logout:(state)=>{
            state.user = null,
            state.accessToken = null
        }
    },

})

export const {setLogin,logout} = userSlice.actions
export default userSlice.reducer