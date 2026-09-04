/* =========================================================
   SUPABASE CONFIGURATION
========================================================= */

const SUPABASE_URL =
    "https://uoewymjhabvcmpoagpfo.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_XHY11aIRfMqBiaQDV-05Uw_mp1UGHN7";

let supabaseClient;
let topics = [];

let currentMainTopic = null;
let currentRoadmapTopic = null;


/* =========================================================
   COMPLETE EMBEDDED SYSTEMS ROADMAP
========================================================= */

/*
   KEEP YOUR COMPLETE roadmap ARRAY HERE EXACTLY AS YOU
   PROVIDED IT ABOVE.

   const roadmap = [
       ... all 27 categories ...
   ];
*/


/* =========================================================
   INITIALIZE SUPABASE
========================================================= */

function initializeSupabase() {

    if (!window.supabase) {

        console.error("Supabase library not loaded.");

        return false;
    }

    supabaseClient =
        window.supabase.createClient(
            SUPABASE_URL,
            SUPABASE_KEY
        );

    return true;
}


/* =========================================================
   LOAD TOPICS
========================================================= */

async function loadTopics() {

    try {

        const { data, error } =
            await supabaseClient
                .from("topics")
                .select("*")
                .order("day", {
                    ascending: true,
                    nullsFirst: false
                });

        if (error) {

            console.error(
                "Supabase load error:",
                error
            );

            showDatabaseError(error.message);

            return;
        }

        topics = data || [];

        console.log(
            `Loaded ${topics.length} topics from Supabase.`
        );

    } catch (error) {

        console.error(error);

        showDatabaseError(
            "Could not load topics from Supabase."
        );

    }

}


/* =========================================================
   DISPLAY ROADMAP
========================================================= */

function displayRoadmap() {

    const container =
        document.getElementById(
            "roadmapContainer"
        );

    if (!container) return;

    container.innerHTML = "";


    roadmap.forEach((phase, index) => {

        const phaseElement =
            document.createElement("div");

        phaseElement.className =
            "roadmap-phase";


        const header =
            document.createElement("button");

        header.className =
            "roadmap-phase-header";

        header.innerHTML = `

            <div class="phase-number">
                ${String(index + 1).padStart(2, "0")}
            </div>

            <div class="phase-info">

                <h3>
                    ${escapeHtml(phase.title)}
                </h3>

                <p>
                    ${escapeHtml(phase.description)}
                </p>

            </div>

            <div class="phase-arrow">
                ›
            </div>

        `;


        const topicContainer =
            document.createElement("div");

        topicContainer.className =
            "roadmap-topics";


        phase.topics.forEach(topicName => {

            const topicButton =
                document.createElement("button");

            topicButton.className =
                "roadmap-topic";

            topicButton.textContent =
                `📖 ${topicName}`;


            topicButton.addEventListener(
                "click",
                function(event) {

                    event.stopPropagation();

                    openRoadmapTopic(
                        phase,
                        topicName
                    );

                }
            );


            topicContainer.appendChild(
                topicButton
            );

        });


        header.addEventListener(
            "click",
            function() {

                phaseElement.classList.toggle(
                    "open"
                );

            }
        );


        phaseElement.appendChild(header);

        phaseElement.appendChild(
            topicContainer
        );

        container.appendChild(
            phaseElement
        );

    });

}


/* =========================================================
   OPEN ROADMAP TOPIC
========================================================= */

function openRoadmapTopic(
    phase,
    roadmapTopicName
) {

    currentMainTopic =
        phase.title;

    currentRoadmapTopic =
        roadmapTopicName;


    document
        .getElementById(
            "roadmapSection"
        )
        .classList.add("hidden");


    document
        .getElementById(
            "searchResultsSection"
        )
        .classList.add("hidden");


    document
        .getElementById(
            "learningSection"
        )
        .classList.remove("hidden");


    document
        .getElementById(
            "selectedMainTopic"
        )
        .textContent =
        phase.title;


    document
        .getElementById(
            "breadcrumb"
        )
        .textContent =
        `Roadmap → ${phase.title}`;


    displayTopicsForRoadmapTopic(
        phase,
        roadmapTopicName
    );


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================================
   FIND TOPIC IN DATABASE
========================================================= */

function findRoadmapTopic(
    category,
    title
) {

    /*
       First search using BOTH category and title.
    */

    const exactMatch =
        topics.find(topic => {

            return (
                normalize(topic.category) ===
                normalize(category)
                &&
                normalize(topic.title) ===
                normalize(title)
            );

        });


    if (exactMatch) {

        return exactMatch;

    }


    /*
       Fallback for older database entries.
    */

    return topics.find(topic => {

        return (
            normalize(topic.title) ===
            normalize(title)
        );

    });

}


/* =========================================================
   DISPLAY SELECTED ROADMAP TOPIC
========================================================= */

function displayTopicsForRoadmapTopic(
    phase,
    roadmapTopicName
) {

    const topicList =
        document.getElementById(
            "topicList"
        );


    topicList.innerHTML = "";


    const databaseTopic =
        findRoadmapTopic(
            phase.title,
            roadmapTopicName
        );


    const button =
        document.createElement("button");

    button.className =
        "topic-button active";

    button.textContent =
        `📖 ${roadmapTopicName}`;


    button.addEventListener(
        "click",
        function() {

            if (databaseTopic) {

                showTopic(
                    databaseTopic
                );

            } else {

                showPlaceholderTopic(
                    roadmapTopicName,
                    phase.title
                );

            }

        }
    );


    topicList.appendChild(
        button
    );


    /*
       Immediately display content.
       NO SECOND CLICK REQUIRED.
    */

    if (databaseTopic) {

        showTopic(databaseTopic);

    } else {

        showPlaceholderTopic(
            roadmapTopicName,
            phase.title
        );

    }

}


/* =========================================================
   SHOW TOPIC DETAILS
========================================================= */

function showTopic(topic) {

    const details =
        document.getElementById(
            "topicDetails"
        );


    details.innerHTML = "";


    const title =
        document.createElement("h1");

    title.textContent =
        `⚡ ${topic.title}`;

    details.appendChild(title);


    addContent(
        details,
        "🧒 Meaning / Simple Explanation",
        topic.simple_explanation
    );


    addContent(
        details,
        "🏠 Real-Life Example",
        topic.real_life_example
    );


    addContent(
        details,
        "🔣 Symbol / Unit",
        topic.symbol_unit
    );


    addContent(
        details,
        "⭐ Important Points",
        topic.important_points
    );


    addContent(
        details,
        "⚡ Embedded Systems Connection",
        topic.embedded_connections ||
        topic.embedded_connection
    );


    addContent(
        details,
        "🧮 Formula",
        topic.formula
    );


    addCodeContent(
        details,
        topic.code_example
    );

}


/* =========================================================
   ADD NORMAL CONTENT
========================================================= */

function addContent(
    container,
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
        "detail-box";


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

    container.appendChild(box);

}


/* =========================================================
   ADD CODE CONTENT
========================================================= */

function addCodeContent(
    container,
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
        "detail-box";


    const title =
        document.createElement("h3");

    title.textContent =
        "💻 Code Example";


    const code =
        document.createElement("pre");

    code.className =
        "code-box";

    code.textContent =
        content;


    box.appendChild(title);

    box.appendChild(code);

    container.appendChild(box);

}


/* =========================================================
   MISSING TOPIC
========================================================= */

function showPlaceholderTopic(
    topicName,
    phaseName
) {

    const details =
        document.getElementById(
            "topicDetails"
        );


    details.innerHTML = `

        <div class="missing-topic">

            <div class="missing-topic-icon">
                📖
            </div>

            <h2>
                ${escapeHtml(topicName)}
            </h2>

            <p>
                Detailed revision notes for
                <strong>
                    ${escapeHtml(topicName)}
                </strong>
                have not been added yet.
            </p>

            <button
                id="addRevisionNotesButton"
                class="add-revision-button"
            >
                ➕ Add Revision Notes
            </button>

        </div>

    `;


    document
        .getElementById(
            "addRevisionNotesButton"
        )
        .addEventListener(
            "click",
            function() {

                openModalForRoadmapTopic(
                    phaseName,
                    topicName
                );

            }
        );

}


/* =========================================================
   OPEN MODAL FOR ROADMAP TOPIC
========================================================= */

function openModalForRoadmapTopic(
    category,
    topicName
) {

    document
        .getElementById(
            "addTopicForm"
        )
        .reset();


    clearFormMessage();


    document
        .getElementById(
            "topicCategory"
        )
        .value =
        category;


    document
        .getElementById(
            "topicTitle"
        )
        .value =
        topicName;


    openModal();

}


/* =========================================================
   SEARCH
========================================================= */

function searchTopics() {

    const input =
        document.getElementById(
            "searchInput"
        );


    const searchTerm =
        input.value
            .trim()
            .toLowerCase();


    const resultsSection =
        document.getElementById(
            "searchResultsSection"
        );


    const roadmapSection =
        document.getElementById(
            "roadmapSection"
        );


    if (searchTerm === "") {

        resultsSection.classList.add(
            "hidden"
        );

        roadmapSection.classList.remove(
            "hidden"
        );

        return;

    }


    roadmapSection.classList.add(
        "hidden"
    );


    resultsSection.classList.remove(
        "hidden"
    );


    const results =
        topics.filter(topic => {

            const searchableText = [

                topic.category,
                topic.title,
                topic.simple_explanation,
                topic.real_life_example,
                topic.symbol_unit,
                topic.important_points,
                topic.embedded_connection,
                topic.embedded_connections,
                topic.formula,
                topic.code_example

            ]
                .filter(Boolean)
                .join(" ")
                .toLowerCase();


            return searchableText.includes(
                searchTerm
            );

        });


    displaySearchResults(results);

}


/* =========================================================
   DISPLAY SEARCH RESULTS
========================================================= */

function displaySearchResults(results) {

    const container =
        document.getElementById(
            "searchResults"
        );


    container.innerHTML = "";


    if (results.length === 0) {

        container.innerHTML = `

            <div class="empty-topic">

                <div class="empty-icon">
                    🔎
                </div>

                <h3>
                    No topics found
                </h3>

                <p>
                    Try another search term.
                </p>

            </div>

        `;

        return;

    }


    results.forEach(topic => {

        const item =
            document.createElement("div");

        item.className =
            "search-result-item";


        item.innerHTML = `

            <div class="search-result-category">
                ${escapeHtml(
                    topic.category ||
                    "Embedded Systems"
                )}
            </div>

            <h3>
                ${escapeHtml(topic.title)}
            </h3>

        `;


        item.addEventListener(
            "click",
            function() {

                openSearchTopic(topic);

            }
        );


        container.appendChild(item);

    });

}


/* =========================================================
   OPEN SEARCH TOPIC
========================================================= */

function openSearchTopic(topic) {

    document
        .getElementById(
            "searchResultsSection"
        )
        .classList.add("hidden");


    document
        .getElementById(
            "roadmapSection"
        )
        .classList.add("hidden");


    document
        .getElementById(
            "learningSection"
        )
        .classList.remove("hidden");


    const mainTopic =
        topic.category ||
        "Embedded Systems";


    document
        .getElementById(
            "selectedMainTopic"
        )
        .textContent =
        mainTopic;


    document
        .getElementById(
            "breadcrumb"
        )
        .textContent =
        `Search → ${mainTopic}`;


    const topicList =
        document.getElementById(
            "topicList"
        );


    topicList.innerHTML = "";


    const button =
        document.createElement("button");

    button.className =
        "topic-button active";

    button.textContent =
        `📖 ${topic.title}`;


    button.addEventListener(
        "click",
        function() {

            showTopic(topic);

        }
    );


    topicList.appendChild(button);

    showTopic(topic);


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================================
   SAVE NEW TOPIC
========================================================= */

async function saveNewTopic(event) {

    event.preventDefault();


    const category =
        document
            .getElementById(
                "topicCategory"
            )
            .value
            .trim();


    const dayValue =
        document
            .getElementById(
                "topicDay"
            )
            .value
            .trim();


    const title =
        document
            .getElementById(
                "topicTitle"
            )
            .value
            .trim();


    const simpleExplanation =
        document
            .getElementById(
                "simpleExplanation"
            )
            .value
            .trim();


    const realLifeExample =
        document
            .getElementById(
                "realLifeExample"
            )
            .value
            .trim();


    const symbolUnit =
        document
            .getElementById(
                "symbolUnit"
            )
            .value
            .trim();


    const importantPoints =
        document
            .getElementById(
                "importantPoints"
            )
            .value
            .trim();


    const embeddedConnection =
        document
            .getElementById(
                "embeddedConnection"
            )
            .value
            .trim();


    const formula =
        document
            .getElementById(
                "formula"
            )
            .value
            .trim();


    const codeExample =
        document
            .getElementById(
                "codeExample"
            )
            .value
            .trim();


    const saveButton =
        document.getElementById(
            "saveTopicButton"
        );


    if (!category || !title) {

        showFormMessage(
            "Please enter the Main Topic / Category and Topic Title.",
            "error"
        );

        return;

    }


    saveButton.disabled = true;

    saveButton.textContent =
        "Saving...";


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

        formula: formula,

        code_example:
            codeExample

    };


    if (dayValue !== "") {

        newTopic.day =
            Number(dayValue);

    }


    try {

        const { data, error } =
            await supabaseClient
                .from("topics")
                .insert([newTopic])
                .select();


        if (error) {

            console.error(
                "Insert error:",
                error
            );

            showFormMessage(
                `❌ ${error.message}`,
                "error"
            );

            return;

        }


        const savedTopic =
            data && data.length > 0
                ? data[0]
                : newTopic;


        topics.push(savedTopic);


        topics.sort((a, b) => {

            const dayA =
                Number(a.day) || 999999;

            const dayB =
                Number(b.day) || 999999;

            return dayA - dayB;

        });


        showFormMessage(
            "✅ Topic saved successfully!",
            "success"
        );


        setTimeout(
            function() {

                closeModal();


                document
                    .getElementById(
                        "addTopicForm"
                    )
                    .reset();


                clearFormMessage();


                /*
                   Immediately display
                   newly saved topic.
                */

                if (
                    currentMainTopic &&
                    currentRoadmapTopic
                ) {

                    const phase =
                        roadmap.find(item => {

                            return (
                                item.title ===
                                currentMainTopic
                            );

                        });


                    if (phase) {

                        displayTopicsForRoadmapTopic(
                            phase,
                            currentRoadmapTopic
                        );

                    }

                }


                displayRoadmap();

            },
            700
        );


    } catch (error) {

        console.error(error);

        showFormMessage(
            "❌ Something went wrong while saving.",
            "error"
        );

    } finally {

        saveButton.disabled = false;

        saveButton.textContent =
            "💾 Save Topic";

    }

}


/* =========================================================
   FORM MESSAGE
========================================================= */

function showFormMessage(
    message,
    type
) {

    const element =
        document.getElementById(
            "formMessage"
        );


    element.textContent =
        message;


    element.className =
        `form-message ${type}`;

}


function clearFormMessage() {

    const element =
        document.getElementById(
            "formMessage"
        );


    element.textContent = "";

    element.className =
        "form-message";

}


/* =========================================================
   MODAL
========================================================= */

function openModal() {

    clearFormMessage();


    document
        .getElementById(
            "addTopicModal"
        )
        .classList.remove("hidden");


    document.body.style.overflow =
        "hidden";

}


function closeModal() {

    document
        .getElementById(
            "addTopicModal"
        )
        .classList.add("hidden");


    document.body.style.overflow =
        "";

}


/* =========================================================
   BACK TO ROADMAP
========================================================= */

function backToRoadmap() {

    document
        .getElementById(
            "learningSection"
        )
        .classList.add("hidden");


    document
        .getElementById(
            "roadmapSection"
        )
        .classList.remove("hidden");


    currentMainTopic = null;
    currentRoadmapTopic = null;


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================================
   CLOSE SEARCH
========================================================= */

function closeSearch() {

    const input =
        document.getElementById(
            "searchInput"
        );


    input.value = "";


    document
        .getElementById(
            "searchResultsSection"
        )
        .classList.add("hidden");


    document
        .getElementById(
            "roadmapSection"
        )
        .classList.remove("hidden");

}


/* =========================================================
   DATABASE ERROR
========================================================= */

function showDatabaseError(message) {

    const container =
        document.getElementById(
            "roadmapContainer"
        );


    if (!container) return;


    container.innerHTML = `

        <div class="detail-box">

            <h3>
                ❌ Database Error
            </h3>

            <p>
                ${escapeHtml(message)}
            </p>

        </div>

    `;

}


/* =========================================================
   NORMALIZE TEXT
========================================================= */

function normalize(value) {

    return String(value || "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, " ")
        .trim();

}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHtml(value) {

    return String(value || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* =========================================================
   EVENT LISTENERS
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    async function() {

        const initialized =
            initializeSupabase();


        if (!initialized) {

            return;

        }


        displayRoadmap();


        await loadTopics();


        document
            .getElementById(
                "addTopicButton"
            )
            .addEventListener(
                "click",
                function() {

                    document
                        .getElementById(
                            "addTopicForm"
                        )
                        .reset();


                    openModal();

                }
            );


        document
            .getElementById(
                "closeModalButton"
            )
            .addEventListener(
                "click",
                closeModal
            );


        document
            .getElementById(
                "cancelButton"
            )
            .addEventListener(
                "click",
                closeModal
            );


        document
            .getElementById(
                "addTopicForm"
            )
            .addEventListener(
                "submit",
                saveNewTopic
            );


        document
            .getElementById(
                "backToRoadmapButton"
            )
            .addEventListener(
                "click",
                backToRoadmap
            );


        document
            .getElementById(
                "searchInput"
            )
            .addEventListener(
                "input",
                searchTopics
            );


        document
            .getElementById(
                "closeSearchButton"
            )
            .addEventListener(
                "click",
                closeSearch
            );


        document
            .getElementById(
                "addTopicModal"
            )
            .addEventListener(
                "click",
                function(event) {

                    if (event.target === this) {

                        closeModal();

                    }

                }
            );

    }
);
