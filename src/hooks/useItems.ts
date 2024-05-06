// import { useState } from 'react';


// export const useItems = () => {
//  const [items, setItems] = useState<Array<{ idea: string[], development: string[], testing: string[], deployment: string[] }>>([
//     {
//     idea: [],
//     development: [],
//     testing: [],
//     deployment: []
//     }
//     ]);

// const addItem = (stage: string, text: string) => {
// setItems((prevItems) => {
// const updatedItems = [...prevItems];
// updatedItems[0][stage].push(text);
// return updatedItems;
// });
// };

// const clearItems = () => {
// setItems([{ idea: [], development: [], testing: [], deployment: [] }]);
// };

// return { items, addItem, clearItems };
// };