var width = 900,
    height = 500;

var tx = 10000;

var colors =
  { blue: "#3399cc",
    orange: "#ff9900",
    red: "#cc0033",
    purple: "#663399",
    gray: "#8f8f8f"
  };

var length = 20;

var nodes = [
  { id: 0,
    x:  100,
    y:  100,
    size: 20,
    in_time: 0,
    out_time: 20,
    color: colors.purple },
  { id: 1,
    x:  20,
    y:  20,
    size: 5,
    in_time: 5,
    out_time: 20,
    source: 0,
    color: colors.orange },
  { id: 2,
    x:  50,
    y:  30,
    size: 5,
    in_time: 10,
    out_time: 15,
    source: 1,
    color: colors.red },
  { id: 3,
    x:  40,
    y:  70,
    size: 5,
    in_time: 10,
    out_time: 20,
    source: 1,
    color: colors.blue }
]

var edges = [
  {
    source: 1,
    target: 2,
    value: 1
  },
  {
    source: 2,
    target: 3,
    value: 2
  },
  {
    source: 0,
    target: 1,
    value: 4
  },
  {
    source: 0,
    target: 3,
    value: 2
  }
]

// fixup nodes
nodes.forEach(function(node){
  node.strokeColor = d3.interpolateRgb(node.color, "#000")(0.1);
});

var indexed_nodes = _.inject(nodes, function(idxed, node){
  idxed[node.id] = node;
  return idxed;
}, {});

var svg = d3.select("#chart").append("svg")
    .attr("width", width)
    .attr("height", height);

var node_source = function(node) {
  var src = node.source;
  if (!src) return nodes[0];
  
  var source = indexed_nodes[node.source];
  if (!source) return nodes[0];
  
  return source;
}

var update = function(t) {
  
  var current_nodes = _.filter(nodes, function(node){
    return (node.in_time <= t) && (node.out_time >= t);
  });
  
  var current_node_ids = _.pluck(current_nodes, "id");
  
  var current_edges = _.filter(edges, function(edge){
    return (current_node_ids.indexOf(edge.source) != -1) && (current_node_ids.indexOf(edge.target) != -1);
  }, true);
  
  var frac = t / length;
  
  var link = svg.selectAll("line.link")
                .data(current_edges, function(d){return "" + d.source + "-" + d.target});
    
  var link_enter = link.enter().append("line")
                        .attr("class", "link")
                        .style("stroke", colors.gray)
                                  .attr("x1", function(d) { return node_source(indexed_nodes[d.source]).x; })
                                  .attr("y1", function(d) { return node_source(indexed_nodes[d.source]).y; })
                                  .attr("x2", function(d) { return node_source(indexed_nodes[d.target]).x; })
                                  .attr("y2", function(d) { return node_source(indexed_nodes[d.target]).y; });
  
  var link_exit = link.exit().remove();
  
  var node = svg.selectAll("circle.node")
                .data(current_nodes, function(d){ return d.id; });
  
  var node_enter = node.enter().append("circle")
                .attr("class", "node")
                .attr("r", function(d) { return d.size; })
                .style("fill", function(d) { return d.color; })
                .style("stroke", function(d) { return d.strokeColor; })
                .attr("cx", function(d){ return node_source(d).x; })
                .attr("cy", function(d){ return node_source(d).y; });
  
  var node_exit = node.exit().transition(tx)              
                      .attr("cx", function(d){ return node_source(d).x; })
                      .attr("cy", function(d){ return node_source(d).y; })
                      .remove();
  
  nodes[0].y = frac * height;
  
  link_enter.transition(tx)
            .attr("x1", function(d) { return node_source(indexed_nodes[d.source]).x; })
            .attr("y1", function(d) { return node_source(indexed_nodes[d.source]).y; })
            .attr("x2", function(d) { return node_source(indexed_nodes[d.target]).x; })
            .attr("y2", function(d) { return node_source(indexed_nodes[d.target]).y; })
  
  link.transition(tx)
    .attr("x1", function(d) { return indexed_nodes[d.source].x; })
    .attr("y1", function(d) { return indexed_nodes[d.source].y; })
    .attr("x2", function(d) { return indexed_nodes[d.target].x; })
    .attr("y2", function(d) { return indexed_nodes[d.target].y; });

  [node, node_enter].forEach(function(g){
    g.transition(tx)
     .attr("cx", function(d) { return d.x; })
     .attr("cy", function(d) { return d.y; });
  });
}
