'use client'

import Image from "next/image"
import Test01 from "../../public/test01.png"
import Link from "next/link"
import { useForm } from 'react-hook-form'
import axios from "axios";

export default function NoticeWrite() {

    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => {
        axios.post('/api/post/notice', data)
            .then((res) => {
                alert("글이 정상적으로 작성되었습니다.");
                location.href = "/notice";
            })
            .catch((e) => {
                alert(`글 작성 중 오류가 발생하였습니다.\n에러 : ${e.message}`)
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
                    <h2 className="mb-5"> 공지사항 작성 </h2>
                </div>
                <div className="container text-center">
                    <form className="row" onSubmit={handleSubmit(onSubmit)} >
                        <div className="col-2">
                            <label className="col-form-label"> 글 제목 </label>
                        </div>
                        <div className="col-10">
                            <input
                                {...register("title",
                                    {
                                        required: true,
                                    })}
                                type="text" className=" col-12" placeholder=" 제목을 작성하세요." />
                        </div>
                        <div className="col-2">
                            <label className="col-form-label"> 글 내용 </label>
                        </div>
                        <div className="col-10">
                            <textarea
                                {...register("content", { required: true })}
                                style={{ height: "300px" }} className=" col-12" placeholder=" 내용을 작성하세요." />
                        </div>
                        <div className="col text-end mt-5">
                            <button type="submit" className="btn btn-primary mx-2"> 글 작성 </button>
                            <Link href="/notice"><button type="button" className="btn btn-danger" > 취소 </button></Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}