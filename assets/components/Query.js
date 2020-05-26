export default {
    name: 'Query',
    template: `
    <div id="query_input_container">
        <form onsubmit="return createQuery()">
            <input type="text" placeholder="Query" id="influxdb_query" name="influxdb_query" />
            <select name="inluxdb_db" id="inluxdb_db">
                <option value="">Database</option>
            </select>
            <input type="submit" value="Send query" />
        </form>
    </div>
    `,
  };