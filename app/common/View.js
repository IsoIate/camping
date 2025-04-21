'use client'

import Link from "next/link"
import { useEffect, useState } from "react"
import axios from "axios"
import { boardTitle } from "./common"

export default function View({id, type}) {

    let [dataArray, setDataArray] = useState({});

    // 페이지 접속 시 글 띄워주는 쿼리
    useEffect(() => {
        axios.get(`/api/get/${type}`,
            {
                params: {
                    id: id,
                    type: type,
                    entire: 'N'
                }
            }
        )
            .then((res) => {
                setDataArray(res.data);
            })
            .catch((e) => {
                alert(`글을 불러오는 도중 에러가 발생했습니다.\n에러 : ${e.message}`)
            });
    }, [])

    // 게시글 삭제
    function itemDelete() {
        if (confirm("글을 삭제하시겠습니까?")) {
            axios.delete(`/api/delete/${type}`, { data: { _id: id } })
                .then((res) => {
                    alert("글을 삭제했습니다.");
                    location.href = `/${type}`;
                })
                .catch((e) => {
                    alert(`글을 삭제하는 도중 에러가 발생했습니다.\n에러 : ${e.message}`)
                })
        }
    }

    return (
        <>
            <div className="my-3">
                <div className="text-center">
                    <h2 className="mb-5"> {boardTitle[type]} </h2>
                </div>

                <div className="container">
                    <div className="card">
                        <div className="card-header row" style={{ margin: 0 }}>
                            <div className="col-8 text-start" style={{ paddingLeft: 0 }}>
                                <h3 style={{ margin: 0 }}>{dataArray.title || ''}</h3>
                            </div>
                            <div className="vr" style={{ padding: 0 }}></div>
                            <div className="col-2 text-center">
                                <label className="col-form-label"> {dataArray.insertDate} </label>
                            </div>
                            <div className="vr" style={{ padding: 0 }}></div>
                            <div className="col text-center" style={{ paddingRight: 0 }}>
                                <label className="col-form-label"> 3 </label>
                            </div>
                        </div>
                        <div className="card-body" style={{height : "30vh"}}>
                            <h5 className="card-title">{dataArray.content || ''}</h5>
                        </div>
                        <div className="card-footer text-body-secondary">
                            <div className="col text-end noticeBtns">
                                <Link href={`/${type}Update/${id}`}><button type="button" className="btn btn-primary"> 수정 </button></Link>
                                <button type="button" className="btn btn-danger" onClick={() => { itemDelete() }}> 삭제 </button>
                                <Link href={`/${type}`}><button type="button" className="btn btn-secondary" > 목록 </button></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}