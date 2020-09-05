# chahiye
want a resource ?, ask for the resource when you need it

- "chahiye" is the hindi word for "do you want ?"

chahiye allows you to load css and script files, dynamically, and ensures they're not doubly loaded

esmodule import
---------------
`import chahiye from "https://cdn.jsdelivr.net/gh/therealadityashankar/chahiye@0/chahiye.js"`

Usage
-----

```javascript
import chahiye from "https://cdn.jsdelivr.net/gh/therealadityashankar/chahiye@0/chahiye.js"

async function main(){
  await chahiye.load(`<"script"/"linkCSS">`, 
                     `<your script/stylesheet url>`, 
                     `import.meta.url/document.currentScript`);
}

main()
```

### API
#### chahiye.load(type, url, baseurl)

- **type** : string
  literally the word "script" or "link",
  use "script" if you're using a script/use "link" if you're using a <link> tag

- **url** : string
  the url you want to load

- **baseurl** : string/script element
  generally `import.meta.url` or `document.currentScript`,
  add this if you want to load a file relative to the current path,
  the url is loaded relative to this path

- ***returns*** : object, {link/script, loadEvent}, where link/script is the link or script tag (in a variable called 'link' or 'script'), and loadEvent is the event from the "load" event of the tag

### Examples

- `chahiye.load("linkCSS", "./test_files/test.blue.css", import.meta.url)`
- `chahiye.load("script", "https://codemirror.net/lib/codemirror.js")`
