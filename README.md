# Task Management Board

This is a simple task management board built with React and Redux, as state management tool. Styling was done using Sass, and Firebase was used to store the data. This task management board allows you to create boards, and tasks within those boards.

## Features

The following features have been implemented in this application:

- **CRUD operations:** You can create new boards, and read, create, edit and update tasks in each board.
- **Responsive design:** The web app is responsive on mobile and tablet devices.
- **Priority feature:** You can set the priority of a task to `low`, `normal`, or `high`, each with different styling.
- **Drag-and-drop:** You can drag tasks within and between boards using the `dnd-kit` library.

## Future ideas

- **Add timestamps and display creation date** - currently, this information is not available for individual tasks and it could be useful.
- **Edit/delete boards** - once a board has been created, it cannot be deleted, nor edited.

## Usage

To use this application, follow these steps:

1. Clone the repository and navigate to the project directory.
2. Install the dependencies using `npm install`.
3. Set up a Firebase project and add your Firebase configuration to `src/firebase/config.js` (or create a .env file in the root folder).
4. Start the development server using `npm start`.

## Live demo

https://task-management-board.web.app/
