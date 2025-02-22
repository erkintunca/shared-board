const board = document.getElementById('board');
const addPostItButton = document.getElementById('add-post-it'); // Select the button element

async function fetchPostItNotes() {
  try {
    //const response = await fetch('http://localhost:3000/post-its'); // Fetch from your backend API
    //const response = await fetch('https://shared-board-y6cp.onrender.com/post-its'); // Fetch from your backend API
    const response = await fetch(`${import.meta.env.VITE_API_URL}/post-its`);
    const postItNotes = await response.json();

    const postItList = document.createElement('ul'); // Create an unordered list element
    postItNotes.forEach(note => {
      const listItem = document.createElement('li'); // Create a list item for each note
      listItem.textContent = note.content;
      postItList.appendChild(listItem);
    });
    
    board.innerHTML = ''; // Clear the board
    board.appendChild(postItList); // Add the list to the board
  } catch (error) {
    console.error('Error fetching post-it notes:', error);
  }
}

async function addPostIt() {
  try {
      const newPostIt = {
      content: 'New post-it!', // Fixed content for now
      positionX: 100,          // Fixed position
      positionY: 100,
    };

    //const response = await fetch('https://shared-board-y6cp.onrender.com/post-its', { // Replace with your backend URL
    const response = await fetch(`${import.meta.env.VITE_API_URL}/post-its`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPostIt),
    });

    if (response.ok) {
      // Refresh the post-it list after adding a new one
      fetchPostItNotes();
    } else {
      console.error('Failed to add post-it:', response.status);
    }
  } catch (error) {
    console.error('Error adding post-it:', error);
  }
}

addPostItButton.addEventListener('click', addPostIt); // Add the event listener to the button
  
fetchPostItNotes(); // Fetch and display notes on page load