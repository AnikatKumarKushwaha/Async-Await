const btn = document.querySelector(".btn");
btn.addEventListener("click", async () => {
  const message = document.querySelector(".fetch-message");
  //Task2: Display "Loading..." in the div element  while the data is being fetched
  message.innerHTML = "Loading...";

  //Task3: Implement error handling in the async/await using try catch block
  try {
    // Fetch data from the API
    const data = await fetchData("https://dummyjson.com/posts");

    displayData(data);
    message.textContent = "Data fetched successfully!";
  } catch (error) {
    //Task3: display error messages in the div element.
    message.textContent = `Error: ${error.message}`;
  }
});

//Task2 using Async await to fetch Data
async function fetchData(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  return data;
}

//Task2 update the text to show the fetched data once it is received.
function displayData(data) {
  const dataContainer = document.querySelector(".dummy-data-container");
  const notFetched = document.querySelector(".not-fetched");
  notFetched.remove();

  if (data) {
    data.posts.map((post) => {
      const postElement = document.createElement("div");
      postElement.className = "post";
      postElement.textContent = post.title;
      dataContainer.appendChild(postElement);
    });
  }
}
