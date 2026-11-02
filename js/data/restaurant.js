export const restaurantData = {
    id: "restaurant",
    title: "Restaurant (餐廳點餐大大廚)",

    menu: [
        { id: "iced_coffee", name: "Iced Coffee", article: "", keywords: ["iced", "coffee"], tags: ["drink", "cold"], template: "How about some {item}?" },
        { id: "hot_coffee", name: "Hot Coffee", article: "", keywords: ["hot", "coffee"], tags: ["drink", "hot"], template: "Would you like a cup of {item}?" },
        { id: "iced_tea", name: "Iced Tea", article: "", keywords: ["iced", "tea"], tags: ["drink", "cold"], template: "Here is some {item}." },
        { id: "hot_tea", name: "Hot Tea", article: "", keywords: ["hot", "tea"], tags: ["drink", "hot"], template: "How about a cup of {item}?" },
        { id: "apple_juice", name: "Apple Juice", article: "", keywords: ["apple", "juice"], tags: ["drink", "cold", "sweet"], template: "Would you like some {item}?" },
        { id: "orange_juice", name: "Orange Juice", article: "", keywords: ["orange", "juice"], tags: ["drink", "cold", "sweet"], template: "Here is some {item}." },
        { id: "milk", name: "Milk", article: "", keywords: ["milk"], tags: ["drink", "healthy"], template: "How about a glass of {item}?" },
        { id: "bubble_tea", name: "Bubble Tea", article: "", keywords: ["bubble", "tea"], tags: ["drink", "sweet"], template: "Would you like some {item}?" },
        { id: "water", name: "Water", article: "", keywords: ["water"], tags: ["drink", "healthy"], template: "Here is some {item}." },
        
        { id: "hamburger", name: "Hamburger", article: "", keywords: ["hamburger"], tags: ["food", "hot", "meal"], template: "Would you like a {item}?" },
        { id: "hot_dog", name: "Hot Dog", article: "", keywords: ["hot", "dog"], tags: ["food", "hot", "meal"], template: "How about a {item}?" },
        { id: "pizza", name: "Pizza", article: "", keywords: ["pizza"], tags: ["food", "hot", "meal"], template: "Let's have some {item}." },
        { id: "sandwich", name: "Sandwich", article: "", keywords: ["sandwich"], tags: ["food", "meal"], template: "Here is a {item} for you." },
        { id: "noodles", name: "Noodles", article: "", keywords: ["noodles"], tags: ["food", "hot", "meal"], template: "Would you like some {item}?" },
        { id: "fried_chicken", name: "Fried Chicken", article: "", keywords: ["fried", "chicken"], tags: ["food", "hot", "meal"], template: "How about some {item}?" },
        { id: "salad", name: "Salad", article: "", keywords: ["salad"], tags: ["food", "healthy"], template: "Here is a fresh {item}." },
        
        { id: "ice_cream", name: "Ice Cream", article: "", keywords: ["ice", "cream"], tags: ["dessert", "cold", "sweet"], template: "Would you like some {item}?" },
        { id: "chocolate_cake", name: "Chocolate Cake", article: "", keywords: ["chocolate", "cake"], tags: ["dessert", "sweet"], template: "How about a slice of {item}?" },
        { id: "cookie", name: "Cookie", article: "", keywords: ["cookie"], tags: ["dessert", "sweet"], template: "Here is a {item}." },
        { id: "donut", name: "Donut", article: "", keywords: ["donut"], tags: ["dessert", "sweet"], template: "Would you like a {item}?" },
        { id: "fruit_salad", name: "Fruit Salad", article: "", keywords: ["fruit", "salad"], tags: ["dessert", "healthy", "sweet"], template: "Here is some {item}." }
    ],

    customers: [
        { avatar: "🧔", text: "It is very hot today. I want a cold drink, please.", requiredTags: ["drink", "cold"], hintText: "Pick something cold to drink!", successText: "Ah, so refreshing! Thank you! (+1)", failText: "That's not a cold drink! (-1)" },
        { avatar: "👨‍🦰", text: "I just played sports outside and I am dying for an icy beverage.", requiredTags: ["drink", "cold"], hintText: "Pick a cold drink to cool down!", successText: "Wonderful! Exactly what I needed! (+1)", failText: "That's not a cold drink! (-1)" },
        { avatar: "👩", text: "I want something sweet. Do you have any dessert?", requiredTags: ["dessert"], hintText: "Pick a sweet dessert or treat!", successText: "Mmm, so sweet! Thank you! (+1)", failText: "That's not a sweet dessert! (-1)" },
        { avatar: "👱‍♀️", text: "After a great meal, I always look forward to a sugary treat.", requiredTags: ["dessert"], hintText: "Pick a dessert like cake or ice cream!", successText: "Delicious! Best dessert ever! (+1)", failText: "That's not a sweet dessert! (-1)" },
        { avatar: "🧑", text: "It is cold today. I want a hot drink.", requiredTags: ["drink", "hot"], hintText: "Pick a hot drink!", successText: "Delicious and warm! Thank you! (+1)", failText: "That's not a hot drink! (-1)" },
        { avatar: "👴", text: "My hands are freezing in this weather. Bring me a steaming hot beverage.", requiredTags: ["drink", "hot"], hintText: "Pick a hot coffee or hot tea!", successText: "Ah, that warms me right up! (+1)", failText: "That's not a hot drink! (-1)" },
        { avatar: "👧", text: "I am hungry. I want a big meal.", requiredTags: ["food", "meal"], hintText: "Pick a hearty meal like pizza, burger, or noodles!", successText: "Yum! This looks delicious! (+1)", failText: "That's not a proper meal! (-1)" },
        { avatar: "👦", text: "I skipped lunch at school and my stomach is growling. I need a satisfying meal.", requiredTags: ["food", "meal"], hintText: "Pick a main dish or meal item!", successText: "Fantastic! I'm full and happy! (+1)", failText: "That's not a proper meal! (-1)" }
    ]
};
