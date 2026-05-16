// EVENTS ARRAY
const defaultEvents = [

    {
        id: 1,
        eventName: "Hackathon",
        eventCategory: "Technical",
        eventDate: "2026-06-10"
    },

    {
        id: 2,
        eventName: "Coding Contest",
        eventCategory: "Programming",
        eventDate: "2026-06-15"
    },

    {
        id: 3,
        eventName: "AI Workshop",
        eventCategory: "Workshop",
        eventDate: "2026-06-20"
    },

    {
        id: 4,
        eventName: "Web Development Bootcamp",
        eventCategory: "Development",
        eventDate: "2026-06-25"
    }
];

// STORE EVENTS ONLY FIRST TIME
if (!localStorage.getItem("events")) {

    localStorage.setItem(
        "events",
        JSON.stringify(defaultEvents)
    );
}

// GET EVENTS FROM LOCAL STORAGE
var events =
    JSON.parse(localStorage.getItem("events")) || [];

// REGISTRATIONS ARRAY
let registrations =
    JSON.parse(localStorage.getItem("registrations")) || [];