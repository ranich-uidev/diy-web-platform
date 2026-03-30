import 'dotenv/config'; 
import path from 'path';
import dotenv from 'dotenv';
// Point to root .env
dotenv.config({ path: path.resolve(__dirname, '../../..', '.env') });

import { ChatOpenAI } from "@langchain/openai";
import { createLeadTool } from "./tools";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { HumanMessage } from "@langchain/core/messages";
import { saveSiteLayoutTool } from './assembler';

async function testOnboarding() {
    
  console.log("🏗️ Starting Onboarding Agent Test...");

  const model = new ChatOpenAI({ 
    modelName: "gpt-4o-mini", 
    temperature: 0 
  });
   const systemMessage = `
    You are a Website Architect. When a user asks for a website:
    1. You MUST call the 'save_site_layout' tool with a detailed JSON structure.
    2. Choose hex codes for colors (e.g., #D4AF37 for gold).
    3. Define at least 3 components: 'Navbar', 'Hero', and 'Features'.
    4. Only after the tool returns "Success" should you confirm to the user.
  `;

  const tools = [createLeadTool, saveSiteLayoutTool];
  const agent = createReactAgent({ llm: model, tools, messageModifier: systemMessage });
 

  const input = {
    messages: [
      new HumanMessage(
        "I want to build a website for 'Vantage Estates', a luxury real estate firm in Dubai. " +
        "Use a sophisticated gold and black theme. I need a hero section, a listing gallery, " +
        "and a contact form for high-net-worth individuals."
      ),
    ],
  };

  try {
    const result = await agent.invoke(input);

    // Log the AI's "Design Thinking"
    const lastMsg = result.messages[result.messages.length - 1];
    console.log("\n🎨 AI Response:", lastMsg.content);

    // Look for the tool call in the message history (OpenAI tool calls live in additional_kwargs.tool_calls)
    const toolCallMsg = result.messages.find(
      (m) => Array.isArray((m.additional_kwargs as any)?.tool_calls) && (m.additional_kwargs as any).tool_calls.length > 0,
    );

    if (toolCallMsg) {
      const toolCalls = (toolCallMsg.additional_kwargs as any).tool_calls;
      console.log("Tool Calls", toolCalls);
      const firstCall = toolCalls[0];

      // OpenAI tool calls use function.arguments (stringified JSON)
      const rawArgs =
        firstCall.function?.arguments ??
        firstCall.arguments ??
        firstCall.args;

      const parsedArgs =
        typeof rawArgs === "string" ? JSON.parse(rawArgs) : rawArgs;

      console.log("\n📦 Generated Layout JSON:", JSON.stringify(parsedArgs, null, 2));
    }

  } catch (error) {
    console.error("❌ Onboarding Failed:", error);
  }
}

testOnboarding();