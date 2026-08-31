const topicContainer = document.getElementById("topics");
const detailsContainer = document.getElementById("topic-details");
const searchInput = document.getElementById("searchInput");
const categoryContainer = document.getElementById("category-buttons");


// ========================================
// CURRENT CATEGORY
// ========================================

let selectedCategory = "All";


// ========================================
// DISPLAY TOPIC LIST
// ========================================

function displayTopics(topicList) {

    topicContainer.innerHTML = "";

    if (topicList.length === 0) {

        topicContainer.innerHTML =
            "<p>❌ No topics found.</p>";

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
        "Day " + topic.day +
        " — " + topic.title;

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


    // QUESTIONS

    topic.notes.forEach(function(note) {

        const noteBox =
            document.createElement("div");

        noteBox.className = "note";


        // QUESTION

        const question =
            document.createElement("h3");

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

        answer.hidden = true;


        // SHOW / HIDE

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
// CREATE CATEGORY BUTTONS
// ========================================

function createCategoryButtons() {

    categoryContainer.innerHTML = "";


    // Get unique categories

    const categories = ["All"];


    topics.forEach(function(topic) {

        if (!categories.includes(topic.category)) {

            categories.push(topic.category);

        }

    });


    // Create buttons

    categories.forEach(function(category) {

        const button =
            document.createElement("button");


        button.className =
            "category-button";


        button.textContent =
            category;


        // Highlight selected category

        if (category === selectedCategory) {

            button.classList.add("active");

        }


        // Click

        button.onclick = function() {

            selectedCategory = category;

            createCategoryButtons();

            applyFilters();

        };


        categoryContainer.appendChild(button);

    });

}


// ========================================
// SEARCH + CATEGORY FILTER
// ========================================

function applyFilters() {

    const searchText =
        searchInput.value
            .toLowerCase()
            .trim();


    const filteredTopics =
        topics.filter(function(topic) {


            // CATEGORY FILTER

            const categoryMatch =
                selectedCategory === "All" ||
                topic.category === selectedCategory;


            if (!categoryMatch) {

                return false;

            }


            // EMPTY SEARCH

            if (searchText === "") {

                return true;

            }


            // DAY

            const day =
                String(topic.day).toLowerCase();


            // CATEGORY

            const category =
                String(topic.category).toLowerCase();


            // TITLE

            const title =
                String(topic.title).toLowerCase();


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


            // DAY SEARCH

            let dayMatch = false;


            if (searchText.startsWith("day ")) {

                const searchedDay =
                    searchText
                        .replace("day ", "")
                        .trim();


                dayMatch =
                    day === searchedDay;

            }


            else if (/^\d+$/.test(searchText)) {

                dayMatch =
                    day === searchText;

            }


            // CONTENT SEARCH

            const contentMatch =

                category.includes(searchText) ||

                title.includes(searchText) ||

                keywords.includes(searchText) ||

                questions.includes(searchText) ||

                answers.includes(searchText);


            return dayMatch || contentMatch;

        });


    displayTopics(filteredTopics);

}


// ========================================
// SEARCH EVENT
// ========================================

searchInput.addEventListener(
    "input",
    function() {

        applyFilters();

    }
);


// ========================================
// START WEBSITE
// ========================================

createCategoryButtons();

displayTopics(topics);


if (topics.length > 0) {

    showTopic(topics[0]);

}
