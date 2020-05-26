import ToolHeader from "./ToolHeader.js"
import Query from "./Query.js"
export default {
    name: 'App',
    components: {
      ToolHeader,
      Query
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