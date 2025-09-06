// -------- POST INTERNSHIP PAGE --------
const internshipForm = document.getElementById("internshipForm");

if (internshipForm) {
  internshipForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const internship = {
      company: document.getElementById("company").value,
      role: document.getElementById("role").value,
      stipend: document.getElementById("stipend").value,
      location: document.getElementById("location").value,
      referral: document.getElementById("referral").checked,
      paid: document.getElementById("paid").checked,
      description: document.getElementById("description").value,
      date: new Date().toLocaleDateString(),
    };

    let internships = JSON.parse(localStorage.getItem("internships")) || [];
    internships.push(internship);
    localStorage.setItem("internships", JSON.stringify(internships));

    alert("Internship posted successfully!");
    window.location.href = "index.html"; // go to list
  });
}

// -------- INTERNSHIP LIST PAGE --------
const main = document.querySelector(".main");

function loadInternships() {
  if (!main) return;

  let internships = JSON.parse(localStorage.getItem("internships")) || [];

  internships.forEach((intern) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <div class="card-left">
        <div class="company-logo">${intern.company[0]}</div>
        <div class="card-details">
          <h4>${intern.company}</h4>
          <p>${intern.role}</p>
          <p><b>Stipend:</b> ${intern.stipend || "N/A"} • <b>Location:</b> ${intern.location}</p>
          <div class="tags">
            ${intern.referral ? '<span class="tag">Referral</span>' : ""}
            ${intern.paid ? '<span class="tag">Paid</span>' : ""}
          </div>
        </div>
      </div>
      <div class="card-right">
        <button>Request Referral</button>
        <div class="rating"><span class="stars">★★★★☆</span> ${intern.date}</div>
      </div>
    `;

    main.appendChild(card);
  });
}

loadInternships();
