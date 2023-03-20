const vscode = require("vscode");

function activate(context) {
  let disposable = vscode.commands.registerCommand(
    "extension.openChatGPT",
    function () {
      const panel = vscode.window.createWebviewPanel(
        "ChatGPT",
        "ChatGPT",
        vscode.ViewColumn.One,
        {
          enableScripts: true,
        }
      );

      panel.webview.html = `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>ChatGPT</title>
        </head>
        <body>
          <iframe src="https://chat.openai.com/" width="100%" height="100%"></iframe>
        </body>
      </html>`;

      panel.webview.onDidReceiveMessage(function (message) {
        if (message.command === "logout") {
          panel.dispose();
        }
      });
    }
  );

  context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
