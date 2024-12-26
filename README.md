# Note taking app

A simple and efficient note-taking application built with Node.js and Express. This app allows users to upload Markdown files, save notes directly via API, and retrieve or process notes in various ways, including converting Markdown to HTML and checking grammar.

## Features

- Upload Markdown files to store as notes.
- Save notes via API.
- List all saved notes.
- Convert Markdown notes to HTML.
- Check grammar of notes using LanguageTool API.

## Installation 

1. Clone the repository:
  ```bash
  git clone
  cd note-taking-app
  ```

2. Install dependencies:
  ```bash
  npm install
  ```

3. Run the application:
  ```bash
  npm start // localhost:3000
  ```

## API Enpoints

### 1. **Upload File**
  **POST** `/upload`
  - Uploads a Markdown file.

  **Resquest**:
  - Form-data key: `file` (select the file to upload).

  **Response**: 
  ```json
   {
     "message": "File uploaded successfully",
     "fileName": "markdown.md"
   }
   ```

### 2. **Save Note**
   **POST** `/notes`
   - Saves a new note.

   **Request**:
   ```json
   {
     "fileName": "example.md",
     "content": "# My Note\nThis is the content of the note."
   }
   ```

   **Response**:
   ```json
   {
     "message": "Note saved successfully",
     "fileName": "example.md"
   }
   ```

### 3. **List Notes**
   **GET** `/notes`
   - Retrieves a list of all saved notes.

   **Response**:
   ```json
   ["example.md", "markdown.md"]
   ```

### 4. **Render Note as HTML**
   **GET** `/notes/:fileName/html`
   - Converts a Markdown note to HTML.

   **Response**:
   ```html
   <h1>My Note</h1>
   <p>This is the content of the note.</p>
   ```

### 5. **Check Grammar**
   **POST** `/notes/:fileName/grammar`
   - Verifies the grammar of the specified note.

   **Request**:
   ```json
   {
     "fileName": "example.md"
   }
   ```

   **Response**:
   ```json
   [
     {
       "message": "Possible typo detected.",
       "offset": 10,
       "length": 5,
       "replacement": ["correct"]
     }
   ]
   ```

## Dependencies

The following dependencies are used in this project:

**External Dependencies**

- **Express**: Web framework for building the API.
- **Multer**: Middleware for handling `multipart/form-data` file uploads.
- **Axios**: HTTP client for API requests.
- **Marked**: Converts Markdown to HTML.
