// EVENTS DATA (AUTO LOAD)
const defaultEvents = [
  { id: 1, eventName: "Hackathon", eventCategory: "Technical", eventDate: "2026-06-10", image: "../images/hackathon.jpg" },
  { id: 2, eventName: "Coding Contest", eventCategory: "Technical", eventDate: "2026-06-10", image: "../images/coding.jpg" },
  { id: 3, eventName: "Technical Quiz", eventCategory: "Technical", eventDate: "2026-06-10", image: "../images/quiz.jpg" },
  { id: 4, eventName: "Paper Presentation", eventCategory: "Technical", eventDate: "2026-06-10", image: "../images/presentation.jpg" },

  { id: 5, eventName: "Dance", eventCategory: "Cultural", eventDate: "2026-06-12", image: "../images/dance.jpg" },
  { id: 6, eventName: "Singing", eventCategory: "Cultural", eventDate: "2026-06-12", image: "../images/singing.jpg" },
  { id: 7, eventName: "Fashion Show", eventCategory: "Cultural", eventDate: "2026-06-12", image: "../images/fashion.jpg" },
  { id: 8, eventName: "Photography Contest", eventCategory: "Cultural", eventDate: "2026-06-12", image: "../images/photo.jpg" },

  { id: 9, eventName: "Cricket", eventCategory: "Sports", eventDate: "2026-06-14", image: "../images/cricket.jpg" },
  { id: 10, eventName: "Football", eventCategory: "Sports", eventDate: "2026-06-14", image: "../images/football.jpg" },
  { id: 11, eventName: "Volleyball", eventCategory: "Sports", eventDate: "2026-06-14", image: "../images/volleyball.jpg" },
  { id: 12, eventName: "Badminton", eventCategory: "Sports", eventDate: "2026-06-14", image: "../images/badminton.jpg" }
];

//  STORE ALWAYS (for update)
localStorage.setItem("events", JSON.stringify(defaultEvents));

// LOAD FROM STORAGE
let events = JSON.parse(localStorage.getItem("events")) || [];

let countdownInterval;

/**
 * Updates all visible countdown timers on the page.
 */
function updateAllCountdowns() {
    const countdownElements = document.querySelectorAll(".event-timer");
    const now = new Date().getTime();

    countdownElements.forEach(el => {
        const eventDate = new Date(el.dataset.date).getTime();
        const distance = eventDate - now;

        if (distance < 0) {
            el.textContent = "EVENT STARTED";
            el.classList.add("expired");
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        el.textContent = `Time Left : ${days}d ${hours}h ${minutes}m ${seconds}s`;
    });
}

//  DISPLAY EVENTS
function displayEvents(data) {
    const container = document.getElementById("eventContainer");
    container.innerHTML = "";

    // Clear existing timer to prevent multiple intervals running
    if (countdownInterval) clearInterval(countdownInterval);

    if (data.length === 0) {
        container.innerHTML = "<h2>No events found </h2>";
        return;
    }

    let html = "";
    data.forEach(e => {
        html += `
        <div class="card">
            <img src="${e.image}" alt="${e.eventName}" class="event-img">
            <div class="card-content">
                <h2>${e.eventName}</h2>
                <span class="category ${e.eventCategory}">
                    ${e.eventCategory}
                </span>
                <p>📅 ${new Date(e.eventDate).toDateString()}</p>
                <div class="event-timer" data-date="${e.eventDate}">--:--:--</div>
                <button onclick="registerEvent(${e.id})">
                    Register
                </button>
            </div>
        </div>
        `;
    });
    container.innerHTML = html;

    // Start the global countdown updater
    updateAllCountdowns();
    countdownInterval = setInterval(updateAllCountdowns, 1000);
}
function registerEvent(eventId) {
        const selectedEvent = events.find((event) => event.id === eventId);

        localStorage.setItem("selectedEvent", JSON.stringify(selectedEvent));

        window.location.href = "register.html";
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
// function registerEvent(id) {

//     const selected = events.find(e => e.id === id);

//     if (!registrations.some(e => e.id === id)) {
//         registrations.push(selected);
//         localStorage.setItem("registrations", JSON.stringify(registrations));
//         alert("✅ Registered Successfully!");
//     } else {
//         alert("⚠️ Already Registered!");
//     }
// }
// ✅ EVENTS
document.getElementById("searchInput").addEventListener("keyup", updateEvents);
document.getElementById("categoryFilter").addEventListener("change", updateEvents);
document.getElementById("dateFilter").addEventListener("change", updateEvents);
// ✅ INITIAL LOAD
displayEvents(events);