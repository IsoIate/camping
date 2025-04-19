import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(request, response) {

    const db = (await connectDB).db('camping');
    let data = '';

    if (request.query.type == "notice")        // 공지사항 목록 쿼리
        data = await db.collection('notice').find({}).sort({"_id" : -1}).toArray();
    else if (request.query.type == "noticeOne")  // 공지사항 상세페이지 쿼리
        data = await db.collection('notice').findOne({ _id: new ObjectId(request.query.id) });

    return response.status(200).json(data);
} 