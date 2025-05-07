document.addEventListener("DOMContentLoaded", function () {
  // Check if user is authenticated
  checkAuth();

  // Load user data
  loadUserData();

  // Initialize file upload form
  initFileUpload();
  displayFilePreview();

  // Initialize file list and categories
  initFileCategories();
  initFilePreview();

  // Initialize scroll to top button
  initScrollToTop();
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
  };

  // Update UI with user data
  document.getElementById("user-name").textContent =
    userData.name.split(" ")[0];
}
function checkAuth() {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "login.html";
  }
}

// Add these functions right after your existing checkAuth function
function initFileUpload() {
  const fileInput = document.getElementById("fileInput");
  const fileDropArea = document.getElementById("file-drop-area");
  const filePreview = document.getElementById("file-preview");
  const previewFileName = document.getElementById("preview-file-name");
  const previewFileMeta = document.getElementById("preview-file-meta");
  const removeFileBtn = document.getElementById("remove-file-btn");
  const uploadForm = document.getElementById("upload-form");
  const uploadProgress = document.getElementById("upload-progress");
  const uploadProgressBar = document.getElementById("upload-progress-bar");
  const uploadProgressText = document.getElementById("upload-progress-text");
  const uploadStatus = document.getElementById("upload-status");

  // File input change handler
  fileInput.addEventListener("change", function () {
    if (this.files.length > 0) {
      displayFilePreview(this.files[0]);
    }
  });

  // Handle drag and drop
  ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
    fileDropArea.addEventListener(eventName, preventDefaults, false);
  });

  function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  ["dragenter", "dragover"].forEach((eventName) => {
    fileDropArea.addEventListener(eventName, highlight, false);
  });

  ["dragleave", "drop"].forEach((eventName) => {
    fileDropArea.addEventListener(eventName, unhighlight, false);
  });

  function highlight() {
    fileDropArea.classList.add("drag-over");
  }

  function unhighlight() {
    fileDropArea.classList.remove("drag-over");
  }

  fileDropArea.addEventListener("drop", handleDrop, false);

  function handleDrop(e) {
    const dt = e.dataTransfer;
    const files = dt.files;

    if (files.length > 0) {
      fileInput.files = files;
      displayFilePreview(files[0]);
    }
  }

  // Display file preview
  function displayFilePreview(file) {
    // Update preview elements
    previewFileName.textContent = file.name;

    // Get file type and format size
    const fileType = getFileType(file);
    const fileSize = formatFileSize(file.size);
    previewFileMeta.textContent = `${fileType}, ${fileSize}`;

    // Show preview section
    filePreview.classList.add("active");

    // Animate preview appearance
    filePreview.style.animation = "fadeIn 0.3s";
  }

  // Get human-readable file type
  function getFileType(file) {
    const extension = file.name.split(".").pop().toLowerCase();

    switch (extension) {
      case "pdf":
        return "PDF Document";
      case "doc":
      case "docx":
        return "Word Document";
      case "jpg":
      case "jpeg":
        return "JPEG Image";
      case "png":
        return "PNG Image";
      default:
        return "Unknown File Type";
    }
  }

  // Format file size to human-readable format
  function formatFileSize(bytes) {
    // Handle invalid inputs
    if (typeof bytes !== "number" || bytes < 0 || isNaN(bytes)) {
      return "Unknown size";
    }

    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }

  // Remove file handler
  if (removeFileBtn) {
    removeFileBtn.addEventListener("click", function () {
      // Clear the file input
      fileInput.value = "";

      // Reset the preview area
      if (previewFileName) previewFileName.textContent = "";
      if (previewFileMeta) previewFileMeta.textContent = "";

      // Hide the preview section
      if (filePreview) {
        filePreview.classList.remove("active");
        filePreview.style.animation = "none";
      }

      // Reset the drag area
      if (fileDropArea) {
        fileDropArea.classList.remove("drag-over");
      }

      // Clear any upload progress
      if (uploadProgress) {
        uploadProgress.classList.remove("active");
      }
    });
  }

  // Modify your existing upload form submit handler
  uploadForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const fileCategory = document.getElementById("file-category").value;
    const file = fileInput.files[0];

    if (!fileCategory) {
      showToast("Please select a file category", "error");
      return;
    }

    if (!file) {
      showToast("Please select a file to upload", "error");
      return;
    }
  });
}

// Get file icon class based on file name
function getFileIconClass(fileName) {
  if (!fileName) return "fa-file";

  const ext = fileName.split(".").pop().toLowerCase();

  const iconMap = {
    pdf: "fa-file-pdf",
    doc: "fa-file-word",
    docx: "fa-file-word",
    xls: "fa-file-excel",
    xlsx: "fa-file-excel",
    ppt: "fa-file-powerpoint",
    pptx: "fa-file-powerpoint",
    jpg: "fa-file-image",
    jpeg: "fa-file-image",
    png: "fa-file-image",
    gif: "fa-file-image",
    txt: "fa-file-alt",
    zip: "fa-file-archive",
    rar: "fa-file-archive",
  };

  return iconMap[ext] || "fa-file";
}

// Get file type from file name
function getFileTypeFromName(fileName) {
  if (!fileName) return "Unknown File Type";

  const extension = fileName.split(".").pop().toLowerCase();

  const typeMap = {
    pdf: "PDF Document",
    doc: "Word Document",
    docx: "Word Document",
    xls: "Excel Spreadsheet",
    xlsx: "Excel Spreadsheet",
    ppt: "PowerPoint Presentation",
    pptx: "PowerPoint Presentation",
    jpg: "JPEG Image",
    jpeg: "JPEG Image",
    png: "PNG Image",
    gif: "GIF Image",
    txt: "Text Document",
    zip: "ZIP Archive",
    rar: "RAR Archive",
  };

  return typeMap[extension] || "Unknown File Type";
}

// Get human-readable file type
function getFileType(file) {
  if (!file || !file.name) return "Unknown File Type";

  const extension = file.name.split(".").pop().toLowerCase();

  return getFileTypeFromName(file.name) || "Unknown File Type";
}

// Format file size to human-readable format
function formatFileSize(bytes) {
  // Handle invalid inputs
  if (typeof bytes !== "number" || bytes < 0 || isNaN(bytes)) {
    return "Unknown size";
  }

  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

// Initialize scroll to top button
function initScrollToTop() {
  const scrollBtn = document.getElementById("scroll-top-btn");

  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 300) {
      scrollBtn.style.display = "flex";
      scrollBtn.style.opacity = "1";
    } else {
      scrollBtn.style.opacity = "0";
      setTimeout(() => {
        if (window.pageYOffset <= 300) {
          scrollBtn.style.display = "none";
        }
      }, 300);
    }
  });
  scrollBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
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

// Call this when the page loads
window.addEventListener("load", checkAuth);
// Handle archiving a file
async function handleArchive(fileId) {
  try {
    console.log(`Archiving file with ID: ${fileId}`);
    const response = await fetch(
      `http://localhost:8080/api/files/${fileId}/archive`,
      {
        method: "POST",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to archive file");
    }

    alert("File archived successfully");

    // Move the file to the archived section
    console.log(`Calling moveFileToArchivedSection for file ID: ${fileId}`);
    moveFileToArchivedSection(fileId);
  } catch (error) {
    console.error("Error archiving file:", error);
    alert("Error archiving file.");
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
  const category = fileElement.closest("ul").id.replace("-files", "");
  const archivedCategoryList = document.getElementById(
    `archived-${category}-files`
  );
  if (!archivedCategoryList) {
    console.error(`Archived category list for ${category} not found.`);
    return;
  }

  // Create a new list item for the archived file
  const archivedItem = document.createElement("li");
  archivedItem.setAttribute("data-file-id", fileId);

  // Copy the file name
  const fileName = fileElement.querySelector(".file-name").textContent;
  const fileNameElement = document.createElement("span");
  fileNameElement.className = "file-name";
  fileNameElement.textContent = fileName;

  // Create actions container with download and delete buttons only
  const actions = document.createElement("div");
  actions.className = "file-actions";
  actions.innerHTML = `
      <button class="download-btn" onclick="handleDownload('${fileId}')" title="Download">
          <i class="fa-solid fa-download"></i>
      </button>
      <button class="delete-btn" onclick="handleDelete('${fileId}')" title="Delete">
          <i class="fa-solid fa-trash"></i>
      </button>
  `;

  // Add the elements to the archived item
  archivedItem.appendChild(fileNameElement);
  archivedItem.appendChild(actions);

  // Add the archived item to the archived category list
  archivedCategoryList.appendChild(archivedItem);

  // Instead of removing the original file, make it inactive
  fileElement.classList.add("inactive-file");

  // Disable all buttons in the original file
  const originalButtons = fileElement.querySelectorAll(".file-actions button");
  originalButtons.forEach((button) => {
    button.disabled = true;
  });

  console.log(`File with ID ${fileId} moved to archived category: ${category}`);
}

// Handle deleting a file
async function handleDelete(fileId) {
  try {
    const response = await fetch(`http://localhost:8080/api/files/${fileId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete file");
    }

    alert("File deleted successfully");
    location.reload(); // Reload to update the file list after deletion
  } catch (error) {
    console.error("Error deleting file:", error);
    alert("Error deleting file.");
  }
}

// Handle file upload
document
  .getElementById("upload-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const fileInput = document.getElementById("fileInput");
    const fileCategory = document.getElementById("file-category").value;
    const file = fileInput.files[0];

    if (!file) {
      showToast("Please select a file", "error");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("category", fileCategory);

    try {
      const response = await fetch("http://localhost:8080/api/files/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to upload file");

      const fileInfo = await response.json();

      // Add the actual file size to fileInfo
      const fileInfoWithSize = {
        ...fileInfo,
        size: file.size, // Get the actual file size from the File object
        uploadDate: new Date().toISOString(),
      };

      addFileToCategory(fileCategory, fileInfoWithSize);
      showToast("File uploaded successfully!", "success");

      // Reset form
      event.target.reset();
    } catch (error) {
      console.error("Error uploading file:", error);
      showToast("Error uploading file", "error");
    }
  });

// Add file to the appropriate category list
function addFileToCategory(category, fileInfo) {
  const categoryList = document.getElementById(`${category}-files`);
  if (!categoryList) return;

  const listItem = document.createElement("li");
  listItem.setAttribute("data-file-id", fileInfo.id);

  // Create file info container
  const fileInfoContainer = document.createElement("div");
  fileInfoContainer.className = "file-info-container";

  // Create file name and details
  const fileName = document.createElement("span");
  fileName.className = "file-name";
  fileName.innerHTML = `<i class="fas ${getFileIconClass(
    fileInfo.name
  )}"></i> ${fileInfo.name}`;

  // Create file details
  const fileDetails = document.createElement("div");
  fileDetails.className = "file-details";

  // Format file size
  const fileSize =
    typeof fileInfo.size === "number" && fileInfo.size > 0
      ? formatFileSize(fileInfo.size)
      : "Unknown size";

  // Format upload date - use server timestamp instead of current date
  const uploadDate = fileInfo.uploadDate
    ? new Date(fileInfo.uploadDate)
    : new Date(fileInfo.createdAt || Date.now()); // fallback to createdAt or current time

  fileDetails.innerHTML = `
    <span class="file-date"><i class="fas fa-calendar-alt"></i> ${uploadDate.toLocaleDateString(
      "en-US",
      {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    )}
    <span class="file-size"><i class="fas fa-weight-hanging"></i> ${fileSize}</span>
  `;

  // Create actions container
  const actions = document.createElement("div");
  actions.className = "file-actions";
  actions.innerHTML = `
    <button class="download-btn" title="Download">
      <i class="fa-solid fa-download"></i>
    </button>
    <button class="archive-btn" title="Archive">
      <i class="fa-solid fa-cloud"></i>
    </button>
    <button class="delete-btn" title="Delete">
      <i class="fa-solid fa-trash"></i>
    </button>
  `;

  // Add event listeners
  fileName.addEventListener("click", () => showFilePreview(fileInfo));
  actions
    .querySelector(".download-btn")
    .addEventListener("click", () => handleDownload(fileInfo.id));
  actions
    .querySelector(".archive-btn")
    .addEventListener("click", () => handleArchive(fileInfo.id));
  actions
    .querySelector(".delete-btn")
    .addEventListener("click", () => handleDelete(fileInfo.id));

  // Assemble the list item
  fileInfoContainer.appendChild(fileName);
  fileInfoContainer.appendChild(fileDetails);
  listItem.appendChild(fileInfoContainer);
  listItem.appendChild(actions);

  // Add to category list
  categoryList.appendChild(listItem);
}

// Toggle dropdown visibility for category lists
document.querySelectorAll(".category-toggle").forEach((button) => {
  button.addEventListener("click", function () {
    const category = this.dataset.category;
    const dropdown = document.getElementById(`${category}-files`);
    dropdown.style.display =
      dropdown.style.display === "none" ? "block" : "none";
  });
});

document.querySelectorAll(".toggle-link").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const targetId = link.getAttribute("data-target");
    const dropdown = document.getElementById(targetId);
    if (dropdown.style.display === "none") {
      dropdown.style.display = "block";
    } else {
      dropdown.style.display = "none";
    }
  });
});

// Fetch and display all files grouped by category
async function fetchFiles() {
  try {
    // Cache busting added by appending a query parameter properly
    const response = await fetch(
      "http://localhost:8080/api/files/categories?t=" + new Date().getTime()
    );
    if (!response.ok) throw new Error("Failed to fetch files");

    const categorizedFiles = await response.json();
    // Expected format: { category1: [files], category2: [files], ... }

    Object.entries(categorizedFiles).forEach(([category, files]) => {
      const categoryList = document.getElementById(`${category}-files`);
      if (categoryList) {
        // Clear existing items if needed
        categoryList.innerHTML = `<h3>${
          category === "archived" ? "Archived Files" : category + " Files"
        }</h3>`;
        files.forEach((file) => {
          addFileToCategory(category, file);
        });
        categoryList.style.display = "block";
      }
    });
  } catch (error) {
    console.error("Error fetching files:", error);
    alert("Error fetching files.");
  }
}

async function handleDownload(fileId) {
  // Redirect the browser to the download endpoint
  window.location.href = `http://localhost:8080/api/files/download/${fileId}`;
}

async function uploadFile(file, category) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("category", category);

  const response = await fetch("http://localhost:8080/api/files/upload", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Upload failed: ${response.statusText}`);
  }

  return response.json();
}

// Modify your existing window.onload
window.addEventListener("DOMContentLoaded", function () {
  checkAuth();
  initFileUpload();
  fetchFiles();
});
