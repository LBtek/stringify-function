function stringify(item) {
  let response
  if (item instanceof Map) 
    response = prepareMap(item)
  else if (item instanceof Array) 
    response = prepareArray(item)
  else if (item instanceof Set) 
    response = prepareSet(item)
  else if (item instanceof Object) 
    response = prepareObject(item)
  else response = item

  return JSON.stringify(response)
}

function prepareObject(object) {
  let obj = {}
  let arr = Object.entries(object)
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][1] instanceof Map) {
      obj[arr[i][0]] = prepareMap(arr[i][1])
    } else if (arr[i][1] instanceof Array) {
      obj[arr[i][0]] = prepareArray(arr[i][1])
    } else if (arr[i][1] instanceof Set) {
      obj[arr[i][0]] = prepareSet(arr[i][1])
    } else if (arr[i][1] instanceof Object) {
      obj[arr[i][0]] = prepareObject(arr[i][1])
    } else {
      obj[arr[i][0]] = arr[i][1]
    }
  }
  return obj
}

function prepareArray(array) {
  let arr = new Array(array.length)
  array.forEach((e, id) => {
    if (e instanceof Map) {
      arr[id] = prepareMap(e)
    } else if (e instanceof Array) {
      arr[id] = prepareArray(e)
    } else if (e instanceof Set) {
      arr[id] = prepareSet(e)
    } else if (e instanceof Object) {
      arr[id] = prepareObject(e)
    } else arr[id] = e
  })
  return arr
}

function prepareSet(setObj) {
  let arr = [...setObj]

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] instanceof Map) {
      arr[i] = prepareMap(arr[i])
    } else if (arr[i] instanceof Array) {
      arr[i] = prepareArray(arr[i])
    } else if (arr[i] instanceof Set) {
      arr[i] = prepareSet(arr[i])
    } else if (arr[i] instanceof Object) {
      arr[i] = prepareObject(arr[i])
    }
  }
}

function prepareMap(map) {
  let arr = [...map]

  for (let i = 0; i < arr.length; i++) {
    if (arr[i][0] instanceof Map) {
      arr[i][0] = prepareMap(arr[i][0])
    } else if (arr[i][0] instanceof Array) {
      arr[i][0] = prepareArray(arr[i][0])
    } else if (arr[i][0] instanceof Set) {
      arr[i][0] = prepareSet(arr[i][0])
    } else if (arr[i][0] instanceof Object) {
      arr[i][0] = prepareObject(arr[i][0])
    }

    if (arr[i][1] instanceof Map) {
      arr[i][1] = prepareMap(arr[i][1])
    } else if (arr[i][1] instanceof Array) {
      arr[i][1] = prepareArray(arr[i][1])
    } else if (arr[i][1] instanceof Set) {
      arr[i][1] = prepareSet(arr[i][1])
    } else if (arr[i][1] instanceof Object) {
      arr[i][1] = prepareObject(arr[i][1])
    }
  }
  return arr
}
