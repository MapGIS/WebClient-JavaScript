
import Queue from './Queue'

class Node {
  constructor(value) {
    this.firstIn = null
    this.firstOut = null
    this.inDegree = 0
    this.outDegree = 0
    this.value = value
  }
}

class Edge {
  constructor(tail, head, hlink, tlink, weight) {
    this.head = head
    this.tail = tail
    this.hlink = hlink
    this.tlink = tlink
    this.weight = weight
  }
}

export default class Graph {
  constructor() {
    this.nodes = []
  }

  getNodeByVertex(vertex) {
    for (let i = 0; i < this.nodes.length; i += 1) {
      if (this.nodes[i].equals) {
        if (this.nodes[i].value.equals(vertex)) return this.nodes[i]
      } else if (this.nodes[i].value === vertex) {
        return this.nodes[i]
      }
    }

    return null
  }

  addVertex(vertex) {
    let node = this.getNodeByVertex(vertex)
    if (!node) {
      node = new Node(vertex)
      this.nodes.push(node)
    }

    return node
  }

  addEdge(vertex1, vertex2, weight) {
    const node1 = this.getNodeByVertex(vertex1)
    const node2 = this.getNodeByVertex(vertex2)
    if (!node1 || !node2) return false
    if (node1 === node2) return false

    let cur = node1.firstOut
    while (cur && cur.head !== node2) {
      cur = cur.tlink
    }

    if (!cur) {
      const edge = new Edge(node1, node2, node2.firstIn, node1.firstOut, weight)
      node1.outDegree += 1
      node2.inDegree += 1
      node1.firstOut = edge
      node2.firstIn = edge
    }

    return false
  }

  removeEdge(vertex1, vertex2) {
    const node1 = this.getNodeByVertex(vertex1)
    const node2 = this.getNodeByVertex(vertex2)
    if (!node1 || !node2) return false

    let p = node1.firstOut
    let q = null
    while (p && p.head !== node2) {
      q = p
      p = p.tlink
    }
    if (!p) {
      return false
    }

    let t = node2.firstIn
    let s = null
    while (t !== p) {
      s = t
      t = t.hlink
    }

    if (!q) {
      node1.firstOut = p.tlink
    } else {
      q.tlink = p.tlink
    }

    if (!s) {
      node2.firstIn = t.hlink
    } else {
      s.hlink = t.hlink
    }

    node1.outDegree -= 1
    node2.inDegree -= 1

    return true
  }

  bfs() {
    const que = new Queue()
    const visited = new Set()
    if (this.nodes.length < 1) return

    que.push(this.nodes[0])
    while (!que.isEmpty()) {
      const node = que.front()

      que.pop()
      if (!visited.has(node)) {
        visited.add(node)
      }

      let edge = node.firstOut
      while (edge) {
        que.push(edge.head)
        edge = edge.tlink
      }
    }
  }
}
