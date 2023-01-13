export default function stringify(item) {

  let response

  if (item instanceof Map)
    response = prepareMap(item)

  else if (item instanceof Array)
    response = prepareArray(item)

  else if (item instanceof Set)
    response = prepareSet(item)

  else if (item instanceof Object)

    if (item instanceof Function)
      response = Object.prototype.toString.call(item)
    else
      response = prepareObject(item)

  else
    response = item


  ws = new WeakSet()

  return JSON.stringify(response)
}

let ws = new WeakSet()

function prepareObject(object) {

  if (ws.has(object))
    return Object.prototype.toString.call(object)

  ws.add(object)

  let obj = {}
  let arr = Object.entries(object)

  for (let i = 0; i < arr.length; i++) {

    const key = arr[i][0]
    const value = arr[i][1]

    if (value instanceof Map)
      obj[key] = prepareMap(value)

    else if (value instanceof Array)
      obj[key] = prepareArray(value)

    else if (value instanceof Set)
      obj[key] = prepareSet(value)

    else if (value instanceof Object)

      if (value instanceof Function)
        obj[key] = Object.prototype.toString.call(value)
      else
        obj[key] = prepareObject(value)

    else
      obj[key] = value
  }

  return obj
}

function prepareArray(array) {

  if (ws.has(array))
    return Object.prototype.toString.call(array)

  ws.add(array)

  let newArray = new Array(array.length)

  array.forEach((item, i) => {

    if (item instanceof Map)
      newArray[i] = prepareMap(item)

    else if (item instanceof Array)
      newArray[i] = prepareArray(item)

    else if (item instanceof Set)
      newArray[i] = prepareSet(item)

    else if (item instanceof Object)

      if (item instanceof Function)
        newArray[i] = Object.prototype.toString.call(item)
      else
        newArray[i] = prepareObject(item)

    else
      newArray[i] = item
  })

  return newArray
}

function prepareSet(setObj) {

  if (ws.has(setObj))
    return Object.prototype.toString.call(setObj)

  ws.add(setObj)

  let newArray = [...setObj]

  for (let i = 0; i < arr.length; i++) {

    const item = newArray[i]

    if (item instanceof Map)
      newArray[i] = prepareMap(item)

    else if (item instanceof Array)
      newArray[i] = prepareArray(item)

    else if (item instanceof Set)
      newArray[i] = prepareSet(item)

    else if (item instanceof Object)

      if (item instanceof Function)
        newArray[i] = Object.prototype.toString.call(item)
      else
        newArray[i] = prepareObject(item)
  }

  return newArray
}

function prepareMap(map) {

  if (ws.has(map))
    return Object.prototype.toString.call(map)

  ws.add(map)

  let newArray = [...map]

  for (let i = 0; i < arr.length; i++) {

    let key = newArray[i][0]
    let value = newArray[i][1]

    if (key instanceof Map)
      key = prepareMap(key)

    else if (key instanceof Array)
      key = prepareArray(key)

    else if (key instanceof Set)
      key = prepareSet(key)

    else if (key instanceof Object)

      if (key instanceof Function)
        key = Object.prototype.toString.call(key)
      else
        key = prepareObject(key)


    if (value instanceof Map)
      value = prepareMap(value)

    else if (value instanceof Array)
      value = prepareArray(value)

    else if (value instanceof Set)
      value = prepareSet(value)

    else if (value instanceof Object)

      if (value instanceof Function)
        value = Object.prototype.toString.call(value)
      else
        value = prepareObject(value)


    newArray[i][0] = key
    newArray[i][1] = value

  }

  return newArray
}
