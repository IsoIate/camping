import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(request, response) {

    const db = (await connectDB).db('camping');
    
    let result = await db.collection('notice').deleteOne({ _id: new ObjectId(request.body._id) });

    if(result)
        response.status(200).json(result);
    else 
        return response.status(500).json(result);
} 