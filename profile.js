const userData = {
    name: "Alex Johnson",
    title: "Computer Science Student | Full Stack Developer",
    avatar:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop",
    savedInternships: [1, 2],
    projects: [
      {
        id: 1,
        title: "E-commerce Platform",
        description:
          "A full-stack e-commerce solution with React frontend and Node.js backend",
        status: "completed",
        techStack: ["React", "Node.js", "MongoDB", "Stripe"],
        media: { type: "image", url: "./assets/ecomm.jpg" },
        githubUrl: "https://github.com/alexj/ecommerce",
        liveUrl: "https://myecommerce.vercel.app",
        upvotes: 34,
        comments: 12,
        images: [
          "https://images.pexels.com/photos/273192/pexels-photo-273192.jpeg?auto=compress&cs=tinysrgb&w=600",
        ],
        collaborators: ["john@example.com", "sarah@example.com"],
      },
      {
        id: 2,
        title: "Task Management App",
        description:
          "A collaborative task management tool with real-time updates",
        status: "progress",
        media: { type: "image", url: "./assets/task.jpg" },
        techStack: ["Vue.js", "Firebase", "Tailwind CSS"],
        githubUrl: "https://github.com/alexj/taskapp",
        liveUrl: "",
        upvotes: 18,
        comments: 7,
        images: [
          "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=600",
        ],
        collaborators: [],
      },
      {
        id: 3,
        title: "Weather Dashboard",
        description:
          "Beautiful weather app with location-based forecasts and interactive maps",
        status: "completed",
        techStack: ["JavaScript", "Chart.js", "OpenWeather API"],
        githubUrl: "https://github.com/alexj/weather",
        liveUrl: "https://weather-dash.netlify.app",
        media: { type: "image", url: "./assets/weather.jpg" },
        upvotes: 56,
        comments: 23,
        images: [
          "https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=600",
        ],
        collaborators: ["mike@example.com"],
      },
    ],
    sessions: [
      {
        id: 1,
        mentorName: "Sarah Chen",
        mentorAvatar:
          "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop",
        topic: "System Design Interview Prep",
        date: "2025-01-15T14:00:00",
        duration: 60,
        status: "upcoming",
        price: 75,
      },
      {
        id: 2,
        mentorName: "Michael Rodriguez",
        mentorAvatar:
          "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop",
        topic: "Product Management Career Path",
        date: "2025-01-10T16:30:00",
        duration: 90,
        status: "completed",
        price: 85,
        rating: 5,
      },
    ],
    activity: [
      {
        type: "bookmark",
        title: "Bookmarked Frontend Developer Intern at TechStart",
        time: "2 hours ago",
        icon: "bookmark",
      },
      {
        type: "apply",
        title: "Applied to Data Science Intern at Analytics Corp",
        time: "1 day ago",
        icon: "paper-plane",
      },
      {
        type: "session",
        title: "Completed session with Michael Rodriguez",
        time: "3 days ago",
        icon: "video",
      },
      {
        type: "project",
        title: "Updated E-commerce Platform project",
        time: "5 days ago",
        icon: "code",
      },
      {
        type: "upvote",
        title: "Upvoted Mobile App Developer at AppWorks",
        time: "1 week ago",
        icon: "arrow-up",
      },
    ],
    savedInternshipsData: [
      {
        id: 1,
        title: "Frontend Developer Intern",
        company: "TechStart",
        url: "../assets/logo2.png",
        location: "Remote",
        stipend: "₹20,000/month",
        duration: "3 months",
        companyType: "Startup",
        workMode: "Remote",
        verified: true,
        deadline: 12,
        upvotes: 42,
        applied: false,
      },
      {
        id: 2,
        title: "Data Science Intern",
        company: "Analytics Corp",
        url: "../assets/logo1.png",
        location: "Bangalore",
        stipend: "₹15,000/month",
        duration: "6 months",
        companyType: "MNC",
        workMode: "In-Office",
        verified: false,
        deadline: 5,
        upvotes: 31,
        applied: true,
      },
    ],
  };
  
  // Initialization
  document.addEventListener("DOMContentLoaded", function () {
    renderSavedInternships();
    renderProjects();
    renderSessions();
    renderActivity();
  
    // Update saved count on load
    const countElement = document.querySelector("#savedTab .count");
    if (countElement) {
      countElement.textContent = `${userData.savedInternships.length} saved`;
    }
  
    // Handle project form submission
    const addProjectForm = document.getElementById("addProjectForm");
    if (addProjectForm) {
      addProjectForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const mediaFile = formData.get("media");
        let mediaData = null;
  
        if (mediaFile && mediaFile.size > 0) {
          if (mediaFile.type.startsWith("image")) {
            mediaData = {
              type: "image",
              url: URL.createObjectURL(mediaFile),
              name: mediaFile.name,
            };
          } else if (mediaFile.type.startsWith("video")) {
            mediaData = {
              type: "video",
              url: URL.createObjectURL(mediaFile),
              name: mediaFile.name,
            };
          }
        } else {
          mediaData = {
            type: "image",
            url: "assets/default.jpg",
            name: "default.jpg",
          };
        }
  
        const newProject = {
          id: userData.projects.length + 1,
          title:
            formData.get("title") ||
            e.target.querySelector('input[placeholder*="title"]').value,
          description:
            formData.get("description") ||
            e.target.querySelector("textarea").value,
          status:
            formData.get("status") || e.target.querySelector("select").value,
          techStack: (
            formData.get("techStack") ||
            e.target.querySelector('input[placeholder*="React"]').value
          )
            .split(",")
            .map((s) => s.trim()),
          githubUrl:
            formData.get("githubUrl") ||
            e.target.querySelector('input[placeholder*="github"]').value,
          liveUrl:
            formData.get("liveUrl") ||
            e.target.querySelector('input[placeholder*="yourproject"]').value,
          upvotes: 0,
          comments: 0,
          images: [],
          media: mediaData,
          collaborators: [],
        };
        console.log("New Project Created:", newProject);
        userData.projects.unshift(newProject);
        renderProjects();
        closeModal("addProjectModal");
        showNotification("Project added successfully!");
        e.target.reset();
      });
    }
  });
  
  // Tab Switching
  
  function showTab(tabName, event) {
    if (event) event.preventDefault();
  
    console.log(`Switching to tab: ${tabName}`);
  
    // Remove active state from all buttons
    document.querySelectorAll(".profile-tabs .btn").forEach((btn) => {
      btn.classList.remove("active");
    });
  
    // Add active class to clicked button
    if (event && event.target) {
      event.target.classList.add("active");
    }
  
    // Hide all tab content
    document.querySelectorAll(".tab-content").forEach((content) => {
      content.classList.remove("active");
      content.style.display = "none";
    });
  
    // Show the selected tab content
    const targetTab = document.getElementById(`${tabName}Tab`);
    if (targetTab) {
      targetTab.classList.add("active");
      targetTab.style.display = "block";
    } else {
      console.error(`Tab with id "${tabName}Tab" not found.`);
    }
  }
  
  //  Saved Internships
  
  function renderSavedInternships() {
    const container = document.getElementById("savedInternships");
    if (!container) return;
  
    const savedInternships = userData.savedInternshipsData.filter((internship) =>
      userData.savedInternships.includes(internship.id)
    );
  
    if (savedInternships.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 40px;">
          <i class="fas fa-bookmark" style="font-size: 48px; color: var(--gray-300); margin-bottom: 16px;"></i>
          <h3 style="color: var(--gray-600);">No saved internships yet</h3>
          <p style="color: var(--gray-500);">Start exploring and save internships you're interested in</p>
          <a href="index.html" class="btn-primary" style="margin-top: 16px; text-decoration: none;">Browse Internships</a>
        </div>
      `;
      return;
    }
  
    container.innerHTML = savedInternships
      .map(
        (internship) => `
          <div class="internship-card" data-id="${internship.id}">
            <div class="internship-header">
              <div class="company-info">
                <div class="company-logo">
                <img class="logo" src=${internship.url} alt="${
          internship.title
        }"/ >
                </div>
                <div class="company-details">
                  <h3>${internship.title}</h3>
                  <div class="company-name">${internship.company}</div>
                </div>
              </div>
              <div class="internship-actions">
                <button class="action-btn active" onclick="removeSavedInternship(${
                  internship.id
                })" title="Remove">
                  <i class="fas fa-bookmark"></i>
                </button>
              </div>
            </div>
            <div class="internship-tags">
              ${
                internship.verified
                  ? '<span class="tag verified">✓ Verified</span>'
                  : ""
              }
              <span class="tag ${internship.workMode}">${
          internship.workMode
        }</span>
              <span class="tag ${internship.companyType}">${
          internship.companyType
        }</span>
            </div>
            <div class="internship-details">
              <div class="detail-row"><span class="detail-label">Duration:</span> <span class="detail-value">${
                internship.duration
              }</span></div>
              <div class="detail-row"><span class="detail-label">Stipend:</span> <span class="detail-value stipend">${
                internship.stipend
              }</span></div>
              <div class="detail-row"><span class="detail-label">Location:</span> <span class="detail-value">${
                internship.location
              }</span></div>
            </div>
            <div class="internship-timer">
              Closes in ${internship.deadline} days
            </div>
            <div class="internship-footer">
              <div class="upvote-section">
                <span style="font-size: 14px; color: var(--gray-600);">${
                  internship.upvotes
                } upvotes</span>
              </div>
              <button class="apply-btn" onclick="applyToInternship(${
                internship.id
              })">
                ${internship.applied ? "Applied" : "Apply Now"}
              </button>
            </div>
          </div>
        `
      )
      .join("");
  
    // Update saved count
    const countElement = document.querySelector("#savedTab .count");
    if (countElement) {
      countElement.textContent = `${savedInternships.length} saved`;
    }
  }
  
  //  Projects
  
  function renderProjects() {
    const container = document.getElementById("projectsList");
    if (!container) return;
  
    container.innerHTML = userData.projects
      .map(
        (project) => `
          <div class="project-card" data-id="${project.id}">
            <div class="project-header">
              <div>
                <h3 class="project-title">${project.title}</h3>
                <span class="project-status status-${project.status}">${
          project.status
        }</span>
              </div>
            </div>
                   ${
                     project.media
                       ? `
            <div class="project-media">
              ${
                project.media.type === "image"
                  ? `
                <img src="${project.media.url}" alt="${project.media.name}" class="project-image" />
              `
                  : project.media.type === "video"
                  ? `
                <video class="project-video" controls>
                  <source src="${project.media.url}" type="video/mp4">
                  Your browser does not support the video tag.
                </video>
              `
                  : ""
              }
            </div>
          `
                       : ""
                   }
            <p class="project-description">${project.description}</p>
            <div class="tech-stack">
              ${project.techStack
                .map((tech) => `<span class="tech-tag">${tech}</span>`)
                .join("")}
            </div>
            <div class="project-stats">
              <div class="stat"><i class="fas fa-arrow-up"></i><span>${
                project.upvotes
              }</span></div>
              <div class="stat"><i class="fas fa-comment"></i><span>${
                project.comments
              }</span></div>
              <div class="stat"><i class="fas fa-users"></i><span>${
                project.collaborators.length
              }</span></div>
            </div>
            <div class="project-links">
              ${
                project.githubUrl
                  ? `<a href="${project.githubUrl}" class="project-link" target="_blank"><i class="fab fa-github"></i> GitHub</a>`
                  : ""
              }
              ${
                project.liveUrl
                  ? `<a href="${project.liveUrl}" class="project-link" target="_blank"><i class="fas fa-external-link-alt"></i> Live Demo</a>`
                  : ""
              }
            </div>
          </div>
        `
      )
      .join("");
  }
  
  //  Mentor Sessions
  
  function renderSessions() {
    const container = document.getElementById("sessionsList");
    if (!container) return;
  
    container.innerHTML = userData.sessions
      .map(
        (session) => `
          <div class="session-card">
            <div class="session-info">
              <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
                <img src="${session.mentorAvatar}" alt="${
          session.mentorName
        }" style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover;">
                <div>
                  <h3>${session.topic}</h3>
                  <div class="session-details">with ${session.mentorName} • ${
          session.duration
        } min • $${session.price}</div>
                </div>
              </div>
              <div class="session-details">
                ${new Date(session.date).toLocaleDateString()} at ${new Date(
          session.date
        ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </div>
            </div>
            <div style="display: flex; align-items: center; gap: 12px;">
              <span class="session-status status-${session.status}">${
          session.status
        }</span>
              ${
                session.status === "completed" && session.rating
                  ? `<div class="rating">${generateStars(session.rating)}</div>`
                  : ""
              }
            </div>
          </div>
        `
      )
      .join("");
  }
  
  //  User Activity
  
  function renderActivity() {
    const container = document.getElementById("activityList");
    if (!container) return;
  
    container.innerHTML = userData.activity
      .map(
        (activity) => `
          <div class="activity-item">
            <div class="activity-icon"><i class="fas fa-${activity.icon}"></i></div>
            <div class="activity-content">
              <div class="activity-title">${activity.title}</div>
              <div class="activity-time">${activity.time}</div>
            </div>
          </div>
        `
      )
      .join("");
  }
  
  //Remove saved internship
  function removeSavedInternship(id) {
    const idIndex = userData.savedInternships.indexOf(id);
    if (idIndex > -1) {
      userData.savedInternships.splice(idIndex, 1);
    }
  
    // Remove the full internship object from savedInternshipsData array
    const objIndex = userData.savedInternshipsData.findIndex((i) => i.id === id);
    if (objIndex > -1) {
      userData.savedInternshipsData.splice(objIndex, 1);
    }
  
    renderSavedInternships();
    showNotification("Internship removed from saved list");
  
    const countElement = document.querySelector("#savedTab .count");
    if (countElement) {
      countElement.textContent = `${userData.savedInternships.length} saved`;
    }
  }
  
  // star rating
  
  function generateStars(rating) {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  }
  
  //  Modal handling
  
  function showAddProjectModal(event) {
    if (event) event.preventDefault();
  
    const modal = document.getElementById("addProjectModal");
    if (!modal) return;
  
    modal.classList.add("active");
    // }
  }
  
  function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
      modal.classList.remove("active");
      modal.style.display = "none";
    }
  }
  
  //  Notification
  
  function showNotification(message) {
    alert(message);
  }