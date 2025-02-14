import * as vscode from "vscode";
import { ApiEndpointCodeLensProvider } from "./api-endpoint-provider";

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.languages.registerCodeLensProvider(
      [{ scheme: "file", language: "typescript" }],
      new ApiEndpointCodeLensProvider()
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      "extension.showEndpoint",
      async (method: string, path: string) => {
        await vscode.env.clipboard.writeText(`${method.toUpperCase()} ${path}`);
        vscode.window.showInformationMessage(`클립보드에 복사되었습니다.`);
      }
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      "extension.copyEndpoint",
      async (endpoint: string) => {
        await vscode.env.clipboard.writeText(endpoint);
        vscode.window.showInformationMessage(
          "엔드포인트가 클립보드에 복사되었습니다."
        );
      }
    )
  );
}

export function deactivate() {}
