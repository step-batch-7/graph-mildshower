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

  let a = 10;
  while (toVisit.length !== 0 && a > 0) {
    const current_verex = toVisit.shift();
    visited.add(current_verex);
    if (graph[current_verex].has(target)) {
      return true;
    }
    const neighborsToVisit = Array.from(graph[current_verex]).filter(
      isRemaining.bind(null, toVisit, visited)
    );
    toVisit.push(...neighborsToVisit);
    a--;
  }

  return false;
};

module.exports = { bfs, generateGraph };
