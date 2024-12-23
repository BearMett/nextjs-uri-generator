import * as vscode from "vscode";
import { getExtensionOptions } from "./options";

export class ApiEndpointCodeLensProvider implements vscode.CodeLensProvider {
  private regex: RegExp;
  private _onDidChangeCodeLenses: vscode.EventEmitter<void> =
    new vscode.EventEmitter<void>();
  public readonly onDidChangeCodeLenses: vscode.Event<void> =
    this._onDidChangeCodeLenses.event;

  constructor() {
    this.regex =
      /export\s+(?:async\s+)?function\s+(GET|POST|PUT|DELETE|PATCH)\b/g;

    vscode.workspace.onDidChangeConfiguration((_) => {
      this._onDidChangeCodeLenses.fire();
    });
  }

  public provideCodeLenses(
    document: vscode.TextDocument,
    token: vscode.CancellationToken
  ): vscode.ProviderResult<vscode.CodeLens[]> {
    const codeLenses: vscode.CodeLens[] = [];

    console.log("Full file path:", document.uri.path);

    for (let lineIndex = 0; lineIndex < document.lineCount; lineIndex++) {
      const line = document.lineAt(lineIndex);
      let matches;

      while ((matches = this.regex.exec(line.text)) !== null) {
        const method = matches[1];

        const fullPath = document.uri.path;
        const appPath = fullPath.includes("/app/")
          ? fullPath.split("/app/")[1]
          : null;
        const pagesPath = fullPath.includes("/pages/")
          ? fullPath.split("/pages/")[1]
          : null;
        const path = appPath || pagesPath || "";

        const { hostUrl } = getExtensionOptions();
        const apiEndpoint = `${hostUrl}/${path.replace(
          "/route.ts",
          ""
        ).replace('//', '/')}`;

        const range = new vscode.Range(
          lineIndex,
          matches.index,
          lineIndex,
          matches.index + matches[0].length
        );

        codeLenses.push(
          new vscode.CodeLens(range, {
            title: `${method.toUpperCase()} ${path}`,
            command: "extension.showEndpoint",
            arguments: [method, path],
          })
        );

        codeLenses.push(
          new vscode.CodeLens(range, {
            title: "복사",
            command: "extension.copyEndpoint",
            arguments: [apiEndpoint],
          })
        );
      }
    }

    return codeLenses;
  }
}

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
      (method: string, path: string) => {
        vscode.window.showInformationMessage(`${method.toUpperCase()} ${path}`);
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
