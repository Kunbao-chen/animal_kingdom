const GAME_DATABASE = {
    restaurant: {
        title: "🏪 English Diner",
        
        sentenceTemplates: [
            "How about {item}?",
            "Would you like {item}?",
            "Here is your {item}."
        ],

        menu: [
            // 🥤 飲料類 (Drinks)
            { id: "iced_coffee",  name: "Iced Coffee",     article: "some", keywords: ["iced", "coffee"],   tags: ["cold", "drink"] },
            { id: "hot_coffee",   name: "Hot Coffee",      article: "some", keywords: ["hot", "coffee"],    tags: ["hot", "drink"] },
            { id: "iced_tea",     name: "Iced Tea",        article: "some", keywords: ["iced", "tea"],      tags: ["cold", "drink"] },
            { id: "hot_tea",      name: "Hot Tea",         article: "some", keywords: ["hot", "tea"],       tags: ["hot", "drink"] },
            { id: "apple_juice",  name: "Apple Juice",     article: "some", keywords: ["apple", "juice"],   tags: ["cold", "drink", "sweet"] },
            { id: "orange_juice", name: "Orange Juice",    article: "some", keywords: ["orange", "juice"],  tags: ["cold", "drink", "sour"] },
            { id: "milk",         name: "Milk",            article: "some", keywords: ["milk"],             tags: ["cold", "drink"] },
            { id: "bubble_tea",   name: "Bubble Tea",      article: "some", keywords: ["bubble", "tea"],    tags: ["cold", "drink", "sweet"] },
            { id: "water",        name: "Water",           article: "some", keywords: ["water"],            tags: ["cold", "drink"] },

            // 🍔 主餐類 (Meals)
            { id: "hamburger",    name: "Hamburger",       article: "a",    keywords: ["hamburger"],        tags: ["meal", "hot"] },
            { id: "hot_dog",      name: "Hot Dog",         article: "a",    keywords: ["hot", "dog"],       tags: ["meal", "hot"] },
            { id: "pizza",        name: "Pizza",           article: "some", keywords: ["pizza"],            tags: ["meal", "hot"] },
            { id: "sandwich",     name: "Sandwich",        article: "a",    keywords: ["sandwich"],         tags: ["meal"] },
            { id: "noodles",      name: "Noodles",         article: "some", keywords: ["noodles"],          tags: ["meal", "hot"] },
            { id: "fried_chicken",name: "Fried Chicken",   article: "some", keywords: ["fried", "chicken"], tags: ["meal", "hot"] },
            { id: "salad",        name: "Salad",           article: "a",    keywords: ["salad"],            tags: ["meal", "cold"] },

            // 🍰 點心類 (Desserts)
            { id: "ice_cream",    name: "Ice Cream",       article: "some", keywords: ["ice", "cream"],     tags: ["dessert", "cold", "sweet"] },
            { id: "chocolate_cake",name: "Chocolate Cake", article: "some", keywords: ["chocolate", "cake"],tags: ["dessert", "sweet"] },
            { id: "cookie",       name: "Cookie",          article: "a",    keywords: ["cookie"],           tags: ["dessert", "sweet"] },
            { id: "donut",        name: "Donut",           article: "a",    keywords: ["donut"],            tags: ["dessert", "sweet"] },
            { id: "fruit_salad",  name: "Fruit Salad",     article: "some", keywords: ["fruit", "salad"],   tags: ["dessert", "cold", "sour"] }
        ],

        customers: [
            {
                avatar: "🧔",
                text: "It is super hot outside! I need something cold to drink.",
                requiredTags: ["cold", "drink"],
                successText: "Yummy! That's so cool and refreshing! (+1)",
                failText: "Oh no... I really need a cold drink! (-1)"
            },
            {
                avatar: "👩",
                text: "I am freezing today! Can I have a warm drink?",
                requiredTags: ["hot", "drink"],
                successText: "Thank you! This hot drink keeps me warm! (+1)",
                failText: "Brrr! I asked for a HOT drink! (-1)"
            },
            {
                avatar: "👦",
                text: "I am starving! I want a hot meal for lunch.",
                requiredTags: ["meal", "hot"],
                successText: "Delicious! Exactly what I needed for lunch! (+1)",
                failText: "I'm hungry, I need a hot meal! (-1)"
            },
            {
                avatar: "👧",
                text: "I want a sweet dessert after lunch!",
                requiredTags: ["dessert", "sweet"],
                successText: "Mmm, so sweet and delicious! I love it! (+1)",
                failText: "I asked for something sweet! (-1)"
            },
            {
                avatar: "👴",
                text: "My mouth feels dry. Just a glass of simple drink, please.",
                requiredTags: ["drink"],
                successText: "Ah, much better! Thank you! (+1)",
                failText: "I just wanted a simple drink! (-1)"
            },
            {
                avatar: "👩‍🦰",
                text: "Do you have Taiwan's famous sweet drink with tapioca pearls?",
                requiredTags: ["sweet", "drink"],
                successText: "Yes! Bubble tea is my absolute favorite! (+1)",
                failText: "That's not what I was craving for! (-1)"
            },
            {
                avatar: "👱‍♂️",
                text: "I want something sour and fruit-flavored!",
                requiredTags: ["sour"],
                successText: "Great! That tangy fruit flavor is perfect! (+1)",
                failText: "I asked for something sour! (-1)"
            },
            {
                avatar: "🧒",
                text: "It's summer! I want a cold sweet treat!",
                requiredTags: ["cold", "sweet"],
                successText: "Yay! Ice cream and cold sweet treats are the best! (+1)",
                failText: "It's hot outside, I want a cold sweet treat! (-1)"
            }
        ]
    }
};
