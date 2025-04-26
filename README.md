Prerequisites
You have a .vsix file for TDL Copilot, e.g. tdl-copilot-0.0.1.vsix.

You have VS Code installed (locally or on the same VM).

1) Install the TDL Copilot extension
Open VS Code.

Go to the Extensions panel (usually the square icon on the left or press Ctrl+Shift+X).

Click the ... menu in the top-right corner of the Extensions panel and select "Install from VSIX...".

Browse to and select your tdl-copilot-0.0.1.vsix file.

Once installed, you should see “TDL Copilot” in your Extensions list.

2) Configure environment
If you want TDL Copilot to spawn the Python Flask server on localhost:5000, set your user/workspace setting:

json
Copy
// settings.json
{
  "tdlCopilot.environment": "local"
}
This will run python main.py from your server/ folder automatically (if the paths align).

If you want to use a remote server (EC2, for example), set:

json
Copy
{
  "tdlCopilot.environment": "production",
  "tdlCopilot.remoteUrl": "http://<EC2_OR_DOMAIN>:5000"
}
and make sure your Python Flask server is running on that remote machine.

3) Explain Selection Command
Open any code file in VS Code (for example, main.py, a small Python snippet, or any language).
Here’s a small snippet to test with:

python
Copy
def fibonacci(n):
    if n <= 1:
        return n
    else:
        return fibonacci(n-1) + fibonacci(n-2)
Highlight the lines you want to explain. For example, highlight the entire fibonacci function.

Open the Command Palette (Ctrl+Shift+P on Windows/Linux, Cmd+Shift+P on Mac).

Select "TDL Copilot: Explain Selection".

Wait a moment. The TDL Copilot calls Claude (via your Bedrock setup).

The explanation should appear in a VS Code popup (toast) near the top-right or bottom-right corner.

4) Chat Panel
Open the Command Palette again.

Select "TDL Copilot: Chat".

A new webview panel (titled “TDL Copilot Chat”) will open on the side.

Type a query in the text box at the bottom. For instance:

pgsql
Copy
How does the fibonacci function work?
Click Send (or press Enter if that’s enabled).

Wait a moment. The panel will display:

vbnet
Copy
You: How does the fibonacci function work?
Assistant: <Claude's answer via Bedrock>
You can keep chatting, asking follow-up questions or requesting code rewrites.

5) Example Incomplete Code / Chat Prompts
To demonstrate how the Copilot might handle incomplete code or “please fix my snippet” scenarios, try these prompts in the chat panel:

Prompt #1:

pgsql
Copy
Here's some incomplete code in Python:

def add_numbers(a, b)
  return a + b

It doesn't run. Please fix the syntax errors and explain what it does.
Prompt #2:

css
Copy
Summarize this code snippet in bullet points:

for i in range(5):
    print(i * i)
Prompt #3:

kotlin
Copy
Rewrite this JavaScript snippet to be more efficient:

function isPrime(num) {
    if(num < 2) return false;
    for(let i = 2; i < num; i++) {
        if(num % i === 0) return false;
    }
    return true;
}
6) Known Limitations / Additional Notes
Retrieval: The retrieve_topk in retrieval_module.py is currently a stub. If you want real retrieval from a FAISS or vector store, you must integrate it in the Python code.

Secrets: Make sure your secrets.json and bedrock credentials are configured properly in the server/ folder if using local mode, or on your remote server if in production mode.

Port: By default the Flask server runs on 0.0.0.0:5000 or 127.0.0.1:5000. Make sure you allow inbound traffic on port 5000 if using a remote host.
