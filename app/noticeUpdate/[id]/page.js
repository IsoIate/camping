'use client'

import Image from "next/image"
import Test01 from "@/public/test01.png"
import Link from "next/link"
import { useForm } from 'react-hook-form'
import { useParams, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import axios from "axios"

export default function NoticeView() {

    const params = useParams();
    const id = params.id.toString();
    let [noticeData, setNoticeData] = useState({});
    let [title, setTitle] = useState('');
    let [content, setContent] = useState('');

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
                setTitle(res.data.title);
                setContent(res.data.content)
            })
            .catch((e) => {
                alert(`1111111.\n에러 : ${e.message}`)
            });
    }, [])


    // 글 수정 시 보내는 쿼리
    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => {
        axios.put('/api/put/notice',
            {
                data: data,
                _id: id
            }
        )
            .then((res) => {
                alert("글이 정상적으로 수정되었습니다.");
                location.href = `/noticeView/${id}`;
            })
            .catch((e) => {
                alert(`글 수정 중 오류가 발생하였습니다.\n에러 : ${e.message}`)
            });
    }

    return (
        <>
            <div className="noticeTop">
                <div className="noticeImage mb-5">
                    <Image src={Test01} alt="" style={{ width: '100%', height: '20vh' }}></Image>
                </div>
            </div>
            <div className="noticeBody my-3">
                <div className="text-center">
                    <h2 className="mb-5">공지사항 수정</h2>
                </div>
                <div className="container text-center">
                    <form className="row" onSubmit={handleSubmit(onSubmit)} >
                        <div className="col-2">
                            <label className="col-form-label"> 글 제목 </label>
                        </div>
                        <div className="col-10">
                            <input
                                {...register("title",{ required: true })}
                                onChange={(e) => { setTitle(e.target.value) }}
                                value={title} type="text" className=" col-12" placeholder=" 제목을 작성하세요."
                            />
                        </div>
                        <div className="col-2">
                            <label className="col-form-label"> 글 내용 </label>
                        </div>
                        <div className="col-10">
                            <textarea
                                {...register("content", { required: true })}
                                style={{ height: "300px" }}
                                onChange={(e) => { setContent(e.target.value) }}
                                className=" col-12" value={content} placeholder=" 내용을 작성하세요." />
                        </div>
                        <div className="col text-end mt-5 noticeBtns">
                            <button type="submit" className="btn btn-primary"> 수정 </button>
                            <Link href="/notice"><button type="button" className="btn btn-secondary" > 목록 </button></Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}