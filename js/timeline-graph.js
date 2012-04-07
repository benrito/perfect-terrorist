var width = 900,
    height = 500;

var tx = 750;

var debug = false;

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
    x:  450,
    y:  0,
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


var indexed_nodes = {};
var setup_nodes = function() {
  // fixup nodes
  nodes.forEach(function(node){
    node.strokeColor = d3.interpolateRgb(node.color, "#000")(0.1);
  });
  
  indexed_nodes = _.inject(nodes, function(idxed, node){
    idxed[node.id] = node;
    return idxed;
  }, {});
}
setup_nodes();

var svg = d3.select("#chart").append("svg")
    .attr("width", width)
    .attr("height", height);

var bg = svg.append("rect").attr("width", width).attr("height", height).style("opacity", 0);
if (debug) {
  bg.each(function(d){ $(this).click(function(e){
    var id = prompt("Node ID", new Date().getTime());
    if (!id) return;

    var node = {
      id: id,
      x: e.offsetX,
      y: e.offsetY,
      in_time: currentTime,
      out_time: Infinity,
      source: 0,
      size: 5,
      color: colors.red
    }

    nodes.push(node);
    setup_nodes();
    update(currentTime);
  })});
}

var node_source = function(node) {
  var src = node.source;
  if (!src) return nodes[0];
  
  var source = indexed_nodes[node.source];
  if (!source) return nodes[0];
  
  return source;
}

var currentTime = 0;
var update = function(t) {
  currentTime = t;
  
  var current_nodes = _.filter(nodes, function(node){
    return (node.in_time <= t) && (node.out_time > t);
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
                                  .attr("x1", function(d) { return node_source(indexed_nodes[d.target]).x; })
                                  .attr("y1", function(d) { return node_source(indexed_nodes[d.target]).y; })
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
  
  if (debug) {
    node_enter.each(function(d){ $(this).click(function(e){
      d.out_time = currentTime;
      update(currentTime);
    })});
  }
  
  var node_exit = node.exit().transition().duration(tx)              
                      .attr("cx", function(d){ return node_source(d).x; })
                      .attr("cy", function(d){ return node_source(d).y; })
                      .remove();
  
  nodes[0].y = frac * height;
  
  link_enter.transition().duration(tx)
            .attr("x1", function(d) { return node_source(indexed_nodes[d.source]).x; })
            .attr("y1", function(d) { return node_source(indexed_nodes[d.source]).y; })
            .attr("x2", function(d) { return node_source(indexed_nodes[d.target]).x; })
            .attr("y2", function(d) { return node_source(indexed_nodes[d.target]).y; })
  
  link.transition().duration(tx)
    .attr("x1", function(d) { return indexed_nodes[d.source].x; })
    .attr("y1", function(d) { return indexed_nodes[d.source].y; })
    .attr("x2", function(d) { return indexed_nodes[d.target].x; })
    .attr("y2", function(d) { return indexed_nodes[d.target].y; });

  [node, node_enter].forEach(function(g){
    g.transition().duration(tx)
     .attr("cx", function(d) { return d.x; })
     .attr("cy", function(d) { return d.y; });
  });
}

var setup_timeline = function() {
  if (debug) {
    var export_box = $("<textarea>").attr("id", "export");
    var export_button = $("<button>").text("Export").click(function(){
      console.log(JSON.stringify(nodes));
      $("#export").val(JSON.stringify(nodes));
    }).appendTo(document.body);
    export_box.appendTo(document.body);
  }
}


