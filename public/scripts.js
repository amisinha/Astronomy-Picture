// Define the searchAPOD function
async function searchAPOD() {
    const dateInput = document.getElementById('dateInput').value;
    const url = `/apod?date=${dateInput}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch APOD data');
        }
        const data = await response.json();
        updateAPOD(data);
    } catch (error) {
        console.error('Error searching APOD:', error);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    // Fetch and display APOD for today's date when the page loads
    searchAPOD();
});

function updateAPOD(data) {
    const apodImage = document.getElementById('apodImage');
    const apodTitle = document.getElementById('apodTitle');
    const apodExplanation = document.getElementById('apodExplanation');

    apodTitle.textContent = data.title;
    apodImage.src = data.url;
    apodExplanation.textContent = data.explanation;
}
