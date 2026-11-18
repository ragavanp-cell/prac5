// EcoPulse Carbon - Interactive Flexbox Navigation & Carbon Estimator Engine

document.addEventListener("DOMContentLoaded", () => {
    // 1. Mobile Flexbox Menu Toggle
    const mobileMenuBtn = document.getElementById("mobileMenuBtn");
    const flexNavLinks = document.getElementById("flexNavLinks");

    if (mobileMenuBtn && flexNavLinks) {
        mobileMenuBtn.addEventListener("click", () => {
            flexNavLinks.classList.toggle("mobile-open");
        });
    }

    // 2. Click-support for Dropdown Menus on Touch/Mobile Screens
    const dropdownTriggers = document.querySelectorAll(".dropdown-trigger");
    dropdownTriggers.forEach(trigger => {
        trigger.addEventListener("click", (e) => {
            e.stopPropagation();
            const parent = trigger.parentElement;
            const isOpen = parent.classList.contains("open");
            document.querySelectorAll(".nav-item.dropdown").forEach(item => item.classList.remove("open"));
            if (!isOpen) {
                parent.classList.add("open");
            }
        });
    });

    document.addEventListener("click", () => {
        document.querySelectorAll(".nav-item.dropdown").forEach(item => item.classList.remove("open"));
    });

    // 3. Real-Time Carbon Footprint Calculator
    const elecInput = document.getElementById("electricityInput");
    const flightInput = document.getElementById("flightsInput");
    const teamInput = document.getElementById("teamSizeInput");

    const elecVal = document.getElementById("elecVal");
    const flightVal = document.getElementById("flightVal");
    const teamVal = document.getElementById("teamVal");
    const totalCo2 = document.getElementById("totalCo2");
    const reductionTip = document.getElementById("reductionTip");

    function updateCarbonEstimate() {
        const kwh = parseFloat(elecInput.value);
        const flights = parseFloat(flightInput.value);
        const team = parseFloat(teamInput.value);

        elecVal.textContent = kwh.toLocaleString();
        flightVal.textContent = flights;
        teamVal.textContent = team;

        // Emission factors (tCO2e): ~0.00041 t/kWh, ~0.09 t/flight-hr, ~0.066 t/employee
        const emissions = (kwh * 0.00041) + (flights * 0.09) + (team * 0.066);
        totalCo2.textContent = emissions.toFixed(2);

        if (flights * 0.09 > kwh * 0.00041) {
            reductionTip.textContent = "Aviation is your top driver. Shifting 30% of trips to virtual meetings cuts " + (flights * 0.09 * 0.3).toFixed(2) + " tCO₂e/mo.";
        } else {
            reductionTip.textContent = "Electricity is your primary source. Switching to 100% renewable tariffs cuts " + (kwh * 0.00041).toFixed(2) + " tCO₂e/mo.";
        }
    }

    if (elecInput && flightInput && teamInput) {
        elecInput.addEventListener("input", updateCarbonEstimate);
        flightInput.addEventListener("input", updateCarbonEstimate);
        teamInput.addEventListener("input", updateCarbonEstimate);
        updateCarbonEstimate();
    }

    // 4. Contact Form Submission Feedback
    const contactForm = document.getElementById("contactForm");
    const formFeedback = document.getElementById("formFeedback");

    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            formFeedback.textContent = "✓ Thank you! Our carbon advisory team will reach out within 24 hours.";
            contactForm.reset();
        });
    }

    // 5. Auth Modal Form Feedback
    const authForm = document.getElementById("authForm");
    const authFeedback = document.getElementById("authFeedback");
    if (authForm) {
        authForm.addEventListener("submit", (e) => {
            e.preventDefault();
            authFeedback.textContent = "✓ Demo session authenticated! Redirecting to sustainability telemetry...";
            setTimeout(() => {
                closeAuthModal();
                authFeedback.textContent = "";
                authForm.reset();
            }, 1400);
        });
    }
});

// Helper Functions for Plan Selection & Modals
function selectPlan(planName) {
    const selectField = document.getElementById("planSelectField");
    if (selectField) {
        selectField.value = planName;
    }
    document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
}

function openAuthModal(mode) {
    const modal = document.getElementById("authModal");
    const title = document.getElementById("modalTitle");
    const subtitle = document.getElementById("modalSubtitle");
    const submitBtn = document.getElementById("modalSubmitBtn");

    if (mode === "signup") {
        title.textContent = "Create Your EcoPulse Account";
        subtitle.textContent = "Start tracking Scope 1, 2 & 3 carbon emissions in minutes.";
        submitBtn.textContent = "Create Free Account";
    } else if (mode === "audit") {
        title.textContent = "Request Full GHG Audit";
        subtitle.textContent = "Sign in or register to export your verified baseline report.";
        submitBtn.textContent = "Start Audit";
    } else {
        title.textContent = "Log In to EcoPulse Dashboard";
        subtitle.textContent = "Access your live emissions ledger and offset certificates.";
        submitBtn.textContent = "Log In";
    }

    modal.classList.add("active");
}

function closeAuthModal() {
    document.getElementById("authModal").classList.remove("active");
}
