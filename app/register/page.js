'use client'

import Image from "next/image"
import Test01 from "@/public/test01.png"
import { useForm } from 'react-hook-form'
import axios from "axios";

export default function Register() {

    const { register, handleSubmit } = useForm();

    function onSubmit(data) {
        axios.post("/api/auth/signup", data)
            .then((res) => {
                alert("123 캠핑장의 회원이 되신것을 환영합니다!");
                location.href = ("/");
            })
            .catch((e) => {
                alert(`회원가입 중 문제가 발생했습니다.\n에러 : ${e.response.data}`);
            })
    }

    return (
        <>
            <div className="noticeTop">
                <div className="noticeImage mb-5">
                    <Image src={Test01} alt="" style={{ width: '100%', height: '20vh' }}></Image>
                </div>
            </div>
            <div className="container">
                <form method="POST" onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <label for="inputName" className="form-label">이름</label>
                        <input {...register("name",
                            {
                                required: true,
                            })} type="name" className="form-control" name="name" placeholder="김캠핑" />
                    </div>
                    <div className="mb-3">
                        <label for="inputEmail" className="form-label">이메일 주소</label>
                        <input  {...register("email",
                            {
                                required: true,
                            })} type="email" className="form-control" name="email" placeholder="example@co.kr" />
                    </div>
                    <div className="mb-3">
                        <label for="inputPw" className="form-label">비밀번호</label>
                        <input  {...register("password",
                            {
                                required: true,
                            })} type="password" className="form-control" name="password" placeholder="****" />
                    </div>
                    <div className="text-end">
                        <button type="submit" className="btn btn-primary me-2">회원가입</button>
                        <button type="button" className="btn btn-danger" onClick={() => { location.href = "/" }}>취소</button>
                    </div>
                </form>
            </div>
        </>
    )
}