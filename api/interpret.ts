import type { VercelRequest, VercelResponse } from "@vercel/node";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); 

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  let body: any;
  try {
    body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
  } catch {
    return res.status(400).json({ error: "Invalid JSON body" });
  }

  const { question, cards } = body;

  if (!question || !cards || !Array.isArray(cards)) {
    return res.status(400).json({ error: "질문과 카드 배열이 필요합니다." });
  }

  const cardText = cards
    .map(
      (c: any, idx: number) =>
        `${idx + 1}번 카드: ${c.name} (${c.eng}) - ${c.meaning}`
    )
    .join("\n");

  const prompt = `
너는 따뜻하고 친절한 타로카드 전문가야.
아래의 질문과 뽑힌 3장의 타로카드를 보고,
각 카드의 의미와 전체적인 메시지를 부드럽고 희망적으로 해석해줘.

질문: ${question}

뽑힌 카드:
${cardText}

[답변 형식]
1. 뽑으신 카드들에 대한 해석을, 마치 제가 바로 앞에서 이야기해 주는 것처럼 대화체로 풀어서 설명해 주세요. 각 카드별로 짧게 설명한 후, 전체적인 메시지를 부드러운 대화체로 마무리해주세요.

2. 답변은 1번과 2번과 같은 딱딱한 번호를 붙이지 말고, 마치 친구에게 말하듯 편안한 문장으로 이어주세요.

`;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    return res.status(200).json({ result: text });
  } catch (e: any) {
    console.error("Gemini API Error:", e);
    return res.status(500).json({
      error: "AI 해석에 실패했습니다.",
      detail: e.message ?? "알 수 없는 오류",
    });
  }
}