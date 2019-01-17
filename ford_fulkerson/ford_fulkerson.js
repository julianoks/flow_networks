import {dfs} from './dfs'

/**
 * Implementation of the Ford-Fulkerson algorithm
 * @param {Array[]} edges a list of edges, each of the form [vertexId, vertexId, capacity].
 * Note that vertexIds must be integers from 0-N.
 * @param {Number} source the vertexId of the source vertex.
 * @param {Number} sink the vertexId of the sink vertex.
 * @returns {Number[]} an array of numbers corresponding to the flow on the `edges`
 * 
 * @example
 * // returns {"maxFlow": 15, "network": [3, 5, 7, 3, 4, 0, 1, 6, 1, 7, 6, 2]}
 * const edges = [[0,1,4],[0,2,5],[0,3,7],[1,4,7],[2,4,6],[2,5,4],[2,6,1],[3,5,8],[3,6,1],[4,7,7],[5,7,6],[6,7,4]]
 * fordFulkerson(edges, 0, 7)
 */
export function fordFulkerson(edges, source, sink){
    let maxFlow = 0
    let graph = graphFromEdges(edges)
    while(true){
        const {minCapacity, verticesPath} = dfs(graph, source, sink)
        maxFlow += minCapacity
        if(verticesPath.length < 2) break
        for(let i=1; i<verticesPath.length; i++){
            let [v1, v2] = verticesPath.slice(i-1, i+1)
            if(graph[v1].hasOwnProperty(v2)){
                graph[v1][v2][1] += minCapacity
            } else { graph[v2][v1][1] -= minCapacity }
        }
    }
    const network = edges.map(([v1, v2, _]) => graph[v1][v2][1])
    return {maxFlow, network}
}

function graphFromEdges(edges){
    const N = 1 + Math.max(...edges.map(([v1, v2, _]) => Math.max(v1,v2)))
    let graph = Array(N).fill().map(() => new Object())
    edges.forEach(([v1, v2, cap]) => {
        graph[v1][v2] = [cap, 0]
    })
    return graph
}
