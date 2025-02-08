import fs from "fs";
import * as parser from '@babel/parser';
import traverse from "@babel/traverse";

const httpMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];

class ParsedStore {
  private exportedFunctions: Map<string, number> = new Map();

  public addExportedFunction(name: string, line: number) {
    if (this.exportedFunctions.has(name) || !httpMethods.includes(name)) {
      return;
    }
    this.exportedFunctions.set(name, line);
  }

  public getExportedFunctions() {
    return Array.from(this.exportedFunctions.entries()).map(([name, line]) => ({ name, line }));
  }
}

export function parseExportedFunctions(filePath: string) {
  const parsedStore = new ParsedStore();
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const ast = parser.parse(fileContent, {
    sourceType: "module",
    plugins: ["typescript"],
  });

  traverse(ast, {
    ExportNamedDeclaration(path) {
      if (
        path.node.declaration &&
        path.node.declaration.type === "FunctionDeclaration"
      ) {
        parsedStore.addExportedFunction(path.node.declaration.id?.name ?? "", path.node.declaration.loc?.start?.line ?? 0);
      }

      if (path.container) {
        (Array.isArray(path.container)
          ? path.container
          : [path.container]
        ).forEach((element) => {
          if ((element as any).specifiers) {
            (element as any).specifiers.forEach((specifier: any) => {
              if (specifier.type === "ExportSpecifier") {
                parsedStore.addExportedFunction(specifier.exported.name, specifier.loc?.start?.line ?? 0);
              }
            });
          }
        });
      }
    },
  });

  return parsedStore.getExportedFunctions();
}
