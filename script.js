const topicContainer = document.getElementById("topics");
const detailsContainer = document.getElementById("topic-details");
const searchInput = document.getElementById("searchInput");


// ================================
// DISPLAY TOPIC BUTTONS
// ================================

function displayTopics(topicList) {

    topicContainer.innerHTML = "";

    if (topicList.length === 0) {

        topicContainer.innerHTML =
            "<p>No topics found. Try another search.</p>";

        return;
    }


    topicList.forEach(topic => {

        const button = document.createElement("button");

        button.className = "day-button";

        button.textContent =
            `Day ${topic.day} | ${topic.category} | ${topic.title}`;


        button.addEventListener("click", function () {

            showTopic(topic);

        });


        topicContainer.appendChild(button);

    });

}


// ================================
// SHOW SELECTED TOPIC
// ================================

function showTopic(topic) {

    detailsContainer.innerHTML = "";


    const title = document.createElement("h2");

    title.textContent =
        `Day ${topic.day} — ${topic.title}`;

    detailsContainer.appendChild(title);


    // Show category

    const category = document.createElement("p");

    category.innerHTML =
        `<strong>📂 Category:</strong> ${topic.category}`;

    detailsContainer.appendChild(category);


    // Show keywords

    const keywords = document.createElement("p");

    keywords.innerHTML =
        `<strong>🔑 Keywords:</strong> ${topic.keywords.join(", ")}`;

    detailsContainer.appendChild(keywords);


    // Show notes

    topic.notes.forEach(note => {

        const noteBox = document.createElement("div");

        noteBox.className = "note";


        const question = document.createElement("h3");

        question.textContent = note.question;


        const answer = document.createElement("p");

        answer.textContent = note.answer;


        noteBox.appendChild(question);

        noteBox.appendChild(answer);

        detailsContainer.appendChild(noteBox);

    });

}


// ================================
// SEARCH FUNCTION
// ================================

searchInput.addEventListener("input", function () {

    const searchText =
        searchInput.value.toLowerCase();


    const filteredTopics = topics.filter(topic => {

        const title =
            topic.title.toLowerCase();

        const category =
            topic.category.toLowerCase();

        const keywords =
            topic.keywords
                .join(" ")
                .toLowerCase();


        return (
            title.includes(searchText) ||
            category.includes(searchText) ||
            keywords.includes(searchText)
        );

    });


    displayTopics(filteredTopics);

});


// ================================
// START WEBSITE
// ================================

// Display all topics
displayTopics(topics);


// Automatically show first topic
if (topics.length > 0) {

    showTopic(topics[0]);

}
