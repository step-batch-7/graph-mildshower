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

const isRemaining = function (toVisit, visited, vertex) {
  return !(toVisit.includes(vertex) || visited.has(vertex));
};

const bfs = function (pairs, source, target) {
  const graph = generateGraph(pairs);
  const toVisit = [source];
  const visited = new Set();

  while (toVisit.length !== 0) {
    const current_verex = toVisit.shift();
    const neighbors = graph[current_verex] || new Set();
    visited.add(current_verex);
    if (neighbors.has(target)) {
      return true;
    }
    const neighborsToVisit = Array.from(neighbors).filter(
      isRemaining.bind(null, toVisit, visited)
    );
    toVisit.push(...neighborsToVisit);
  }

  return false;
};

module.exports = { bfs, generateGraph };
