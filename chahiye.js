// each ("file", "linkCSS", "script") contains values of the format -
// {
//    completed : bool,
//    [value : the thing we're waiting for,]
//    promise,
// }
const addedStuff = {
  file: {}, linkCSS: {}, script: {}
}

/**
 * add a script if we need to add a script,
 * else don't, useful for language syntax/theme additions,
 * adding themes, stuff like that
 *
 * @param {string} type - the type of addition (i.e. "file", "linkCSS", "script")
 * @param {function} callback - the callback, only a URL object is passed as a parameter in this
 * @param {string} _url - the url the load
 * @param {string} base - the base of the url to be loaded, generall import.meta.url/document.currentScript
 */
async function addIfRequired(type, callback, _url, base) {
  const url = new URL(_url, base)
  const typeStuff = addedStuff[type]

  if (typeStuff[url.href]) {
    if (typeStuff[url.href].completed) return typeStuff[url.href].value 
    else return await typeStuff[url.href].promise
  }

  typeStuff[url.href] = {
    promise: callback(url),
    completed: false
  }

  const value = await typeStuff[url.href].promise

  typeStuff[url.href].completed = true
  typeStuff[url.href].value = value
}


/**
 * load a type of object, if you need to
 *
 * @param {string} type - the type of object wanted, "file"/"linkCSS"/"script"
 * @param {string} _url - the url to get
 * @param {string} base - the base of the url to load
 */
function load(type, _url, base){
  if(type === "script") return addScriptIfRequired(_url, base)
  else if(type === "linkCSS") return addCSSLinkIfRequired(_url, base)
  else {
    console.error(`chahiye : unknown request type ${type}`);
    console.trace();
  }
}

/**
 * add a script if we need to,
 *
 * see (addIfRequired() function for the meaning of _url and base)
 */
function addScriptIfRequired (_url, base) {
  const addFn = url => {
    const script = document.createElement('script')
    script.src = url.href
    document.body.appendChild(script)

    return new Promise(resolve => {
      script.addEventListener('load', resolve)
    })
  }

  return addIfRequired("script", addFn, _url, base)
}

/**
 * add a css link if we need to,
 *
 * see (addIfRequired() function for the meaning of _url and base)
 */
function addCSSLinkIfRequired (_url, base) {
  const addFn = url => {
    var link = document.createElement('link')
    link.setAttribute('rel', 'stylesheet')
    link.setAttribute('type', 'text/css')
    link.setAttribute('href', url.href)
    document.body.appendChild(link)

    return new Promise(resolve => link.addEventListener('load', resolve))
  }

  return addIfRequired("linkCSS", addFn, _url, base)
}

export default {load, addedStuff}

