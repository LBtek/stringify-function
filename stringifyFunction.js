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
   let array = Object.entries(object)

   for (let i = 0; i < array.length; i++) {

      const key = array[i][0]

      obj[key] = prepare(array[i][1])

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

   let array = [...setObj]

   for (let i = 0; i < array.length; i++) {

      array[i] = prepare(array[i])

   }

   if ( !array.length ) 
      return Object.prototype.toString.call(setObj)


   return array

}


function prepareMap( map ) {

   if ( ws.has(map) )
      return Object.prototype.toString.call(map)

   ws.add(map)

   let array = [...map]

   for (let i = 0; i < array.length; i++) {

      array[i][0] = prepare(array[i][0])

      array[i][1] = prepare(array[i][1])

   }

   if ( !array.length ) 
      return Object.prototype.toString.call(map)
   

   return array

}
