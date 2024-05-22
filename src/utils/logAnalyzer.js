import fs from "fs";
import path from "path";
import OpenAI from "openai";
import { config } from "../config/config.js";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const analyzeLogFile = async (filePath) => {
  try {
    const logData = fs.readFileSync(filePath, "utf-8");

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "You are a senior assistant that analyzes server log files and provides insights and suggestions for improvements.",
        },
        { role: "user", content: `Here is the server log data: ${logData}` },
      ],
    });

    const insights = response.choices[0].message.content;
    console.log("Insights and suggestions:\n", insights);
    return insights;
  } catch (error) {
    console.error("Error analyzing log file:", error);
  }
};

const logFilePath = path.join(process.cwd(), config.logFilePath);
analyzeLogFile(logFilePath);

export default analyzeLogFile;
