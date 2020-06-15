const assert = require("assert");
const { generateGraph, bfs, dfs, findPath } = require("../src/graph");

describe("#generateGraph", () => {
  it("should give empty object if empty list is given", () => {
    const graph = generateGraph([]);
    assert.deepStrictEqual(graph, {});
  });

  it("should generate graph node lists if valid list is given", () => {
    const graph = generateGraph([
      ["A", "B"],
      ["B", "C"],
      ["B", "A"],
      ["C", "B"],
    ]);
    assert.deepStrictEqual(graph, {
      A: new Set(["B"]),
      B: new Set(["A", "C"]),
      C: new Set(["B"]),
    });
  });
});

describe("#bfs", () => {
  const pairs = [
    ["A", "B"],
    ["B", "C"],
    ["B", "A"],
    ["C", "B"],
    ["D", "B"],
    ["D", "E"],
  ];

  it("shouldn't find path if there is no path from source to destination", () => {
    assert.ok(!bfs(pairs, "C", "D"));
  });

  it("should find path if there is path from source to destination", () => {
    assert.ok(bfs(pairs, "D", "A"));
  });

  it("shouldn't find path when there is no path that comes back to the same source", () => {
    assert.ok(!bfs(pairs, "D", "D"));
  });

  it("should find path when there is path that comes back to the same source", () => {
    assert.ok(bfs(pairs, "C", "C"));
  });

  it("shouldn't find path when source vertex doesn't have any edge going outside", () => {
    assert.ok(!bfs(pairs, "E", "A"));
  });
});

describe("#dfs", () => {
  const pairs = [
    ["A", "B"],
    ["B", "C"],
    ["B", "A"],
    ["C", "B"],
    ["D", "B"],
    ["D", "E"],
  ];

  it("shouldn't find path if there is no path from source to destination", () => {
    assert.ok(!dfs(pairs, "C", "D"));
  });

  it("should find path if there is path from source to destination", () => {
    assert.ok(dfs(pairs, "D", "A"));
  });

  it("shouldn't find path when there is no path that comes back to the same source", () => {
    assert.ok(!dfs(pairs, "D", "D"));
  });

  it("should find path when there is path that comes back to the same source", () => {
    assert.ok(dfs(pairs, "C", "C"));
  });

  it("shouldn't find path when source vertex doesn't have any edge going outside", () => {
    assert.ok(!dfs(pairs, "E", "A"));
  });
});

describe("#dfs", () => {
  const graph = generateGraph([
    ["A", "B"],
    ["B", "C"],
    ["B", "A"],
    ["B", "F"],
    ["C", "B"],
    ["D", "B"],
    ["D", "E"],
    ["D", "F"],
  ]);

  it("shouldn't find path if there is no path from source to destination", () => {
    assert.deepStrictEqual(findPath(graph, new Set(), "C", "D"), []);
  });

  it("should find path if there is path from source to destination", () => {
    assert.deepStrictEqual(findPath(graph, new Set(), "D", "A"), [
      ["D", "B", "A"],
    ]);
  });

  it("shouldn't find path when there is no path that comes back to the same source", () => {
    assert.deepStrictEqual(findPath(graph, new Set(), "D", "D"), []);
  });

  it("should find path when there is path that comes back to the same source", () => {
    assert.deepStrictEqual(findPath(graph, new Set(), "C", "C"), [
      ["C", "B", "C"],
    ]);
  });

  it("shouldn't find path when source vertex doesn't have any edge going outside", () => {
    assert.deepStrictEqual(findPath(graph, new Set(), "E", "A"), []);
  });
  it("should find all paths when multiple paths are present", () => {
    assert.deepStrictEqual(findPath(graph, new Set(), "D", "F"), [
      ["D", "B", "F"],
      ["D", "F"],
    ]);
  });
});
