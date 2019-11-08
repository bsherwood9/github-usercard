/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/
const myData = axios.get("https://api.github.com/users/bsherwood9");
console.log(myData);
/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/
const friendsArray = [];
axios
  .get("https://api.github.com/users/bsherwood9/followers")
  .then(response => {
    const names = response.data;
    names.forEach(item => {
      friendsArray.push(item.url);
    });
    friendsArray.forEach(item => {
      axios.get(item).then(response => {
        const userData = response.data;
        // userData.forEach(item => {
        const newCard = infoCard(userData);
        entryPoint.appendChild(newCard);
      });
    });
    //Not sure where to add this. But want it to run after the followers get loaded
    const quoteData = axios.get(
      "https://cors-anywhere.herokuapp.com/http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en&callback=?"
    );
    quoteData.then(response => {
      const message = response.data;
      const cards = getAQuote(message);
      entryPoint.appendChild(cards);
    });
  });

//  Step 3: Create a function that accepts a single object as its only argument,
//           Using DOM methods and properties, create a component that will return the following DOM element:

const entryPoint = document.querySelector(".cards");

const infoCard = userInfo => {
  const card = document.createElement("div");
  const image = document.createElement("img");
  const cardInfo = document.createElement("div");
  const username = document.createElement("h3");
  const location = document.createElement("p");
  const profile = document.createElement("p");
  const address = document.createElement("a");
  const followers = document.createElement("p");
  const following = document.createElement("p");
  const bio = document.createElement("p");

  card.classList.add("card");
  cardInfo.classList.add("card-info");
  cardInfo.style.width = "100%";
  cardInfo.style.position = "relative";
  username.classList.add("name");
  image.src = userInfo.avatar_url;
  image.style.display = "none";
  username.textContent = userInfo.login;
  location.textContent = `Location: ${userInfo.location}`;
  location.style.display = "none";
  profile.textContent = "Profile:";
  profile.style.display = "none";
  address.href = userInfo.html_url;
  address.textContent = userInfo.html_url;
  address.style.fontSize = "1.3rem";
  address.style.textDecoration = "none";
  address.style.color = "inherit";
  address.style.paddingTop = "1%";
  address.style.paddingBottom = "2%";
  address.style.paddingLeft = "10%";
  address.style.display = "none";
  followers.textContent = `Followers: ${userInfo.followers}`;
  following.textContent = `Following: ${userInfo.following}`;
  bio.textContent = `Bio: ${userInfo.bio}`;
  bio.style.display = "none";

  card.appendChild(image);
  card.appendChild(cardInfo);
  cardInfo.appendChild(username);
  cardInfo.appendChild(location);
  cardInfo.appendChild(profile);
  cardInfo.appendChild(address);
  cardInfo.appendChild(followers);
  cardInfo.appendChild(following);
  cardInfo.appendChild(bio);

  //adding a button\
  const btnDiv = document.createElement("div");
  const btn = document.createElement("button");
  btn.textContent = "Expand";
  btn.style.position = "absolute";
  btn.style.cursor = "pointer";
  btn.style.left = "50%";
  btn.style.bottom = -20;
  btn.style.padding = "3px 10px";

  //adding functionality
  cardInfo.appendChild(btnDiv);
  btnDiv.appendChild(btn);
  btn.addEventListener("click", el => {
    el.stopPropagation();
    card.classList.toggle("expand");
    if (btn.textContent === "Expand") {
      btn.textContent = "Hide";
      bio.style.display = "block";
      address.style.display = "block";
      profile.style.display = "block";
      location.style.display = "block";
      image.style.display = "block";
      btn.style.left = 0;
    } else {
      btn.textContent = "Expand";
      bio.style.display = "none";
      address.style.display = "none";
      profile.style.display = "none";
      location.style.display = "none";
      image.style.display = "none";
      btn.style.left = "50%";
    }
  });

  return card;
};

myData.then(response => {
  const userData = response.data;
  const newCard = infoCard(userData);
  entryPoint.appendChild(newCard);
});
// <div class="card">
//   <img src={image url of user} />
//   <div class="card-info">
//     <h3 class="name">{users name}</h3>
//     <p class="username">{users user name}</p>
//     <p>Location: {users location}</p>
//     <p>Profile:
//       <a href={address to users github page}>{address to users github page}</a>
//     </p>
//     <p>Followers: {users followers count}</p>
//     <p>Following: {users following count}</p>
//     <p>Bio: {users bio}</p>
//   </div>
// </div>

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
  */

//Lets add some dope quotes and the like.

const getAQuote = data => {
  const newDiv = document.createElement("div");
  newDiv.classList.add("card");
  newDiv.style.textAlign = "center";
  newDiv.style.background = "black";
  newDiv.style.color = "white";
  const cont = document.createElement("div");
  cont.style.width = "80%";
  cont.style.margin = "0 auto";
  cont.style.padding = "3% 0";
  const text = document.createElement("p");
  text.textContent = data.quoteText;
  text.style.fontSize = "1.6rem";
  const author = document.createElement("h3");
  author.textContent = `- ${data.quoteAuthor}`;
  author.style.paddingTop = "1%";

  newDiv.appendChild(cont);
  cont.appendChild(text);
  cont.appendChild(author);

  return newDiv;
};
