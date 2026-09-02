// ========================================
// GET HTML ELEMENTS
// ========================================

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

    // Clear existing topics

    topicContainer.innerHTML = "";


    // No topics found

    if (topicList.length === 0) {

        topicContainer.innerHTML = `
            <p class="no-results">
                ❌ No topics found. Try another search.
            </p>
        `;

        return;

    }


    // Create topic buttons

    topicList.forEach(function (topic) {

        const button = document.createElement("button");

        button.className = "day-button";


        // Topic text

        button.textContent =
            "Day " + topic.day +
            " | 📂 " + topic.category +
            " | " + topic.title;


        // When topic is clicked

        button.onclick = function () {

            showTopic(topic);


            // Automatically scroll to revision notes

            document
                .getElementById("details-section")
                .scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

        };


        topicContainer.appendChild(button);

    });

}


// ========================================
// SHOW SELECTED TOPIC
// ========================================

function showTopic(topic) {

    // Clear previous topic

    detailsContainer.innerHTML = "";


    // ========================================
    // TOPIC TITLE
    // ========================================

    const title = document.createElement("h2");

    title.textContent =
        "⚡ Day " +
        topic.day +
        " — " +
        topic.title;

    detailsContainer.appendChild(title);


    // ========================================
    // CATEGORY
    // ========================================

    const category = document.createElement("p");

    category.innerHTML =
        "<strong>📂 Category:</strong> " +
        topic.category;

    detailsContainer.appendChild(category);


    // ========================================
    // KEYWORDS
    // ========================================

    const keywords = document.createElement("p");

    keywords.innerHTML =
        "<strong>🔑 Keywords:</strong> " +
        topic.keywords.join(", ");

    detailsContainer.appendChild(keywords);


    // ========================================
    // QUESTIONS AND ANSWERS
    // ========================================

    topic.notes.forEach(function (note, index) {

        // Create note box

        const noteBox =
            document.createElement("div");

        noteBox.className = "note";


        // ----------------------------------------
        // QUESTION NUMBER + QUESTION
        // ----------------------------------------

        const question =
            document.createElement("h3");

        question.textContent =
            "❓ Question " +
            (index + 1) +
            ": " +
            note.question;


        // ----------------------------------------
        // SHOW ANSWER BUTTON
        // ----------------------------------------

        const answerButton =
            document.createElement("button");

        answerButton.className =
            "answer-button";

        answerButton.textContent =
            "👀 Show Answer";


        // ----------------------------------------
        // ANSWER
        // ----------------------------------------

        const answer =
            document.createElement("p");

        answer.className =
            "answer";

        answer.textContent =
            "💡 " +
            note.answer;


        // Hide answer initially

        answer.hidden = true;


        // ----------------------------------------
        // SHOW / HIDE ANSWER
        // ----------------------------------------

        answerButton.onclick = function () {

            if (answer.hidden) {

                answer.hidden = false;

                answerButton.textContent =
                    "🙈 Hide Answer";

            }

            else {

                answer.hidden = true;

                answerButton.textContent =
                    "👀 Show Answer";

            }

        };


        // ----------------------------------------
        // ADD ELEMENTS
        // ----------------------------------------

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

    // Clear old buttons

    categoryContainer.innerHTML = "";


    // Default category

    const categories = ["All"];


    // Get unique categories from data.js

    topics.forEach(function (topic) {

        if (!categories.includes(topic.category)) {

            categories.push(topic.category);

        }

    });


    // Create buttons

    categories.forEach(function (category) {

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


        // When category is clicked

        button.onclick = function () {

            selectedCategory = category;


            // Recreate buttons

            createCategoryButtons();


            // Apply search + category filter

            applyFilters();

        };


        categoryContainer.appendChild(button);

    });

}


// ========================================
// SEARCH + CATEGORY FILTER
// ========================================

function applyFilters() {

    // Get search text

    const searchText =
        searchInput.value
            .toLowerCase()
            .trim();


    // Filter topics

    const filteredTopics =
        topics.filter(function (topic) {


            // ========================================
            // CATEGORY FILTER
            // ========================================

            const categoryMatch =

                selectedCategory === "All" ||

                topic.category === selectedCategory;


            if (!categoryMatch) {

                return false;

            }


            // ========================================
            // EMPTY SEARCH
            // ========================================

            if (searchText === "") {

                return true;

            }


            // ========================================
            // DAY
            // ========================================

            const day =
                String(topic.day)
                    .toLowerCase();


            // ========================================
            // CATEGORY
            // ========================================

            const category =
                String(topic.category)
                    .toLowerCase();


            // ========================================
            // TITLE
            // ========================================

            const title =
                String(topic.title)
                    .toLowerCase();


            // ========================================
            // KEYWORDS
            // ========================================

            const keywords =
                topic.keywords
                    .join(" ")
                    .toLowerCase();


            // ========================================
            // QUESTIONS
            // ========================================

            const questions =
                topic.notes
                    .map(function (note) {

                        return note.question;

                    })
                    .join(" ")
                    .toLowerCase();


            // ========================================
            // ANSWERS
            // ========================================

            const answers =
                topic.notes
                    .map(function (note) {

                        return note.answer;

                    })
                    .join(" ")
                    .toLowerCase();


            // ========================================
            // DAY SEARCH
            // ========================================

            let dayMatch = false;


            // Search: "Day 5"

            if (searchText.startsWith("day ")) {

                const searchedDay =
                    searchText
                        .replace("day ", "")
                        .trim();


                dayMatch =
                    day === searchedDay;

            }


            // Search: "5"

            else if (/^\d+$/.test(searchText)) {

                dayMatch =
                    day === searchText;

            }


            // ========================================
            // CONTENT SEARCH
            // ========================================

            const contentMatch =

                category.includes(searchText) ||

                title.includes(searchText) ||

                keywords.includes(searchText) ||

                questions.includes(searchText) ||

                answers.includes(searchText);


            // Return result

            return dayMatch || contentMatch;

        });


    // Display filtered topics

    displayTopics(filteredTopics);

}


// ========================================
// SEARCH EVENT
// ========================================

searchInput.addEventListener(
    "input",

    function () {

        applyFilters();

    }
);


// ========================================
// DASHBOARD STATISTICS
// ========================================

function updateStatistics() {


    // ========================================
    // TOTAL TOPICS
    // ========================================

    const topicCount =
        document.getElementById("topicCount");


    if (topicCount) {

        topicCount.textContent =
            topics.length;

    }


    // ========================================
    // TOTAL QUESTIONS
    // ========================================

    let totalQuestions = 0;


    topics.forEach(function (topic) {

        totalQuestions +=
            topic.notes.length;

    });


    const questionCount =
        document.getElementById("questionCount");


    if (questionCount) {

        questionCount.textContent =
            totalQuestions;

    }


    // ========================================
    // TOTAL CATEGORIES
    // ========================================

    const categories = [];


    topics.forEach(function (topic) {

        if (!categories.includes(topic.category)) {

            categories.push(topic.category);

        }

    });


    const categoryCount =
        document.getElementById("categoryCount");


    if (categoryCount) {

        categoryCount.textContent =
            categories.length;

    }

}


// ========================================
// START WEBSITE
// ========================================

// Update dashboard statistics

updateStatistics();


// Create category buttons

createCategoryButtons();


// Display all topics

displayTopics(topics);


// Automatically show first topic

if (topics.length > 0) {

    showTopic(topics[0]);

}
