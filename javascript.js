const img = document.getElementById("image");

const newImgBtn = document.getElementById("new-image");
newImgBtn.addEventListener("click", fetchData);

const searchBar = document.getElementById("search-bar");

const defaultValue = "naruto";
let userChoice = defaultValue;

searchBar.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    userChoice = searchBar.value;
    fetchData(userChoice);
  }
});

function fetchData(searchTerm) {
  fetch(
    `https://api.giphy.com/v1/gifs/translate?api_key=GYfcaPsJBQrP20VZPxqMRAY38fRd9eBP&s=${userChoice}`,
    { mode: "cors" },
  )
    .then(function (response) {
      if(response.ok){
        return response.json();
      }else{
        throw new Error("Network error");
      }
    })
    .then(function (response) {
      if(response.data && response.data.images && response.data.images.original.url){
      img.src = response.data.images.original.url;
      }else{
        throw new Error("No gifs with provided search input")
      }
    })
    .catch(function (error){
      console.log(error);
      img.src="";
    });
}

fetchData(defaultValue);
