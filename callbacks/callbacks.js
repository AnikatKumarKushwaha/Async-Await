const btn = document.querySelector(".btn");
btn.addEventListener("click", () => {
  const message = document.querySelector(".fetch-message");

  //Task2: updating the div to display the message
  message.innerHTML = "Callback executed after 5 seconds";

  /* Task2: implement JavaScript functionality that utilizes a callback function to simulate a delay of 5 seconds when the button is clicked.*/
  setTimeout(async () => {
    const data = await fetchDummyData();
    postList(data);
  }, 5000);
});

//Task 3: Modifying the callback implementation to fetch data from the JSONPlaceholder API
async function fetchDummyData() {
  let res = await fetch("https://dummyjson.com/posts");
  const data = await res.json();
  return data;
}

/*Task3: Display the fetched data in the div element after the callback
is executed.*/
function postList(data) {
  const postContainer = document.querySelector(".dummy-data-container");
  const notFetched = document.querySelector(".not-fetched");
  notFetched.remove();

  if (data) {
    data.posts.map((post) => {
      const postelement = document.createElement("div");
      postelement.className = "post";
      postelement.innerText = post.title;
      postContainer.appendChild(postelement);
    });
  }
}
