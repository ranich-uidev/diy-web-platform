import { ToolNode } from "@langchain/langgraph/prebuilt";
import { ChatOpenAI } from "@langchain/openai";
import { StateGraph, MessagesAnnotation } from "@langchain/langgraph";
import { AIMessage } from "@langchain/core/messages";
import { createLeadTool } from "./tools";

const tools = [createLeadTool];
const toolNode = new ToolNode(tools);

const model = new ChatOpenAI({ 
  modelName: "gpt-4o", 
  temperature: 0 
}).bindTools(tools);

// Define the logic to decide: Continue to Tool or End?
function shouldContinue(state: typeof MessagesAnnotation.State) {
  const lastMessage = state.messages[state.messages.length - 1];
  if (lastMessage instanceof AIMessage && lastMessage.tool_calls?.length) {
    return "tools";
  }
  return "__end__";
}

const workflow = new StateGraph(MessagesAnnotation)
  .addNode("agent", async (state) => ({
    messages: [await model.invoke(state.messages)],
  }))
  .addNode("tools", toolNode)
  .addEdge("__start__", "agent")
  .addConditionalEdges("agent", shouldContinue)
  .addEdge("tools", "agent");

export const agentExecutor = workflow.compile();