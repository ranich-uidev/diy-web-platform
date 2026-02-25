import 'dotenv/config'; // Load your OPENAI_API_KEY from root
import { agentExecutor } from "./index";
import { HumanMessage } from "@langchain/core/messages";
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

async function testAgent() {
  console.log("🤖 Starting Agent Test...");

  const input = {
    messages: [
      new HumanMessage(
        "Hi, I'm Sarah Jenkins. My email is sarah@example.com. " +
        "I'm looking for an urgent MRI scan at the miami-mri clinic."
      ),
    ],
  };

  try {
    const result = await agentExecutor.invoke(input);
    
    // Log the conversation flow
    result.messages.forEach((msg: any, i: number) => {
      const role = msg._getType() === 'human' ? 'User' : 'AI';
      console.log(`\n[${role}]: ${msg.content}`);
      
      if (msg.tool_calls?.length > 0) {
        console.log(`🔧 Tool Call: ${msg.tool_calls[0].name}`);
        console.log(`📦 Arguments: ${JSON.stringify(msg.tool_calls[0].args)}`);
      }
    });

  } catch (error) {
    console.error("❌ Test Failed:", error);
  }
}

testAgent();