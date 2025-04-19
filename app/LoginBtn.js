'use client'

import { signIn } from 'next-auth/react'

function LoginBtn () {

    return (
        <>
            <button type="button" className="btn btn-primary mx-2" onClick={() => { signIn() }}> 로그인 </button>
            <button type="button" className="btn btn-success"  onClick={() => { 
                location.href = "/register" }}> 회원가입 </button>
            
        </>
    )
}

export default LoginBtn;