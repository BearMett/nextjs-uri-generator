import * as vscode from "vscode";
import { getExtensionOptions } from "./options";
import { parseExportedFunctions } from "./export-parser/export-parser";

const httpMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];
const regexCases = [new RegExp(`export\\s+(?:async\\s+)?function\\s+(${httpMethods.join('|')})\\b`, 'g')];

export class ApiEndpointCodeLensProvider implements vscode.CodeLensProvider {
    private regex: RegExp;
    private _onDidChangeCodeLenses: vscode.EventEmitter<void> =
      new vscode.EventEmitter<void>();
    public readonly onDidChangeCodeLenses: vscode.Event<void> =
      this._onDidChangeCodeLenses.event;
  
    constructor() {
      this.regex = regexCases[0];
  
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
      const exportedFunctions = parseExportedFunctions(document.uri.fsPath);
  
      for (const exportedFunction of exportedFunctions) {
        const { name: method, line: lineIndex } = exportedFunction;
  
        const fullPath = document.uri.path;
        const appPath = fullPath.includes("/app/")
          ? fullPath.split("/app/")[1]
          : null;
        const pagesPath = fullPath.includes("/pages/")
          ? fullPath.split("/pages/")[1]
          : null;
        const path = appPath ?? pagesPath ?? "";
  
        const { hostUrl } = getExtensionOptions();
        const apiEndpoint = `${hostUrl}/${path.replace(
          "/route.ts",
          ""
        ).replace('//', '/')}`;
  
        const range = document.lineAt(lineIndex - 1).range;
  
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
  
      return codeLenses;
    }
  }