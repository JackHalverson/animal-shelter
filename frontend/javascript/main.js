"use strict";

document.addEventListener("DOMContentLoaded", async () => {
  const baseUrl = "http://localhost:8000";

  // Fetch and display shelters
  const response = await fetch(`${baseUrl}/shelters`);
  const shelters = await response.json();
  const contentElement = document.getElementById("shelters");

  shelters.forEach(shelter => {
    const shelterElement = createShelterElement(shelter);
    contentElement.appendChild(shelterElement);
  });

  // Add new shelter
  document.getElementById("shelterForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const address = document.getElementById("address").value;
    const cats = document.getElementById("cats").value;
    const dogs = document.getElementById("dogs").value;

    const newShelter = { name, address, animals: { cats, dogs } };

    const addResponse = await fetch(`${baseUrl}/shelters`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newShelter),
    });

    if (addResponse.ok) {
      const addedShelter = await addResponse.json();
      contentElement.appendChild(createShelterElement(addedShelter));
    }
  });

  // Update shelter (this is just a stub for updating functionality)
  document.getElementById("updateShelterBtn").addEventListener("click", async () => {
    const shelterName = prompt("Enter the shelter name to update:");
    const newAddress = prompt("Enter the new address:");
    const updateResponse = await fetch(`${baseUrl}/shelters/${shelterName}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: shelterName, address: newAddress, animals: { cats: 5, dogs: 5 } }), // Example update
    });
    
    if (updateResponse.ok) {
      alert("Shelter updated successfully!");
    }
  });

  // Delete shelter
  document.getElementById("deleteShelterBtn").addEventListener("click", async () => {
    const shelterName = prompt("Enter the shelter name to delete:");
    const deleteResponse = await fetch(`${baseUrl}/shelters/${shelterName}`, {
      method: "DELETE",
    });
    
    if (deleteResponse.ok) {
      alert("Shelter deleted successfully!");
      location.reload(); // Refresh to remove the shelter from the list
    }
  });
});

// Helper function to create shelter elements
function createShelterElement(shelter) {
  const section = document.createElement("section");
  section.className = "shelter-card";

  const [street, city, stateZip] = shelter.address.split(",");

  section.innerHTML = `
    <h3>${shelter.name}</h3>
    <address>${street}<br>${city + ", " + stateZip}</address>
    <p>Number of dogs: ${shelter.animals.dogs}</p>
    <p>Number of cats: ${shelter.animals.cats}</p>
  `;

  return section;
}
