
   

    

    
    addEdge(node, weight){
        this.edges[node.number] = edge(this, node, weight);
        node.edges[this.number] = edge(node, this, weight);
    }
    
    test(){
        return 1;
    }
        

