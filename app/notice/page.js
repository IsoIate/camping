
import NoticeItem from "./NoticeItem"
import { getServerSession } from "next-auth"
import { authOptions } from "@/pages/api/auth/[...nextauth]"

export default async function Notice() {
    let session = await getServerSession(authOptions)

    return (
        <>
            <NoticeItem session = {session}></NoticeItem>
        </>
    )
}