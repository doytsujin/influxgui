export default {
    name: 'ToolHeader',
    data: function() {
      return {
        selected: '',
        modalIsVisible: "hidden",
        choices: [],
        newConnection: "",
      }
    },
    methods: {
      getConnections: function(val=null){
        console.log("Values: "+val);
        if(val != null && val.length != 0){
          this.choices = val;
          return val;
        }
        setTimeout(() =>{
          console.log("Choices "+this.choices);
          this.getConnections(this.Rpc.getConnections());
        }, 100);
      },
      toggleModal: function(show){
        let val = "hidden";
        if(show){
          val = "block";
        }
        this.selected="";
        this.modalIsVisible = val;
      },
      createNewConnection: function(e, ){
        console.log("Connection: "+this.newConnection);
        if(!this.choices.includes(this.newConnection)){
          this.choices.push(this.newConnection);
          this.Rpc.storeConnection(this.newConnection);
        }
        else {
          alert("Connection: "+this.newConnection+" was already in db");
        }
        this.newConnection = "";
        this.toggleModal(false);
        e.preventDefault();
        return false;
      }
    },
    beforeMount(){
      this.Rpc.askConnections();
      this.getConnections();
    },
    watch: {
      'selected': function(val){
        if(val == "new"){
          this.toggleModal(true);
        }
        else {
          this.Rpc.setHost(val);
        }
      },
    },
    template: `
      <div>
      <header id="header">
        <div id="tools">
          <div id="logo"><img src="/media/logo.png" alt="InfluxGUI" /> InfluxGUI</div>
          <ul class="ul inline right">
            <li>Connections
              <select v-model="selected">
                <option disabled value="">Please select one</option>
                <option v-for="choice in choices">{{ choice }}</option>
                <option value="new">New connection</option>
              </select>
            </li>
            <li>Help</li></ul>
        </div>
      </header>
        <div id="new-database" class="modal" v-bind:class="modalIsVisible">

          <!-- Modal content -->
          <div class="modal-content">
            <span class="close" v-on:click="toggleModal(false)">&times;</span>
            <div>
              <form @submit="createNewConnection">
              <input type="text" v-model="newConnection" placeholder="http://domain:port" /> <input type="submit" value="Create new connection" />
              </form>
            </div>
          </div>
        
        </div>
      </div>
    `,
  };