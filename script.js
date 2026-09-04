// ========================================
// SUPABASE CONFIGURATION
// ========================================

const SUPABASE_URL =
    "https://uoewymjhabvcmpoagpfo.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_XHY11aIRfMqBiaQDV-05Uw_mp1UGHN7";


// ========================================
// SUPABASE CLIENT
// ========================================

let supabaseClient = null;

if (window.supabase) {

    supabaseClient = window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );

} else {

    console.error("Supabase library was not loaded.");

}


// ========================================
// WEBSITE DATA
// ========================================

let topics = [];


// ========================================
// HTML ELEMENTS
// ========================================

const topicContainer =
    document.getElementById("topics");

const detailsContainer =
    document.getElementById("topic-details");

const searchInput =
    document.getElementById("searchInput");


// ========================================
// LOAD TOPICS FROM SUPABASE
// ========================================

async function loadTopics() {

    topicContainer.innerHTML = `
        <div class="status">
            ⏳ Loading topics...
        </div>
    `;


    if (!supabaseClient) {

        topicContainer.innerHTML = `
            <div class="status">
                ❌ Supabase library could not be loaded.
            </div>
        `;

        return;

    }


    try {

        const { data, error } = await supabaseClient
            .from("topics")
            .select("*")
            .order("day", { ascending: true });


        if (error) {

            console.error("Supabase error:", error);

            topicContainer.innerHTML = `
                <div class="status">
                    ❌ Could not load topics from Supabase.
                    <br><br>
                    ${error.message}
                </div>
            `;

            return;

        }


        if (!data || data.length === 0) {

            topicContainer.innerHTML = `
                <div class="status">
                    📭 No topics found in Supabase.
                </div>
            `;

            return;

        }


        // Store Supabase topics

        topics = data;


        console.log(
            "Successfully loaded:",
            topics.length,
            "topics"
        );


        displayTopics(topics);


        // Show first topic automatically

        showTopic(topics[0]);

    }


    catch (error) {

        console.error(
            "Unexpected Supabase error:",
            error
        );


        topicContainer.innerHTML = `
            <div class="status">
                ❌ Connection problem.
                <br><br>
                ${error.message}
            </div>
        `;

    }

}


// ========================================
// DISPLAY TOPICS
// ========================================

function displayTopics(topicList) {

    topicContainer.innerHTML = "";


    if (!topicList || topicList.length === 0) {

        topicContainer.innerHTML = `
            <div class="status">
                📭 No matching topics found.
            </div>
        `;

        return;

    }


    topicList.forEach(function(topic) {

        const button =
            document.createElement("button");


        button.className = "topic-button";


        button.textContent =
            "Day " +
            topic.day +
            " — " +
            topic.title;


        button.addEventListener(
            "click",
            function() {

                showTopic(topic);

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


    // TITLE

    const title =
        document.createElement("h1");

    title.textContent =
        "Day " +
        topic.day +
        " — " +
        topic.title;

    detailsContainer.appendChild(title);


    // CATEGORY

    if (topic.category) {

        const category =
            document.createElement("div");

        category.className =
            "topic-category";

        category.textContent =
            "📂 " + topic.category;

        detailsContainer.appendChild(category);

    }


    // SIMPLE EXPLANATION

    addContent(
        "🧒 What does it mean?",
        topic.simple_explanation
    );


    // REAL LIFE

    addContent(
        "🏠 Real-Life Example",
        topic.real_life_example
    );


    // SYMBOL / UNIT

    addContent(
        "🔣 Symbol / Unit",
        topic.symbol_unit
    );


    // IMPORTANT POINTS

    addContent(
        "⭐ Important Points",
        topic.important_points
    );


    // EMBEDDED CONNECTION

    addContent(
        "🔧 Where is it used in Embedded Systems?",
        topic.embedded_connections
    );


    // FORMULA

    addContent(
        "🧮 Formula",
        topic.formula
    );


    // CODE

    addCode(
        "💻 Code Example",
        topic.code_example
    );

}


// ========================================
// ADD NORMAL CONTENT
// ========================================

function addContent(heading, content) {

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


    detailsContainer.appendChild(
        box
    );

}


// ========================================
// ADD CODE CONTENT
// ========================================

function addCode(heading, content) {

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
        document.createElement("div");

    code.className =
        "code-box";

    code.textContent =
        content;


    box.appendChild(
        headingElement
    );

    box.appendChild(
        code
    );


    detailsContainer.appendChild(
        box
    );

}


// ========================================
// SEARCH
// ========================================

searchInput.addEventListener(
    "input",
    function() {

        const searchText =
            searchInput.value
                .toLowerCase()
                .trim();


        if (searchText === "") {

            displayTopics(topics);

            return;

        }


        const filteredTopics =
            topics.filter(function(topic) {

                const searchableText = `

                    ${topic.day || ""}

                    ${topic.category || ""}

                    ${topic.title || ""}

                    ${topic.simple_explanation || ""}

                    ${topic.real_life_example || ""}

                    ${topic.symbol_unit || ""}

                    ${topic.important_points || ""}

                    ${topic.embedded_connections || ""}

                    ${topic.formula || ""}

                    ${topic.code_example || ""}

                `.toLowerCase();


                return searchableText.includes(
                    searchText
                );

            });


        displayTopics(
            filteredTopics
        );

    }
);


// ========================================
// START WEBSITE
// ========================================

loadTopics();
