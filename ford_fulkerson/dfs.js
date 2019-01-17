/**
 * Runs a DFS on the graph
 * @param {Object[]} graph an array whose indices represent the outgoing vertexId and objects represent outgoing edges.
 * Each group of outgoing edges is an object of the form {"incomingVertexId": [capacity, flow], ...}
 * @param {Number} source the vertexId of the source vertex.
 * @param {Number} sink the vertexId of the sink vertex.
 * @returns {Object} a dict {minCapacity, verticesPath}, where minCapacity is a number 
 * and verticesPath is an array of vertex IDs.
 * 
 * @example
 * // returns {"minCapacity":3,"verticesPath":[0,2,3]}
 * dfs([{1: [3,0], 2:[5,0]}, {3: [2,0]}, {3: [3,0]}, {}], 0, 3)
 */
export function dfs(graph, source, sink){
	let path = [[source, 0]]
	let seen = Array(graph.length).fill(false)
    seen[source] = true
    
	while(path.length > 0){
		const v1 = path[path.length - 1][0]
        if(v1 === sink) break

        let neighbors = Object.keys(graph[v1]).map(i => +i)
        while(true){
            if(neighbors.length == 0){ path.pop(); break; }
            const v2 = neighbors.pop()
            if(seen[v2]) continue
            const isForward = graph[v1].hasOwnProperty(v2)
            const [capacity, flow] = graph[v1][v2] || graph[v2][v1]
            if(isForward && flow<capacity){
                path.push([v2, capacity-flow])
            } else if(!isForward && flow>0){
                path.push([v2, flow])
            } else { continue }
            seen[v2] = true
            break
        }
    }
    
    const minCapacity = path.length<2? 0 : Math.min(...path.slice(1).map(v => v[1]))
	const verticesPath = path.map(v => v[0])
	return {minCapacity, verticesPath}
}
