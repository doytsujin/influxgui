import ToolHeader from "./ToolHeader.js"
import Query from "./Query.js"
export default {
    name: 'App',
    /*data: function() {
      return {
        connections: this.Rpc.getConnections() //[1,2,3]
      }
    },*/
    components: {
      ToolHeader,
      Query
    },
    watch: {
      connections(val){
        alert("Connections has new value "+val);
      }
    },
    template: `
      <div>
        <tool-header></tool-header>
        <div class="container mx-auto p-4">
          <query></query>
        </div>
      </div>
    `,
  };