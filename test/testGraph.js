const assert = require("assert");
const { generateGraph } = require("../src/graph");

describe("#generateGraph", () => {
  it("it should give empty object if empty list is given", () => {
    const graph = generateGraph([]);
    assert.deepStrictEqual(graph, {});
  });

  it("it should generate graph node lists if valid list is given", () => {
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
