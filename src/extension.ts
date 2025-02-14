import * as vscode from "vscode";
import { ApiEndpointCodeLensProvider } from "./api-endpoint-provider";
import { getMessage } from "./i18n/i18n";

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
        vscode.window.showInformationMessage(getMessage("extension.showEndpoint"));
      }
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      "extension.copyEndpoint",
      async (endpoint: string) => {
        await vscode.env.clipboard.writeText(endpoint);
        vscode.window.showInformationMessage(getMessage("extension.copyEndpoint"));
      }
    )
  );
}

export function deactivate() {}
