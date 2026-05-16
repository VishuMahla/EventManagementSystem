// ✅ EVENTS DATA (AUTO LOAD)
const defaultEvents = [
  { id: 1, eventName: "Hackathon", eventCategory: "Technical", eventDate: "2026-06-10" },
  { id: 2, eventName: "Coding Contest", eventCategory: "Technical", eventDate: "2026-06-10" },
  { id: 3, eventName: "Technical Quiz", eventCategory: "Technical", eventDate: "2026-06-10" },
  { id: 4, eventName: "Paper Presentation", eventCategory: "Technical", eventDate: "2026-06-10" },

  { id: 5, eventName: "Dance", eventCategory: "Cultural", eventDate: "2026-06-12" },
  { id: 6, eventName: "Singing", eventCategory: "Cultural", eventDate: "2026-06-12" },
  { id: 7, eventName: "Fashion Show", eventCategory: "Cultural", eventDate: "2026-06-12" },
  { id: 8, eventName: "Photography Contest", eventCategory: "Cultural", eventDate: "2026-06-12" },

  { id: 9, eventName: "Cricket", eventCategory: "Sports", eventDate: "2026-06-14" },
  { id: 10, eventName: "Football", eventCategory: "Sports", eventDate: "2026-06-14" },
  { id: 11, eventName: "Volleyball", eventCategory: "Sports", eventDate: "2026-06-14" },
  { id: 12, eventName: "Badminton", eventCategory: "Sports", eventDate: "2026-06-14" }
];

//  STORE ALWAYS (for update)
localStorage.setItem("events", JSON.stringify(defaultEvents));

// LOAD FROM STORAGE
let events = JSON.parse(localStorage.getItem("events")) || [];
let registrations = JSON.parse(localStorage.getItem("registrations")) || [];

//  DISPLAY EVENTS
function displayEvents(data) {
    const container = document.getElementById("eventContainer");
    container.innerHTML = "";

    if (data.length === 0) {
        container.innerHTML = "<h2>No events found 😞</h2>";
        return;
    }

    data.forEach(e => {

        container.innerHTML += `
        <div class="card">
            <h2>${e.eventName}</h2>

            <span class="category ${e.eventCategory}">
                ${e.eventCategory}
            </span>

            <p>📅 ${new Date(e.eventDate).toDateString()}</p>

            <button onclick="registerEvent(${e.id})">
                Register
            </button>
        </div>
        `;
    });
}

// ✅ FILTER + SEARCH + DATE
function updateEvents() {

    let result = [...events];

    // SEARCH
    const text = document.getElementById("searchInput").value.toLowerCase();
    result = result.filter(e =>
        e.eventName.toLowerCase().includes(text)
    );

    // CATEGORY
    const category = document.getElementById("categoryFilter").value;
    if (category !== "all") {
        result = result.filter(e => e.eventCategory === category);
    }

    // DATE
    const date = document.getElementById("dateFilter").value;
    if (date !== "all") {
        result = result.filter(e => e.eventDate === date);
    }

    displayEvents(result);
}

// ✅ REGISTER FUNCTION
function registerEvent(id) {

    const selected = events.find(e => e.id === id);

    if (!registrations.some(e => e.id === id)) {
        registrations.push(selected);
        localStorage.setItem("registrations", JSON.stringify(registrations));
        alert("✅ Registered Successfully!");
    } else {
        alert("⚠️ Already Registered!");
    }
}
// ✅ EVENTS
document.getElementById("searchInput").addEventListener("keyup", updateEvents);
document.getElementById("categoryFilter").addEventListener("change", updateEvents);
document.getElementById("dateFilter").addEventListener("change", updateEvents);
// ✅ INITIAL LOAD
displayEvents(events);
localStorage.removeItem("events");

localStorage.removeItem("registrations");