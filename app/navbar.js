'use client'

import 'bootstrap/dist/css/bootstrap.css';
import LogoutBtn from './LogoutBtn';
import LoginBtn from './LoginBtn';

export default function Navbar({ session }) {

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/."> 123 캠핑장 </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/."> 홈 </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/notice"> 공지사항 </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/freeboard"> 자유게시판 </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/location"> 오시는길 </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        {
                            session == null ?
                                <LoginBtn />
                                :
                                <LogoutBtn session = {session} />
                        }
                    </div>
                </div>
            </nav>
        </>
    )
}
