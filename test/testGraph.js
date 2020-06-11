const assert = require("assert");
const { generateGraph, bfs } = require("../src/graph");

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
