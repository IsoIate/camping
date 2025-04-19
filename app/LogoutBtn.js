'use client'

import { signOut } from 'next-auth/react'

function LogoutBtn(props) {

    return (
        <>
            <div style={{display : "flex"}}>
                <h5 className='m-auto me-3' > 안녕하세요 {props.session.user.name} 님 </h5>
                <button type="button" className="btn btn-danger" onClick={() => { signOut() }}> 로그아웃 </button>
            </div>
        </>
    )
}

export default LogoutBtn;