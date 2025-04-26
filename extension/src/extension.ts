// extension.ts
import * as vscode from 'vscode';
import * as path from 'path';
import { spawn, ChildProcessWithoutNullStreams } from 'child_process';
import fetch from 'node-fetch';

let pythonServer: ChildProcessWithoutNullStreams | undefined;
let BASE_URL = 'http://3.108.122.121:5000'; // default for local dev

// Define the structure of JSON responses from your /chat endpoint
interface ChatResponse {
  assistant_message?: string;
}

export function activate(context: vscode.ExtensionContext) {
  // Load config from user/workspace settings
  const config = vscode.workspace.getConfiguration('tdlCopilot');
  const environment = config.get<string>('environment');
  const remoteUrl = config.get<string>('remoteUrl');

  if (environment === 'local') {
    // Spawn the Python server locally
    // NOTE: Adjust path if needed
    const serverPath = path.join(context.extensionPath, '..', 'server', 'main.py');
    pythonServer = spawn('python', [serverPath]);

    pythonServer.stdout.on('data', (data) => {
      console.log(`Python server: ${data}`);
    });
    pythonServer.stderr.on('data', (data) => {
      console.error(`Python server error: ${data}`);
    });
    // We'll use localhost in local mode
    BASE_URL = 'http://127.0.0.1:5000';
  } else {
    // Production mode: use remote EC2 server
    if (remoteUrl) {
      BASE_URL = remoteUrl;
    }
  }

  // Command: TDL Copilot: Chat
  const chatCommand = vscode.commands.registerCommand('tdlCopilot.chat', () => {
    openChatPanel(context);
  });

  // Command: TDL Copilot: Explain Selection
  const explainCommand = vscode.commands.registerCommand('tdlCopilot.explainSelection', async () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      return vscode.window.showInformationMessage('No active editor');
    }
    const selection = editor.document.getText(editor.selection);
    if (!selection.trim()) {
      return vscode.window.showInformationMessage('No text selected');
    }

    try {
      const response = await fetch(`${BASE_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_message: `Explain this code:\n${selection}`
        })
      });
      // Cast the JSON to our interface
      const data = (await response.json()) as ChatResponse;
      vscode.window.showInformationMessage(data.assistant_message || 'No response');
    } catch (err: any) {
      vscode.window.showErrorMessage(`Error: ${err.message}`);
    }
  });

  context.subscriptions.push(chatCommand, explainCommand);
}

// Cleanup on extension deactivation
export function deactivate() {
  if (pythonServer) {
    pythonServer.kill();
    pythonServer = undefined;
  }
}

// A basic chat UI in a webview
function openChatPanel(context: vscode.ExtensionContext) {
  const panel = vscode.window.createWebviewPanel(
    'tdlCopilotChat',
    'TDL Copilot Chat',
    vscode.ViewColumn.Beside,
    { enableScripts: true }
  );

  panel.webview.html = getChatHtml();

  // Handle messages from the webview
  panel.webview.onDidReceiveMessage(async (message) => {
    if (message.command === 'askAssistant') {
      const userMessage = message.text;
      try {
        const response = await fetch(`${BASE_URL}/chat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user_message: userMessage })
        });
        // Again, cast to our interface
        const data = (await response.json()) as ChatResponse;
        panel.webview.postMessage({
          command: 'assistantResponse',
          text: data.assistant_message
        });
      } catch (err: any) {
        panel.webview.postMessage({
          command: 'assistantResponse',
          text: `Error: ${err.message}`
        });
      }
    }
  });
}

// Basic HTML for the chat UI
function getChatHtml(): string {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      body { font-family: sans-serif; padding: 1em; }
      #messages {
        border: 1px solid #ccc;
        height: 300px;
        overflow-y: auto;
        margin-bottom: 1em;
        padding: 0.5em;
      }
      #userInput {
        width: 80%;
      }
      #sendBtn {
        width: 15%;
      }
      .message {
        margin: 0.3em 0;
      }
    </style>
  </head>
  <body>
    <div id="messages"></div>
    <input type="text" id="userInput" />
    <button id="sendBtn">Send</button>
    <script>
      const vscode = acquireVsCodeApi();
      const messagesDiv = document.getElementById('messages');
      const userInput = document.getElementById('userInput');
      const sendBtn = document.getElementById('sendBtn');

      function addMessage(content) {
        const p = document.createElement('p');
        p.textContent = content;
        p.classList.add('message');
        messagesDiv.appendChild(p);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
      }

      sendBtn.addEventListener('click', () => {
        const text = userInput.value.trim();
        if(!text) return;
        addMessage('You: ' + text);
        vscode.postMessage({ command: 'askAssistant', text });
        userInput.value = '';
      });

      window.addEventListener('message', event => {
        const message = event.data;
        if (message.command === 'assistantResponse') {
          addMessage('Assistant: ' + (message.text || 'No response'));
        }
      });
    </script>
  </body>
  </html>
  `;
}
