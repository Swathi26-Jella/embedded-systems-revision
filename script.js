// =====================================================
// SUPABASE CONFIGURATION
// =====================================================

const SUPABASE_URL =
    "https://uoewymjhabvcmpoagpfo.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_XHY11aIRfMqBiaQDV-05Uw_mp1UGHN7";


// =====================================================
// GLOBAL VARIABLES
// =====================================================

let supabaseClient = null;

let topics = [];

let selectedCategory = null;


// =====================================================
// HTML ELEMENTS
// =====================================================

const categoryList =
    document.getElementById("categoryList");

const topicList =
    document.getElementById("topicList");

const topicDetails =
    document.getElementById("topicDetails");

const searchInput =
    document.getElementById("searchInput");

const addTopicButton =
    document.getElementById("addTopicButton");

const addTopicModal =
    document.getElementById("addTopicModal");

const closeModalButton =
    document.getElementById("closeModalButton");

const cancelButton =
    document.getElementById("cancelButton");

const addTopicForm =
    document.getElementById("addTopicForm");

const saveTopicButton =
    document.getElementById("saveTopicButton");

const formMessage =
    document.getElementById("formMessage");


// =====================================================
// START SUPABASE
// =====================================================

function initializeSupabase() {

    if (!window.supabase) {

        showLoadError(
            "Supabase library could not be loaded."
        );

        return false;
    }


    supabaseClient =
        window.supabase.createClient(
            SUPABASE_URL,
            SUPABASE_KEY
        );


    return true;
}


// =====================================================
// LOAD TOPICS
// =====================================================

async function loadTopics() {

    categoryList.innerHTML = `
        <div class="loading">
            ⏳ Loading categories...
        </div>
    `;


    if (!initializeSupabase()) {

        return;
    }


    try {

        const result =
            await supabaseClient
                .from("topics")
                .select("*")
                .order("day", {
                    ascending: true
                });


        const data = result.data;

        const error = result.error;


        if (error) {

            console.error(
                "Supabase error:",
                error
            );


            showLoadError(
                "Could not load your Supabase topics."
            );

            return;
        }


        if (!data || data.length === 0) {

            topics = [];

            updateStatistics();

            displayCategories();

            topicList.innerHTML = `
                <div class="empty-state">

                    <div class="empty-icon">
                        📭
                    </div>

                    <h2>
                        No Topics Yet
                    </h2>

                    <p>
                        Click ➕ Add Topic to add
                        your first topic.
                    </p>

                </div>
            `;

            return;
        }


        topics = data;


        console.log(
            "Supabase topics loaded:",
            topics.length
        );


        updateStatistics();

        displayCategories();


    }
    catch (error) {

        console.error(
            "Unexpected error:",
            error
        );


        showLoadError(
            "Connection error while loading topics."
        );
    }

}


// =====================================================
// LOAD ERROR
// =====================================================

function showLoadError(message) {

    categoryList.innerHTML = `
        <div class="no-results">
            ❌ ${message}
        </div>
    `;


    topicList.innerHTML = `
        <div class="empty-state">

            <div class="empty-icon">
                ⚠️
            </div>

            <h2>
                Topics could not be loaded
            </h2>

            <p>
                Please check the Supabase connection.
            </p>

        </div>
    `;
}


// =====================================================
// GET CATEGORIES
// =====================================================

function getCategories() {

    const categories = [];


    topics.forEach(function (topic) {

        const category =
            String(topic.category || "").trim();


        if (
            category !== "" &&
            !categories.includes(category)
        ) {

            categories.push(category);

        }

    });


    return categories;
}


// =====================================================
// DISPLAY CATEGORIES
// =====================================================

function displayCategories() {

    categoryList.innerHTML = "";


    const categories =
        getCategories();


    if (categories.length === 0) {

        categoryList.innerHTML = `
            <div class="no-results">
                📭 No categories found.
            </div>
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


        if (
            selectedCategory === category
        ) {

            button.classList.add("active");

        }


        button.addEventListener(
            "click",
            function () {

                selectedCategory =
                    category;


                displayCategories();

                displayTopics(
                    category
                );

            }
        );


        categoryList.appendChild(button);

    });

}


// =====================================================
// DISPLAY TOPICS
// =====================================================

function displayTopics(category) {

    topicDetails.innerHTML = "";


    const categoryTopics =
        topics.filter(function (topic) {

            return (
                String(topic.category || "").trim()
                === category
            );

        });


    topicList.innerHTML = "";


    const heading =
        document.createElement("h2");


    heading.className =
        "topic-heading";


    heading.textContent =
        "📂 " + category;


    topicList.appendChild(
        heading
    );


    if (categoryTopics.length === 0) {

        const message =
            document.createElement("p");


        message.className =
            "no-results";


        message.textContent =
            "📭 No topics in this category yet.";


        topicList.appendChild(
            message
        );


        return;
    }


    categoryTopics.forEach(
        function (topic) {

            const button =
                document.createElement("button");


            button.className =
                "topic-button";


            button.textContent =
                "📖 " + topic.title;


            button.addEventListener(
                "click",
                function () {

                    showTopic(topic);

                }
            );


            topicList.appendChild(
                button
            );

        }
    );

}


// =====================================================
// SHOW TOPIC DETAILS
// =====================================================

function showTopic(topic) {

    topicDetails.innerHTML = "";


    const title =
        document.createElement("h2");


    title.className =
        "topic-title";


    title.textContent =
        "⚡ " + topic.title;


    topicDetails.appendChild(
        title
    );


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


    addCodeContent(
        "💻 Code Example",
        topic.code_example
    );


    topicDetails.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


// =====================================================
// ADD NORMAL CONTENT
// =====================================================

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
        String(content);


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


// =====================================================
// ADD CODE CONTENT
// =====================================================

function addCodeContent(
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


    const code =
        document.createElement("pre");


    code.textContent =
        String(content);


    box.appendChild(
        headingElement
    );


    box.appendChild(
        code
    );


    topicDetails.appendChild(
        box
    );

}


// =====================================================
// UPDATE STATISTICS
// =====================================================

function updateStatistics() {

    document.getElementById(
        "topicCount"
    ).textContent =
        topics.length;


    document.getElementById(
        "categoryCount"
    ).textContent =
        getCategories().length;

}


// =====================================================
// SEARCH
// =====================================================

function searchTopics() {

    const searchText =
        searchInput.value
            .toLowerCase()
            .trim();


    if (searchText === "") {

        topicDetails.innerHTML = "";


        if (selectedCategory) {

            displayTopics(
                selectedCategory
            );

        }
        else {

            showDefaultMessage();

        }


        return;
    }


    const results =
        topics.filter(
            function (topic) {

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

            }
        );


    displaySearchResults(
        results
    );

}


// =====================================================
// SEARCH RESULTS
// =====================================================

function displaySearchResults(results) {

    topicDetails.innerHTML = "";


    topicList.innerHTML = `
        <h2 class="topic-heading">
            🔍 Search Results
        </h2>
    `;


    if (results.length === 0) {

        topicList.innerHTML += `
            <div class="no-results">
                📭 No matching topics found.
            </div>
        `;

        return;
    }


    results.forEach(
        function (topic) {

            const button =
                document.createElement("button");


            button.className =
                "topic-button";


            button.textContent =
                "📂 " +
                topic.category +
                "  →  📖 " +
                topic.title;


            button.addEventListener(
                "click",
                function () {

                    showTopic(topic);

                }
            );


            topicList.appendChild(
                button
            );

        }
    );

}


// =====================================================
// DEFAULT MESSAGE
// =====================================================

function showDefaultMessage() {

    topicList.innerHTML = `
        <div class="empty-state">

            <div class="empty-icon">
                ⚡
            </div>

            <h2>
                Welcome to Embedded Systems Revision Hub
            </h2>

            <p>
                Select a category from the left
                to see your topics.
            </p>

        </div>
    `;

}


// =====================================================
// OPEN ADD TOPIC MODAL
// =====================================================

function openAddTopicModal() {

    formMessage.textContent = "";

    formMessage.className =
        "form-message";


    addTopicModal.classList.remove(
        "hidden"
    );


    document.body.style.overflow =
        "hidden";

}


// =====================================================
// CLOSE ADD TOPIC MODAL
// =====================================================

function closeAddTopicModal() {

    addTopicModal.classList.add(
        "hidden"
    );


    document.body.style.overflow =
        "";
}


// =====================================================
// SAVE NEW TOPIC
// =====================================================

async function saveNewTopic(event) {

    event.preventDefault();


    formMessage.textContent =
        "⏳ Saving topic...";


    formMessage.className =
        "form-message";


    saveTopicButton.disabled =
        true;


    try {

        if (!supabaseClient) {

            if (!initializeSupabase()) {

                throw new Error(
                    "Supabase is not available."
                );

            }

        }


        const dayValue =
            document
                .getElementById("topicDay")
                .value
                .trim();


        const category =
            document
                .getElementById("topicCategory")
                .value
                .trim();


        const title =
            document
                .getElementById("topicTitle")
                .value
                .trim();


        const simpleExplanation =
            document
                .getElementById("simpleExplanation")
                .value
                .trim();


        const realLifeExample =
            document
                .getElementById("realLifeExample")
                .value
                .trim();


        const symbolUnit =
            document
                .getElementById("symbolUnit")
                .value
                .trim();


        const importantPoints =
            document
                .getElementById("importantPoints")
                .value
                .trim();


        const embeddedConnection =
            document
                .getElementById("embeddedConnection")
                .value
                .trim();


        const formula =
            document
                .getElementById("formula")
                .value
                .trim();


        const codeExample =
            document
                .getElementById("codeExample")
                .value
                .trim();


        if (
            category === "" ||
            title === ""
        ) {

            throw new Error(
                "Category and Topic Title are required."
            );

        }


        // ---------------------------------------------
        // INSERT INTO SUPABASE
        // ---------------------------------------------

        const newTopic = {

            category: category,

            title: title,

            simple_explanation:
                simpleExplanation,

            real_life_example:
                realLifeExample,

            symbol_unit:
                symbolUnit,

            important_points:
                importantPoints,

            embedded_connections:
                embeddedConnection,

            formula:
                formula,

            code_example:
                codeExample

        };


        // Only send day when the user entered it.

        if (dayValue !== "") {

            newTopic.day =
                Number(dayValue);

        }


        const result =
            await supabaseClient
                .from("topics")
                .insert([newTopic])
                .select();


        const data =
            result.data;

        const error =
            result.error;


        if (error) {

            console.error(
                "Insert error:",
                error
            );


            throw new Error(
                error.message
            );

        }


        // ---------------------------------------------
        // ADD TO LOCAL WEBSITE DATA
        // ---------------------------------------------

        if (data && data.length > 0) {

            topics.push(
                data[0]
            );

        }
        else {

            topics.push(
                newTopic
            );

        }


        // Sort by day if available.

        topics.sort(
            function (a, b) {

                return (
                    Number(a.day || 999999) -
                    Number(b.day || 999999)
                );

            }
        );


        // ---------------------------------------------
        // REFRESH WEBSITE
        // ---------------------------------------------

        updateStatistics();

        displayCategories();


        selectedCategory =
            category;


        displayCategories();

        displayTopics(
            category
        );


        // ---------------------------------------------
        // SHOW SUCCESS
        // ---------------------------------------------

        formMessage.textContent =
            "✅ Topic saved successfully!";


        formMessage.className =
            "form-message success";


        // ---------------------------------------------
        // RESET FORM AFTER SHORT DELAY
        // ---------------------------------------------

        setTimeout(
            function () {

                addTopicForm.reset();

                closeAddTopicModal();

                formMessage.textContent = "";

            },
            900
        );


    }
    catch (error) {

        console.error(
            "Save topic error:",
            error
        );


        formMessage.textContent =
            "❌ " + error.message;


        formMessage.className =
            "form-message error";

    }
    finally {

        saveTopicButton.disabled =
            false;

    }

}


// =====================================================
// EVENTS
// =====================================================

addTopicButton.addEventListener(
    "click",
    openAddTopicModal
);


closeModalButton.addEventListener(
    "click",
    closeAddTopicModal
);


cancelButton.addEventListener(
    "click",
    closeAddTopicModal
);


addTopicForm.addEventListener(
    "submit",
    saveNewTopic
);


searchInput.addEventListener(
    "input",
    searchTopics
);


// Close modal when clicking outside.

addTopicModal.addEventListener(
    "click",
    function (event) {

        if (
            event.target ===
            addTopicModal
        ) {

            closeAddTopicModal();

        }

    }
);


// =====================================================
// START WEBSITE
// =====================================================

showDefaultMessage();

loadTopics();
