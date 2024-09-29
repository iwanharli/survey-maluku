<template>
  <h1>Input:</h1>
  <pre id="data" style="padding: 8px; border: whitesmoke double 4px; background-color: lightgray">
[
    {
        "Name": "万历十五年",
        "Author": "黃仁宇",
        "Subject": "History",
        "Publication Date": 1981
    },
    {
        "Name": "L'Ancien Régime et la Révolution",
        "Author": "Alexis de Tocqueville",
        "Subject": "History",
        "Publication Date": 1866
    },
    {
        "Name": "A Brief History of Time",
        "Author": "Stephen Hawking",
        "Subject": "Cosmology",
        "Publication Date": 1988
    },
    {
        "Name": "失楽園",
        "Author": "渡辺淳一",
        "Subject": "Novel",
        "Publication Date": 1995
    }
]
</pre
  >
  <label>file name: <input id="fileName" value="books" placeholder="file name" /></label> &nbsp; &nbsp; <label>CSV delimiter: <input id="delimiter" value="," placeholder="CSV Delimiter" /></label> <br />
  <br />
  <button @click="downloadText('txt')">download plain text file</button>
  <button @click="downloadText('css')">download css file</button>
  <button @click="downloadText('html')">download html file</button>
  <button @click="download('json')">download JSON file</button>
  <button @click="download('csv')">download CSV file</button>
  <button @click="download('xls')">download XLS file(Excel)</button>
  <button @click="download('xml')">download XML file</button>
  <hr />
  <button @click="show('txt')">show plain text file</button>
  <button @click="show('css')">show css file</button>
  <button @click="show('html')">show html file</button>
  <button @click="show('json')">show JSON file</button>
  <button @click="show('csv')">show CSV file</button>
  <button @click="show('xls')">show XLS file(Excel)</button>
  <button @click="show('xml')">show XML file</button>
  <hr />
  <label>
    Use fields "Name", "Author", "subject":
    <input id="useFields" type="checkbox" />
  </label>
  <h1>Output:</h1>
  <pre id="content" style="padding: 8px; border: whitesmoke double 4px; background-color: lightgray"></pre>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
import exportFromJSON from 'export-from-json'

import '@/assets/custom-vue/css/pagination.css'

export default {
  data() {
    return {
      jsonData: [
        {
          Name: '万历十五年',
          Author: '黃仁宇',
          Subject: 'History',
          'Publication Date': 1981
        },
        {
          Name: "L'Ancien Régime et la Révolution",
          Author: 'Alexis de Tocqueville',
          Subject: 'History',
          'Publication Date': 1866
        },
        {
          Name: 'A Brief History of Time',
          Author: 'Stephen Hawking',
          Subject: 'Cosmology',
          'Publication Date': 1988
        },
        {
          Name: '失楽園',
          Author: '渡辺淳一',
          Subject: 'Novel',
          'Publication Date': 1995
        }
      ],
      fileName: 'test',
      delimiter: '',
      useFields: false,
      content: ''
    }
  },

  methods: {
    toggleContentEditable() {
      // Implement your logic here to toggle content editable
    },
    download(exportType) {
      const fileName = 'test'
      const data = this.jsonData
      const fields = this.useFields.checked ? ['Name', 'Author', 'Subject'] : []

      console.log(fileName, fields, data)

      exportFromJSON({ data, fileName, fields, exportType })
    },

    show(exportType) {
      const fileName = this.fileName
      const delimiter = this.delimiter
      const data = this.jsonData
      const fields = this.useFields ? ['Name', 'Author', 'Subject'] : []

      const output = exportFromJSON({ data, fileName, fields, delimiter, exportType, processor: (content) => content })
      this.content = output
    }
  }
}
</script>
