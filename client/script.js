const board = document.getElementById('board');

async function fetchPostItNotes() {
  try {
    //const response = await fetch('http://localhost:3000/post-its'); // Fetch from your backend API
    const response = await fetch('https://shared-board-y6cp.onrender.com/post-its'); // Fetch from your backend API
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

fetchPostItNotes(); // Fetch and display notes on page load