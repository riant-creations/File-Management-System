// Global utility functions and main application code
document.addEventListener("DOMContentLoaded", function () {
  // If no token exists, redirect to login page
  checkAuth();
});

// Check if user is authenticated
function checkAuth() {
  const token = localStorage.getItem("token");
  if (!token && !window.location.pathname.includes("login.html")) {
    window.location.href = "login.html";
  }
}

// Initialize dark/light mode
function initThemeToggle() {
  const currentTheme = localStorage.getItem("theme") || "light";
  document.body.setAttribute("data-theme", currentTheme);

  const themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      const currentTheme = document.body.getAttribute("data-theme");
      const newTheme = currentTheme === "light" ? "dark" : "light";

      document.body.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);

      // Update icon
      const icon = this.querySelector("i");
      if (newTheme === "dark") {
        icon.classList.replace("fa-moon", "fa-sun");
      } else {
        icon.classList.replace("fa-sun", "fa-moon");
      }
    });
  }
}

// Debounce function for performance
function debounce(func, wait, immediate) {
  let timeout;
  return function () {
    const context = this,
      args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// Toast notification system
function showToast(message, type = "info") {
  // Make sure toast container exists
  let toastContainer = document.getElementById("toast-container");
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.id = "toast-container";
    toastContainer.className = "toast-container";
    document.body.appendChild(toastContainer);
  }

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

// Handle archiving a file
async function handleArchive(fileId) {
  try {
    // Simulate API call to archive file
    console.log(`Archiving file with ID: ${fileId}`);

    // For demo purposes, we'll directly manipulate localStorage
    const files = JSON.parse(localStorage.getItem("files")) || [];
    const fileIndex = files.findIndex((f) => f.id === fileId);

    if (fileIndex !== -1) {
      files[fileIndex].archived = true;
      localStorage.setItem("files", JSON.stringify(files));

      // Update the UI
      moveFileToArchivedSection(fileId);

      showToast("File archived successfully", "success");
    } else {
      throw new Error("File not found");
    }
  } catch (error) {
    console.error("Error archiving file:", error);
    showToast("Error archiving file.", "error");
  }
}

// Move file to the archived section
function moveFileToArchivedSection(fileId) {
  // Find the file element in the "Files" section
  const fileElement = document.querySelector(`[data-file-id="${fileId}"]`);
  if (!fileElement) {
    console.error(`File with ID ${fileId} not found in the Files section.`);
    return;
  }

  // Get the category of the file
  const categoryList = fileElement.closest("ul");
  const category = categoryList.id.replace("-files", "");
  const archivedCategoryList = document.getElementById(
    `archived-${category}-files`
  );
  if (!archivedCategoryList) {
    console.error(`Archived category list for ${category} not found.`);
    return;
  }

  // Add the file to the archived section
  const files = JSON.parse(localStorage.getItem("files")) || [];
  const fileInfo = files.find((f) => f.id === fileId);

  if (fileInfo) {
    // Mark file as inactive with visual feedback
    fileElement.classList.add("inactive-file");

    // Disable all buttons in the original file
    const originalButtons = fileElement.querySelectorAll(
      ".file-actions button"
    );
    originalButtons.forEach((button) => {
      button.disabled = true;
    });

    // Add to archived section with animation
    addFileToArchivedCategory(category, fileInfo);

    console.log(
      `File with ID ${fileId} moved to archived category: ${category}`
    );
  }
}

// Handle deleting a file
async function handleDelete(fileId) {
  try {
    // Simulate API call to delete file
    console.log(`Deleting file with ID: ${fileId}`);

    // For demo purposes, we'll directly manipulate localStorage
    const files = JSON.parse(localStorage.getItem("files")) || [];
    const fileIndex = files.findIndex((f) => f.id === fileId);

    if (fileIndex !== -1) {
      files.splice(fileIndex, 1);
      localStorage.setItem("files", JSON.stringify(files));

      // Remove the element from UI with animation
      const fileElement = document.querySelector(`[data-file-id="${fileId}"]`);
      if (fileElement) {
        fileElement.style.animation = "fadeOut 0.3s forwards";
        setTimeout(() => {
          fileElement.remove();
        }, 300);
      }

      showToast("File deleted successfully", "success");
    } else {
      throw new Error("File not found");
    }
  } catch (error) {
    console.error("Error deleting file:", error);
    showToast("Error deleting file.", "error");
  }
}

// Handle file download
async function handleDownload(fileId) {
  try {
    // Get file info from localStorage
    const files = JSON.parse(localStorage.getItem("files")) || [];
    const fileInfo = files.find((f) => f.id === fileId);

    if (!fileInfo) {
      throw new Error("File not found");
    }

    // Show download starting toast
    showToast(`Downloading ${fileInfo.name}...`, "info");

    // In a real application, this would redirect to a download endpoint
    // For demo, we'll simulate a download after a delay
    setTimeout(() => {
      showToast(`${fileInfo.name} downloaded successfully`, "success");
    }, 1500);
  } catch (error) {
    console.error("Error downloading file:", error);
    showToast("Error downloading file.", "error");
  }
}
