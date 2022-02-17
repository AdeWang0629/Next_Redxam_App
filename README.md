# redxamapp
Redxam's monorepo for frontend & backend.
We have a [Notion](https://www.notion.so/redxam/Engineering-Wiki-5a4e880681754d4ab5cd582c5a601500)

## Visual Studio Code

### Built-in formatter settings

```json
"editor.formatOnSave": true
"editor.renderControlCharacters": true
"editor.renderWhitespace": "all"
"editor.tabSize": 2
"files.insertFinalNewline": true
"html.format.wrapAttributes": "force-aligned"
"html.format.wrapLineLength": 80
```

### File header comment

Configuration for [File Header Comment](https://marketplace.visualstudio.com/items?itemName=doi.fileheadercomment) extension:

```json
"fileHeaderComment.parameter": {
  "*": {
    "commentbegin": "/**",
    "commentprefix": " *",
    "commentend": " /",
    "company": "redxam LLC",
    "oncall": "dev",
    "author": "max"
  }
},
"fileHeaderComment.template": {
  "": [
    "${commentbegin}",
    "${commentprefix} Copyright (c) ${year} ${company}",
    "${commentprefix} oncall: ${oncall}+${author}",
    "${commentprefix} @format",
    "${commentprefix} ",
    "${commentprefix}  TODO(${author}): REPLACE THIS LINE WITH DESCRIPTION OF FILE",
    "${commentend}",
    ""
  ]
}
```


