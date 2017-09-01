import React, {Component} from 'react';

import Graph from 'react-graph-vis';

class GraphQL extends Component {
  constructor(props) {
    super(props);
    this.state = {
      graph: {
        nodes: [
          {id: 1, label: 'Node 1'},
          {id: 2, label: 'Node 2'},
          {id: 3, label: 'Node 3'},
          {id: 4, label: 'Node 4'},
          {id: 5, label: 'Node 5'}
        ],
        edges: [
          {from: 1, to: 2},
          {from: 1, to: 3},
          {from: 2, to: 4},
          {from: 2, to: 5}
        ]
      },
      options: {
        layout: {
          hierarchical: true
        },
        edges: {
          color: "#000000"
        }
      },
      event: {
        select: function(event) {
          var {nodes, edges} = event
        }
      }
    }
  }

  render(){
    return(
      <Graph graph={this.state.graph} options={this.state.options} events={this.state.events} />
    )
  }
}

export default GraphQL; 
