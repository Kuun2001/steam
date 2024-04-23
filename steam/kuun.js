const apiUrl =
  "https://steam-api-dot-cs-platform-306304.et.r.appspot.com/games";
const url = "https://steam-api-dot-cs-platform-306304.et.r.appspot.com/genres";

// fetch data tu api
const getGames = async (callback) => {
  try {
    const response = await fetch(apiUrl, { method: "GET" });
    if (!response.ok) {
      throw new Error("HTTP error! status: " + response.status);
    }
    const gamesData = await response.json();
    // callback(null, gamesData);
    callback(null, gamesData.data);
  } catch (err) {
    callback(err, null);
  }
};

const renderGames = (error, gamesData) => {
  let gameList = document.getElementById("showing");
  if (error) {
    return console.log(error);
  }
  // const data and render
  gameList.innerHTML = "";
  gamesData.forEach((game) => {
    let output = document.createElement("div");

    output.innerHTML += `
        <div class="card" value="${game.appid} " onclick="getDetailGame('${game.appid}')">
          <img src="${game.header_image}" alt="${game.name}" />
          <p>${game.name}</p>
          <p><strong>Price:</strong> $${game.price}</p>
        </div>
      `;

    gameList.appendChild(output);
  });
};
// function render cate
function renderCate() {
  fetch(url)
    .then((response) => response.json())
    .then((res) => {
      const cate = res.data;
      let list = "";
      cate.forEach((data) => {
        list += `<li><button id="btn-cate" onclick="getValueGenre('${data.name}')" value="${data.name}">${data.name}</button></li>`; // Concatenate the list in each iteration
      });
      document.getElementById("categories").innerHTML = list;
    })
    .catch((error) => console.log(error));
}
//search game using inputbox
let feat = [];

function getListFeature() {
  fetch("https://steam-api-dot-cs-platform-306304.et.r.appspot.com/features")
    .then((response) => response.json())
    .then((res) => {
      feat = res.data;
    })
    .catch((error) => console.log(error));
}

function searchGameWithName() {
  let valueSearchInput = document.getElementById("input-box").value.trim();
  let userSearch = feat.filter((data) => {
    return data.name.toUpperCase().includes(valueSearchInput.toUpperCase());
  });
  let gameList = "";
  userSearch.forEach((data) => {
    gameList += ` 
    <div class="card" value="${data.appid} " onclick="getDetailGame('${data.appid}')">
        <img src="${data.header_image}" alt="${data.name}" />
        <p>${data.name}</p>
        <p><strong>Price:</strong> $${data.price}</p>
      </div>
    `;
  });
  document.getElementById("showing").innerHTML = gameList;
}

document.getElementById("input-box").addEventListener("input", () => {
  searchGameWithName(feat);
});
// search with categories
function getValueGenre(cateonclick) {
  fetch(
    `https://steam-api-dot-cs-platform-306304.et.r.appspot.com/games?genres=${cateonclick}`,
  )
    .then((response) => response.json())
    .then((res) => {
      const cate = res.data;
      let gameList = "";
      cate.forEach((data) => {
        gameList += ` 
        <div class="card" value="${data.appid} " onclick="getDetailGame('${data.appid}')">
      <img src="${data.header_image}" alt="${data.name}" />
      <p>${data.name}</p>
      <p><strong>Price:</strong> $${data.price}</p>
    </div>
  `;
      });
      document.getElementById("showing").innerHTML = gameList;
    })
    .catch((error) => console.log(error));
}
// showdetail game
function getDetailGame(gameid) {
  fetch(
    `https://steam-api-dot-cs-platform-306304.et.r.appspot.com/games?appid=${gameid}`,
  )
    .then((response) => response.json())
    .then((res) => {
      const cate = res.data;
      let gameList = "";
      cate.forEach((data) => {
        gameList += ` 
        <div class="detail">
        <p class="name">${data.name}</p>
        <p class="name">${data.price}</p>
        <div id="container">
        <img src="${data.header_image}" alt="${data.name}" />
          <div class="info">
            <p>Release date:${data.release_date}</p>
            <p>Developer:${data.developer}</p>
            <p>Positive rating:${data.positive_ratings}</p>
          </div>
        </div>
      </div>
  `;
      });
      document.getElementById("showing").innerHTML = gameList;
    })
    .catch((error) => console.log(error));
}
// render website
document.addEventListener("DOMContentLoaded", () => {
  getGames(renderGames);
  getListFeature();
  renderCate();
});
