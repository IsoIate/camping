import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(request, response) {

    const db = (await connectDB).db('camping');
    let data = '';

    if (request.query.entire == "Y") {       // 목록 쿼리
        data = await db.collection(request.query.type).find({}).sort({"_id" : -1}).toArray();
    }
    else {                                  // 상세페이지 쿼리
        data = await db.collection(request.query.type).findOne({ _id: new ObjectId(request.query.id) });
    }

    return response.status(200).json(data);
} 