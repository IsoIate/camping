import { connectDB } from "@/util/database";

export default async function handler(request, response) {

    const db = (await connectDB).db('camping');
    let data = await db.collection(`${request.query.type}_comment`).find({parentId : request.query.parentId}).sort({"_id" : -1}).toArray();

    return response.status(200).json(data);
} 