var connections = ["a", "b"];
window.rpc = {
  askConnections: function() { 
    this.connections = [];
    window.external.invoke(JSON.stringify({cmd : 'connections'})); 
  },
  setConnections: function(connections) {
    this.connections = connections;
  },
  getConnections: function() { 
    /*console.log("Get connections called")
    if(this.connections != null && this.connections.length == 0){
      setTimeout(this.getConnections, 10);
      return;
    }
    console.log("Values loaded from db");*/
    return this.connections 
  },
};

/*window.getInfluxDBConnections = function (){
  window.rpc.getConnections();
  console.log("From window function");
  console.log(window.rpc.connections);
  return window.rpc.connections;
}*/
//window.rpc.askConnections();
//window.rpc.getConnections();

//console.log(rpc.getConnections());
//console.log(getInfluxDBConnections());

import App from './components/App.js';
Vue.prototype.Rpc = window.rpc;
Vue.prototype.influxDBConnections = window.connections;
window.vue = new Vue({
  render: h => h(App),
}).$mount(`#app`);

