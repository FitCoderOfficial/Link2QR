import {Card, Divider, Subtitle, Text} from "@tremor/react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4b6786] to-[#183B7E] p-10 flex flex-col justify-center ">
      <Card className="max-w-4xl mx-auto">
        <Text className="text-6xl font-bold text-center mb-10">GPT AI</Text>
        <Subtitle className="text-xl text-center">
          Powered by openAI, Next.js 13, Tailwind CSS, Tremor 2.0
        </Subtitle>

        <Divider className="my-10" />

        <Card className="bg-gradient-to-br from-[#4b6786] to-[#183B7E]">
          <Text className="text-2xl font-bold text-center text-white">GPT AI</Text>
        </Card>

      </Card>
    </div>
  )
}
