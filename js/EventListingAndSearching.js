// EVENTS DATA (AUTO LOAD)
const defaultEvents = [
  { id: 1, eventName: "Hackathon", eventCategory: "Technical", eventDate: "2026-06-10", image: "../images/hackathon.jpg", description: "<strong>About:</strong> A 24-hour intense coding competition to solve real-world problems.<br><br><strong>Rules:</strong><ul><li>Teams of 2-4 members.</li><li>Bring your own laptops.</li><li>Only original projects allowed.</li><li>No external help or plagiarism.</li><li>Adhere to the 24-hour time limit.</li></ul>" },
  { id: 2, eventName: "Coding Contest", eventCategory: "Technical", eventDate: "2026-06-10", image: "../images/coding.jpg", description: "<strong>About:</strong> Test your algorithmic thinking and speed in this competitive coding challenge.<br><br><strong>Rules:</strong><ul><li>Individual participation only.</li><li>Standard algorithms are permitted.</li><li>Time limits for each problem must be followed.</li><li>Use of online IDEs is restricted.</li><li>Final decision lies with the judges.</li></ul>" },
  { id: 3, eventName: "Technical Quiz", eventCategory: "Technical", eventDate: "2026-06-10", image: "../images/quiz.jpg", description: "<strong>About:</strong> A fast-paced quiz covering computer science fundamentals and emerging tech.<br><br><strong>Rules:</strong><ul><li>Teams of 2 members.</li><li>Strictly no mobile phones.</li><li>Fastest finger first for buzzer rounds.</li><li>Negative marking for wrong answers.</li><li>Quiz master's decision is final.</li></ul>" },
  { id: 4, eventName: "Paper Presentation", eventCategory: "Technical", eventDate: "2026-06-10", image: "../images/presentation.jpg", description: "<strong>About:</strong> Present your research papers and innovative ideas to a panel of experts.<br><br><strong>Rules:</strong><ul><li>Maximum 2 authors per paper.</li><li>Abstract submission is mandatory.</li><li>Presentation time: 10 minutes.</li><li>Q&A session: 5 minutes.</li><li>Format: PDF or PPTX.</li></ul>" },

  { id: 5, eventName: "Dance", eventCategory: "Cultural", eventDate: "2026-06-12", image: "../images/dance.jpg", description: "<strong>About:</strong> Solo and group dance performances across various genres.<br><br><strong>Rules:</strong><ul><li>Performance time: 4-6 minutes.</li><li>Submit track in MP3 format 2 hours prior.</li><li>Costumes must be appropriate.</li><li>No props that could damage the stage.</li><li>Judging based on expression, rhythm, and choreography.</li></ul>" },
  { id: 6, eventName: "Singing", eventCategory: "Cultural", eventDate: "2026-06-12", image: "../images/singing.jpg", description: "<strong>About:</strong> Vocal competition featuring classical, pop, and fusion performances.<br><br><strong>Rules:</strong><ul><li>Max time limit: 5 minutes.</li><li>Karaoke tracks allowed (no vocals).</li><li>Instruments permitted if unplugged/acoustic.</li><li>Genre should be mentioned at registration.</li><li>Quality of voice and pitch are key criteria.</li></ul>" },
  { id: 7, eventName: "Fashion Show", eventCategory: "Cultural", eventDate: "2026-06-12", image: "../images/fashion.jpg", description: "<strong>About:</strong> A glamorous runway show showcasing creativity and style.<br><br><strong>Rules:</strong><ul><li>Teams of 8-12 participants.</li><li>Time limit: 8 minutes including setup.</li><li>Theme-based costumes are mandatory.</li><li>Background music must be submitted early.</li><li>Vulgarity in dress or walk is disqualified.</li></ul>" },
  { id: 8, eventName: "Photography Contest", eventCategory: "Cultural", eventDate: "2026-06-12", image: "../images/photo.jpg", description: "<strong>About:</strong> Capture the essence of the fest through your lens.<br><br><strong>Rules:</strong><ul><li>Submit up to 3 original photos.</li><li>Photos must be taken on campus during fest.</li><li>Basic editing allowed (no manipulation).</li><li>Submit in JPEG format with EXIF data.</li><li>Theme will be announced on day one.</li></ul>" },

  { id: 9, eventName: "Cricket", eventCategory: "Sports", eventDate: "2026-06-14", image: "../images/cricket.jpg", description: "<strong>About:</strong> Inter-departmental T20 cricket tournament.<br><br><strong>Rules:</strong><ul><li>11 players per side.</li><li>Matches follow standard T20 rules.</li><li>Umpires' decisions are final and binding.</li><li>Proper sports gear is mandatory.</li><li>Abusive behavior leads to disqualification.</li></ul>" },
  { id: 10, eventName: "Football", eventCategory: "Sports", eventDate: "2026-06-14", image: "../images/football.jpg", description: "<strong>About:</strong> Thrilling 11-a-side football matches on the main ground.<br><br><strong>Rules:</strong><ul><li>Duration: 20-5-20 minutes.</li><li>Rolling substitutions allowed.</li><li>Yellow/Red card rules apply.</li><li>Studs are mandatory for play.</li><li>In case of a draw, penalty shootout occurs.</li></ul>" },
  { id: 11, eventName: "Volleyball", eventCategory: "Sports", eventDate: "2026-06-14", image: "../images/volleyball.jpg", description: "<strong>About:</strong> Competitive volleyball matches for men and women.<br><br><strong>Rules:</strong><ul><li>6 players per side.</li><li>Matches are best of 3 sets.</li><li>Standard rotation rules apply.</li><li>Net height follows federation standards.</li><li>Referee's whistle is the final call.</li></ul>" },
  { id: 12, eventName: "Badminton", eventCategory: "Sports", eventDate: "2026-06-14", image: "../images/badminton.jpg", description: "<strong>About:</strong> Singles and doubles badminton tournament in the indoor arena.<br><br><strong>Rules:</strong><ul><li>Standard BWF rules apply.</li><li>Non-marking shoes are mandatory.</li><li>Players must bring their own rackets.</li><li>Shuttles provided by the committee.</li><li>Knockout format for all rounds.</li></ul>" }
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