class Circles{
    node(x, y, number){
        this.x = x;
        this.y = y;
        this.number = number;
        var edges = [edge];


    }

    edge(node1, node2, weight){
        this.node1 = node1;
        this.node2 = node2;
        this.weight = weight;
    }

    
    addEdge(node, weight){
        this.edges.push(this, node, weight);
        node.edges.push(node, this, weight);
    }
       
}