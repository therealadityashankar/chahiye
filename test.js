import chahiye from "./chahiye.js"

describe('test css file loading', () => {
  it('test loading file', async () => {
    const file = await chahiye.load("linkCSS", "./test_files/test.blue.css", import.meta.url)
    const value = getComputedStyle(document.documentElement).getPropertyValue("--this-is-brown")
    chai.assert(value === " brown");
  });

  it('test file multiple loading', async function (){
    this.timeout(5);
    await chahiye.load("linkCSS", "./test_files/test.blue.css", import.meta.url)
    await chahiye.load("linkCSS", "./test_files/test.blue.css", import.meta.url)
    await chahiye.load("linkCSS", "./test_files/test.blue.css", import.meta.url)
    await chahiye.load("linkCSS", "./test_files/test.blue.css", import.meta.url)
  })
});

describe('test js file loading', () => {
  it('test loading file', async () => {
    await chahiye.load("script", "./test_files/test.js", import.meta.url)
    chai.assert(window.some_random_variable_thingy_wow === 213123423);
  });

  it('test file multiple loading', async function (){
    this.timeout(5);
    await chahiye.load("script", "./test_files/test.js", import.meta.url)
    await chahiye.load("script", "./test_files/test.js", import.meta.url)
    await chahiye.load("script", "./test_files/test.js", import.meta.url)
    await chahiye.load("script", "./test_files/test.js", import.meta.url)
  })
});


describe('test js file loading with full url, without base parameter', () => {
  const fileurl = "https://codemirror.net/lib/codemirror.js"
  it('test loading file', async () => {
    await chahiye.load("script", fileurl)
    chai.assert(window.CodeMirror !== undefined); 
  })

  it('test file multiple loading', async function (){
    this.timeout(5);
    await chahiye.load("script", fileurl)
    await chahiye.load("script", fileurl)
    await chahiye.load("script", fileurl)
    await chahiye.load("script", fileurl)
  })
})
