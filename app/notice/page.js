
import { getServerSession } from "next-auth"
import { authOptions } from "@/pages/api/auth/[...nextauth]"

import Items from "../common/Items"
import Image from "next/image"
import Test01 from "../../public/test01.png"

export default async function Notice() {
    let session = await getServerSession(authOptions)
    console.log(session)

    

    return (
        <>
            <div className="noticeTop">
                <div className="noticeImage mb-5">
                    <Image src={Test01} alt="" style={{ width: '100%', height: '20vh' }}></Image>
                </div>
            </div>
            <Items session={session} type={"notice"}></Items>
        </>
    )
}