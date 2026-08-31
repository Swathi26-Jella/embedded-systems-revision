const topicContainer = document.getElementById("topics");
const detailsContainer = document.getElementById("topic-details");
const searchInput = document.getElementById("searchInput");


// ========================================
// DISPLAY TOPIC LIST
// ========================================

function displayTopics(topicList) {

    topicContainer.innerHTML = "";

    if (topicList.length === 0) {

        topicContainer.innerHTML =
            "<p>❌ No topics found. Try another search.</p>";

        return;
    }


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


// ========================================
// SHOW SELECTED TOPIC
// ========================================

function showTopic(topic) {

    detailsContainer.innerHTML = "";


    // TITLE
    const title = document.createElement("h2");

    title.textContent =
        "Day " + topic.day + " — " + topic.title;

    detailsContainer.appendChild(title);


    // CATEGORY
    const category = document.createElement("p");

    category.innerHTML =
        "<strong>📂 Category:</strong> " +
        topic.category;

    detailsContainer.appendChild(category);


    // KEYWORDS
    const keywords = document.createElement("p");

    keywords.innerHTML =
        "<strong>🔑 Keywords:</strong> " +
        topic.keywords.join(", ");

    detailsContainer.appendChild(keywords);


    // ====================================
    // QUESTIONS AND ANSWERS
    // ====================================

    topic.notes.forEach(function(note) {

        const noteBox = document.createElement("div");

        noteBox.className = "note";


        // QUESTION
        const question = document.createElement("h3");

        question.textContent =
            "❓ " + note.question;


        // ANSWER BUTTON
        const answerButton =
            document.createElement("button");

        answerButton.className =
            "answer-button";

        answerButton.textContent =
            "👀 Show Answer";


        // ANSWER
        const answer =
            document.createElement("p");

        answer.className =
            "answer";

        answer.textContent =
            "💡 " + note.answer;


        // Hide answer initially
        answer.hidden = true;


        // ====================================
        // SHOW / HIDE ANSWER
        // ====================================

        answerButton.onclick = function() {

            if (answer.hidden) {

                answer.hidden = false;

                answerButton.textContent =
                    "🙈 Hide Answer";

            } else {

                answer.hidden = true;

                answerButton.textContent =
                    "👀 Show Answer";

            }

        };


        noteBox.appendChild(question);

        noteBox.appendChild(answerButton);

        noteBox.appendChild(answer);

        detailsContainer.appendChild(noteBox);

    });

}


// ========================================
// SMART SEARCH
// ========================================

searchInput.addEventListener("input", function() {

    const searchText =
        searchInput.value.toLowerCase().trim();


    // If search box is empty,
    // display everything
    if (searchText === "") {

        displayTopics(topics);

        return;
    }


    const filteredTopics =
        topics.filter(function(topic) {


            // DAY
            const day =
                String(topic.day);


            // CATEGORY
            const category =
                topic.category.toLowerCase();


            // TITLE
            const title =
                topic.title.toLowerCase();


            // KEYWORDS
            const keywords =
                topic.keywords
                    .join(" ")
                    .toLowerCase();


            // QUESTIONS
            const questions =
                topic.notes
                    .map(function(note) {
                        return note.question;
                    })
                    .join(" ")
                    .toLowerCase();


            // ANSWERS
            const answers =
                topic.notes
                    .map(function(note) {
                        return note.answer;
                    })
                    .join(" ")
                    .toLowerCase();


            // SEARCH EVERYTHING
            return (
                day.includes(searchText) ||
                category.includes(searchText) ||
                title.includes(searchText) ||
                keywords.includes(searchText) ||
                questions.includes(searchText) ||
                answers.includes(searchText)
            );

        });


    displayTopics(filteredTopics);

});


// ========================================
// START WEBSITE
// ========================================

displayTopics(topics);


if (topics.length > 0) {

    showTopic(topics[0]);

}
