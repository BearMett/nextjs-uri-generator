import * as vscode from "vscode";

interface ExtensionOptions {
  hostUrl: string;
}

const defaultOptions: ExtensionOptions = {
  hostUrl: "http://localhost:3000",
};

export function getExtensionOptions(): ExtensionOptions {
  const config = vscode.workspace.getConfiguration("nextjs-uri-generator");
  return {
    hostUrl: config.get<string>("hostUrl") ?? defaultOptions.hostUrl,
  };
}
