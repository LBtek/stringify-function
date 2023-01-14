function prepare( item ) {
   let response

   if ( item instanceof Map )
      response = prepareMap(item)

   else if ( item instanceof Array )
      response = prepareArray(item)

   else if ( item instanceof Set )
      response = prepareSet(item)

   else if ( item instanceof Object )

      if (
         item instanceof Function ||
         item instanceof String
      )
         response = item.toString() || Object.prototype.toString.call(item)

      else
         response = prepareObject(item)

   else
      response = item


   return response
}


export default function stringify( item ) {

   const response = prepare(item)

   ws = new WeakSet()

   return JSON.stringify(response)
}


let ws = new WeakSet()


function prepareObject( object ) {

   if ( ws.has(object) )
      return Object.prototype.toString.call(object)

   ws.add(object)

   let obj = {}
   let arr = Object.entries(object)

   for (let i = 0; i < arr.length; i++) {

      const key = arr[i][0]
      obj[key] = prepare(arr[i][1])
   }

   return obj
}

function prepareArray( array ) {

   if ( ws.has(array) )
      return Object.prototype.toString.call(array)

   ws.add(array)

   let newArray = new Array(array.length)

   array.forEach(( item, i ) => {

      newArray[i] = prepare(item)
   })

   return newArray
}

function prepareSet( setObj ) {

   if ( ws.has(setObj) )
      return Object.prototype.toString.call(setObj)

   ws.add(setObj)

   let newArray = [...setObj]

   for (let i = 0; i < newArray.length; i++) {

      newArray[i] = prepare(newArray[i])
   }

   if (!newArray.length) 
      return Object.prototype.toString.call(setObj)

   return newArray
}

function prepareMap( map ) {

   if ( ws.has(map) )
      return Object.prototype.toString.call(map)

   ws.add(map)

   let newArray = [...map]

   for (let i = 0; i < newArray.length; i++) {

      newArray[i][0] = prepare(newArray[i][0])
      newArray[i][1] = prepare(newArray[i][1])
   }

   if (!newArray.length) 
      return Object.prototype.toString.call(map)
   
   return newArray

}
