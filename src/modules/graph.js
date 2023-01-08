const Graph = (() => {
  const chessBoard = new Map();

  const addVertices = (size = 8) => {
    for (let i = 1; i <= size; i += 1) {
      for (let j = 1; j <= size; j += 1) {
        chessBoard.set(`${[i, j]}`, []);
      }
    }
  };

  const addEdges = (board = chessBoard) => {
    for (const [vertex] of board) {
      const vertexArr = vertex.split(',');
      const x = parseInt(vertexArr[0]);
      const y = parseInt(vertexArr[1]);

      const clockOfDirection = {
        1: [x + 1, y + 2],
        2: [x + 2, y + 1],
        4: [x + 2, y - 1],
        5: [x + 1, y - 2],
        7: [x - 1, y - 2],
        8: [x - 2, y - 1],
        10: [x - 2, y + 1],
        11: [x - 1, y + 2],
      };

      for (const pos in clockOfDirection) {
        const move = clockOfDirection[pos].toString();
        if (board.has(move) && !board.get(vertex).includes(move)) {
          chessBoard.get(vertex).push(move);
        }
      }
    }
  };

  const knightsTravails = (start, end) => {
    const paths = [];
    const visited = new Set();
    const queue = [];
    queue.push([start, [start]]);

    while (queue.length > 0) {
      const [current, path] = queue.shift();
      visited.add(current);
      if (current === end) {
        paths.push(path);
      }
      const neighbors = chessBoard.get(current);
      for (const pos of neighbors) {
        if (!visited.has(pos)) {
          queue.push([pos, [...path, pos]]);
        }
      }
    }

    const moves = paths[0].map((element) => element);
    return moves;
  };

  return { addVertices, addEdges, knightsTravails };
})();

Graph.addVertices();
Graph.addEdges();

export default Graph;
