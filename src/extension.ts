import * as vscode from "vscode";
import * as config from "./configuration";
import dict_fmt from "./dict_fmt";
import phrase_fmt from "./phrase_fmt";

export async function activate(context: vscode.ExtensionContext) {
  const log = vscode.window.createOutputChannel("Rime formatter");
  const dict_format = vscode.languages.registerDocumentRangeFormattingEditProvider("dict-yaml", {
    provideDocumentRangeFormattingEdits(document, range, _options, _token) {
      log.appendLine("dict-yaml formatter triggered.");
      const cfg = config.loadAllConfig(log);
      const text = document.getText(range);
      try {
        const formattedText = dict_fmt(text, cfg);
        return [vscode.TextEdit.replace(range, formattedText)];
      } catch (e) {
        log.appendLine(`Error: ${e}`);
        vscode.window.showErrorMessage(`failed to format the code: ${e}`);
      }
    },
  });
  context.subscriptions.push(dict_format);

  const phrase_format = vscode.languages.registerDocumentRangeFormattingEditProvider("custom-phrase", {
    provideDocumentRangeFormattingEdits(document, range, _options, _token) {
      log.appendLine("custom-phrase formatter triggered.");
      const text = document.getText(range);
      try {
        const formattedText = phrase_fmt(text);
        return [vscode.TextEdit.replace(range, formattedText)];
      } catch (e) {
        log.appendLine(`Error: ${e}`);
        vscode.window.showErrorMessage(`failed to format the code: ${e}`);
      }
    },
  });
  context.subscriptions.push(phrase_format);
}
