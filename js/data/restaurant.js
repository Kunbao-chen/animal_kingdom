export const restaurantData = {
    id: "restaurant",
    title: "Restaurant (餐廳點餐大大廚)",

    menu: [
        { id: "iced_coffee", name: "Iced Coffee", article: "an", keywords: ["iced", "coffee"], tags: ["drink", "cold"], template: "Here is your {item}." },
        { id: "hot_coffee", name: "Hot Coffee", article: "a", keywords: ["hot", "coffee"], tags: ["drink", "hot"], template: "Here is your {item}." },
        { id: "iced_tea", name: "Iced Tea", article: "an", keywords: ["iced", "tea"], tags: ["drink", "cold"], template: "Here is your {item}." },
        { id: "hot_tea", name: "Hot Tea", article: "a", keywords: ["hot", "tea"], tags: ["drink", "hot"], template: "Here is your {item}." },
        { id: "apple_juice", name: "Apple Juice", article: "some", keywords: ["apple", "juice"], tags: ["drink", "cold", "sweet"], template: "Here is your {item}." },
        { id: "orange_juice", name: "Orange Juice", article: "some", keywords: ["orange", "juice"], tags: ["drink", "cold", "sweet"], template: "Here is your {item}." },
        { id: "milk", name: "Milk", article: "some", keywords: ["milk"], tags: ["drink", "healthy"], template: "Here is your {item}." },
        { id: "bubble_tea", name: "Bubble Tea", article: "some", keywords: ["bubble", "tea"], tags: ["drink", "sweet"], template: "Here is your {item}." },
        { id: "water", name: "Water", article: "some", keywords: ["water"], tags: ["drink", "healthy"], template: "Here is your {item}." },
        { id: "hamburger", name: "Hamburger", article: "a", keywords: ["hamburger"], tags: ["food", "hot", "meal"], template: "Here is your {item}." },
        { id: "hot_dog", name: "Hot Dog", article: "a", keywords: ["hot", "dog"], tags: ["food", "hot", "meal"], template: "Here is your {item}." },
        { id: "pizza", name: "Pizza", article: "some", keywords: ["pizza"], tags: ["food", "hot", "meal"], template: "Here is your {item}." },
        { id: "sandwich", name: "Sandwich", article: "a", keywords: ["sandwich"], tags: ["food", "meal"], template: "Here is your {item}." },
        { id: "noodles", name: "Noodles", article: "some", keywords: ["noodles"], tags: ["food", "hot", "meal"], template: "Here is your {item}." },
        { id: "fried_chicken", name: "Fried Chicken", article: "some", keywords: ["fried", "chicken"], tags: ["food", "hot", "meal"], template: "Here is your {item}." },
        { id: "salad", name: "Salad", article: "a", keywords: ["salad"], tags: ["food", "healthy"], template: "Here is your {item}." },
        { id: "ice_cream", name: "Ice Cream", article: "some", keywords: ["ice", "cream"], tags: ["dessert", "cold", "sweet"], template: "Here is your {item}." },
        { id: "chocolate_cake", name: "Chocolate Cake", article: "some", keywords: ["chocolate", "cake"], tags: ["dessert", "sweet"], template: "Here is your {item}." },
        { id: "cookie", name: "Cookie", article: "a", keywords: ["cookie"], tags: ["dessert", "sweet"], template: "Here is your {item}." },
        { id: "donut", name: "Donut", article: "a", keywords: ["donut"], tags: ["dessert", "sweet"], template: "Here is your {item}." },
        { id: "fruit_salad", name: "Fruit Salad", article: "some", keywords: ["fruit", "salad"], tags: ["dessert", "healthy", "sweet"], template: "Here is your {item}." }
    ],

    customers: [
        {
            avatar: "🧔",
            text: "It's so hot today! I need a cold drink to cool down.",
            requiredTags: ["drink", "cold"],
            hintText: "Pick something cold to drink!",
            successText: "Ah, so refreshing! Thank you! (+1)",
            failText: "That's not a cold drink! (-1)"
        },
        {
            avatar: "👩",
            text: "I am super hungry! I want a big hot meal for dinner.",
            requiredTags: ["food", "meal"],
            hintText: "Pick a hearty food item!",
            successText: "Yum! This meal looks delicious! (+1)",
            failText: "That's not a proper meal! (-1)"
        },
        {
            avatar: "🧑",
            text: "I want a sweet dessert after lunch!",
            requiredTags: ["dessert"],
            hintText: "Pick a sweet dessert or treat!",
            successText: "Mmm, so sweet! Loved it! (+1)",
            failText: "That's not a sweet dessert! (-1)"
        }
    ]
};
