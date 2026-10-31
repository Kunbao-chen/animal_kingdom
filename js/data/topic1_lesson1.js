export const topic1Lesson1Data = {
    id: "topic1_lesson1",
    title: "🦁 Super Fun 5 - Topic 1 (A Day at the Zoo - Lesson 1)",
    
    sentenceTemplates: [
        "Today is {item}.",
        "I usually get up at {item}.",
        "It is {item} today."
    ],

    menu: [
        // 📅 星期類 (Days of the week)
        { id: "sunday",    name: "Sunday",    article: "", keywords: ["sunday"],    tags: ["day", "weekend"] },
        { id: "monday",    name: "Monday",    article: "", keywords: ["monday"],    tags: ["day", "weekday"] },
        { id: "tuesday",   name: "Tuesday",   article: "", keywords: ["tuesday"],   tags: ["day", "weekday"] },
        { id: "wednesday", name: "Wednesday", article: "", keywords: ["wednesday"], tags: ["day", "weekday"] },
        { id: "thursday",  name: "Thursday",  article: "", keywords: ["thursday"],  tags: ["day", "weekday"] },
        { id: "friday",    name: "Friday",    article: "", keywords: ["friday"],    tags: ["day", "weekday"] },
        { id: "saturday",  name: "Saturday",  article: "", keywords: ["saturday"],  tags: ["day", "weekend"] },

        // ⏰ 日常作息類 (Daily routines)
        { id: "get_up",        name: "Get up",        article: "", keywords: ["get", "up"],        tags: ["routine", "morning"] },
        { id: "go_to_school",  name: "Go to school",  article: "", keywords: ["go", "school"],     tags: ["routine", "day"] },
        { id: "go_home",       name: "Go home",       article: "", keywords: ["go", "home"],       tags: ["routine", "afternoon"] },
        { id: "eat_dinner",    name: "Eat dinner",    article: "", keywords: ["eat", "dinner"],    tags: ["routine", "evening"] },
        { id: "do_homework",   name: "Do homework",   article: "", keywords: ["do", "homework"],   tags: ["routine", "evening"] },
        { id: "take_a_shower", name: "Take a shower", article: "", keywords: ["take", "shower"], tags: ["routine", "night"] },
        { id: "go_to_bed",     name: "Go to bed",     article: "", keywords: ["go", "bed"],        tags: ["routine", "night"] }
    ],

    customers: [
        {
            avatar: "🐯",
            text: "Hello! What day of the weekend is today? I want to visit the zoo!",
            requiredTags: ["weekend"],
            hintText: "I want a weekend day (Saturday or Sunday)!",
            successText: "Roar! Weekend is the best time for the zoo! (+1)",
            failText: "That's a weekday, not the weekend! (-1)"
        },
        {
            avatar: "🐵",
            text: "Hey! Today is a school day. Which weekday is it?",
            requiredTags: ["weekday"],
            hintText: "I need a weekday (Monday to Friday)!",
            successText: "Awesome! Time to go to school! (+1)",
            failText: "That's a weekend day! (-1)"
        },
        {
            avatar: "🐼",
            text: "I just woke up in the early morning. What do I do first?",
            requiredTags: ["morning"],
            hintText: "What do you do in the morning?",
            successText: "Good morning! Time to get up! (+1)",
            failText: "That's not a morning routine! (-1)"
        },
        {
            avatar: "🐨",
            text: "It's late at night, I am so sleepy and going to sleep.",
            requiredTags: ["night"],
            hintText: "What do you do at night before sleeping?",
            successText: "Good night! Sweet dreams! (+1)",
            failText: "It's not time for bed yet! (-1)"
        }
    ]
};
