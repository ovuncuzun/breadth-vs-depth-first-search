class Queue {
    elements;
    constructor() {
        this.elements = [];
    }

    enqueue(e) {
        this.elements.push(e);
    };

    dequeue() {
        return this.elements.shift();
    };

    isEmpty() {
        return this.elements.length == 0;
    };

    peek() {
        return !this.isEmpty() ? this.elements[0] : null;
    };

    length() {
        return this.elements.length;
    }
}

class Stack {
    elements;
    constructor() {
        this.elements = [];
    }

    push(element) {
        this.elements.push(element);
    }

    pop() {
        if (this.isEmpty() === false) {
            return this.elements.pop();
        }
    }

    isEmpty() {
        return this.length() == 0;
    }

    peek() {
        return this.elements[this.elements.length - 1];
    }

    length() {
        return this.elements.length;
    }
}

class Graph {
    adjList = new Map();

    constructor() {
    }

    addVertex(v) {
        this.adjList.set(v, []);
    }

    addEdge(v, w) {
        this.adjList.get(v).push(w);
    }

    bfsIterative(startingNode) {
        let visited = {};
        let q = new Queue();
        visited[startingNode] = true;
        q.enqueue(startingNode);

        while (!q.isEmpty()) {
            let currentVertex = q.dequeue();
            console.log(currentVertex);

            let vertices = this.adjList.get(currentVertex);
            for (let i in vertices) {
                let neighbour = vertices[i];
                if (!visited[neighbour]) {
                    visited[neighbour] = true;
                    q.enqueue(neighbour);
                }
            }
        }
    }

    dfsIterative(startingNode) {
        let visited = {};
        let stack = new Stack();
        visited[startingNode] = true;
        stack.push(startingNode);
        let currentVertex;

        while (!stack.isEmpty()) {
            currentVertex = stack.pop();
            console.log(currentVertex);
            this.adjList.get(currentVertex).forEach(neighbor => {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    stack.push(neighbor);
                }
            });
        }
    }

    dfsRecursive(startingNode) {
        let visited = {};
        this.dfsUtil(startingNode, visited);
    }

    dfsUtil(vert, visited) {
        visited[vert] = true;
        console.log(vert);
        let get_neighbours = this.adjList.get(vert);
        for (let i in get_neighbours) {
            let get_elem = get_neighbours[i];
            if (!visited[get_elem])
                this.dfsUtil(get_elem, visited);
        }
    }
}

let g = new Graph();
let vertices = ['1', '3', '4', '5', '6'];

for (let i = 0; i < vertices.length; i++) {
    g.addVertex(vertices[i]);
}

g.addEdge('1', '3');
g.addEdge('1', '4');
g.addEdge('3', '5');
g.addEdge('4', '6');


console.log("BFS Iterative");
g.bfsIterative('1'); // 1 3 4 5 6

console.log("DFS Iterative");
g.dfsIterative('1'); // 1 4 6 3 5

console.log("DFS Recursive");
g.dfsRecursive('1'); // 1 3 4 4 6

