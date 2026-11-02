export const topic1ComprehensiveData = {
    id: "topic1_comprehensive",
    title: "Super Fun 5 - Topic 1 (Zoo & Prep Full Edition)",

    menu: [
        { id: "sunday", name: "Sunday", article: "", keywords: ["sunday"], tags: ["day", "zoo"], template: "It is {item}." },
        { id: "monday", name: "Monday", article: "", keywords: ["monday"], tags: ["day", "school"], template: "It is {item}." },
        { id: "yo_yos", name: "Yo-yos", article: "", keywords: ["yo", "yos"], tags: ["toy", "fun"], template: "Would you like my {item}?" },
        { id: "robots", name: "Robots", article: "", keywords: ["robots"], tags: ["toy", "fun"], template: "Here are my {item}." },
        { id: "pizza", name: "Pizza", article: "", keywords: ["pizza"], tags: ["food", "lunch"], template: "Let's get some {item}." },
        { id: "juice", name: "Juice", article: "", keywords: ["juice"], tags: ["food", "drink"], template: "How about some {item}." },
        { id: "chair", name: "Chair", article: "", keywords: ["chair"], tags: ["phonics", "ch"], template: "Look at the {item}." },
        { id: "fish", name: "Fish", article: "", keywords: ["fish"], tags: ["phonics", "sh", "zoo"], template: "Do you see a {item}?" },
        { id: "whale", name: "Whale", article: "", keywords: ["whale"], tags: ["phonics", "wh, zoo"], template: "Look at that big {item}." },
        { id: "phone", name: "Phone", article: "", keywords: ["phone"], tags: ["phonics", "ph"], template: "Here is a {item}." }
    ],

    customers: [
        { avatar: "🐯", text: "Our school trip to the zoo is coming up fast! Can you tell me what day it is today?", requiredTags: ["day"], hintText: "Tell the tiger the day, like Sunday or Monday!", successText: "Awesome! Let's enjoy our day at the zoo! (+1)", failText: "That's not a day of the week! (-1)" },
        { avatar: "🦁", text: "We are planning our weekly schedule. Please let me know what day comes next.", requiredTags: ["day"], hintText: "Mention a day of the week!", successText: "Spot on! Time flies so fast! (+1)", failText: "That is not a day! (-1)" },
        { avatar: "🐵", text: "I want to play games in the park right now. Can you show me your toys?", requiredTags: ["toy"], hintText: "Show your toy like yo-yos or robots!", successText: "Woohoo! Those toys are so cool! (+1)", failText: "That's not a toy! (-1)" },
        { avatar: "🐰", text: "It's playtime! I need something fun to play with. Please show me your toys.", requiredTags: ["toy"], hintText: "Pick a toy from the list!", successText: "Yay! Let's play together! (+1)", failText: "That's not a toy! (-1)" },
        { avatar: "🐼", text: "I have been walking around the zoo all morning and I am starving. Please bring me something to eat or drink!", requiredTags: ["food"], hintText: "Give some food or drink like pizza or juice!", successText: "Delicious! Thank you so much! (+1)", failText: "That's not something to eat or drink! (-1)" },
        { avatar: "🐻", text: "My tummy is rumbling. I need a quick bite or a refreshing drink right now.", requiredTags: ["food"], hintText: "Pick pizza or juice!", successText: "Yum! That hits the spot! (+1)", failText: "That's not food or drink! (-1)" },
        { avatar: "🐨", text: "It is time for our phonics practice! Can you point to something around us that starts with CH or SH?", requiredTags: ["phonics"], hintText: "Point to a phonics word like chair or fish!", successText: "Brilliant! Your phonics pronunciation is amazing! (+1)", failText: "That's not one of our phonics words! (-1)" },
        { avatar: "🦊", text: "Let's test our letter sounds. Can you find and identify a matching phonics item for me?", requiredTags: ["phonics"], hintText: "Pick a phonics item like chair, fish, whale, or phone!", successText: "Fantastic phonics skills! (+1)", failText: "That's not a phonics item! (-1)" }
    ]
};
