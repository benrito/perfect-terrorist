var width = 900,
    height = 500;

var tx = 750;

var currentTime = 0;

var debug = false;

var colors =
  { blue: "#3399cc",
    orange: "#ff9900",
    red: "#cc0033",
    purple: "#663399",
    gray: "#8f8f8f"
  };

var length = 168;

var nodes = [{
    "id": 0,
    "x": 450,
    "y": 0,
    "size": 20,
    "in_time": 0,
    "out_time": Infinity,
    "color": "#663399",
    "strokeColor": "#5c2e8a"
},
{
    "id": "dea",
    "x": 289,
    "y": 46,
    "in_time": 10,
    "out_time": Infinity,
    "source": 0,
    "size": 5,
    "color": colors.gray
},
{
    "id": "berlin",
    "x": 183,
    "y": 57,
    "in_time": 15,
    "out_time": Infinity,
    "source": "dea",
    "size": 5,
    "color": colors.gray
},
{
    "id": "cartels",
    "x": 262,
    "y": 114,
    "in_time": 33,
    "out_time": Infinity,
    "source": "pakistan",
    "size": 5,
    "color": colors.gray
},
{
    "id": "pakistan",
    "x": 351,
    "y": 146,
    "in_time": 31,
    "out_time": Infinity,
    "source": "dea",
    "size": 5,
    "color": colors.gray
},
{
    "id": "911",
    "x": 584,
    "y": 166,
    "in_time": 36,
    "out_time": Infinity,
    "source": 0,
    "size": 5,
    "color": colors.gray
},
{
    "id": "questioning",
    "x": 598,
    "y": 118,
    "in_time": 40,
    "out_time": Infinity,
    "source": "911",
    "size": 10,
    "color": colors.red
},
{
    "id": "mother",
    "x": 712,
    "y": 191,
    "in_time": 65,
    "out_time": Infinity,
    "source": 0,
    "size": 5,
    "color": colors.gray
},
{
    "id": "oxford",
    "x": 727,
    "y": 148,
    "in_time": 70,
    "out_time": Infinity,
    "source": "mother",
    "size": 5,
    "color": colors.gray
},
{
    "id": "fbi",
    "x": 654,
    "y": 157,
    "in_time": 80,
    "out_time": Infinity,
    "source": "mother",
    "size": 10,
    "color": colors.red
},
{
    "id": "lashkar",
    "x": 257,
    "y": 221,
    "in_time": 58,
    "out_time": Infinity,
    "source": "pakistan",
    "size": 5,
    "color": colors.gray
},
{
    "id": "lahore",
    "x": 337,
    "y": 218,
    "in_time": 62,
    "out_time": Infinity,
    "source": "pakistan",
    "size": 5,
    "color": colors.gray
},
{
    "id": "fiza",
    "x": 232,
    "y": 283,
    "in_time": 109,
    "out_time": Infinity,
    "source": 0,
    "size": 5,
    "color": colors.gray
},
{
    "id": "embassy",
    "x": 334,
    "y": 298,
    "in_time": 112,
    "out_time": Infinity,
    "source": "fiza",
    "size": 10,
    "color": colors.red
},
{
    "id": "taj_mahal",
    "x": 276,
    "y": 367,
    "in_time": 134,
    "out_time": Infinity,
    "source": "fiza",
    "size": 10,
    "color": colors.red
},
{
    "id": "mumbai",
    "x": 370,
    "y": 429,
    "in_time": 135,
    "out_time": Infinity,
    "source": "mumbai",
    "size": 15,
    "color": colors.orange
},
{
    "id": "arrest",
    "x": 570,
    "y": 309,
    "in_time": 88,
    "out_time": Infinity,
    "source": "new_york",
    "size": 10,
    "color": colors.red
},
{
    "id": "new_york",
    "x": 702,
    "y": 289,
    "in_time": 86,
    "out_time": Infinity,
    "source": 0,
    "size": 5,
    "color": colors.gray
},
{
    "id": "second_wife",
    "x": 652,
    "y": 361,
    "in_time": 89,
    "out_time": Infinity,
    "source": "new_york",
    "size": 5,
    "color": colors.gray
},
{
    "id": "jttf",
    "x": 766,
    "y": 399,
    "in_time": 97,
    "out_time": Infinity,
    "source": "second_wife",
    "size": 10,
    "color": colors.red
},
{
    "id": "customs",
    "x": 562,
    "y": 393,
    "in_time": 149,
    "out_time": Infinity,
    "source": 0,
    "size": 10,
    "color": colors.red
},
{
    "id": "warnings",
    "x": 529,
    "y": 431,
    "in_time": 163,
    "out_time": Infinity,
    "source": "customs",
    "size": 10,
    "color": colors.red
}];

var edges = [
  {
    source: 0,
    target: "dea",
    weight: 1
  },
  {
    source: "dea",
    target: "berlin",
    weight: 1
  },
  {
    source: "cartels",
    target: 0,
    weight: 1
  },
  {
    source: "pakistan",
    target: "cartels",
    weight: 1
  },
  {
    source: "dea",
    target: "pakistan",
    weight: 1
  },
  {
    source: "pakistan",
    target: 0,
    weight: 1
  },
  {
    source: "pakistan",
    target: "lahore",
    weight: 1
  },
  {
    source: "lashkar",
    target: "lahore",
    weight: 1
  },
  {
    source: "pakistan",
    target: "lashkar",
    weight: 1
  },
  {
    source: "lashkar",
    target: "embassy",
    weight: 1
  },
  {
    source: 0,
    target: "fiza",
    weight: 1
  },
  {
    source: "fiza",
    target: "embassy",
    weight: 1
  },
  {
    source: "embassy",
    target: "taj_mahal",
    weight: 1
  },
  {
    source: "taj_mahal",
    target: "mumbai",
    weight: 1
  },
  {
    source: "warnings",
    target: "mumbai",
    weight: 1
  },
  {
    source: 0,
    target: "questioning",
    weight: 1
  },
  {
    source: 0,
    target: "911",
    weight: 1
  },
  {
    source: "arrest",
    target: 0,
    weight: 1
  },
  {
    source: 0,
    target: "customs",
    weight: 1
  },
  {
    source: "911",
    target: "questioning",
    weight: 1
  },
  {
    source: "fbi",
    target: "oxford",
    weight: 1
  },
  {
    source: "mother",
    target: "oxford",
    weight: 1
  },
  {
    source: "mother",
    target: "fbi",
    weight: 1
  },
  {
    source: 0,
    target: "new_york",
    weight: 1
  },
  {
    source: "new_york",
    target: "arrest",
    weight: 1
  },
  {
    source: "arrest",
    target: "second_wife",
    weight: 1
  },
  {
    source: 0,
    target: "second_wife",
    weight: 1
  },
  {
    source: "second_wife",
    target: "jttf",
    weight: 1
  },
  {
    source: "fbi",
    target: "warnings",
    weight: 1
  },
  {
    source: "customs",
    target: "warnings",
    weight: 1
  },
  {
    source: 0,
    target: "mother",
    weight: 1
  },
]


var indexed_nodes = {};
var setup_nodes = function() {
  // fixup nodes
  nodes.forEach(function(node){
    node.strokeColor = d3.interpolateRgb(node.color, "#000")(0.1);
    node.x = (node.x - width / 2) * 1.25 + width / 2;
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

var update = function(t) {
  t = Math.floor(t);
  if (currentTime && currentTime == t) return;
  
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
  
  node_enter.each(function(d) {
    var self = this;
    $(this).mouseenter(function(e){
      var node_info = node_data[d.id];
      if (!node_info) return;
      createPopup(self, node_info.title, node_info.blurb, node_info.image_url, node_info.video_url, d.x, d.y);
    });
  });
  
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


