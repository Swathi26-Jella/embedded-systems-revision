// ========================================
// SUPABASE CONFIGURATION
// ========================================

const SUPABASE_URL =
    "https://uoewymjhabvcmpoagpfo.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_XHY11aIRfMqBiaQDV-05Uw_mp1UGHN7";


// ========================================
// GLOBAL DATA
// ========================================

let topics =
    typeof backupTopics !== "undefined"
        ? [...backupTopics]
        : [];

let selectedCategory = null;


// ========================================
// HTML ELEMENTS
// ========================================

const categoryList =
    document.getElementById("category-list");

const topicList =
    document.getElementById("topic-list");

const topicDetails =
    document.getElementById("topic-details");

const searchInput =
    document.getElementById("searchInput");


// ========================================
// LOAD SUPABASE DATA
// ========================================

async function loadFromSupabase() {

    try {

        if (!window.supabase) {

            categoryList.innerHTML = `
                <p class="no-results">
                    ❌ Supabase library could not be loaded.
                </p>
            `;

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

            categoryList.innerHTML = `
                <p class="no-results">
                    ❌ Could not load topics.
                </p>
            `;

            return;
        }


        if (data && data.length > 0) {

            topics = data;

            console.log(
                "Topics loaded:",
                topics.length
            );

        }


        refreshWebsite();

    }

    catch (error) {

        console.error(
            "Connection error:",
            error
        );

        categoryList.innerHTML = `
            <p class="no-results">
                ❌ Connection error.
            </p>
        `;
    }
}


// ========================================
// GET UNIQUE CATEGORIES
// ========================================

function getCategories() {

    const categories = [];

    topics.forEach(function (topic) {

        if (
            topic.category &&
            !categories.includes(topic.category)
        ) {

            categories.push(topic.category);

        }

    });


    return categories;
}


// ========================================
// DISPLAY CATEGORIES
// ========================================

function displayCategories() {

    categoryList.innerHTML = "";

    const categories = getCategories();


    if (categories.length === 0) {

        categoryList.innerHTML = `
            <p class="no-results">
                📭 No categories found.
            </p>
        `;

        return;
    }


    categories.forEach(function (category) {

        const button =
            document.createElement("button");

        button.className =
            "category-button";

        button.textContent =
            "📂 " + category;


        if (category === selectedCategory) {

            button.classList.add("active");

        }


        button.addEventListener(
            "click",
            function () {

                selectedCategory =
                    category;

                displayCategories();

                displayTopicsForCategory(
                    category
                );

            }
        );


        categoryList.appendChild(button);

    });

}


// ========================================
// DISPLAY TOPICS INSIDE CATEGORY
// ========================================

function displayTopicsForCategory(category) {

    topicDetails.innerHTML = "";


    const categoryTopics =
        topics.filter(function (topic) {

            return topic.category === category;

        });


    topicList.innerHTML = `

        <h2 class="topic-heading">
            📂 ${category}
        </h2>

    `;


    if (categoryTopics.length === 0) {

        topicList.innerHTML += `
            <p class="no-results">
                📭 No topics found.
            </p>
        `;

        return;
    }


    categoryTopics.forEach(function (topic) {

        const button =
            document.createElement("button");

        button.className =
            "topic-button";


        button.textContent =
            topic.title;


        button.addEventListener(
            "click",
            function () {

                showTopic(topic);

            }
        );


        topicList.appendChild(button);

    });

}


// ========================================
// SHOW SELECTED TOPIC
// ========================================

function showTopic(topic) {

    topicDetails.innerHTML = "";


    const title =
        document.createElement("h2");

    title.className =
        "topic-title";


    title.textContent =
        "⚡ " + topic.title;


    topicDetails.appendChild(title);


    addContent(
        "🧒 Meaning / Simple Explanation",
        topic.simple_explanation
    );


    addContent(
        "🏠 Real-Life Example",
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
        topic.embedded_connection ||
        topic.embedded_connections
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

function addContent(
    heading,
    content
) {

    if (
        content === null ||
        content === undefined ||
        String(content).trim() === ""
    ) {

        return;
    }


    const box =
        document.createElement("div");

    box.className =
        "note";


    const headingElement =
        document.createElement("h3");

    headingElement.textContent =
        heading;


    const text =
        document.createElement("p");

    text.textContent =
        content;


    box.appendChild(
        headingElement
    );

    box.appendChild(
        text
    );


    topicDetails.appendChild(
        box
    );

}


// ========================================
// SEARCH
// ========================================

function searchTopics() {

    const searchText =
        searchInput.value
            .toLowerCase()
            .trim();


    if (searchText === "") {

        if (selectedCategory) {

            displayTopicsForCategory(
                selectedCategory
            );

        }

        return;
    }


    const results =
        topics.filter(function (topic) {

            const searchableText = `

                ${topic.category || ""}

                ${topic.title || ""}

                ${topic.simple_explanation || ""}

                ${topic.real_life_example || ""}

                ${topic.symbol_unit || ""}

                ${topic.important_points || ""}

                ${topic.embedded_connection || ""}

                ${topic.embedded_connections || ""}

                ${topic.formula || ""}

                ${topic.code_example || ""}

            `.toLowerCase();


            return searchableText.includes(
                searchText
            );

        });


    displaySearchResults(results);

}


// ========================================
// DISPLAY SEARCH RESULTS
// ========================================

function displaySearchResults(results) {

    topicDetails.innerHTML = "";

    topicList.innerHTML = `
        <h2 class="topic-heading">
            🔍 Search Results
        </h2>
    `;


    if (results.length === 0) {

        topicList.innerHTML += `
            <p class="no-results">
                📭 No matching topics found.
            </p>
        `;

        return;
    }


    results.forEach(function (topic) {

        const button =
            document.createElement("button");

        button.className =
            "topic-button";


        button.textContent =
            "📂 " +
            topic.category +
            " → " +
            topic.title;


        button.addEventListener(
            "click",
            function () {

                showTopic(topic);

            }
        );


        topicList.appendChild(button);

    });

}


// ========================================
// STATISTICS
// ========================================

function updateStatistics() {

    document
        .getElementById("topicCount")
        .textContent =
        topics.length;


    document
        .getElementById("categoryCount")
        .textContent =
        getCategories().length;

}


// ========================================
// REFRESH WEBSITE
// ========================================

function refreshWebsite() {

    updateStatistics();

    displayCategories();

}


// ========================================
// SEARCH EVENT
// ========================================

searchInput.addEventListener(
    "input",
    searchTopics
);


// ========================================
// START WEBSITE
// ========================================

refreshWebsite();

loadFromSupabase();
