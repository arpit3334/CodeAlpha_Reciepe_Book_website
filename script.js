
function addRecipe() {
    const recipeName = document.getElementById("recipeName").value;
    const ingredients = document.getElementById("ingredients").value;
    const instructions = document.getElementById("instructions").value;
    const imageInput = document.getElementById("image");
    const image = imageInput.files[0];

    // Create a new list item with the recipe details
    const listItem = document.createElement("li");

    // Check if an image is provided
    if (image) {
        const imageUrl = URL.createObjectURL(image);
        listItem.innerHTML = `
            <img src="${imageUrl}" alt="${recipeName}" style="max-width: 100%; height: auto;">
            <strong>${recipeName}</strong><br>
            <em>Ingredients:</em> ${ingredients}<br>
            <em>Instructions:</em> ${instructions}
            <button class="edit" onclick="editRecipe(this)">Edit</button>
            <button class="delete" onclick="deleteRecipe(this)">Delete</button>
        `;
    } else {
        listItem.innerHTML = `
            <strong>${recipeName}</strong><br>
            <em>Ingredients:</em> ${ingredients}<br>
            <em>Instructions:</em> ${instructions}
            <button class="edit" onclick="editRecipe(this)">Edit</button>
            <button class="delete" onclick="deleteRecipe(this)">Delete</button>
        `;
    }

    // Append the list item to the recipe list
    document.getElementById("recipeList").appendChild(listItem);

    // Clear the form inputs
    document.getElementById("recipeForm").reset();
}

// Function to edit a recipe
function editRecipe(button) {
    const listItem = button.parentElement;
    const recipeDetails = listItem.innerHTML.split("<br>").map(detail => detail.trim());

    // Populate the form with existing details
    document.getElementById("recipeName").value = recipeDetails[0].replace("<strong>", "").replace("</strong>", "");
    document.getElementById("ingredients").value = recipeDetails[1].replace("<em>Ingredients:</em> ", "");
    document.getElementById("instructions").value = recipeDetails[2].replace("<em>Instructions:</em> ", "");

    // Remove the existing item from the list
    listItem.remove();

    // Update the form button for editing
    const addButton = document.getElementById("addButton");
    addButton.innerText = "Edit Recipe";
    addButton.onclick = function () {
        updateRecipe(listItem);
    };
}

// Function to update a recipe
function updateRecipe(listItem) {
    const recipeName = document.getElementById("recipeName").value;
    const ingredients = document.getElementById("ingredients").value;
    const instructions = document.getElementById("instructions").value;

    // Create a new list item with the updated recipe details
    const updatedItem = document.createElement("li");
    updatedItem.innerHTML = `
        <strong>${recipeName}</strong><br>
        <em>Ingredients:</em> ${ingredients}<br>
        <em>Instructions:</em> ${instructions}
        <button class="edit" onclick="editRecipe(this)">Edit</button>
        <button class="delete" onclick="deleteRecipe(this)">Delete</button>
    `;

    // Insert the updated list item back to the same position
    listItem.parentElement.insertBefore(updatedItem, listItem);

    // Reset the form and button
    document.getElementById("recipeForm").reset();
    const addButton = document.getElementById("addButton");
    addButton.innerText = "Add Recipe";
    addButton.onclick = addRecipe;
}

// Function to delete a recipe
function deleteRecipe(button) {
    const listItem = button.parentElement;
    listItem.remove();
}
