type Item = {
  [key: string]: any;
};

// export function filterAndCountDuplicateCartItems(arr: Item[]): Item[] {
//   // console.log("gsyuhgferyugrfyu", arr);
  
//   const objCountMap: Map<string, number> = new Map();

//   // Convert object to a stringified version for comparison
//   const stringifyObject = (obj: Item): string => {
//     return JSON.stringify(
//       Object.keys(obj)
//         .sort()
//         .reduce((sortedObj: Item, key: string) => {
//           sortedObj[key] = obj[key];
//           return sortedObj;
//         }, {})
//     );
//   };

//   // Count occurrences of each object
//   arr.forEach((obj) => {
//     const strObject = stringifyObject(obj);
//     const count = objCountMap.get(strObject) || 0;
//     objCountMap.set(strObject, count + 1);
//   });

//   // Create new array without duplicates and add 'quantityOfItems' field
//   const uniqueObjects: Item[] = [];
//   objCountMap.forEach((count, strObject) => {
//     const obj = JSON.parse(strObject);
//     obj["quantityOfItems"] = count;
//     uniqueObjects.push(obj);
//   });

//   return uniqueObjects;
// }


export function filterAndCountDuplicateCartItems(arr: Item[]): Item[] {
  const objCountMap: Map<string, number> = new Map();

  // Modify the stringifyObject function to ignore the 'Quantity' field
  const stringifyObject = (obj: Item): string => {
    const objCopy = { ...obj };
    delete objCopy.Quantity;  // Remove the 'Quantity' field

    return JSON.stringify(
      Object.keys(objCopy)
        .sort()
        .reduce((sortedObj: Item, key: string) => {
          sortedObj[key] = objCopy[key];
          return sortedObj;
        }, {})
    );
  };

  arr.forEach((obj) => {
    const strObject = stringifyObject(obj);
    const count = objCountMap.get(strObject) || 0;
    objCountMap.set(strObject, count + 1);
  });

  const uniqueObjects: Item[] = [];
  objCountMap.forEach((count, strObject) => {
    const obj = JSON.parse(strObject);
    obj["quantityOfItems"] = count;
    uniqueObjects.push(obj);
  });

  return uniqueObjects;
}