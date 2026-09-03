// ========================================
// SUPABASE CONFIGURATION
// ========================================

const SUPABASE_URL =
    "https://uoewymjhabvcmpoagpfo.supabase.co";

const SUPABASE_KEY =
    "PASTE_YOUR_SUPABASE_PUBLISHABLE_KEY_HERE";


// Create Supabase connection

const supabaseClient =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );


// ========================================
// WEBSITE DATA
// ========================================

let topics = [];

let selectedCategory = "All";


// ========================================
// GET HTML ELEMENTS
// ========================================

const topicContainer =
    document.getElementById("topics");

const detailsContainer =
    document.getElementById("topic-details");

const searchInput =
    document.getElementById("searchInput");

const categoryContainer =
    document.getElementById("category-buttons");


// ========================================
// LOAD TOPICS FROM SUPABASE
// ========================================

async function loadTopics() {

    topicContainer.innerHTML = `
        <p class="loading">
            ⏳ Loading Embedded Systems topics...
        </p>
    `;


    const { data, error } =
        await supabaseClient
            .from("topics")
            .select("*")
            .order("day", {
                ascending: true
            });


    // ========================================
    // ERROR
    // ========================================

    if (error) {

        console.error(
            "Supabase error:",
            error
        );


        topicContainer.innerHTML = `
            <p class="no-results">
                ❌ Could not load topics.

                <br><br>

                Check:
                <br>
                1. Supabase key
                <br>
                2. RLS policy
                <br>
                3. topics table
            </p>
        `;

        return;

    }


    // ========================================
    // SUCCESS
    // ========================================

    topics = data || [];


    updateStatistics();

    createCategoryButtons();

    applyFilters();


    // Automatically show first topic

    if (topics.length > 0) {

        showTopic(topics[0]);

    }

}


// ========================================
// DISPLAY TOPIC LIST
// ========================================

function displayTopics(topicList) {

    topicContainer.innerHTML = "";


    if (topicList.length === 0) {

        topicContainer.innerHTML = `
            <p class="no-results">
                📭 No topics found yet.

                <br><br>

                Your Supabase database is connected,
                but no topic data is available yet.
            </p>
        `;

        return;

    }


    topicList.forEach(function (topic) {

        const button =
            document.createElement("button");

        button.className =
            "day-button";


        button.textContent =
            "Day " +
            topic.day +
            " | 📂 " +
            topic.category +
            " | " +
            topic.title;


        button.onclick = function () {

            showTopic(topic);


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
// SHOW TOPIC
// ========================================

function showTopic(topic) {

    detailsContainer.innerHTML = "";


    // ========================================
    // TITLE
    // ========================================

    const title =
        document.createElement("h2");


    title.textContent =
        "⚡ Day " +
        topic.day +
        " — " +
        topic.title;


    detailsContainer.appendChild(title);


    // ========================================
    // CATEGORY
    // ========================================

    if (topic.category) {

        const category =
            document.createElement("p");


        category.innerHTML =
            "<strong>📂 Category:</strong> " +
            topic.category;


        detailsContainer.appendChild(category);

    }


    // ========================================
    // SIMPLE EXPLANATION
    // ========================================

    if (topic.simple_explanation) {

        createContentBox(
            "🧒 Simple Explanation",
            topic.simple_explanation
        );

    }


    // ========================================
    // REAL LIFE EXAMPLE
    // ========================================

    if (topic.real_life_example) {

        createContentBox(
            "🌍 Real-Life Example",
            topic.real_life_example
        );

    }


    // ========================================
    // SYMBOL / UNIT
    // ========================================

    if (topic.symbol_unit) {

        createContentBox(
            "🔣 Symbol / Unit",
            topic.symbol_unit
        );

    }


    // ========================================
    // IMPORTANT POINTS
    // ========================================

    if (topic.important_points) {

        createContentBox(
            "⭐ Important Points",
            topic.important_points
        );

    }


    // ========================================
    // EMBEDDED CONNECTION
    // ========================================

    if (topic.embedded_connection) {

        createContentBox(
            "⚡ Embedded Systems Connection",
            topic.embedded_connection
        );

    }


    // ========================================
    // FORMULA
    // ========================================

    if (topic.formula) {

        createContentBox(
            "🧮 Formula",
            topic.formula
        );

    }


    // ========================================
    // CODE EXAMPLE
    // ========================================

    if (topic.code_example) {

        createContentBox(
            "💻 Code Example",
            topic.code_example
        );

    }

}


// ========================================
// CREATE CONTENT BOX
// ========================================

function createContentBox(
    heading,
    content
) {

    const box =
        document.createElement("div");


    box.className =
        "note";


    const title =
        document.createElement("h3");


    title.textContent =
        heading;


    const text =
        document.createElement("p");


    text.textContent =
        content;


    box.appendChild(title);

    box.appendChild(text);

    detailsContainer.appendChild(box);

}


// ========================================
// CREATE CATEGORY BUTTONS
// ========================================

function createCategoryButtons() {

    categoryContainer.innerHTML = "";


    const categories =
        ["All"];


    topics.forEach(function (topic) {

        if (
            topic.category &&
            !categories.includes(topic.category)
        ) {

            categories.push(
                topic.category
            );

        }

    });


    categories.forEach(function (category) {

        const button =
            document.createElement("button");


        button.className =
            "category-button";


        button.textContent =
            category;


        if (
            category === selectedCategory
        ) {

            button.classList.add(
                "active"
            );

        }


        button.onclick =
            function () {

                selectedCategory =
                    category;


                createCategoryButtons();

                applyFilters();

            };


        categoryContainer.appendChild(
            button
        );

    });

}


// ========================================
// SEARCH + FILTER
// ========================================

function applyFilters() {

    const searchText =
        searchInput.value
            .toLowerCase()
            .trim();


    const filteredTopics =
        topics.filter(function (topic) {


            // CATEGORY FILTER

            const categoryMatch =

                selectedCategory === "All" ||

                topic.category ===
                selectedCategory;


            if (!categoryMatch) {

                return false;

            }


            // EMPTY SEARCH

            if (searchText === "") {

                return true;

            }


            // SEARCHABLE CONTENT

            const searchableText =

                String(topic.day || "") +

                " " +

                String(topic.category || "") +

                " " +

                String(topic.title || "") +

                " " +

                String(
                    topic.simple_explanation || ""
                ) +

                " " +

                String(
                    topic.real_life_example || ""
                ) +

                " " +

                String(
                    topic.important_points || ""
                ) +

                " " +

                String(
                    topic.embedded_connection || ""
                ) +

                " " +

                String(
                    topic.formula || ""
                ) +

                " " +

                String(
                    topic.code_example || ""
                );


            return searchableText
                .toLowerCase()
                .includes(searchText);

        });


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
// UPDATE STATISTICS
// ========================================

function updateStatistics() {


    // TOTAL TOPICS

    document
        .getElementById("topicCount")
        .textContent =
        topics.length;


    // REVISION QUESTIONS

    // We will create a questions table later

    document
        .getElementById("questionCount")
        .textContent =
        "0";


    // CATEGORIES

    const categories =
        new Set();


    topics.forEach(function (topic) {

        if (topic.category) {

            categories.add(
                topic.category
            );

        }

    });


    document
        .getElementById("categoryCount")
        .textContent =
        categories.size;

}


// ========================================
// START WEBSITE
// ========================================

loadTopics();
