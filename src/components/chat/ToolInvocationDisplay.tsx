"use client";

import { Loader2, FilePlus, FilePen, Eye, RotateCcw, Trash2, FolderInput } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface ToolInvocationDisplayProps {
  toolName: string;
  args: Record<string, any>;
  state: string;
  result?: any;
}

export function getToolInfo(toolName: string, args: Record<string, any>): { label: string; Icon: LucideIcon } {
  if (toolName === "str_replace_editor") {
    const { command, path } = args;
    switch (command) {
      case "create":
        return { label: `Creating ${path ?? "file"}`, Icon: FilePlus };
      case "str_replace":
      case "insert":
        return { label: `Editing ${path ?? "file"}`, Icon: FilePen };
      case "view":
        return { label: `Reading ${path ?? "file"}`, Icon: Eye };
      case "undo_edit":
        return { label: `Undoing edit in ${path ?? "file"}`, Icon: RotateCcw };
      default:
        return { label: `Editing ${path ?? "file"}`, Icon: FilePen };
    }
  }

  if (toolName === "file_manager") {
    const { command, path, new_path } = args;
    switch (command) {
      case "rename":
        return { label: `Moving ${path ?? "file"} → ${new_path ?? "file"}`, Icon: FolderInput };
      case "delete":
        return { label: `Deleting ${path ?? "file"}`, Icon: Trash2 };
      default:
        return { label: `Managing ${path ?? "file"}`, Icon: FolderInput };
    }
  }

  return { label: toolName, Icon: FilePen };
}

export function ToolInvocationDisplay({ toolName, args, state, result }: ToolInvocationDisplayProps) {
  const done = state === "result" && result !== undefined;
  const { label, Icon } = getToolInfo(toolName, args);

  return (
    <div data-testid="tool-invocation-display" className="inline-flex items-center gap-2 mt-2 px-3 py-1.5 bg-neutral-50 rounded-lg text-xs font-mono border border-neutral-200">
      {done ? (
        <div className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
      ) : (
        <Loader2 className="w-3 h-3 animate-spin text-blue-600 flex-shrink-0" />
      )}
      <Icon className="w-3 h-3 text-neutral-500 flex-shrink-0" />
      <span className="text-neutral-700">{label}</span>
    </div>
  );
}
