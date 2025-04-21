'use client'

import React, { useEffect, useState } from "react"
import Link from "next/link"
import axios from "axios"
import { boardTitle } from "./common"

export default function Items({ session, type }) {

    let [dataArray, setDataArray] = useState([]);
    let userRole = session != null ? session.user.role : "";

    useEffect(() => {
        axios.get(`/api/get/${type}`,
            {
                params: {
                    type: `${type}`,
                    entire: 'Y'
                }
            }
        )
            .then((res) => {
                setDataArray(res.data);
            })
            .catch((e) => {
                alert(`에러가 발생했습니다.\n에러 : ${e.message}`)
            });
    }, [])

    return (
        <>
            <div className="noticeBody my-3 container">
                <div className="text-center">
                    <h2 className="mb-5"> {boardTitle[type]} </h2>
                </div>

                <div className="container">
                    <div className="card">
                        <div className="card-header row" style={{ margin: 0 }}>
                            <div className="col-1 text-center" style={{ paddingLeft: 0 }}>
                                <h5>No</h5>
                            </div>
                            <div className="vr" style={{ padding: 0 }}></div>
                            <div className="col-5 text-center">
                                <h5>제목</h5>
                            </div>
                            <div className="vr" style={{ padding: 0 }}></div>
                            <div className="col-2 text-center">
                                <h5>작성자</h5>
                            </div>
                            <div className="vr" style={{ padding: 0 }}></div>
                            <div className="col-2 text-center">
                                <h5>작성일</h5>
                            </div>
                            <div className="vr" style={{ padding: 0 }}></div>
                            <div className="col text-center" style={{ paddingRight: 0 }}>
                                <h5>조회수</h5>
                            </div>
                        </div>
                        <div className="card-body min-vh-30">
                            {
                                dataArray.map((data, index) => {
                                    return (
                                        <Link href={`/${type}View/${data._id}`} style={{ textDecoration: "none", color: "black" }} key={index}>
                                            <div className="card-body row">
                                                <div className="col-1 text-center" style={{ paddingLeft: 0 }}> {data.no} </div>
                                                <div className="col-5 text-center"> {data.title} </div>
                                                <div className="col-2 text-center"> {data.author} </div>
                                                <div className="col-2 text-center"> {data.insertDate} </div>
                                                <div className="col-2 text-center" style={{ paddingRight: 0 }}> {data.visit} </div>
                                            </div>
                                        </Link>
                                    )
                                })
                            }
                        </div>
                        <div className="card-footer text-body-secondary">
                            <div className="col text-end noticeBtns">
                                {
                                    userRole == "admin" ?
                                        <Link href="/noticeWrite"><button type="button" className="btn btn-primary" > 글쓰기 </button></Link>
                                        :
                                        type == "freeboard" && userRole != "" ?
                                            <Link href="/freeboardWrite"><button type="button" className="btn btn-primary" > 글쓰기 </button></Link>
                                            :
                                            <div style={{ height: "38px" }}></div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}