const topicContainer = document.getElementById("topics");
const detailsContainer = document.getElementById("topic-details");
const searchInput = document.getElementById("searchInput");


// DISPLAY TOPICS
function displayTopics(topicList) {

    topicContainer.innerHTML = "";

    topicList.forEach(function(topic) {

        const button = document.createElement("button");

        button.className = "day-button";

        button.textContent =
            "Day " + topic.day +
            " | " + topic.category +
            " | " + topic.title;

        button.onclick = function() {
            showTopic(topic);
        };

        topicContainer.appendChild(button);

    });
}


// SHOW TOPIC
function showTopic(topic) {

    detailsContainer.innerHTML = "";

    const title = document.createElement("h2");

    title.textContent =
        "Day " + topic.day + " — " + topic.title;

    detailsContainer.appendChild(title);


    const category = document.createElement("p");

    category.innerHTML =
        "<strong>📂 Category:</strong> " +
        topic.category;

    detailsContainer.appendChild(category);


    const keywords = document.createElement("p");

    keywords.innerHTML =
        "<strong>🔑 Keywords:</strong> " +
        topic.keywords.join(", ");

    detailsContainer.appendChild(keywords);


    // QUESTIONS
    topic.notes.forEach(function(note) {

        const noteBox = document.createElement("div");

        noteBox.className = "note";


        // QUESTION
        const question = document.createElement("h3");

        question.textContent =
            "❓ " + note.question;


        // BUTTON
        const button = document.createElement("button");

        button.className = "answer-button";

        button.textContent =
            "👀 Show Answer";


        // ANSWER
        const answer = document.createElement("p");

        answer.className = "answer";

        answer.textContent =
            "💡 " + note.answer;

        answer.hidden = true;


        // BUTTON ACTION
        button.onclick = function() {

            answer.hidden = !answer.hidden;

            if (answer.hidden) {

                button.textContent =
                    "👀 Show Answer";

            } else {

                button.textContent =
                    "🙈 Hide Answer";

            }

        };


        noteBox.appendChild(question);

        noteBox.appendChild(button);

        noteBox.appendChild(answer);

        detailsContainer.appendChild(noteBox);

    });

}


// SEARCH
searchInput.addEventListener("input", function() {

    const searchText =
        searchInput.value.toLowerCase().trim();


    const filteredTopics =
        topics.filter(function(topic) {

            return (
                topic.title.toLowerCase().includes(searchText) ||
                topic.category.toLowerCase().includes(searchText) ||
                topic.keywords.join(" ").toLowerCase().includes(searchText)
            );

        });


    displayTopics(filteredTopics);

});


// START
displayTopics(topics);

if (topics.length > 0) {
    showTopic(topics[0]);
}
