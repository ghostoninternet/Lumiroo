// mockData.js
export const mockPlaygrounds = [
    { 
      id: "00000001", 
      name: "Place#1", 
      attractions: "300000", 
      price: "300000", 
      hours: "8:00-16:00",
      description: "遊び場の詳細情報がここに表示されます。"
    },
    // ... other playgrounds
  ];
  
  export const fetchPlaygroundById = (id) => {
    return mockPlaygrounds.find(playground => playground.id === id);
  };