document.addEventListener("DOMContentLoaded", function () {
  // Check if user is authenticated
  checkAuth();

  // Load user data
  loadUserData();

  // Initialize event listeners
  initEventListeners();

  // Load recent activities
  loadRecentActivities();
});

// Check if user is authenticated
function checkAuth() {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "login.html";
  }
}

// Load user data from localStorage
function loadUserData() {
  const userData = JSON.parse(localStorage.getItem("user")) || {
    name: "John Doe Alabi",
    id: "20/52HA123",
    department: "Computer Science",
    level: "400 Level",
    program: "B.Sc Computer Science",
  };

  // Update UI with user data
  document.getElementById("user-name").textContent =
    userData.name.split(" ")[0];
  document.getElementById("student-full-name").textContent = userData.name;

  // Update student info
  const studentInfo = document.getElementById("student-info");
  studentInfo.innerHTML = `
       Identity Number: ${userData.id} <br/>
       Department of ${userData.department} <br/>
       ${userData.level}, ${userData.program} <br/>
       <br/>
       Current Session: 2024/2025 Academic Session <br/>
       Current Semester: Rain Semester
   `;
}

// Initialize all event listeners
function initEventListeners() {
  // Quick link buttons
  document.getElementById("files-link").addEventListener("click", function () {
    window.location.href = "file-management.html";
  });

  document
    .getElementById("courses-link")
    .addEventListener("click", function () {
      showToast("Courses module coming soon!", "info");
    });

  document
    .getElementById("results-link")
    .addEventListener("click", function () {
      showToast("Results module coming soon!", "info");
    });

  document
    .getElementById("calendar-link")
    .addEventListener("click", function () {
      showToast("Academic Calendar module coming soon!", "info");
    });

  // Profile button
  document.getElementById("profile-btn").addEventListener("click", function () {
    openProfileModal();
  });

  // Close profile modal
  document
    .getElementById("close-profile-modal")
    .addEventListener("click", closeProfileModal);
  document
    .getElementById("close-profile-btn")
    .addEventListener("click", closeProfileModal);

  // Edit profile
  document
    .getElementById("edit-profile-btn")
    .addEventListener("click", function () {
      showToast("Profile editing coming soon!", "info");
    });

  // Logout button
  document.getElementById("logout-fab").addEventListener("click", function () {
    openLogoutModal();
  });

  // Close logout modal
  document
    .getElementById("close-logout-modal")
    .addEventListener("click", closeLogoutModal);
  document
    .getElementById("cancel-logout-btn")
    .addEventListener("click", closeLogoutModal);

  // Confirm logout
  document
    .getElementById("confirm-logout-btn")
    .addEventListener("click", function () {
      logout();
    });

  // Close modals when clicking outside
  window.addEventListener("click", function (event) {
    const profileModal = document.getElementById("profile-modal");
    const logoutModal = document.getElementById("logout-modal");

    if (event.target === profileModal) {
      closeProfileModal();
    }

    if (event.target === logoutModal) {
      closeLogoutModal();
    }
  });
}

// Load recent activities
function loadRecentActivities() {
  // Simulate loading activities from an API
  const activities = [
    {
      type: "upload",
      description: "Uploaded School Fees Receipt",
      timestamp: "2025-07-15T10:30:00",
      icon: "fa-upload",
    },
    {
      type: "view",
      description: "Viewed Course Form",
      timestamp: "2025-07-14T15:45:00",
      icon: "fa-eye",
    },
    {
      type: "archive",
      description: "Archived WAEC Result",
      timestamp: "2025-07-12T09:20:00",
      icon: "fa-archive",
    },
    {
      type: "login",
      description: "Logged in to the portal",
      timestamp: "2025-07-10T08:15:00",
      icon: "fa-sign-in-alt",
    },
  ];

  const activityList = document.getElementById("activity-list");
  activityList.innerHTML = "";

  activities.forEach((activity, index) => {
    const activityItem = document.createElement("div");
    activityItem.className = "activity-item";

    // Format date
    const date = new Date(activity.timestamp);
    const formattedDate = date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    activityItem.innerHTML = `
           <div class="activity-icon">
               <i class="fas ${activity.icon}"></i>
           </div>
           <div class="activity-content">
               <div class="activity-description">${activity.description}</div>
               <div class="activity-time">${formattedDate}</div>
           </div>
       `;

    // Add animation delay based on index
    activityItem.style.animationDelay = `${index * 0.1}s`;

    activityList.appendChild(activityItem);
  });
}

// Open profile modal
function openProfileModal() {
  const userData = JSON.parse(localStorage.getItem("user")) || {
    name: "John Doe Alabi",
    id: "20/52HA123",
    department: "Computer Science",
    level: "400 Level",
    program: "B.Sc Computer Science",
  };

  const profileDetails = document.querySelector(".profile-details");
  profileDetails.innerHTML = `
       <div class="profile-header">
           <div class="profile-avatar">
               <img src="/avatar.png" alt="Student Avatar">
           </div>
           <h3>${userData.name}</h3>
           <p class="profile-id">${userData.id}</p>
       </div>
       
       <div class="profile-info">
           <dl>
               <dt><i class="fas fa-graduation-cap"></i> Department</dt>
               <dd>${userData.department}</dd>
               
               <dt><i class="fas fa-layer-group"></i> Level</dt>
               <dd>${userData.level}</dd>
               
               <dt><i class="fas fa-book"></i> Program</dt>
               <dd>${userData.program}</dd>
               
               <dt><i class="fas fa-calendar-alt"></i> Current Session</dt>
               <dd>2024/2025 Academic Session</dd>
               
               <dt><i class="fas fa-cloud-rain"></i> Current Semester</dt>
               <dd>Rain Semester</dd>
               
               <dt><i class="fas fa-envelope"></i> Email</dt>
               <dd>${userData.id.toLowerCase()}@student.unilorin.edu.ng</dd>
               
               <dt><i class="fas fa-phone"></i> Phone</dt>
               <dd>+234 801 234 5678</dd>
               
               <dt><i class="fas fa-home"></i> Address</dt>
               <dd>Student Hostel, University of Ilorin Campus, Ilorin</dd>
           </dl>
       </div>
   `;

  document.getElementById("profile-modal").classList.add("active");
}

// Close profile modal
function closeProfileModal() {
  document.getElementById("profile-modal").classList.remove("active");
}

// Open logout modal
function openLogoutModal() {
  document.getElementById("logout-modal").classList.add("active");
}

// Close logout modal
function closeLogoutModal() {
  document.getElementById("logout-modal").classList.remove("active");
}

// Logout function
function logout() {
  // Clear localStorage
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  // Show logout toast
  showToast("Logging out...", "info");

  // Redirect to login page
  setTimeout(() => {
    window.location.href = "login.html";
  }, 1000);
}

// Toast notification system
function showToast(message, type = "info") {
  const toastContainer = document.getElementById("toast-container");

  // Create toast element
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;

  // Set icon based on toast type
  let icon;
  switch (type) {
    case "success":
      icon = "check-circle";
      break;
    case "error":
      icon = "exclamation-circle";
      break;
    case "warning":
      icon = "exclamation-triangle";
      break;
    default:
      icon = "info-circle";
  }

  // Set toast content
  toast.innerHTML = `
       <div class="toast-content">
           <i class="fas fa-${icon} toast-icon"></i>
           <span>${message}</span>
       </div>
       <button class="toast-close"><i class="fas fa-times"></i></button>
       <div class="toast-animation"></div>
   `;

  // Add toast to container
  toastContainer.appendChild(toast);

  // Add click listener to close button
  toast.querySelector(".toast-close").addEventListener("click", function () {
    toast.remove();
  });

  // Auto-remove toast after 3 seconds
  setTimeout(() => {
    if (toast.parentNode) {
      toast.remove();
    }
  }, 3000);
}
