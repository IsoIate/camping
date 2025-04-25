import { connectDB } from "@/util/database";
import { timeString, date } from "@/pages/api/common/common"

export default async function handler(request, response) {

    const db = (await connectDB).db('camping');
    let data =
    {
        parentId : request.body.parentId,
        comment : request.body.data.comment,
        insertDate : date,
        insertTime : timeString,
        author : 'aaa'
    }

    console.log(data)
    // DB에 데이터 저장
    let result = await db.collection(`${request.body.type}_comment`).insertOne(data);

    if (result)
        response.status(200).json(result);
    else
        return response.status(500).json('');
} 