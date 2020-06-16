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

const isPathPresent = function (graph, visited, target, source) {
  const neighbors = graph[source] || new Set();
  if (neighbors.has(target)) {
    return true;
  }
  const neighborsToVisit = Array.from(neighbors).filter(
    (currentVerex) => !visited.has(currentVerex)
  );
  neighborsToVisit.forEach(visited.add.bind(visited));
  return neighborsToVisit.some(
    isPathPresent.bind(null, graph, visited, target)
  );
};

const dfs = function (pairs, source, target) {
  const graph = generateGraph(pairs);
  const visited = new Set();
  return isPathPresent(graph, visited, target, source);
};

const findPath = function (graph, visited, source, target) {
  const neighbors = graph[source] || new Set();
  const neighborsToVisit = Array.from(neighbors).filter(
    (currentVerex) => !visited.has(currentVerex)
  );
  paths = neighborsToVisit.reduce((paths, vertex) => {
    if (vertex === target) {
      paths.push([target]);
    } else {
      visited.add(vertex);
      paths.push(...findPath(graph, visited, vertex, target));
    }
    return paths;
  }, []);
  return paths.map((path) => [source].concat(path));
};

module.exports = { bfs, generateGraph, dfs, findPath };
