import * as vscode from 'vscode';
import * as en from './en.json';
import * as ko from './ko.json';

const messages: { [key: string]: { [key: string]: string } } = { en, ko };

export function getMessage(key: string): string {
  const config = vscode.workspace.getConfiguration('nextUrlGen');
  const language = config.get<string>('language', 'en');
  return messages[language][key] || key;
}