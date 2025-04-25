'use client'

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios"

export default function Comment({ id, type }) {

    const { register, handleSubmit } = useForm();
    let [dataArray, setDataArray] = useState({});
    let [comment, setComment] = useState('');

    // 페이지 접속 시 댓글 띄워주는 쿼리
    useEffect(() => {
        axios.get(`/api/get/comment`,
            {
                params: {
                    parentId: id,
                    type: type
                }
            }
        )
            .then((res) => {
                setDataArray(res.data);
            })
            .catch((e) => {
                alert(`댓글을 가져오는 도중 오류가 발생했습니다.\n에러 : ${e.message}`)
            });
    }, [])


    const onSubmit = (data) => {
        axios.put(`/api/post/comment`,
            {
                data: data,
                parentId: id,
                type: type
            }
        )
            .then((res) => {
                location.href = `/${type}View/${id}`;
            })
            .catch((e) => {
                alert(`댓글 작성 중 오류가 발생하였습니다.\n에러 : ${e.message}`)
            });
    }

    return (
        <>
            <div className="container">
                <div className="card">
                    <div className="card-header row" style={{ margin: 0 }}>
                        <div className="col-1 d-flex justify-content-between" style={{ paddingLeft: 0 }}>
                            <h5 style={{ margin: 0 }}> 댓글 </h5>
                            <label> {dataArray.length} </label>
                        </div>
                    </div>
                    {
                        dataArray.length > 0 ?
                            dataArray.map((data, index) => {
                                return (
                                    <>
                                        <div className="card-body row" key={index}>
                                            <div className="col-2 text-start">
                                                <h5 style={{ margin: 0 }}> {data.author} </h5>
                                            </div>
                                            <div className="vr" style={{ padding: 0 }}></div>
                                            <div className="col-8 text-start">
                                                <p style={{ margin: 0 }}>{data.comment || ''}</p>
                                            </div>
                                            <div className="vr" style={{ padding: 0 }}></div>
                                            <div className="col text-center">
                                                <label className="col-form-label"> {data.insertDate} </label>
                                            </div>
                                        </div>
                                        {
                                            dataArray.length > 1 && dataArray.length != (index + 1) ?
                                                <hr className="border-1 border-secondary" />
                                                : ''
                                        }
                                    </>
                                )
                            })
                            : ''
                    }
                    <div className="card-footer text-body-secondary ">
                        <form onSubmit={handleSubmit(onSubmit)} >
                            <div className="row">
                                <div className="col-10 text-center">
                                    <textarea className="form-control"
                                        {...register("comment", { required: true })}
                                        onChange={(e) => { setComment(e.target.value) }}
                                        value={comment} placeholder="댓글을 입력하세요."
                                    />
                                </div>
                                <div className="vr" style={{ padding: 0 }}></div>
                                <div className="col text-end noticeBtns">
                                    <button type="submit" className="btn btn-primary w-100 h-100"> 작성 </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}