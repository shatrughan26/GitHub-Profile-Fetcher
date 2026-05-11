const searchBtn = document.getElementById("search-box");

const profileContainer = document.getElementById("profile-container");

searchBtn.addEventListener("click",getProfile);

async function getProfile(){
    const username = document.getElementById("username").value;

    if(username === ""){
        alert("Please Enter username");
        return;
    }

    try{
        const response = await fetch(
            `https://api.github.com/users/${username}`
        );
        if(!response.ok){
            throw new Error("User not found");
        }

        const data = await response.json();

        showProfile(data);
    }
    catch(error){

    profileContainer.innerHTML = `
        <p>${error.message}</p>
    `;
    }
}

function showProfile(user){

    profileContainer.innerHTML = `
    <div class="profile">

            <img src="${user.avatar_url}" alt="Profile">

            <h2>${user.name || "No Name"}</h2>

            <p>${user.bio || "No bio available"}</p>

            <p>Followers: ${user.followers}</p>

            <p>Following: ${user.following}</p>

            <p>Public Repos: ${user.public_repos}</p>

            <a href="${user.html_url}" target="_blank">
                Visit Profile
            </a>

        </div>
    
    `;
}