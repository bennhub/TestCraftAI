# QA-AI: Context-Aware Test Case Generator

An AI-powered tool for generating test cases, feature questions, and test plans based on your application's UI functionality.

## Overview

QA-AI leverages Google's Gemini AI to create professional QA documentation. The key feature of this tool is its context awareness - it stores knowledge about your application UI and remembers past conversations to generate more relevant and accurate QA materials.

## Features

- **Test Case Generation**: Create detailed test cases with clear steps, actions, and expected results
- **Feature Understanding Questions**: Generate comprehensive lists of questions to ask developers or product managers
- **Test Plan Creation**: Develop full test plans with scope, strategy, and risk assessment
- **Persistent Memory**: Stores application context and conversation history in localStorage
- **Context Management**: Edit application documentation, view history, and reset if needed
- **Saved Test Cases**: Store and reuse common test case templates

## Getting Started

### Prerequisites

1. You need a Google Gemini API key
2. Modern web browser with JavaScript enabled

### Setup

1. Clone this repository
2. Create a `config.js` file with your API key:
```javascript
// config.js
export const API_KEY = "your-gemini-api-key";
```
3. Serve the files using your preferred method (local server, etc.)
4. Open index.html in your browser

## Files Structure

- **index.html**: Main application interface
- **main.js**: Core application logic
- **prompts.js**: Basic prompt templates (not used in the enhanced version)
- **enhanced-prompts.js**: Context-aware prompt functions 
- **context.js**: Manages application context and conversation storage

## Usage

### Setting Application Context

1. Click "Edit App Documentation" in the sidebar
2. Enter detailed information about your application's UI and functionality
3. This knowledge helps the AI create more accurate and relevant test materials

### Generating QA Materials

1. Enter a title and details for the feature you want to test
2. Use the "Generate Test Case", "Generate Questions", or "Generate Test Plan" buttons
3. The AI will use your application context to create tailored QA materials
4. Copy the generated content using the copy button in each AI response

### Managing Context

- **View Current Context**: See the current application documentation and conversation history
- **Clear Conversation History**: Remove past conversations while keeping app documentation
- **Reset To Default**: Restore the default app documentation and clear history

### Saved Test Cases

You can save commonly used test case templates for quick reuse:

1. Enter title and details for a reusable test case
2. Click "Save Test Case"
3. Click on any saved test case to generate QA materials from it

## Customization

### Modifying Prompts

Edit the prompts in `enhanced-prompts.js` to change how the AI generates content. Each prompt function can be customized to your specific QA needs and terminology.

### Adding New Capabilities

You can extend the system by:

1. Adding new prompt functions in `enhanced-prompts.js`
2. Creating corresponding handler functions in `main.js`
3. Adding UI elements to trigger your new capabilities

## How It Works

1. The application stores detailed UI knowledge in localStorage
2. When you request QA materials, the AI receives:
   - Your specific request
   - The application UI documentation
   - Recent conversation history for context
3. This context helps the AI create more relevant and application-specific content

## License

[Your License Here]

## Acknowledgements

- Google Gemini AI
- Markdown-it for rendering
- TailwindCSS for styling
