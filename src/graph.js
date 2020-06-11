//Example
// Pairs => [[from,to],[to,from]]
// Source => from
// To => to
// Should return true.

const generateGraph = function (pairs) {
  const nodes = {};
  pairs.forEach(([from, to]) => {
    !nodes[from] && (nodes[from] = new Set());
    nodes[from].add(to);
  });
  return nodes;
};

const bfs = function (pairs, source, target) {};

module.exports = { bfs, generateGraph };
