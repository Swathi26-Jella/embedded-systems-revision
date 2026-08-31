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


    // Topic Title

    const title = document.createElement("h2");

    title.textContent =
        `Day ${topic.day} — ${topic.title}`;

    detailsContainer.appendChild(title);


    // Category

    const category = document.createElement("p");

    category.innerHTML =
        `<strong>📂 Category:</strong> ${topic.category}`;

    detailsContainer.appendChild(category);


    // Keywords

    const keywords = document.createElement("p");

    keywords.innerHTML =
        `<strong>🔑 Keywords:</strong> ${topic.keywords.join(", ")}`;

    detailsContainer.appendChild(keywords);


    // ================================
    // SHOW QUESTIONS + HIDDEN ANSWERS
    // ================================

    topic.notes.forEach(note => {

        const noteBox = document.createElement("div");

        noteBox.className = "note";


        // Question

        const question = document.createElement("h3");

        question.textContent = "❓ " + note.question;


        // Show Answer Button

        const answerButton = document.createElement("button");

        answerButton.className = "answer-button";

        answerButton.textContent = "👀 Show Answer";


        // Answer

        const answer = document.createElement("p");

        answer.className = "answer";

        answer.textContent = "💡 " + note.answer;

        answer.style.display = "none";


        // Button Click

        answerButton.addEventListener("click", function () {

            if (answer.style.display === "none") {

                answer.style.display = "block";

                answerButton.textContent =
                    "🙈 Hide Answer";

            } else {

                answer.style.display = "none";

                answerButton.textContent =
                    "👀 Show Answer";

            }

        });


        // Add everything

        noteBox.appendChild(question);

        noteBox.appendChild(answerButton);

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

displayTopics(topics);


if (topics.length > 0) {

    showTopic(topics[0]);

}
