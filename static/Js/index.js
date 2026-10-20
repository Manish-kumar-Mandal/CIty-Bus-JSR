/* ==========================================================================
   GLOBAL INTERACTIONS AND INTERACTIVE WIDGETS (WITH DYNAMIC EYE PASSWORD TOGGLE)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {

    // 1. PASSWORD VISIBILITY TOGGLE (EYE ICON WORKABLE ENGINE)
    document.addEventListener("click", function (e) {

        if (e.target.classList.contains("fa-eye") ||
            e.target.classList.contains("fa-eye-slash")) {

            const input = e.target.previousElementSibling;

            if (!input) return;

            if (input.type === "password") {
                input.type = "text";
                e.target.classList.remove("fa-eye");
                e.target.classList.add("fa-eye-slash");
            } else {
                input.type = "password";
                e.target.classList.remove("fa-eye-slash");
                e.target.classList.add("fa-eye");
            }
        }

    });

    // 2. DYNAMIC SEARCH FILTER FOR SCHEDULE PAGE
    const searchInput = document.querySelector(".form-input");
    const busCards = document.querySelectorAll(".bus-card");

    if (searchInput && busCards.length > 0) {
        searchInput.addEventListener("input", (e) => {
            const query = e.target.value.toLowerCase().trim();

            busCards.forEach((card) => {
                const routeText = card.querySelector(".bus-route")?.textContent.toLowerCase() || "";
                const nameText = card.querySelector(".bus-name")?.textContent.toLowerCase() || "";

                if (routeText.includes(query) || nameText.includes(query)) {
                    card.style.display = "";
                    card.style.opacity = "1";
                } else {
                    card.style.display = "none";
                }
            });
        });
    }

    // 3. MODAL TOGGLE FOR BUS CARD DETAILS ("VIEW DETAILS" / "VIEW ROUTE")
    const detailButtons = document.querySelectorAll(".view-details-btn, .route-btn");

    detailButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
            const targetHref = button.getAttribute("href");
            if (!targetHref || targetHref === "#") {
                e.preventDefault();
                const busName = button.closest(".bus-card")?.querySelector(".bus-name h4, .bus-name")?.textContent.trim() || "Selected Bus";
                alert(`Fetching live route parameters and active seat layout for: ${busName}\n\nThis interface component will map directly to our Django booking engine next!`);
            }
        });
    });

    // 4. INTERACTIVE MAIN FORM VALIDATION & ENHANCEMENTS
    const mainForm = document.querySelector("form");
    if (mainForm) {
        const fromInput = mainForm.querySelector('input[placeholder*="From"], select[name*="from"]');
        const toInput = mainForm.querySelector('input[placeholder*="To"], select[name*="to"]');

        if (fromInput && toInput) {
            const validateLocations = () => {
                if (fromInput.value.trim() !== "" && fromInput.value.toLowerCase() === toInput.value.toLowerCase()) {
                    toInput.style.borderColor = "#f43f5e";
                    return false;
                } else {
                    toInput.style.borderColor = "";
                    return true;
                }
            };

            fromInput.addEventListener("change", validateLocations);
            toInput.addEventListener("change", validateLocations);

            mainForm.addEventListener("submit", (e) => {
                if (!validateLocations()) {
                    e.preventDefault();
                    alert("⚠️ Pick-up point and Destination cannot be the same city! Please verify your inputs.");
                }
            });
        }

        const dateInput = mainForm.querySelector('input[type="date"]');
        if (dateInput) {
            const today = new Date().toISOString().split('T')[0];
            dateInput.setAttribute("min", today);
        }
    }
    //  clock 
    function updateClock() {
        const clock = document.getElementById("live-clock");

        const now = new Date();

        const date = now.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });

        const time = now.toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",

            hour12: true
        });

        clock.innerHTML = `📅 ${date} | 🕒 ${time}`;
    }

    updateClock();
    setInterval(updateClock, 1000);


});
