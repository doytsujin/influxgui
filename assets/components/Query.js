export default {
    name: 'Query',
    methods: {
        connectToInfluxDB: function(e){
            alert("Connecting to influxdb");
            e.preventDefault();
            return false;
        },
        createQuery: function(e){
            alert("Creating query");
            e.preventDefault();
            return false;
        }
    },
    template: `
    <div>
        <div id="connect_container">
            <form @submit="connectToInfluxDB">
                <input type="text" placeholder="Username" id="influxdb_username" name="influxdb_username" />
                <input type="password" placeholder="Password" id="influxdb_password" name="influxdb_password" />
                <input type="submit" value="Connect" />
            </form>
        </div>
        <div id="query_input_container">
            <form @submit="createQuery">
                <input type="text" placeholder="Query" id="influxdb_query" name="influxdb_query" />
                <select name="inluxdb_db" id="inluxdb_db">
                    <option value="">Database</option>
                </select>
                <input type="submit" value="Send query" />
            </form>
        </div>
    </div>
    `,
  };