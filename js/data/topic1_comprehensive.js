export const topic1ComprehensiveData = {
    id: "topic1_comprehensive",
    title: "🦁 Super Fun 5 - Topic 1 (Zoo & Prep Full Edition)",
    
    sentenceTemplates: [
        "Today is {item}.",
        "I like to {item}.",
        "Look at the {item}!"
    ],

    menu: [
        // 🐾 A. Topic 1 核心：星期與日常作息 (Lesson 1 & 2)
        { id: "sunday",    name: "Sunday",    article: "", keywords: ["sunday"],    tags: ["day", "zoo"] },
        { id: "monday",    name: "Monday",    article: "", keywords: ["monday"],    tags: ["day", "school"] },
        { id: "get_up",    name: "Get up",    article: "", keywords: ["get", "up"],    tags: ["routine", "morning"] },
        { id: "go_to_school", name: "Go to school", article: "", keywords: ["go", "school"], tags: ["routine"] },

        // 🧸 B. Topic Review 經典複習單字（玩具與食物）
        { id: "yo_yos",    name: "Yo-yos",    article: "", keywords: ["yo", "yos"],    tags: ["toy", "fun"] },
        { id: "robots",    name: "Robots",    article: "", keywords: ["robots"],    tags: ["toy", "fun"] },
        { id: "pizza",     name: "Pizza",     article: "", keywords: ["pizza"],     tags: ["food", "lunch"] },
        { id: "juice",     name: "Juice",     article: "", keywords: ["juice"],     tags: ["food", "drink"] },

        // 🔤 C. Phonics Fun 自然發音重點單字 (ch, sh, wh, ph)
        { id: "chair",     name: "Chair",     article: "a", keywords: ["chair"],    tags: ["phonics", "ch"] },
        { id: "watch",     name: "Watch",     article: "a", keywords: ["watch"],    tags: ["phonics", "ch"] },
        { id: "fish",      name: "Fish",      article: "a", keywords: ["fish"],     tags: ["phonics", "sh", "zoo"] },
        { id: "whale",     name: "Whale",     article: "a", keywords: ["whale"],    tags: ["phonics", "wh", "zoo"] },
        { id: "phone",     name: "Phone",     article: "a", keywords: ["phone"],    tags: ["phonics", "ph"] }
    ],

    customers: [
        {
            avatar: "🐯",
            text: "Welcome to the Zoo! What day is it today for our school trip?",
            requiredTags: ["day"],
            hintText: "Mention a day like Sunday or Monday!",
            successText: "Awesome! Let's enjoy our day at the zoo! (+1)",
            failText: "That's not a day of the week! (-1)"
        },
        {
            avatar: "🐵",
            text: "I am playing in the park. Do you want to see my favorite toys?",
            requiredTags: ["toy"],
            hintText: "Pick a toy like yo-yos or robots!",
            successText: "Woohoo! Those toys are so cool! (+1)",
            failText: "That's not a toy! (-1)"
        },
        {
            avatar: "🐼",
            text: "I am quite hungry after walking around. Give me something to eat or drink!",
            requiredTags: ["food"],
            hintText: "Pick a food item like pizza or juice!",
            successText: "Delicious! Thank you so much! (+1)",
            failText: "That's not something to eat or drink! (-1)"
        },
        {
            avatar: "🐨",
            text: "Let's practice our phonics! Can you name something that starts with CH or SH?",
            requiredTags: ["phonics"],
            hintText: "Pick a phonics word like chair, watch, or fish!",
            successText: "Brilliant! Your phonics pronunciation is amazing! (+1)",
            failText: "That's not one of our phonics words! (-1)"
        }
    ]
};
