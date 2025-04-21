'use client'

import Image from "next/image"
import Test01 from "@/public/test01.png"
import { useParams } from "next/navigation"
import Update from "@/app/common/Update"

export default function FreeboardView() {

    const params = useParams();
    const id = params.id.toString();

    return (
        <>
            <div className="noticeTop">
                <div className="noticeImage mb-5">
                    <Image src={Test01} alt="" style={{ width: '100%', height: '20vh' }}></Image>
                </div>
            </div>
            <Update id = {id} type = {"freeboard"}></Update>
        </>
    )
}