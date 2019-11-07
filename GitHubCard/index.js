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
  username.classList.add("name");
  image.src = userInfo.avatar_url;
  username.textContent = userInfo.login;
  location.textContent = userInfo.location;
  profile.textContent = "Profile:";
  address.href = userInfo.url;
  address.textContent = userInfo.url;
  followers.textContent = `Followers: ${userInfo.followers}`;
  following.textContent = `Following: ${userInfo.following}`;
  bio.textContent = `Bio: ${userInfo.bio}`;

  card.appendChild(image);
  card.appendChild(cardInfo);
  cardInfo.appendChild(username);
  cardInfo.appendChild(location);
  cardInfo.appendChild(profile);
  cardInfo.appendChild(address);
  cardInfo.appendChild(followers);
  cardInfo.appendChild(following);
  cardInfo.appendChild(bio);

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
