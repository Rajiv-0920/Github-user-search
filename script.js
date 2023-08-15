const searchUser = document.getElementById("search-user");
const submitBtn = document.getElementById("submit");

const nameEl = document.getElementById("name");
const loginEl = document.getElementById("login");
const joinDateEl = document.getElementById("join-date");
const bioEl = document.getElementById("bio");
const userImgEl = document.getElementById("user-img");
const totalRepoEl = document.getElementById("total-repo");
const totalFollowersEl = document.getElementById("total-followers");
const totalFollowingEl = document.getElementById("total-following");
const addressEL = document.getElementById("address");
const twitterEl = document.getElementById("twitter");
const websiteEl = document.getElementById("website");
const businessEl = document.getElementById("business");

const addressIconEl = document.querySelectorAll(".location-icon");
const twitterIconEl = document.querySelectorAll(".twitter-icon");
const websiteIconEl = document.querySelectorAll(".website-icon");
const businessIconEl = document.querySelectorAll(".business-icon");
const githubSearch = document.querySelector(".github-search");

const darkToggle = document.getElementById("dark-toggle-btn");

darkToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

const month = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (searchUser.value) {
    getUserDetails(searchUser.value);
  } else {
    getUserDetails("rajiv-0920");
  }
});

getUserDetails("rajiv-0920");

function getUserDetails(userName) {
  fetch(`https://api.github.com/users/${userName}`)
    .then((response) => response.json())
    .then((data) => userDetails(data))
    .catch(() => {
      console.log("Something went to wrong!");
    });
}

searchUser.addEventListener("keydown", () => {
  githubSearch.classList.remove("error");
});

function userDetails(data) {
  if (data.message === undefined) {
    githubSearch.classList.remove("error");
    const date = new Date(data.created_at);
    const joiningDate = date.getDate();
    const joiningMonth = date.getMonth();
    const joiningYear = date.getFullYear();

    nameEl.innerText = data.name;
    loginEl.innerText = `@${data.login}`;
    userImgEl.src = data.avatar_url;

    joinDateEl.innerText = `Joined ${joiningDate} ${month[joiningMonth]} ${joiningYear}`;

    if (data.bio === null) {
      bioEl.innerText = "Bio Not Available";
    } else {
      bioEl.innerText = data.bio;
    }

    totalRepoEl.innerText = data.public_repos;
    totalFollowersEl.innerText = data.followers;
    totalFollowingEl.innerText = data.following;

    addressIconEl.forEach((icon, index) => {
      icon.classList.remove("not-available");
    });

    addressIconEl.forEach((icon, index) => {
      icon.classList.remove("not-available");
      twitterIconEl[index].classList.remove("not-available");
      websiteIconEl[index].classList.remove("not-available");
      businessIconEl[index].classList.remove("not-available");
    });

    if (data.location !== null) {
      addressEL.innerText = data.location;
    } else {
      addressEL.innerText = "Not Available";
      addressIconEl.forEach((icon) => icon.classList.add("not-available"));
    }

    if (data.twitter_username) {
      twitterEl.innerText = data.twitter_username;
      twitterEl.href = `https://twitter.com/${data.twitter_username}`;
    } else {
      twitterEl.innerText = "Not Available";
      twitterIconEl.forEach((icon) => icon.classList.add("not-available"));
    }

    if (data.blog) {
      websiteEl.innerText = data.blog;
      websiteEl.href = data.blog;
    } else {
      websiteEl.innerText = "Not Available";
      websiteIconEl.forEach((icon) => icon.classList.add("not-available"));
    }

    if (data.company) {
      businessEl.innerText = data.company;
    } else {
      businessEl.innerText = "Not Available";
      businessIconEl.forEach((icon) => icon.classList.add("not-available"));
    }
  } else {
    githubSearch.classList.add("error");
  }
}
