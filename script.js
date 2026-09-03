// ========================================
// SUPABASE CONFIGURATION
// ========================================

const SUPABASE_URL =
    "https://uoewymjhabvcmpoagpfo.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_-kLhpfylr-Bt7vknQjFcjQ_ldsQ6E2m";


// Create Supabase client

const supabaseClient =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );


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
// GLOBAL VARIABLES
// ========================================

let topics = [];

let selectedCategory = "All";


// ========================================
// LOAD TOPICS FROM SUPABASE
// ========================================

async function loadTopics() {

    // Show loading message

    topicContainer.innerHTML = `
        <p class="no-results">
            ⏳ Loading Embedded Systems topics...
        </p>
    `;


    // Get data from Supabase

    const { data, error } =
        await supabaseClient
            .from("topics")
            .select("*")
            .order("day", {
                ascending: true
            });


    // Check for errors

    if (error) {

        console.error(
            "Supabase error:",
            error
        );


        topicContainer.innerHTML = `
            <p class="no-results">
                ❌ Unable to load topics.
                Please check Supabase connection.
            </p>
        `;

        return;

    }


    // Save topics globally

    topics = data || [];


    // Update website

    updateStatistics();

    createCategoryButtons();

    displayTopics(topics);


    // Automatically show first topic

    if (topics.length > 0) {

        showTopic(topics[0]);

    }

}


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
                ❌ No topics found.
                Try another search.
            </p>
        `;

        return;

    }


    // Create topic buttons

    topicList.forEach(function (topic) {

        const button =
            document.createElement("button");


        button.className =
            "day-button";


        // Topic text

        button.textContent =
            "Day " +
            topic.day +
            " | 📂 " +
            topic.category +
            " | " +
            topic.title;


        // When topic is clicked

        button.onclick =
            function () {

                showTopic(topic);


                // Scroll to details

                const detailsSection =
                    document.getElementById(
                        "details-section"
                    );


                if (detailsSection) {

                    detailsSection.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

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
    // DAY + TITLE
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

    createSection(
        "📂 Category",
        topic.category
    );


    // ========================================
    // SIMPLE EXPLANATION
    // ========================================

    createSection(
        "🧒 Simple Explanation",
        topic.simple_explanation
    );


    // ========================================
    // REAL LIFE EXAMPLE
    // ========================================

    createSection(
        "🌍 Real-Life Example",
        topic.real_life_example
    );


    // ========================================
    // SYMBOL / UNIT
    // ========================================

    createSection(
        "🔣 Symbol / Unit",
        topic.symbol_unit
    );


    // ========================================
    // IMPORTANT POINTS
    // ========================================

    createSection(
        "⭐ Important Points",
        topic.important_points
    );


    // ========================================
    // EMBEDDED CONNECTION
    // ========================================

    createSection(
        "🔗 Embedded Systems Connection",
        topic.embedded_connections
    );


    // ========================================
    // FORMULA
    // ========================================

    if (
        topic.formula &&
        topic.formula.trim() !== ""
    ) {

        createSection(
            "📐 Formula",
            topic.formula
        );

    }


    // ========================================
    // CODE EXAMPLE
    // ========================================

    if (
        topic.code_example &&
        topic.code_example.trim() !== ""
    ) {

        createCodeSection(
            "💻 Code Example",
            topic.code_example
        );

    }

}


// ========================================
// CREATE NORMAL SECTION
// ========================================

function createSection(
    heading,
    content
) {

    // Don't display empty sections

    if (
        !content ||
        String(content).trim() === ""
    ) {

        return;

    }


    // Create section box

    const section =
        document.createElement("div");


    section.className =
        "note";


    // Heading

    const title =
        document.createElement("h3");


    title.textContent =
        heading;


    // Content

    const text =
        document.createElement("p");


    text.textContent =
        content;


    // Add elements

    section.appendChild(title);

    section.appendChild(text);


    detailsContainer.appendChild(section);

}


// ========================================
// CREATE CODE SECTION
// ========================================

function createCodeSection(
    heading,
    code
) {

    const section =
        document.createElement("div");


    section.className =
        "note";


    // Heading

    const title =
        document.createElement("h3");


    title.textContent =
        heading;


    // Code block

    const pre =
        document.createElement("pre");


    const codeElement =
        document.createElement("code");


    codeElement.textContent =
        code;


    pre.appendChild(codeElement);


    // Add elements

    section.appendChild(title);

    section.appendChild(pre);


    detailsContainer.appendChild(section);

}


// ========================================
// CREATE CATEGORY BUTTONS
// ========================================

function createCategoryButtons() {

    // Check element exists

    if (!categoryContainer) {

        return;

    }


    // Clear old buttons

    categoryContainer.innerHTML = "";


    // Default category

    const categories = ["All"];


    // Get unique categories

    topics.forEach(function (topic) {

        if (
            topic.category &&
            !categories.includes(
                topic.category
            )
        ) {

            categories.push(
                topic.category
            );

        }

    });


    // Create buttons

    categories.forEach(
        function (category) {

            const button =
                document.createElement(
                    "button"
                );


            button.className =
                "category-button";


            button.textContent =
                category;


            // Highlight selected category

            if (
                category ===
                selectedCategory
            ) {

                button.classList.add(
                    "active"
                );

            }


            // Click event

            button.onclick =
                function () {

                    selectedCategory =
                        category;


                    // Recreate buttons

                    createCategoryButtons();


                    // Apply filters

                    applyFilters();

                };


            categoryContainer.appendChild(
                button
            );

        }
    );

}


// ========================================
// SEARCH + CATEGORY FILTER
// ========================================

function applyFilters() {

    // Get search text safely

    const searchText =
        searchInput
            ? searchInput.value
                .toLowerCase()
                .trim()
            : "";


    // Filter topics

    const filteredTopics =
        topics.filter(
            function (topic) {


                // ========================================
                // CATEGORY FILTER
                // ========================================

                const categoryMatch =

                    selectedCategory === "All" ||

                    topic.category ===
                    selectedCategory;


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
                // GET ALL SEARCHABLE CONTENT
                // ========================================

                const day =
                    String(
                        topic.day || ""
                    ).toLowerCase();


                const category =
                    String(
                        topic.category || ""
                    ).toLowerCase();


                const title =
                    String(
                        topic.title || ""
                    ).toLowerCase();


                const explanation =
                    String(
                        topic.simple_explanation || ""
                    ).toLowerCase();


                const example =
                    String(
                        topic.real_life_example || ""
                    ).toLowerCase();


                const symbol =
                    String(
                        topic.symbol_unit || ""
                    ).toLowerCase();


                const important =
                    String(
                        topic.important_points || ""
                    ).toLowerCase();


                const connection =
                    String(
                        topic.embedded_connections || ""
                    ).toLowerCase();


                const formula =
                    String(
                        topic.formula || ""
                    ).toLowerCase();


                const code =
                    String(
                        topic.code_example || ""
                    ).toLowerCase();


                // ========================================
                // DAY SEARCH
                // ========================================

                let dayMatch = false;


                // Search: Day 5

                if (
                    searchText.startsWith(
                        "day "
                    )
                ) {

                    const searchedDay =
                        searchText
                            .replace(
                                "day ",
                                ""
                            )
                            .trim();


                    dayMatch =
                        day === searchedDay;

                }


                // Search: 5

                else if (
                    /^\d+$/.test(
                        searchText
                    )
                ) {

                    dayMatch =
                        day === searchText;

                }


                // ========================================
                // CONTENT SEARCH
                // ========================================

                const contentMatch =

                    category.includes(
                        searchText
                    ) ||

                    title.includes(
                        searchText
                    ) ||

                    explanation.includes(
                        searchText
                    ) ||

                    example.includes(
                        searchText
                    ) ||

                    symbol.includes(
                        searchText
                    ) ||

                    important.includes(
                        searchText
                    ) ||

                    connection.includes(
                        searchText
                    ) ||

                    formula.includes(
                        searchText
                    ) ||

                    code.includes(
                        searchText
                    );


                return (
                    dayMatch ||
                    contentMatch
                );

            }
        );


    // Display results

    displayTopics(filteredTopics);

}


// ========================================
// SEARCH EVENT
// ========================================

if (searchInput) {

    searchInput.addEventListener(
        "input",

        function () {

            applyFilters();

        }
    );

}


// ========================================
// DASHBOARD STATISTICS
// ========================================

function updateStatistics() {

    // ========================================
    // TOTAL TOPICS
    // ========================================

    const topicCount =
        document.getElementById(
            "topicCount"
        );


    if (topicCount) {

        topicCount.textContent =
            topics.length;

    }


    // ========================================
    // TOTAL CATEGORIES
    // ========================================

    const categories = [];


    topics.forEach(
        function (topic) {

            if (
                topic.category &&
                !categories.includes(
                    topic.category
                )
            ) {

                categories.push(
                    topic.category
                );

            }

        }
    );


    const categoryCount =
        document.getElementById(
            "categoryCount"
        );


    if (categoryCount) {

        categoryCount.textContent =
            categories.length;

    }


    // ========================================
    // REVISION QUESTIONS
    // ========================================

    // Currently each database row
    // represents one learning topic.
    //
    // Quiz questions will be added later
    // in a separate Supabase table.

    const questionCount =
        document.getElementById(
            "questionCount"
        );


    if (questionCount) {

        questionCount.textContent =
            "0";

    }

}


// ========================================
// START WEBSITE
// ========================================

document.addEventListener(
    "DOMContentLoaded",

    function () {

        loadTopics();

    }
);
