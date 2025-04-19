import { connectDB } from "@/util/database";

export default async function handler(request, response) {

    const db = (await connectDB).db('camping');
    let data = request.body;

    // 마지막 게시글의 No 다음 번호를 부여하는 코드
    let lastestData = await db.collection('notice').find().sort({"_id" : -1}).limit(1).toArray();
    let lastestNo = lastestData.length > 0 ? Number(lastestData[0].no) + 1 : 1;

    // 날짜 삽입 코드
    let today = new Date();
    let hours = ('0' + today.getHours()).slice(-2);
    let minutes = ('0' + today.getMinutes()).slice(-2);
    let seconds = ('0' + today.getSeconds()).slice(-2);
    let timeString = hours + ':' + minutes + ':' + seconds;
    
    data.insertDate = today.toLocaleDateString();
    data.insertTime = timeString;
    data.updateDate = '';
    data.updateTime = '';
    data.no = lastestNo;
    data.author = 'aaa';
    data.visit = 0;

    // DB에 데이터 저장
    let result = await db.collection('notice').insertOne(data);

    if(result)
        response.status(200).json(result);
    else 
        return response.status(500).json(result);
} 