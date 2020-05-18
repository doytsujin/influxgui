import ToolHeader from "./ToolHeader.js"
export default {
    name: 'App',
    components: {
      ToolHeader
    },
    template: `
      <div>
        <tool-header></tool-header>
        <div class="container mx-auto p-4">
          <h1>Hello World From Vue</h1>
        </div>
      </div>
    `,
  };