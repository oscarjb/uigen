import { test, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import { ToolInvocationDisplay, getToolInfo } from "../ToolInvocationDisplay";

// str_replace_editor — create
test("shows 'Creating' label for str_replace_editor create command", () => {
  render(
    <ToolInvocationDisplay
      toolName="str_replace_editor"
      args={{ command: "create", path: "/App.jsx" }}
      state="result"
      result="OK"
    />
  );
  expect(screen.getByText("Creating /App.jsx")).toBeDefined();
});

// str_replace_editor — str_replace
test("shows 'Editing' label for str_replace_editor str_replace command", () => {
  render(
    <ToolInvocationDisplay
      toolName="str_replace_editor"
      args={{ command: "str_replace", path: "/components/Card.jsx" }}
      state="result"
      result="OK"
    />
  );
  expect(screen.getByText("Editing /components/Card.jsx")).toBeDefined();
});

// str_replace_editor — insert
test("shows 'Editing' label for str_replace_editor insert command", () => {
  render(
    <ToolInvocationDisplay
      toolName="str_replace_editor"
      args={{ command: "insert", path: "/App.jsx" }}
      state="result"
      result="OK"
    />
  );
  expect(screen.getByText("Editing /App.jsx")).toBeDefined();
});

// str_replace_editor — view
test("shows 'Reading' label for str_replace_editor view command", () => {
  render(
    <ToolInvocationDisplay
      toolName="str_replace_editor"
      args={{ command: "view", path: "/App.jsx" }}
      state="result"
      result="OK"
    />
  );
  expect(screen.getByText("Reading /App.jsx")).toBeDefined();
});

// str_replace_editor — undo_edit
test("shows 'Undoing edit' label for str_replace_editor undo_edit command", () => {
  render(
    <ToolInvocationDisplay
      toolName="str_replace_editor"
      args={{ command: "undo_edit", path: "/App.jsx" }}
      state="result"
      result="OK"
    />
  );
  expect(screen.getByText("Undoing edit in /App.jsx")).toBeDefined();
});

// file_manager — rename
test("shows 'Moving' label for file_manager rename command", () => {
  render(
    <ToolInvocationDisplay
      toolName="file_manager"
      args={{ command: "rename", path: "/old.jsx", new_path: "/new.jsx" }}
      state="result"
      result="OK"
    />
  );
  expect(screen.getByText("Moving /old.jsx → /new.jsx")).toBeDefined();
});

// file_manager — delete
test("shows 'Deleting' label for file_manager delete command", () => {
  render(
    <ToolInvocationDisplay
      toolName="file_manager"
      args={{ command: "delete", path: "/unused.jsx" }}
      state="result"
      result="OK"
    />
  );
  expect(screen.getByText("Deleting /unused.jsx")).toBeDefined();
});

// Unknown tool
test("falls back to tool name for unknown tools", () => {
  render(
    <ToolInvocationDisplay
      toolName="some_unknown_tool"
      args={{}}
      state="result"
      result="OK"
    />
  );
  expect(screen.getByText("some_unknown_tool")).toBeDefined();
});

// Pending state — no green dot
test("shows spinner when state is not result", () => {
  const { container } = render(
    <ToolInvocationDisplay
      toolName="str_replace_editor"
      args={{ command: "create", path: "/App.jsx" }}
      state="call"
    />
  );
  expect(container.querySelector(".animate-spin")).toBeDefined();
  expect(container.querySelector(".bg-emerald-500")).toBeNull();
});

// Done state — green dot, no spinner
test("shows green dot when state is result", () => {
  const { container } = render(
    <ToolInvocationDisplay
      toolName="str_replace_editor"
      args={{ command: "create", path: "/App.jsx" }}
      state="result"
      result="OK"
    />
  );
  expect(container.querySelector(".bg-emerald-500")).toBeDefined();
  expect(container.querySelector(".animate-spin")).toBeNull();
});

// data-testid
test("root element has data-testid", () => {
  const { container } = render(
    <ToolInvocationDisplay toolName="str_replace_editor" args={{ command: "create", path: "/App.jsx" }} state="call" />
  );
  expect(container.querySelector('[data-testid="tool-invocation-display"]')).toBeDefined();
});

// getToolInfo unit tests
describe("getToolInfo", () => {
  test("str_replace_editor create", () => {
    expect(getToolInfo("str_replace_editor", { command: "create", path: "/App.jsx" }).label).toBe("Creating /App.jsx");
  });

  test("str_replace_editor str_replace", () => {
    expect(getToolInfo("str_replace_editor", { command: "str_replace", path: "/App.jsx" }).label).toBe("Editing /App.jsx");
  });

  test("str_replace_editor insert", () => {
    expect(getToolInfo("str_replace_editor", { command: "insert", path: "/App.jsx" }).label).toBe("Editing /App.jsx");
  });

  test("str_replace_editor view", () => {
    expect(getToolInfo("str_replace_editor", { command: "view", path: "/App.jsx" }).label).toBe("Reading /App.jsx");
  });

  test("str_replace_editor undo_edit", () => {
    expect(getToolInfo("str_replace_editor", { command: "undo_edit", path: "/App.jsx" }).label).toBe("Undoing edit in /App.jsx");
  });

  test("file_manager rename", () => {
    expect(getToolInfo("file_manager", { command: "rename", path: "/old.jsx", new_path: "/new.jsx" }).label).toBe("Moving /old.jsx → /new.jsx");
  });

  test("file_manager delete", () => {
    expect(getToolInfo("file_manager", { command: "delete", path: "/unused.jsx" }).label).toBe("Deleting /unused.jsx");
  });

  test("unknown tool returns tool name", () => {
    expect(getToolInfo("some_unknown_tool", {}).label).toBe("some_unknown_tool");
  });

  test("missing path falls back to 'file' for create", () => {
    expect(getToolInfo("str_replace_editor", { command: "create" }).label).toBe("Creating file");
  });

  test("missing path falls back to 'file' for str_replace", () => {
    expect(getToolInfo("str_replace_editor", { command: "str_replace" }).label).toBe("Editing file");
  });

  test("missing path falls back to 'file' for view", () => {
    expect(getToolInfo("str_replace_editor", { command: "view" }).label).toBe("Reading file");
  });

  test("missing path falls back to 'file' for undo_edit", () => {
    expect(getToolInfo("str_replace_editor", { command: "undo_edit" }).label).toBe("Undoing edit in file");
  });

  test("missing path falls back to 'file' for delete", () => {
    expect(getToolInfo("file_manager", { command: "delete" }).label).toBe("Deleting file");
  });
});
