// ========================================
// SUPABASE CONFIGURATION
// ========================================

const SUPABASE_URL =
    "https://uoewymjhabvcmpoagpfo.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_XHY11aIRfMqBiaQDV-05Uw_mp1UGHN7";


// ========================================
// WEBSITE DATA
// ========================================

// Start with backup data immediately

let topics =
    typeof backupTopics !== "undefined"
        ? [...backupTopics]
        : [];

let selectedCategory = "All";


// ========================================
// HTML ELEMENTS
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
// DISPLAY TOPICS
// ========================================

function displayTopics(topicList) {

    topicContainer.innerHTML = "";


    if (!topicList || topicList.length === 0) {

        topicContainer.innerHTML = `
            <p class="no-results">
                📭 No topics found.
            </p>
        `;

        return;

    }


    topicList.forEach(function (topic) {

        const button =
            document.createElement("button");


        button.className = "day-button";


        button.textContent =
            "Day " + topic.day +
            " | 📂 " + topic.category +
            " | " + topic.title;


        button.addEventListener(
            "click",
            function () {

                showTopic(topic);

                document
                    .getElementById("details-section")
                    .scrollIntoView({
                        behavior: "smooth"
                    });

            }
        );


        topicContainer.appendChild(button);

    });

}


// ========================================
// SHOW TOPIC
// ========================================

function showTopic(topic) {

    detailsContainer.innerHTML = "";


    const title =
        document.createElement("h2");

    title.textContent =
        "⚡ Day " +
        topic.day +
        " — " +
        topic.title;

    detailsContainer.appendChild(title);


    addContent(
        "📂 Category",
        topic.category
    );

    addContent(
        "🧒 Simple Explanation",
        topic.simple_explanation
    );

    addContent(
        "🌍 Real-Life Example",
        topic.real_life_example
    );

    addContent(
        "🔣 Symbol / Unit",
        topic.symbol_unit
    );

    addContent(
        "⭐ Important Points",
        topic.important_points
    );

    addContent(
        "⚡ Embedded Systems Connection",
        topic.embedded_connection
    );

    addContent(
        "🧮 Formula",
        topic.formula
    );

    addContent(
        "💻 Code Example",
        topic.code_example
    );

}


// ========================================
// ADD CONTENT BOX
// ========================================

function addContent(heading, content) {

    if (!content || content.trim() === "") {
        return;
    }


    const box =
        document.createElement("div");

    box.className = "note";


    const headingElement =
        document.createElement("h3");

    headingElement.textContent = heading;


    const text =
        document.createElement("p");

    text.textContent = content;


    box.appendChild(headingElement);

    box.appendChild(text);

    detailsContainer.appendChild(box);

}


// ========================================
// CATEGORY BUTTONS
// ========================================

function createCategoryButtons() {

    categoryContainer.innerHTML = "";


    const categories = ["All"];


    topics.forEach(function (topic) {

        if (
            topic.category &&
            !categories.includes(topic.category)
        ) {

            categories.push(topic.category);

        }

    });


    categories.forEach(function (category) {

        const button =
            document.createElement("button");

        button.className =
            "category-button";


        button.textContent = category;


        if (category === selectedCategory) {

            button.classList.add("active");

        }


        button.addEventListener(
            "click",
            function () {

                selectedCategory = category;

                createCategoryButtons();

                applyFilters();

            }
        );


        categoryContainer.appendChild(button);

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


            // CATEGORY

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


            // SEARCH ALL CONTENT

            const content =
                `
                ${topic.day || ""}
                ${topic.category || ""}
                ${topic.title || ""}
                ${topic.simple_explanation || ""}
                ${topic.real_life_example || ""}
                ${topic.symbol_unit || ""}
                ${topic.important_points || ""}
                ${topic.embedded_connection || ""}
                ${topic.formula || ""}
                ${topic.code_example || ""}
                `
                .toLowerCase();


            return content.includes(searchText);

        });


    displayTopics(filteredTopics);

}


// ========================================
// STATISTICS
// ========================================

function updateStatistics() {

    document
        .getElementById("topicCount")
        .textContent =
        topics.length;


    // Questions will be added later

    document
        .getElementById("questionCount")
        .textContent = "0";


    const categories =
        new Set();


    topics.forEach(function (topic) {

        if (topic.category) {

            categories.add(topic.category);

        }

    });


    document
        .getElementById("categoryCount")
        .textContent =
        categories.size;

}


// ========================================
// LOAD SUPABASE
// ========================================

async function loadFromSupabase() {

    // If key is not configured, use backup data

    if (
        SUPABASE_KEY ===
        "PASTE_YOUR_PUBLISHABLE_KEY_HERE"
    ) {

        console.log(
            "Supabase key not added. Using backup data."
        );

        return;

    }


    try {

        // Check Supabase library

        if (!window.supabase) {

            console.error(
                "Supabase library did not load."
            );

            return;

        }


        const supabaseClient =
            window.supabase.createClient(
                SUPABASE_URL,
                SUPABASE_KEY
            );


        const { data, error } =
            await supabaseClient
                .from("topics")
                .select("*")
                .order("day", {
                    ascending: true
                });


        if (error) {

            console.error(
                "Supabase error:",
                error
            );

            // Keep backup topics

            return;

        }


        // Only replace backup data
        // if Supabase actually has data

        if (
            data &&
            data.length > 0
        ) {

            topics = data;

            console.log(
                "Topics loaded from Supabase:",
                topics.length
            );

        }

        else {

            console.log(
                "Supabase has no topics yet. Using backup data."
            );

        }


        refreshWebsite();

    }

    catch (error) {

        console.error(
            "Connection error:",
            error
        );

        // Website continues using backup data

    }

}


// ========================================
// REFRESH WEBSITE
// ========================================

function refreshWebsite() {

    updateStatistics();

    createCategoryButtons();

    applyFilters();


    if (topics.length > 0) {

        showTopic(topics[0]);

    }

}


// ========================================
// SEARCH EVENT
// ========================================

searchInput.addEventListener(
    "input",
    applyFilters
);


// ========================================
// START WEBSITE
// ========================================

// Show website immediately

refreshWebsite();


// Try Supabase in background

loadFromSupabase();
