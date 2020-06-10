export default {
    name: 'ToolHeader',
    data: function() {
      return {
        selected: '',
        modalIsVisible: "hidden",
        choices: [],
        
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
            <li><span>Selected: {{ selected }}</span></li>
            <li>Help</li></ul>
        </div>
      </header>
        <div id="new-database" class="modal" v-bind:class="modalIsVisible">

          <!-- Modal content -->
          <div class="modal-content">
            <span class="close" v-on:click="toggleModal(false)">&times;</span>
            <p>Some text in the Modal..</p>
          </div>
        
        </div>
      </div>
    `,
  };