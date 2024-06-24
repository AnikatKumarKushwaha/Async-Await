const btn = document.querySelector(".btn");

btn.addEventListener("click", () => {
  const message = document.querySelector(".fetch-message");
  const postContainer = document.querySelector(".dummy-data-container");

  //Task2: Display "Loading..." in the div element while the Promise is pending
  message.innerHTML = "Loading...";

  fetchWithTimeout("https://dummyjson.com/posts", 5000)
    .then((data) => {
      postList(data);
    })
    .catch((error) => {
      //Task3: Display the error message in the div if the Promise is rejected.
      message.innerHTML = `Error: ${error.message}`;
    });
});

async function fetchDummyData() {
  let res = await fetch("https://dummyjson.com/posts");
  const data = await res.json();
  return data;
}

//Task2: JavaScript functionality that creates a Promise to fetch data
function fetchWithTimeout(url, timeout) {
  return new Promise((resolve, reject) => {
    //Task3: If the Promise takes longer than 5 seconds to resolve, reject it with a message

    const timer = setTimeout(() => {
      reject(new Error("Operation timed out"));
    }, timeout);

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        clearTimeout(timer);
        resolve(data);
      })
      .catch((error) => {
        clearTimeout(timer);
        reject(error);
      });
  });
}

//Task2: Update the text to show the fetched data once the Promise is resolved.
function postList(data) {
  const postContainer = document.querySelector(".dummy-data-container");
  const notFetched = document.querySelector(".not-fetched");

  if (notFetched) {
    notFetched.remove();
  }

  if (data && data.posts) {
    data.posts.forEach((post) => {
      const postElement = document.createElement("div");
      postElement.className = "post";
      postElement.innerText = post.title;
      postContainer.appendChild(postElement);
    });
  }
}
