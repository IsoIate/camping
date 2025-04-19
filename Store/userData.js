import { create } from 'zustand'

const userData = create((set) => ({
    userInfo: '',
    setUserInfo: () => { set(userInfo) },
    deleteUserInfo: () => { set('') }
}))

export default userData;