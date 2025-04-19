import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(request, response) {

    const db = (await connectDB).db('camping');
    let data = request.body.data;
    
    // 날짜 삽입 코드
    let today = new Date();
    let hours = ('0' + today.getHours()).slice(-2);
    let minutes = ('0' + today.getMinutes()).slice(-2);
    let seconds = ('0' + today.getSeconds()).slice(-2);
    let timeString = hours + ':' + minutes + ':' + seconds;

    let result = await db.collection('notice').updateOne({ _id: new ObjectId(request.body._id) },
        {
            $set: 
            {
                title: data.title,
                content: data.content,
                updateDate: today.toLocaleDateString(),
                updateTime: timeString
            }
        }
    );

    if(result)
        response.status(200).json(result);
    else 
        return response.status(500).json(result);
} 