import * as vscode from "vscode";

const configurationKey = "rime-formatter";

export type ConfigType = {
  sort_by: "spell" | "weight" | null;
};

export const getAllConfig: () => vscode.WorkspaceConfiguration = () => {
  return vscode.workspace.getConfiguration(configurationKey);
};

export const loadAllConfig = (log: vscode.OutputChannel) => {
  let cfg = getAllConfig() as unknown as ConfigType;
  log.appendLine("rime formatter configuration:");
  log.appendLine(`\t${JSON.stringify(cfg)}`);
  return cfg;
};
