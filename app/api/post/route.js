import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (request) => {
    try {
        await connectToDB()

        const prompts = await Prompt.find({}).populate('creator')
        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
        return new Response("데이터를 불러오는데 실패했습니다",
            { status: 500 })
    }
}