import * as vscode from 'vscode';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
    const decorator = vscode.window.createTextEditorDecorationType({
        before: {
            margin: '0 0 0 1em',
            color: '#569CD6'
        }
    });

    function updateDecorations(activeEditor: vscode.TextEditor | undefined) {
        if (!activeEditor) {return;}
        
        const filePath = activeEditor.document.fileName;
        // api 디렉토리 내부의 파일인지 확인
        if (!filePath.includes('/api/')) {return;}

        const text = activeEditor.document.getText();
        const decorations: vscode.DecorationOptions[] = [];

        // HTTP 메소드 함수 찾기
        const httpMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];
        const regex = new RegExp(`export\\s+async\\s+function\\s+(${httpMethods.join('|')})`, 'g');

        let match;
        while ((match = regex.exec(text))) {
            const startPos = activeEditor.document.positionAt(match.index);
            const line = startPos.line;

            // API 엔드포인트 경로 생성
            const apiPath = getApiPath(filePath);
            
            decorations.push({
                range: new vscode.Range(line, 0, line, 0),
                renderOptions: {
                    before: {
                        contentText: `// @endpoint: ${apiPath}`,
                    }
                }
            });
        }

        activeEditor.setDecorations(decorator, decorations);
    }

    function getApiPath(filePath: string): string {
        // /api/ 이후의 경로를 추출
        const match = RegExp(/\/api\/(.+)$/).exec(filePath);
        if (!match) {return '';}

        let apiPath = match[1];
        // route.ts 또는 page.ts 제거
        apiPath = apiPath.replace(/\/(route|page)\.(ts|js|tsx|jsx)$/, '');
        // 동적 라우트 처리 ([param] -> :param)
        apiPath = apiPath.replace(/\[([^\]]+)\]/g, ':$1');
        
        return '/' + apiPath;
    }

    // 활성 에디터가 변경될 때마다 데코레이션 업데이트
    vscode.window.onDidChangeActiveTextEditor(editor => {
        updateDecorations(editor);
    });

    // 문서 내용이 변경될 때마다 데코레이션 업데이트
    vscode.workspace.onDidChangeTextDocument(event => {
        const activeEditor = vscode.window.activeTextEditor;
        if (activeEditor && event.document === activeEditor.document) {
            updateDecorations(activeEditor);
        }
    });

    // 초기 실행
    updateDecorations(vscode.window.activeTextEditor);
}

export function deactivate() {}