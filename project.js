const usersContainer = document.getElementById("users-container");
const searchInput = document.getElementById("search");
const loading = document.getElementById("loading");
const error = document.getElementById("error");

let users = [];

function displayUsers(usersData) {

    usersContainer.innerHTML = usersData.map(user => `
        <div class="card">
            <h3>${user.name}</h3>
            <p><strong>Username:</strong> ${user.username}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Phone:</strong> ${user.phone}</p>
            <p><strong>Company:</strong> ${user.company.name}</p>
        </div>
    `).join("");

}

async function fetchUsers() {

    try {

        loading.style.display = "block";

        const response = await fetch(
            "https://jsonplaceholder.typicode.com/users"
            
        );

        const data = await response.json();

        users = data;

        displayUsers(users);

        loading.style.display = "none";

    }

    catch(error) {

        loading.style.display = "none";

        error.textContent = "Something went wrong.";

        console.log(error);

    }
}

searchInput.addEventListener("input", () => {

    const searchText = searchInput.value.toLowerCase();

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchText) ||
        user.username.toLowerCase().includes(searchText)
    );

    displayUsers(filteredUsers);

});

fetchUsers();