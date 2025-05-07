# University of Ilorin Student File Management Portal

A web-based file management system that allows students to upload, manage, and archive their academic documents.

## Features

- **Secure Authentication**

  - Student login using matriculation number
  - Password-protected access

- **File Management**

  - Upload academic documents
  - Categorized file storage
  - Download capabilities
  - Archive functionality
  - Delete options

- **Document Categories**

  - Course Form
  - School Fees Receipt
  - WAEC Result
  - JAMB Result
  - JAMB Admission Letter
  - Birth Certificate
  - State of Origin Certificate

- **User Interface**
  - Responsive design
  - Intuitive navigation
  - Quick access to important features
  - Clear file organization

## Technologies Used

- HTML5
- CSS3
- JavaScript

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/riant-creations/File-Management-System.git
```

3. Start the server:

```bash
http-server -p 3000 --cors
```

4. Access the application:

- Open `http://localhost:3000` in your browser
- Login using:
  - Username: 20/52HA123
  - Password: 12345

### Directory Structure Explanation

- `assets/`: External libraries and resources
  - `fontawesome/`: Font Awesome icon library
- `css/`: Stylesheet files
- `js/`: JavaScript files
  - `file-management.js`: File management functionality
  - `login.js`: Authentication handling
  - `script.js`: Global utilities
- `images/`: Image assets
- Root files:
  - HTML pages
  - Configuration files
  - Documentation

```

### File Upload
- Select document category
- Upload PDF, DOC, DOCX, JPG, or PNG files
- Automatic categorization

### File Management
- View files by category
- Download files
- Archive important documents
- Delete unnecessary files

### Archive System
- Move non-frequently used files to archive
- Maintain archived files separately
- Quick access to archived documents

## Development Notes

This is a simulation project demonstrating file management capabilities. For production use, implement:
- Secure authentication
- Database integration
- File encryption
- User session management

## Author

[Favour Daodu Toluwani]

## Acknowledgments

- University of Ilorin
-Faculty of Communication and Information Science
```
