const xhrSearch = document.getElementById("xhrSearch");
xhrSearch.addEventListener("click", searchUsingXHR);
const fetchSearch = document.getElementById("fetchSearch");
fetchSearch.addEventListener("click", searchUsingFetchPromises);

const fetchAsyncAwaitSearch = document.getElementById("fetchAsyncAwaitSearch");
fetchAsyncAwaitSearch.addEventListener("click", searchUsingFetchAsyncAwait);
const queryInput = document.getElementById("queryInput");

const API_URL = "https://api.unsplash.com/search/photos";

const ACCESS_KEY = "jiZqD1KRN59uwoQ2tNz3ypuz0Jb_f717mFU8RMHjkSY";
//xhr

function searchUsingXHR() {
  let quertTerm = queryInput.value.trim();
  const xhr = new XMLHttpRequest();
 
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      let responseText = xhr.responseText;
      let responseObj = JSON.parse(responseText);
      createImages(responseObj);
    }
  };
  xhr.open("GET", API_URL + "?query=" + quertTerm);
  xhr.setRequestHeader("Authorization", "Client-ID " + ACCESS_KEY);

  xhr.send();
}

//searchUsingFetchAsyncAwait

async function searchUsingFetchAsyncAwait(){
  let quertTerm = queryInput.value.trim();
  let response = await fetch(API_URL + "?query=" + quertTerm ,{
    method: "GET",
    headers: {
      "Authorization": "Client-ID " + ACCESS_KEY

    }
  })
  
  if(response.ok){
    const responseObj = await response.json();
    createImages(responseObj);
  }
}

// fetch
   function searchUsingFetchPromises(){
    let quertTerm = queryInput.value.trim();
    fetch(API_URL + "?query=" + quertTerm ,{
      method: "GET",
      headers: {
        "Authorization": "Client-ID " + ACCESS_KEY
  
      }
    }).then((response)=> {
      return response.json();
    }).then ((data)=> {
      createImages(data)
    })
    



}

function createImages(data) {
  const results = document.getElementById("results");
  results.innerHTML ="";
  for (let item of data.results) {
    let imgElem = document.createElement("img");
    imgElem.src = item.urls.small;
    imgElem.alt = item.alt_description;

    results.appendChild(imgElem);
  }
}
