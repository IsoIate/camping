import { configureStore, createSlice } from '@reduxjs/toolkit'
import { getServerSession } from "next-auth"
import { authOptions } from "@/pages/api/auth/[...nextauth]"

let userData = createSlice({
    session: await getServerSession(authOptions)
})

export default configureStore({
    reducer: {
        session: userData.session
    }
}) 