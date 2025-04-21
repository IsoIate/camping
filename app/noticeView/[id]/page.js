'use client'

import Image from "next/image"
import Test01 from "@/public/test01.png"
import { useParams, useSearchParams } from "next/navigation"
import View from '@/app/common/View'

export default function NoticeView() {

    const params = useParams();
    const id = params.id.toString();

    return (
        <>
            <div className="noticeTop">
                <div className="noticeImage mb-5">
                    <Image src={Test01} alt="" style={{ width: '100%', height: '20vh' }}></Image>
                </div>
            </div>
            <View id = { id } type = { "notice" }></View>
        </>
    )
}