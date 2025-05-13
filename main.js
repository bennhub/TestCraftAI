import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai@latest";
import MarkdownIt from "https://esm.run/markdown-it@13.0.1";
import { API_KEY } from "./config.js";
// Import context-aware prompts
import { 
  getTestCasePrompt, 
  getQuestionsPrompt,
  getTestPlanPrompt,
  getBugReportPrompt,
  getExploratoryTestingPrompt,
  getApiTestingPrompt
} from "./enhanced-prompts.js";
// Import context management functions
import {
  loadContext,
  addConversation,
  clearConversations,
  resetContext
} from "./context.js";

// Initialize markdown parser
const md = new MarkdownIt();

// --- Initialize the model USING the imported key ---
// Check if the imported API key is valid before initializing
if (!API_KEY || API_KEY === "") {
  // Display an error or alert if the key is missing/default in config.js
  alert(
    "ERROR: API Key is missing or not set in config.js. Please create config.js and add your API key."
  );
  console.error("API Key is missing or not set in config.js!");
}

// Initialize the model with the updated version
const genAI = new GoogleGenerativeAI(API_KEY);
// Update to Gemini 2.0 Flash
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

let history = [];
let testCases = [];

// Function to send prompt to the AI model and get response
async function getResponse(userPrompt) {
  // Using dynamic context-aware prompt
  const personality = getTestCasePrompt();
  const fullPrompt = `${personality}\n\nGenerate the test case based on this request:\n${userPrompt}`;

  try {
    // Create a fresh chat instance without history to avoid conflicts
    const chat = model.startChat();
    
    // Send message in the format required by the latest Google Generative AI library
    const result = await chat.sendMessage([{text: fullPrompt}]);
    const response = await result.response;
    const text = response.text();

    console.log("AI response (raw):", text);

    // Store conversation in persistent context
    addConversation(userPrompt, text);

    return text;
  } catch (error) {
    console.error("Error communicating with AI:", error);
    const chatArea = document.getElementById("chat-container");
    if (chatArea) {
      chatArea.innerHTML += aiDiv(
        `<div class="ai-content p-2"><p class="text-red-600">Sorry, AI error: ${escapeHtml(
          error.message
        )}</p></div>`
      );
      scrollToLastMessage(chatArea);
    }
    return null;
  }
}

// Generate feature understanding questions
async function getQuestionsResponse(userPrompt) {
  const personality = getQuestionsPrompt();
  const fullPrompt = `${personality}\n\nGenerate questions for this feature/ticket:\n${userPrompt}`;

  try {
    // Use a fresh chat instance without history to avoid conflicts
    const chat = model.startChat();
    
    // Send message in the format required by the latest Google Generative AI library
    const result = await chat.sendMessage([{text: fullPrompt}]);
    const response = await result.response;
    const text = response.text();

    console.log("AI response (questions):", text);
    
    // Store conversation in persistent context
    addConversation(userPrompt + " (Generate questions)", text);
    
    return text;
  } catch (error) {
    console.error("Error communicating with AI for questions:", error);
    const chatArea = document.getElementById("chat-container");
    if (chatArea) {
      chatArea.innerHTML += aiDiv(
        `<div class="ai-content p-2"><p class="text-red-600">Sorry, AI error: ${escapeHtml(
          error.message
        )}</p></div>`
      );
      scrollToLastMessage(chatArea);
    }
    return null;
  }
}

// Generate test plan
async function getTestPlanResponse(userPrompt) {
  const personality = getTestPlanPrompt();
  const fullPrompt = `${personality}\n\nGenerate a test plan for this feature/project:\n${userPrompt}`;

  try {
    // Use a fresh chat instance without history to avoid conflicts
    const chat = model.startChat();
    
    // Send message in the format required by the latest Google Generative AI library
    const result = await chat.sendMessage([{text: fullPrompt}]);
    const response = await result.response;
    const text = response.text();

    console.log("AI response (test plan):", text);
    
    // Store conversation in persistent context
    addConversation(userPrompt + " (Generate test plan)", text);
    
    return text;
  } catch (error) {
    console.error("Error generating test plan:", error);
    return null;
  }
}

// User chat div
export const userDiv = (data) => {
  return `
  <!-- User Chat -->
  <div class="flex items-center gap-2 justify-start m-2">
    <img src="human.png" alt="user icon" class="w-10 h-10 rounded-full"/>
    <div class="bg-gemDeep text-black p-1 rounded-md shadow-md mx-2">${data}</div>
  </div>
  `;
};

// AI chat div with copy button inside the response div
export const aiDiv = (data) => {
  return `
  <!-- AI Chat -->
  <div class="flex gap-2 justify-end m-2">
    <div class="bg-gemDeep text-black p-1 rounded-md shadow-md mx-2 relative">
      <button class="copy-btn absolute top-0 right-0 bg-blue-500 text-white p-1 rounded-md shadow-md mx-2">Copy</button>
      ${data}
    </div>
    <!-- <img src="bot.png" alt="bot icon" class="w-10 h-10 rounded-full"/> -->
  </div>
  `;
};

// Function to handle generate test case button click
async function handleGenerateTestCase() {
  const titleInput = document.getElementById("testcase-title").value;
  const detailsInput = document.getElementById("testcase-details").value;

  if (titleInput.trim() === "" || detailsInput.trim() === "") {
    alert("Please fill out both the title and details fields!");
    return;
  }

  const chatArea = document.getElementById("chat-container");
  const userPrompt = `${titleInput}\n${detailsInput}`;

  // Display user message in chat
  const userContent = userDiv(md.render(userPrompt));
  chatArea.innerHTML += userContent;

  try {
    // Get AI response for test case
    const aiResponse = await getResponse(userPrompt);
    
    if (aiResponse) {
      const md_text = md.render(aiResponse);

      // Display AI response in chat
      const aiContent = aiDiv(md_text);
      chatArea.innerHTML += aiContent;

      // Scroll to the last message
      const newMessage = chatArea.lastElementChild;
      newMessage.scrollIntoView({ behavior: "smooth", block: "start" });

      // Add copy functionality
      addCopyFunctionality();

      // Store message history for current session
      history.push({ role: "user", parts: [{text: userPrompt}] });
      history.push({ role: "model", parts: [{text: aiResponse}] });
    }
    
    // DO NOT clear input form - removed those lines to keep fields populated
  } catch (error) {
    console.error("Error getting AI response:", error);
  }
}

// Function to handle generate questions button click
async function handleGenerateQuestions() {
  const titleInput = document.getElementById("testcase-title").value;
  const detailsInput = document.getElementById("testcase-details").value;

  if (titleInput.trim() === "" || detailsInput.trim() === "") {
    alert("Please fill out both the title and details fields!");
    return;
  }

  const chatArea = document.getElementById("chat-container");
  const userPrompt = `${titleInput}\n${detailsInput}`;

  // Display user message in chat
  const userContent = userDiv(md.render(userPrompt + "\n\n(Generating feature understanding questions)"));
  chatArea.innerHTML += userContent;

  try {
    // Get AI response for questions
    const aiResponse = await getQuestionsResponse(userPrompt);
    
    if (aiResponse) {
      const md_text = md.render(aiResponse);

      // Display AI response in chat
      const aiContent = aiDiv(md_text);
      chatArea.innerHTML += aiContent;

      // Scroll to the last message
      const newMessage = chatArea.lastElementChild;
      newMessage.scrollIntoView({ behavior: "smooth", block: "start" });

      // Add copy functionality
      addCopyFunctionality();

      // Store message history for current session
      history.push({ role: "user", parts: [{text: userPrompt + " (Generate questions)"}] });
      history.push({ role: "model", parts: [{text: aiResponse}] });
    }
    
    // DO NOT clear input form - removed those lines to keep fields populated
  } catch (error) {
    console.error("Error getting questions response:", error);
  }
}

// Function to handle generate test plan button click
async function handleGenerateTestPlan() {
  const titleInput = document.getElementById("testcase-title").value;
  const detailsInput = document.getElementById("testcase-details").value;

  if (titleInput.trim() === "" || detailsInput.trim() === "") {
    alert("Please fill out both the title and details fields!");
    return;
  }

  const chatArea = document.getElementById("chat-container");
  const userPrompt = `${titleInput}\n${detailsInput}`;

  // Display user message in chat
  const userContent = userDiv(md.render(userPrompt + "\n\n(Generating test plan)"));
  chatArea.innerHTML += userContent;

  try {
    // Get AI response for test plan
    const aiResponse = await getTestPlanResponse(userPrompt);
    
    if (aiResponse) {
      const md_text = md.render(aiResponse);

      // Display AI response in chat
      const aiContent = aiDiv(md_text);
      chatArea.innerHTML += aiContent;

      // Scroll to the last message
      const newMessage = chatArea.lastElementChild;
      newMessage.scrollIntoView({ behavior: "smooth", block: "start" });

      // Add copy functionality
      addCopyFunctionality();

      // Store message history for current session
      history.push({ role: "user", parts: [{text: userPrompt + " (Generate test plan)"}] });
      history.push({ role: "model", parts: [{text: aiResponse}] });
    }
    
    // DO NOT clear input form - removed those lines to keep fields populated
  } catch (error) {
    console.error("Error getting test plan response:", error);
  }
}

// Function to handle submit for chat
async function handleSubmit(event) {
  event.preventDefault();

  let userMessage = document.getElementById("prompt");
  const chatArea = document.getElementById("chat-container");

  const userPrompt = userMessage.value.trim();
  if (userPrompt === "") {
    return;
  }

  console.log("User message:", userPrompt);

  // Display user message in chat
  const userContent = userDiv(md.render(userPrompt));
  chatArea.innerHTML += userContent;
  userMessage.value = "";

  try {
    // Get AI response
    const aiResponse = await getResponse(userPrompt);
    
    if (aiResponse) {
      const md_text = md.render(aiResponse);

      // Display AI response in chat
      const aiContent = aiDiv(md_text);
      chatArea.innerHTML += aiContent;

      // Scroll to the start of the new AI content
      const newMessage = chatArea.lastElementChild;
      newMessage.scrollIntoView({ behavior: "smooth", block: "start" });

      // Add copy functionality
      addCopyFunctionality();

      // Store message history for current session
      history.push({ role: "user", parts: [{text: userPrompt}] });
      history.push({ role: "model", parts: [{text: aiResponse}] });

      console.log("History:", history);
    }
  } catch (error) {
    console.error("Error getting AI response:", error);
  }
}

// The rest of your existing code remains the same
const chatForm = document.getElementById("chat-form");
chatForm.addEventListener("submit", handleSubmit);

chatForm.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) handleSubmit(event);
});

// Get the elements
const chatbotPopup = document.getElementById("chatbot-popup");
const openChatbotButton = document.getElementById("open-chatbot");
const closeChatbotButton = document.getElementById("close-chatbot");

// Function to open the chatbot
const openChatbot = () => {
  chatbotPopup.style.display = "block";
};

// Event to open the chatbot
openChatbotButton.addEventListener("click", openChatbot);

// Event to close the chatbot
closeChatbotButton.addEventListener("click", () => {
  chatbotPopup.style.display = "none";
});

// Open the chatbot by default when the page loads
document.addEventListener("DOMContentLoaded", openChatbot);

// Function to load test cases from JSON file
async function loadTestCases() {
  try {
    const response = await fetch("/testCasePrompts.json"); // Adjust the path to your JSON file
    const data = await response.json();
    testCases = data.testCases;
    return testCases;
  } catch (error) {
    console.error("Error loading test cases:", error);
    return [];
  }
}

// Helper function to render AI response
function renderAIResponse(aiResponse) {
  if (!aiResponse) return;
  
  const chatArea = document.getElementById("chat-container");
  const md_text = md.render(aiResponse);
  const aiContent = aiDiv(md_text);
  
  // Display AI response in chat
  chatArea.innerHTML += aiContent;
  
  // Scroll to the last message
  const newMessage = chatArea.lastElementChild;
  newMessage.scrollIntoView({ behavior: "smooth", block: "start" });
  
  // Add copy functionality
  addCopyFunctionality();
}

// UPDATED: Function to handle test case item click with new options
function handleTestCaseClick(testCase) {
  return async () => {
    // Show buttons to choose what to generate
    const modal = document.createElement("div");
    modal.className = "test-case-modal";
    modal.innerHTML = `
      <div class="modal-content">
        <h3>Generate for: ${testCase.title}</h3>
        <div class="modal-buttons">
          <button id="modal-test-case-btn">Generate Test Case</button>
          <button id="modal-questions-btn">Generate Questions</button>
          <button id="modal-test-plan-btn">Generate Test Plan</button>
          <button id="modal-cancel-btn">Cancel</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    // Event listeners for modal buttons
    document.getElementById("modal-test-case-btn").addEventListener("click", async () => {
      const aiResponse = await getResponse(
        `show me test cases: ${testCase.title}\n${testCase.details}`
      );
      renderAIResponse(aiResponse);
      document.body.removeChild(modal);
    });

    document.getElementById("modal-questions-btn").addEventListener("click", async () => {
      const aiResponse = await getQuestionsResponse(
        `${testCase.title}\n${testCase.details}`
      );
      renderAIResponse(aiResponse);
      document.body.removeChild(modal);
    });
    
    document.getElementById("modal-test-plan-btn").addEventListener("click", async () => {
      const aiResponse = await getTestPlanResponse(
        `${testCase.title}\n${testCase.details}`
      );
      renderAIResponse(aiResponse);
      document.body.removeChild(modal);
    });

    document.getElementById("modal-cancel-btn").addEventListener("click", () => {
      document.body.removeChild(modal);
    });
  };
}

// Function to display test cases as clickable list items
function displayTestCases() {
  const testCaseList = document.getElementById("test-case-list");
  if (!testCaseList) return;
  
  testCaseList.innerHTML = ""; // Clear the list before adding items

  testCases.forEach((testCase) => {
    const listItem = document.createElement("li");
    listItem.textContent = testCase.title;
    listItem.classList.add("test-case-item");
    listItem.addEventListener("click", handleTestCaseClick(testCase));
    testCaseList.appendChild(listItem);
  });
}

// Load and display test cases when the page loads
document.addEventListener("DOMContentLoaded", async () => {
  // Setup event listeners for the generate buttons
  const generateTestCaseBtn = document.getElementById("generate-test-case-btn");
  const generateQuestionsBtn = document.getElementById("generate-questions-btn");
  const generateTestPlanBtn = document.getElementById("generate-test-plan-btn");
  
  if (generateTestCaseBtn) {
    generateTestCaseBtn.addEventListener("click", handleGenerateTestCase);
  }
  
  if (generateQuestionsBtn) {
    generateQuestionsBtn.addEventListener("click", handleGenerateQuestions);
  }
  
  if (generateTestPlanBtn) {
    generateTestPlanBtn.addEventListener("click", handleGenerateTestPlan);
  }

  await loadTestCases();
  displayTestCases();
  
  // Initialize context management UI elements
  initContextUI();
});

// Function to handle new test case submission
const saveTestCaseBtn = document.getElementById("save-testcase-btn");

if (saveTestCaseBtn) {
  saveTestCaseBtn.addEventListener("click", () => {
    const titleInput = document.getElementById("testcase-title").value;
    const detailsInput = document.getElementById("testcase-details").value;

    if (titleInput.trim() === "" || detailsInput.trim() === "") {
      alert("Please fill out both fields!");
      return;
    }

    const newTestCase = {
      title: titleInput,
      details: detailsInput,
    };

    // Temporarily add the new test case to the array
    testCases.push(newTestCase);

    // Update the test case list in the UI
    displayTestCases();

    // Clear the form inputs
    document.getElementById("test-case-form").reset();

    // Mock function to save the new test case to a JSON file (you will need to implement this on the backend)
    saveTestCaseToFile(newTestCase);
  });
}

// Mock function to save test case to a JSON file
async function saveTestCaseToFile(testCase) {
  // Implement an actual API request or backend function to save the test case to the JSON file
  console.log("Saving test case to file:", testCase);
  
  // In the future, you might want to implement actual persistence
  // For now, let's also save this in localStorage as a backup
  try {
    // Get existing test cases from localStorage
    const savedTestCases = localStorage.getItem('savedTestCases');
    let testCaseArray = [];
    
    if (savedTestCases) {
      testCaseArray = JSON.parse(savedTestCases);
    }
    
    // Add the new test case
    testCaseArray.push(testCase);
    
    // Save back to localStorage
    localStorage.setItem('savedTestCases', JSON.stringify(testCaseArray));
    console.log('Test case also saved to localStorage for backup');
  } catch (error) {
    console.error('Error saving test case to localStorage:', error);
  }
}

// Function to add copy functionality to all copy buttons
function addCopyFunctionality() {
  const copyBtns = document.querySelectorAll(".copy-btn");
  copyBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const content = btn.parentElement.innerText; // Corrected to innerText to exclude button text
      navigator.clipboard
        .writeText(content)
        .then(() => {
          console.log("Copied to clipboard: ", content);
          // Update button text temporarily to provide feedback
          const originalText = btn.textContent;
          btn.textContent = "Copied!";
          setTimeout(() => {
            btn.textContent = originalText;
          }, 2000);
        })
        .catch((err) => {
          console.error("Failed to copy text: ", err);
          alert("Failed to copy text. Please try again.");
        });
    });
  });
}

// Function to scroll to the last message
function scrollToLastMessage(container) {
  if (container.lastElementChild) {
    container.lastElementChild.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

// Helper function to escape HTML
function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Function to handle errors in a user-friendly way
function handleError(error, message = "An error occurred") {
  console.error(error);
  const chatArea = document.getElementById("chat-container");
  if (chatArea) {
    chatArea.innerHTML += aiDiv(
      `<div class="ai-content p-2"><p class="text-red-600">${message}: ${escapeHtml(error.message)}</p></div>`
    );
    scrollToLastMessage(chatArea);
  }
}

// Function to check if the inputs are valid before generating content
function validateInputs() {
  const titleInput = document.getElementById("testcase-title").value;
  const detailsInput = document.getElementById("testcase-details").value;
  
  if (titleInput.trim() === "" || detailsInput.trim() === "") {
    alert("Please fill out both the title and details fields!");
    return false;
  }
  
  return true;
}

// Load saved test cases from localStorage when starting
document.addEventListener('DOMContentLoaded', function() {
  try {
    const savedTestCases = localStorage.getItem('savedTestCases');
    if (savedTestCases) {
      const parsedTestCases = JSON.parse(savedTestCases);
      // Merge with any test cases loaded from JSON file
      testCases = [...testCases, ...parsedTestCases];
      console.log('Loaded test cases from localStorage:', testCases);
      // Update the UI
      displayTestCases();
    }
  } catch (error) {
    console.error('Error loading test cases from localStorage:', error);
  }
});

// Function to initialize context management UI
function initContextUI() {
  // Create context management section if elements don't exist yet
  const editContextBtn = document.getElementById("edit-context-btn");
  const viewContextBtn = document.getElementById("view-context-btn");
  const clearHistoryBtn = document.getElementById("clear-history-btn");
  const resetContextBtn = document.getElementById("reset-context-btn");
  
  // Set up event listeners if buttons exist
  if (editContextBtn) {
    editContextBtn.addEventListener("click", showContextEditor);
  }
  
  if (viewContextBtn) {
    viewContextBtn.addEventListener("click", viewCurrentContext);
  }
  
  if (clearHistoryBtn) {
    clearHistoryBtn.addEventListener("click", clearConversationHistory);
  }
  
  if (resetContextBtn) {
    resetContextBtn.addEventListener("click", resetToDefault);
  }
}

function updateAppDocumentation(newDocumentation) {
  try {
    const currentContext = loadContext(); // Assuming you have this function
    currentContext.appDocumentation = newDocumentation;
    localStorage.setItem("appContext", JSON.stringify(currentContext)); // Save it
    console.log("App documentation updated");
  } catch (error) {
    console.error("Failed to update app documentation:", error);
  }
}

// Function to show context editor modal
function showContextEditor() {
  const context = loadContext();
  
  // Create modal
  const modal = document.createElement('div');
  modal.className = 'context-modal';
  modal.innerHTML = `
    <div class="context-modal-content">
      <h3 class="text-xl font-bold mb-4">Edit Application Documentation</h3>
      <p class="mb-4">Update the application documentation to help the AI generate better test cases and questions.</p>
      <textarea id="context-editor" class="w-full h-96 p-2 border rounded mb-4" spellcheck="false">${context.appDocumentation}</textarea>
      <div class="modal-buttons">
        <button id="save-context-btn" class="bg-blue-500 text-white p-2 rounded">Save Changes</button>
        <button id="cancel-context-btn" class="bg-gray-500 text-white p-2 rounded ml-2">Cancel</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  
  // Add event listeners
  document.getElementById('save-context-btn').addEventListener('click', () => {
    const newDocumentation = document.getElementById('context-editor').value;
    updateAppDocumentation(newDocumentation);
    document.body.removeChild(modal);
    alert('Application documentation updated successfully!');
  });
  
  document.getElementById('cancel-context-btn').addEventListener('click', () => {
    document.body.removeChild(modal);
  });
}

// Function to view current context
function viewCurrentContext() {
  const context = loadContext();
  
  // Create modal
  const modal = document.createElement('div');
  modal.className = 'context-modal';
  modal.innerHTML = `
    <div class="context-modal-content">
      <h3 class="text-xl font-bold mb-4">Current Application Context</h3>
      <div class="mb-4">
        <h4 class="font-bold">App Documentation:</h4>
        <pre class="context-preview p-2 border rounded">${context.appDocumentation}</pre>
      </div>
      <div class="mb-4">
        <h4 class="font-bold">Conversation History (${context.conversations?.length || 0} entries):</h4>
        <div class="context-preview p-2 border rounded h-40 overflow-auto">
          ${context.conversations?.length ? 
            context.conversations.map((conv, i) => 
              `<div class="mb-2 pb-2 border-b">
                <strong>#${i+1}:</strong> ${conv.userPrompt.substring(0, 50)}${conv.userPrompt.length > 50 ? '...' : ''}
              </div>`
            ).join('') : 
            'No conversation history.'}
        </div>
      </div>
      <div class="modal-buttons">
        <button id="close-view-btn" class="bg-blue-500 text-white p-2 rounded">Close</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  
  // Add event listener
  document.getElementById('close-view-btn').addEventListener('click', () => {
    document.body.removeChild(modal);
  });
}

// Function to save the context as a TXT file
function saveContextToFile() {
  const textData = DEFAULT_APP_CONTEXT;  // or dynamically load context here
  const blob = new Blob([textData], { type: 'text/plain' });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "appContext.txt";  // The name of the file to download

  // Programmatically click the link to trigger the download
  link.click();
}

// Function to clear conversation history
function clearConversationHistory() {
  if (confirm('Are you sure you want to clear the conversation history?')) {
    clearConversations();
    alert('Conversation history cleared!');
  }
}

// Function to reset context to default
function resetToDefault() {
  if (confirm('Are you sure you want to reset the app context to default? This will clear all conversation history and documentation changes.')) {
    resetContext();
    alert('App context reset to default!');
  }
}

// Add event listener for save context button if it exists
document.addEventListener("DOMContentLoaded", () => {
  const saveButton = document.getElementById("save-context-btn");

  if (saveButton) {
    saveButton.addEventListener("click", () => {
      saveContextToFile();
    });
  }
});