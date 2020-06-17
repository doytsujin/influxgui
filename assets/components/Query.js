export default {
    name: 'Query',
    data: function() {
        return {
            username: '',
            password: '',
            query: '',
            selected: '',
            connectedTxt: 'Connect',
            isConnected: this.Rpc.connected,
        }
    },
    computed: {
        databases: function(){
            return this.Rpc.databases;
        },
    },
    methods: {
        connectToInfluxDB: function(e){
            this.Rpc.connectInfluxDB(this.username, this.password);
            this.isConnected = this.Rpc.connected;
            this.getConnectionStatus();
            e.preventDefault();
            return false;
        },
        getConnectionStatus: function(val=null){
            console.log("Connection status: "+this.isConnected);
            if(val != null){
              this.isConnected = val;
              return val;
            }
            setTimeout(() =>{
              this.getConnectionStatus(this.Rpc.connected);
            }, 100);
        },
        createQuery: function(e){
            alert("Creating query");
            e.preventDefault();
            return false;
        }
    },
    watch: {
        'isConnected': function(newVal){
            if (newVal){
                this.connectedTxt = "Connected";
            }
            else {
                this.connectedTxt = "Connect";
            }
        }
    },
    template: `
    <div>
        <div id="connect_container">
            <form @submit="connectToInfluxDB">
                <input type="text" v-model="username" placeholder="Username" id="influxdb_username" name="influxdb_username" />
                <input type="password" v-model="password" placeholder="Password" id="influxdb_password" name="influxdb_password" />
                <input type="submit" value="Connect" />
            </form>
            <span>{{ connectedTxt }}</span>
        </div>
        <div id="query_input_container">
            <form @submit="createQuery">
                <input type="text" placeholder="Query" id="influxdb_query" name="influxdb_query" />
                <select v-model="selected" name="inluxdb_db" id="inluxdb_db>
                    <option disabled value="">Databses...</option>
                    <option v-for="database in databases">{{ database }}</option>
                </select>
                <input type="submit" value="Send query" />
            </form>
        </div>
    </div>
    `,
  };