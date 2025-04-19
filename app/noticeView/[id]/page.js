'use client'

import Image from "next/image"
import Test01 from "@/public/test01.png"
import Link from "next/link"
import { useParams, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import axios from "axios"
import { useSession } from "next-auth/react"
// import { useSelector } from "react-redux"

export default function NoticeView() {

    const params = useParams();
    const id = params.id.toString();
    let [noticeData, setNoticeData] = useState({});
    let { data:session, update } = useSession();

    // let a = useSelector((state) => { return state })
    console.log(data)

    // 상세페이지 접속 시 글 띄워주는 쿼리
    useEffect(() => {
        axios.get('/api/get/notice',
            {
                params: {
                    id: id,
                    type: 'noticeOne'
                }
            }
        )
            .then((res) => {
                setNoticeData(res.data);
            })
            .catch((e) => {
                alert(`글을 불러오는 도중 에러가 발생했습니다.\n에러 : ${e.message}`)
            });
    }, [])

    // 게시글 삭제
    function noticeDelete() {
        if (confirm("글을 삭제하시겠습니까?")) {
            axios.delete('/api/delete/notice', { data: { _id: id } })
                .then((res) => {
                    alert("글을 삭제했습니다.");
                    location.href = "/notice";
                })
                .catch((e) => {
                    alert(`글을 삭제하는 도중 에러가 발생했습니다.\n에러 : ${e.message}`)
                })
        }
    }

    return (
        <>
            <div className="noticeTop">
                <div className="noticeImage mb-5">
                    <Image src={Test01} alt="" style={{ width: '100%', height: '20vh' }}></Image>
                </div>
            </div>
            <div className="my-3">
                <div className="text-center">
                    <h2 className="mb-5"> 공지사항 </h2>
                    <h2 className="mb-5">  </h2>
                </div>

                <div className="container">
                    <div className="card">
                        <div className="card-header row" style={{ margin: 0 }}>
                            <div className="col-8 text-start" style={{ paddingLeft: 0 }}>
                                <h3 style={{ margin: 0 }}>{noticeData.title || ''}</h3>
                            </div>
                            <div className="vr" style={{ padding: 0 }}></div>
                            <div className="col-2 text-center">
                                <label className="col-form-label"> {noticeData.insertDate} </label>
                            </div>
                            <div className="vr" style={{ padding: 0 }}></div>
                            <div className="col text-center" style={{ paddingRight: 0 }}>
                                <label className="col-form-label"> 3 </label>
                            </div>
                        </div>
                        <div className="card-body" style={{height : "30vh"}}>
                            <h5 className="card-title">{noticeData.content || ''}</h5>
                        </div>
                        <div className="card-footer text-body-secondary">
                            <div className="col text-end noticeBtns">
                                <Link href={`/noticeUpdate/${id}`}><button type="button" className="btn btn-primary"> 수정 </button></Link>
                                <button type="button" className="btn btn-danger" onClick={() => { noticeDelete() }}> 삭제 </button>
                                <Link href="/notice"><button type="button" className="btn btn-secondary" > 목록 </button></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}