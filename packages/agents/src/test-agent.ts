import { agentExecutor } from "./index";
import { HumanMessage } from "@langchain/core/messages";

async function runTest() {
  const response = await agentExecutor.invoke({
    messages: [new HumanMessage("Hi, I'm John Doe (john@example.com). I need to book a brain scan for my clinic miami-mri.")],
  });
  console.log(response.messages[response.messages.length - 1].content);
}

runTest();