export const topic1ComprehensiveData = {
    id: "topic1_comprehensive",
    title: "Super Fun 5 - Topic 1 (Zoo & Prep Full Edition)",

    menu: [
        // 🐾 A. 星期類
        { id: "sunday", name: "Sunday", article: "", keywords: ["sunday"], tags: ["day", "zoo"], template: "It is {item}." },
        { id: "monday", name: "Monday", article: "", keywords: ["monday"], tags: ["day", "school"], template: "It is {item}." },
        
        // 🧸 B. 玩具類
        { id: "yo_yos", name: "Yo-yos", article: "", keywords: ["yo", "yos"], tags: ["toy", "fun"], template: "Here are your {item}." },
        { id: "robots", name: "Robots", article: "", keywords: ["robots"], tags: ["toy", "fun"], template: "Here are your {item}." },
        
        // 🍕 C. 食物飲料類
        { id: "pizza", name: "Pizza", article: "some", keywords: ["pizza"], tags: ["food", "lunch"], template: "Here is {item}." },
        { id: "juice", name: "Juice", article: "some", keywords: ["juice"], tags: ["food", "drink"], template: "Here is {item}." },
        
        // 🔤 D. 發音類
        { id: "chair", name: "Chair", article: "a", keywords: ["chair"], tags: ["phonics", "ch"], template: "Look at the {item}." },
        { id: "fish", name: "Fish", article: "a", keywords: ["fish"], tags: ["phonics", "sh", "zoo"], template: "Look at the {item}." },
        { id: "whale", name: "Whale", article: "a", keywords: ["whale"], tags: ["phonics", "wh", "zoo"], template: "Look at the {item}." },
        { id: "phone", name: "Phone", article: "a", keywords: ["phone"], tags: ["phonics", "ph"], template: "Look at the {item}." }
    ],

    // 擴充更多隨機情境題庫，避免學生背誦固定順序
    customers: [
        {
            avatar: "🐯",
            text: "Welcome to the Zoo! What day is it today for our school trip?",
            requiredTags: ["day"],
            hintText: "Tell the tiger the day, like Sunday or Monday!",
            successText: "Awesome! Let's enjoy our day at the zoo! (+1)",
            failText: "That's not a day of the week! (-1)"
        },
        {
            avatar: "🦁",
            text: "The calendar on the wall is changing. Do you know what day is coming next?",
            requiredTags: ["day"],
            hintText: "Mention a day of the week!",
            successText: "Spot on! Time flies so fast! (+1)",
            failText: "That is not a day! (-1)"
        },
        {
            avatar: "🐵",
            text: "I am playing in the park. Do you want to see my favorite toys?",
            requiredTags: ["toy"],
            hintText: "Hand over a toy like yo-yos or robots!",
            successText: "Woohoo! Those toys are so cool! (+1)",
            failText: "That's not a toy! (-1)"
        },
        {
            avatar: "🐰",
            text: "It's playtime! Show me what fun toys you brought today.",
            requiredTags: ["toy"],
            hintText: "Pick a toy from the list!",
            successText: "Yay! Let's play together! (+1)",
            failText: "That's not a toy! (-1)"
        },
        {
            avatar: "🐼",
            text: "I am quite hungry after walking around. Give me something to eat or drink!",
            requiredTags: ["food"],
            hintText: "Give the panda some food or drink like pizza or juice!",
            successText: "Delicious! Thank you so much! (+1)",
            failText: "That's not something to eat or drink! (-1)"
        },
        {
            avatar: "🐨",
            text: "Let's practice our phonics! Can you name something that starts with CH or SH?",
            requiredTags: ["phonics"],
            hintText: "Point to a phonics word like chair, watch, or fish!",
            successText: "Brilliant! Your phonics pronunciation is amazing! (+1)",
            failText: "That's not one of our phonics words! (-1)"
        },
        {
            avatar: "🦊",
            text: "Look at these amazing letters and sounds around us. Can you find a matching phonics item?",
            requiredTags: ["phonics"],
            hintText: "Pick a phonics item like chair, fish, whale, or phone!",
            successText: "Fantastic phonics skills! (+1)",
            failText: "That's not a phonics item! (-1)"
        }
    ]
};
