/* =========================================
   SUPABASE CONFIGURATION
========================================= */

const SUPABASE_URL =
    "https://uoewymjhabvcmpoagpfo.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_XHY11aIRfMqBiaQDV-05Uw_mp1UGHN7";

let supabaseClient;
let topics = [];


/* =========================================
   COMPLETE EMBEDDED SYSTEMS ROADMAP
========================================= */

const roadmap = [

    {
        id: 1,
        title: "Electrical & Electronics Fundamentals",
        description: "Start here if you are completely new to Embedded Systems.",
        topics: [
            "Voltage",
            "Current",
            "Resistance",
            "Power",
            "Ohm's Law",
            "AC and DC",
            "Basic Electrical Circuits",
            "Series and Parallel Circuits",
            "Ground",
            "Electrical Safety",
            "Resistor",
            "Capacitor",
            "Inductor",
            "Diode",
            "LED",
            "Transistor",
            "MOSFET",
            "Voltage Divider",
            "Pull-Up and Pull-Down Resistors",
            "Decoupling Capacitor"
        ]
    },

    {
        id: 2,
        title: "Digital Electronics",
        description: "Understand how digital hardware represents information.",
        topics: [
            "Analog vs Digital",
            "Binary Number System",
            "Decimal Number System",
            "Hexadecimal Number System",
            "Binary to Decimal",
            "Decimal to Binary",
            "Hexadecimal Conversion",
            "Bits and Bytes",
            "Logic HIGH and LOW",
            "Logic Gates",
            "AND Gate",
            "OR Gate",
            "NOT Gate",
            "NAND Gate",
            "NOR Gate",
            "XOR Gate",
            "Boolean Logic",
            "Truth Tables",
            "Combinational Logic",
            "Sequential Logic"
        ]
    },

    {
        id: 3,
        title: "C Programming Fundamentals",
        description: "Build the programming foundation required for embedded software.",
        topics: [
            "C Programming Basics",
            "Variables",
            "Constants",
            "Data Types",
            "Operators",
            "If Else",
            "Switch Case",
            "For Loop",
            "While Loop",
            "Do While Loop",
            "Functions",
            "Function Prototype",
            "Parameters",
            "Return Values",
            "Arrays",
            "Strings",
            "Pointers",
            "Pointer Arithmetic",
            "Structures",
            "Unions",
            "Enumerations",
            "Typedef",
            "Bitwise Operators",
            "Bit Masking",
            "const",
            "static",
            "volatile",
            "extern",
            "Preprocessor",
            "Macros"
        ]
    },

    {
        id: 4,
        title: "Computer & Microcontroller Fundamentals",
        description: "Understand processors, microcontrollers and memory.",
        topics: [
            "Computer Architecture",
            "Microprocessor",
            "Microcontroller",
            "CPU",
            "ALU",
            "Control Unit",
            "Registers",
            "Clock",
            "Instruction",
            "Instruction Set",
            "Fetch Decode Execute",
            "Program Counter",
            "Stack Pointer",
            "Link Register",
            "Status Register",
            "Memory",
            "RAM",
            "ROM",
            "Flash Memory",
            "EEPROM",
            "Memory Map",
            "Memory Address",
            "Memory-Mapped Registers"
        ]
    },

    {
        id: 5,
        title: "ARM Cortex-M Architecture",
        description: "Learn the processor architecture used by modern microcontrollers.",
        topics: [
            "ARM Architecture",
            "ARM Cortex-M",
            "Cortex-M Registers",
            "R0 to R12 Registers",
            "Program Counter",
            "Stack Pointer",
            "Link Register",
            "PSR",
            "Main Stack Pointer",
            "Process Stack Pointer",
            "Stack",
            "Heap",
            "Function Calls",
            "PUSH and POP",
            "Interrupt Context",
            "Exception Handling",
            "Vector Table",
            "Reset Handler"
        ]
    },

    {
        id: 6,
        title: "STM32 Microcontrollers",
        description: "Apply ARM concepts to STM32 microcontrollers.",
        topics: [
            "STM32 Overview",
            "STM32 Family",
            "STM32 Development Board",
            "STM32 Blue Pill",
            "STM32CubeIDE",
            "STM32CubeMX",
            "Clock Configuration",
            "Reset",
            "Startup Code",
            "System Initialization",
            "Main Function",
            "Linker Script",
            "ELF File",
            "BIN File",
            "HEX File",
            "Flash Programming",
            "Debugging STM32"
        ]
    },

    {
        id: 7,
        title: "GPIO",
        description: "Control and read digital hardware pins.",
        topics: [
            "GPIO Basics",
            "GPIO Input",
            "GPIO Output",
            "GPIO Pin",
            "GPIO Port",
            "MODER Register",
            "IDR Register",
            "ODR Register",
            "BSRR Register",
            "Push-Pull",
            "Open-Drain",
            "Pull-Up",
            "Pull-Down",
            "Digital Input",
            "Digital Output",
            "LED Control",
            "Button Input",
            "Debouncing"
        ]
    },

    {
        id: 8,
        title: "Timers & Counters",
        description: "Understand timing, counting and periodic events.",
        topics: [
            "Timer Basics",
            "Timer Clock",
            "Prescaler",
            "Counter",
            "Auto Reload Register",
            "ARR Register",
            "Counter Period",
            "Capture Compare Register",
            "CCR Register",
            "Timer Interrupt",
            "Up Counter",
            "Down Counter",
            "Input Capture",
            "Output Compare",
            "One Pulse Mode"
        ]
    },

    {
        id: 9,
        title: "PWM",
        description: "Generate controlled digital signals for motors and LEDs.",
        topics: [
            "PWM Basics",
            "PWM Signal",
            "PWM Frequency",
            "PWM Duty Cycle",
            "ARR and PWM",
            "CCR and PWM",
            "PWM Output",
            "LED Brightness Control",
            "Motor Speed Control",
            "Servo Control",
            "PWM Formula"
        ]
    },

    {
        id: 10,
        title: "Interrupts & Exceptions",
        description: "React to hardware and software events.",
        topics: [
            "Interrupt Basics",
            "Interrupt Request",
            "Interrupt Handler",
            "ISR",
            "NVIC",
            "Interrupt Priority",
            "Nested Interrupts",
            "External Interrupt",
            "Timer Interrupt",
            "UART Interrupt",
            "Interrupt Latency",
            "Exception",
            "SysTick"
        ]
    },

    {
        id: 11,
        title: "ADC & DAC",
        description: "Interface embedded systems with analog signals.",
        topics: [
            "Analog Signal",
            "Digital Signal",
            "ADC Basics",
            "ADC Resolution",
            "ADC Reference Voltage",
            "ADC Conversion",
            "ADC Channel",
            "ADC Sampling",
            "ADC Interrupt",
            "ADC DMA",
            "DAC Basics",
            "Sensor Reading",
            "Potentiometer"
        ]
    },

    {
        id: 12,
        title: "Communication Protocols",
        description: "Learn how embedded devices communicate.",
        topics: [
            "Communication Basics",
            "Serial Communication",
            "UART",
            "UART Transmitter",
            "UART Receiver",
            "Baud Rate",
            "Start Bit",
            "Stop Bit",
            "Parity Bit",
            "SPI",
            "SPI Master",
            "SPI Slave",
            "Clock Polarity",
            "Clock Phase",
            "I2C",
            "I2C Master",
            "I2C Slave",
            "I2C Address",
            "ACK and NACK"
        ]
    },

    {
        id: 13,
        title: "CAN & Automotive Communication",
        description: "Learn automotive communication concepts.",
        topics: [
            "CAN Basics",
            "CAN Bus",
            "CAN Node",
            "CAN Controller",
            "CAN Transceiver",
            "CAN Frame",
            "CAN Data Frame",
            "CAN Identifier",
            "CAN Arbitration",
            "CAN Baud Rate",
            "CAN Error Handling",
            "CAN Checksum",
            "CAN Data Integrity",
            "CAN FD",
            "Sender and Receiver",
            "CAN Message"
        ]
    },

    {
        id: 14,
        title: "Embedded Software & Build Process",
        description: "Understand how C code becomes firmware.",
        topics: [
            "Embedded Software",
            "Compiler",
            "Compiler Process",
            "Preprocessor",
            "Compilation",
            "Assembly",
            "Assembler",
            "Object File",
            "Linker",
            "Linker Script",
            "ELF",
            "BIN",
            "HEX",
            "Startup Code",
            "Boot Process",
            "Firmware",
            "Flash Programming"
        ]
    },

    {
        id: 15,
        title: "Memory & Embedded Resource Management",
        description: "Understand memory and limited embedded resources.",
        topics: [
            "Memory Architecture",
            "Stack",
            "Heap",
            "Static Memory",
            "Dynamic Memory",
            "Stack Overflow",
            "Heap Fragmentation",
            "Memory Consumption",
            "Flash Usage",
            "RAM Usage",
            "Buffer",
            "Circular Buffer",
            "Queue",
            "Resource Management",
            "Pointer and Memory",
            "Memory Optimization"
        ]
    },

    {
        id: 16,
        title: "RTOS & Real-Time Systems",
        description: "Learn multitasking and real-time architecture.",
        topics: [
            "Real-Time System",
            "Real-Time Applications",
            "RTOS",
            "Task",
            "Thread",
            "Scheduler",
            "Task Priority",
            "Context Switching",
            "Synchronization",
            "Semaphore",
            "Mutex",
            "Queue",
            "Event",
            "Timer",
            "Deadlock",
            "Race Condition",
            "Interrupt and RTOS"
        ]
    },

    {
        id: 17,
        title: "Bootloader & Firmware Update",
        description: "Understand firmware startup and updates.",
        topics: [
            "Bootloader",
            "Boot Process",
            "Application Firmware",
            "Bootloader and Application",
            "Firmware Update",
            "OTA Update",
            "Memory Partition",
            "Application Start Address",
            "Firmware Validation",
            "CRC",
            "Rollback",
            "Safe Firmware Update"
        ]
    },

    {
        id: 18,
        title: "Embedded Linux",
        description: "Learn embedded Linux systems.",
        topics: [
            "Embedded Linux",
            "Linux Kernel",
            "Bootloader in Embedded Linux",
            "U-Boot",
            "Root File System",
            "File System",
            "Device Driver",
            "Linux Process",
            "Linux Thread",
            "Buildroot",
            "Yocto",
            "Cross Compilation",
            "Embedded Linux Debugging"
        ]
    },

    {
        id: 19,
        title: "Automotive Embedded Systems",
        description: "Understand automotive ECUs and networks.",
        topics: [
            "Automotive ECU",
            "ECU Architecture",
            "Automotive Network",
            "CAN Network",
            "LIN",
            "CAN FD",
            "Automotive Ethernet",
            "Gateway ECU",
            "Sensor ECU",
            "Actuator ECU",
            "Body Control Module",
            "Powertrain ECU",
            "ADAS ECU"
        ]
    },

    {
        id: 20,
        title: "Diagnostics & UDS",
        description: "Learn automotive diagnostics.",
        topics: [
            "Automotive Diagnostics",
            "Diagnostic Communication",
            "UDS",
            "UDS Services",
            "Diagnostic Session",
            "Diagnostic Mode",
            "Diagnostic Request",
            "Diagnostic Response",
            "Diagnostic Command",
            "DTC",
            "Diagnostic Trouble Code",
            "Fault Memory",
            "Response Time",
            "Timeout",
            "Tester",
            "ECU Diagnostics"
        ]
    },

    {
        id: 21,
        title: "Automotive Software Architecture",
        description: "Learn professional software development architecture.",
        topics: [
            "Software Architecture",
            "Software Module",
            "Software Component",
            "Interface",
            "Interface Description",
            "Configuration",
            "Implementation",
            "Function",
            "Program Logic",
            "Requirement",
            "Specification",
            "Documentation",
            "Validation",
            "Verification"
        ]
    },

    {
        id: 22,
        title: "Automotive Software Testing & Quality",
        description: "Learn testing and quality processes.",
        topics: [
            "Software Testing",
            "Test Case",
            "Test Environment",
            "Unit Testing",
            "Integration Testing",
            "System Testing",
            "Regression Testing",
            "Software Quality",
            "Software Error",
            "Error Message",
            "Defect",
            "Release",
            "Maintenance",
            "Traceability",
            "ASPICE",
            "V-Model"
        ]
    },

    {
        id: 23,
        title: "AUTOSAR",
        description: "Learn modern automotive software architecture.",
        topics: [
            "AUTOSAR",
            "AUTOSAR Classic",
            "AUTOSAR Adaptive",
            "Application Layer",
            "RTE",
            "Runtime Environment",
            "Basic Software",
            "MCAL",
            "ECU Abstraction",
            "Service Layer",
            "AUTOSAR OS",
            "Software Component",
            "Runnable",
            "ARXML"
        ]
    },

    {
        id: 24,
        title: "Functional Safety & Cybersecurity",
        description: "Learn safety and security concepts.",
        topics: [
            "Functional Safety",
            "ISO 26262",
            "Safety Concept",
            "Hazard",
            "Risk",
            "ASIL",
            "Safety Mechanism",
            "Watchdog",
            "Fail Safe",
            "Fault Detection",
            "Redundancy",
            "Embedded Cybersecurity",
            "Secure Boot",
            "Authentication",
            "Encryption",
            "Security Key",
            "CAN Security"
        ]
    },

    {
        id: 25,
        title: "Advanced Automotive & ADAS",
        description: "Move toward advanced automotive engineering.",
        topics: [
            "ADAS",
            "Advanced Driver Assistance Systems",
            "ADAS Sensors",
            "Radar",
            "Camera",
            "LiDAR",
            "Sensor Fusion",
            "Object Detection",
            "Lane Detection",
            "Adaptive Cruise Control",
            "Automatic Emergency Braking",
            "Parking Assistance",
            "Automotive Ethernet",
            "High Performance ECU",
            "Domain Controller",
            "Vehicle Networking",
            "EV Systems"
        ]
    },

    {
        id: 26,
        title: "Professional Embedded Engineering",
        description: "Develop professional engineering skills.",
        topics: [
            "Git",
            "GitHub",
            "Version Control",
            "Code Review",
            "Debugging",
            "GDB",
            "JTAG",
            "SWD",
            "Logic Analyzer",
            "Oscilloscope",
            "CANoe",
            "CANalyzer",
            "Trace32",
            "CAPL",
            "Jira",
            "IBM DOORS",
            "Requirements Engineering",
            "Technical Documentation"
        ]
    },

    {
        id: 27,
        title: "Advanced Embedded System Design",
        description: "Design complete production-level embedded systems.",
        topics: [
            "Embedded System Architecture",
            "Hardware Software Co-Design",
            "Real-Time Architecture",
            "Distributed Embedded Systems",
            "Multi-Core Systems",
            "Performance Optimization",
            "Power Optimization",
            "Reliability",
            "Fault Tolerance",
            "Production Firmware",
            "Production Debugging",
            "System Integration",
            "End-to-End Testing",
            "Embedded System Project"
        ]
    }

];


/* =========================================
   INITIALIZE SUPABASE
========================================= */

function initializeSupabase() {

    if (!window.supabase) {
        console.error("Supabase library not loaded.");
        return false;
    }

    supabaseClient = window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );

    return true;
}


/* =========================================
   LOAD TOPICS
========================================= */

async function loadTopics() {

    const { data, error } = await supabaseClient
        .from("topics")
        .select("*")
        .order("day", {
            ascending: true,
            nullsFirst: false
        });

    if (error) {
        console.error("Supabase error:", error);
        return;
    }

    topics = data || [];

    console.log("Topics loaded:", topics.length);
}


/* =========================================
   DISPLAY ROADMAP
========================================= */

function displayRoadmap() {

    const container =
        document.getElementById("roadmapContainer");

    container.innerHTML = "";

    roadmap.forEach((phase, index) => {

        const phaseElement =
            document.createElement("div");

        phaseElement.className = "roadmap-phase";


        const header =
            document.createElement("button");

        header.className = "roadmap-phase-header";

        header.innerHTML = `
            <div class="phase-number">
                ${String(index + 1).padStart(2, "0")}
            </div>

            <div class="phase-info">
                <h3>${escapeHtml(phase.title)}</h3>
                <p>${escapeHtml(phase.description)}</p>
            </div>

            <div class="phase-arrow">›</div>
        `;


        const topicsContainer =
            document.createElement("div");

        topicsContainer.className = "roadmap-topics";


        phase.topics.forEach(topicName => {

            const button =
                document.createElement("button");

            button.className = "roadmap-topic";

            button.textContent = `📖 ${topicName}`;

            button.addEventListener("click", event => {

                event.stopPropagation();

                openRoadmapTopic(
                    phase,
                    topicName
                );

            });

            topicsContainer.appendChild(button);

        });


        header.addEventListener("click", () => {
            phaseElement.classList.toggle("open");
        });


        phaseElement.appendChild(header);
        phaseElement.appendChild(topicsContainer);

        container.appendChild(phaseElement);

    });

}


/* =========================================
   OPEN ROADMAP TOPIC
========================================= */

function openRoadmapTopic(phase, topicName) {

    document
        .getElementById("roadmapSection")
        .classList.add("hidden");

    document
        .getElementById("learningSection")
        .classList.remove("hidden");


    document.getElementById("selectedMainTopic")
        .textContent = phase.title;

    document.getElementById("breadcrumb")
        .textContent =
        `Roadmap → ${phase.title}`;


    displayPhaseTopics(phase, topicName);

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================
   DISPLAY ALL TOPICS IN CATEGORY
========================================= */

function displayPhaseTopics(phase, selectedTopicName) {

    const list =
        document.getElementById("topicList");

    list.innerHTML = "";


    phase.topics.forEach(topicName => {

        const button =
            document.createElement("button");

        button.className = "topic-button";

        button.textContent = `📖 ${topicName}`;


        button.addEventListener("click", () => {

            document
                .querySelectorAll(".topic-button")
                .forEach(btn =>
                    btn.classList.remove("active")
                );

            button.classList.add("active");

            openTopicContent(
                topicName,
                phase.title
            );

        });


        list.appendChild(button);


        if (
            normalize(topicName) ===
            normalize(selectedTopicName)
        ) {

            button.classList.add("active");

        }

    });


    /* IMPORTANT:
       Immediately show clicked topic */
    openTopicContent(
        selectedTopicName,
        phase.title
    );

}


/* =========================================
   OPEN TOPIC CONTENT
========================================= */

function openTopicContent(topicName, category) {

    const matchingTopic =
        findTopic(topicName, category);


    if (matchingTopic) {

        showTopic(matchingTopic);

    } else {

        showMissingTopic(
            topicName,
            category
        );

    }

}


/* =========================================
   FIND TOPIC IN SUPABASE
========================================= */

function findTopic(topicName, category) {

    /* First: exact category + title */

    let found = topics.find(topic =>
        normalize(topic.title) === normalize(topicName) &&
        normalize(topic.category) === normalize(category)
    );

    if (found) return found;


    /* Second: exact title */

    found = topics.find(topic =>
        normalize(topic.title) === normalize(topicName)
    );

    if (found) return found;


    return null;

}


/* =========================================
   SHOW TOPIC
========================================= */

function showTopic(topic) {

    const details =
        document.getElementById("topicDetails");

    details.innerHTML = "";


    const title =
        document.createElement("h1");

    title.textContent = `📖 ${topic.title}`;

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
        topic.embedded_connection ||
        topic.embedded_connections
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


/* =========================================
   SHOW MISSING TOPIC
========================================= */

function showMissingTopic(topicName, category) {

    const details =
        document.getElementById("topicDetails");


    details.innerHTML = `
        <h1>📖 ${escapeHtml(topicName)}</h1>

        <div class="add-notes-box">

            <div class="empty-icon">📚</div>

            <h3>Revision Notes Not Added Yet</h3>

            <p>
                Detailed revision notes for
                <strong>${escapeHtml(topicName)}</strong>
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
        .getElementById("addRevisionNotesButton")
        .addEventListener("click", () => {

            openAddTopicModal(
                category,
                topicName
            );

        });

}


/* =========================================
   ADD NORMAL CONTENT
========================================= */

function addContent(container, heading, content) {

    if (
        content === null ||
        content === undefined ||
        String(content).trim() === ""
    ) {
        return;
    }

    const box =
        document.createElement("div");

    box.className = "detail-box";

    box.innerHTML = `
        <h3>${heading}</h3>
        <p></p>
    `;

    box.querySelector("p").textContent = content;

    container.appendChild(box);

}


/* =========================================
   ADD CODE
========================================= */

function addCodeContent(container, content) {

    if (
        content === null ||
        content === undefined ||
        String(content).trim() === ""
    ) {
        return;
    }

    const box =
        document.createElement("div");

    box.className = "detail-box";

    const heading =
        document.createElement("h3");

    heading.textContent = "💻 Code Example";

    const code =
        document.createElement("pre");

    code.className = "code-box";
    code.textContent = content;

    box.appendChild(heading);
    box.appendChild(code);

    container.appendChild(box);

}


/* =========================================
   OPEN ADD TOPIC MODAL
========================================= */

function openAddTopicModal(
    category = "",
    title = ""
) {

    const form =
        document.getElementById("addTopicForm");

    form.reset();


    document.getElementById("topicCategory")
        .value = category;

    document.getElementById("topicTitle")
        .value = title;


    document.getElementById("formMessage")
        .className = "form-message";


    document
        .getElementById("addTopicModal")
        .classList.remove("hidden");


    document.body.style.overflow = "hidden";

}


/* =========================================
   CLOSE MODAL
========================================= */

function closeModal() {

    document
        .getElementById("addTopicModal")
        .classList.add("hidden");

    document.body.style.overflow = "";

}


/* =========================================
   SAVE NEW TOPIC
========================================= */

async function saveNewTopic(event) {

    event.preventDefault();


    const category =
        document.getElementById("topicCategory")
            .value.trim();

    const title =
        document.getElementById("topicTitle")
            .value.trim();

    const day =
        document.getElementById("topicDay")
            .value.trim();


    if (!category || !title) {

        showFormMessage(
            "Please enter Category and Topic Title.",
            "error"
        );

        return;

    }


    const newTopic = {

        category: category,

        title: title,

        simple_explanation:
            document.getElementById("simpleExplanation")
                .value.trim(),

        real_life_example:
            document.getElementById("realLifeExample")
                .value.trim(),

        symbol_unit:
            document.getElementById("symbolUnit")
                .value.trim(),

        important_points:
            document.getElementById("importantPoints")
                .value.trim(),

        embedded_connections:
            document.getElementById("embeddedConnection")
                .value.trim(),

        formula:
            document.getElementById("formula")
                .value.trim(),

        code_example:
            document.getElementById("codeExample")
                .value.trim()

    };


    if (day !== "") {
        newTopic.day = Number(day);
    }


    const saveButton =
        document.getElementById("saveTopicButton");

    saveButton.disabled = true;
    saveButton.textContent = "Saving...";


    try {

        const { data, error } =
            await supabaseClient
                .from("topics")
                .insert([newTopic])
                .select();


        if (error) {

            console.error(error);

            showFormMessage(
                "❌ " + error.message,
                "error"
            );

            return;

        }


        const savedTopic =
            data && data.length > 0
                ? data[0]
                : newTopic;


        topics.push(savedTopic);


        showFormMessage(
            "✅ Topic saved successfully!",
            "success"
        );


        /* Close modal */

        setTimeout(() => {

            closeModal();


            /* Immediately display saved notes */

            showTopic(savedTopic);

        }, 700);


    } catch (error) {

        console.error(error);

        showFormMessage(
            "❌ Something went wrong while saving.",
            "error"
        );

    } finally {

        saveButton.disabled = false;
        saveButton.textContent = "💾 Save Topic";

    }

}


/* =========================================
   FORM MESSAGE
========================================= */

function showFormMessage(message, type) {

    const element =
        document.getElementById("formMessage");

    element.textContent = message;

    element.className =
        `form-message ${type}`;

}


/* =========================================
   SEARCH
========================================= */

function searchTopics() {

    const searchTerm =
        document
            .getElementById("searchInput")
            .value
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

        resultsSection.classList.add("hidden");
        roadmapSection.classList.remove("hidden");

        return;

    }


    const results = topics.filter(topic => {

        const text = [

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


        return text.includes(searchTerm);

    });


    roadmapSection.classList.add("hidden");

    resultsSection.classList.remove("hidden");

    displaySearchResults(results);

}


/* =========================================
   DISPLAY SEARCH RESULTS
========================================= */

function displaySearchResults(results) {

    const container =
        document.getElementById("searchResults");

    container.innerHTML = "";


    if (results.length === 0) {

        container.innerHTML = `
            <div class="empty-topic">

                <div class="empty-icon">🔎</div>

                <h3>No topics found</h3>

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

        item.className = "search-result-item";

        item.innerHTML = `
            <div class="search-result-category">
                ${escapeHtml(
                    topic.category || "Embedded Systems"
                )}
            </div>

            <h3>
                ${escapeHtml(topic.title)}
            </h3>
        `;


        item.addEventListener("click", () => {
            openSearchTopic(topic);
        });


        container.appendChild(item);

    });

}


/* =========================================
   OPEN SEARCH TOPIC
========================================= */

function openSearchTopic(topic) {

    document
        .getElementById("searchResultsSection")
        .classList.add("hidden");

    document
        .getElementById("learningSection")
        .classList.remove("hidden");


    document
        .getElementById("selectedMainTopic")
        .textContent =
        topic.category || "Embedded Systems";


    document
        .getElementById("breadcrumb")
        .textContent =
        `Search → ${topic.category || "Embedded Systems"}`;


    const list =
        document.getElementById("topicList");

    list.innerHTML = "";


    const button =
        document.createElement("button");

    button.className = "topic-button active";

    button.textContent = `📖 ${topic.title}`;

    button.addEventListener("click", () => {
        showTopic(topic);
    });


    list.appendChild(button);

    showTopic(topic);

}


/* =========================================
   BACK TO ROADMAP
========================================= */

function backToRoadmap() {

    document
        .getElementById("learningSection")
        .classList.add("hidden");

    document
        .getElementById("searchResultsSection")
        .classList.add("hidden");

    document
        .getElementById("roadmapSection")
        .classList.remove("hidden");


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================
   CLOSE SEARCH
========================================= */

function closeSearch() {

    document.getElementById("searchInput")
        .value = "";

    document
        .getElementById("searchResultsSection")
        .classList.add("hidden");

    document
        .getElementById("roadmapSection")
        .classList.remove("hidden");

}


/* =========================================
   NORMALIZE
========================================= */

function normalize(value) {

    return String(value || "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, " ")
        .trim();

}


/* =========================================
   ESCAPE HTML
========================================= */

function escapeHtml(value) {

    return String(value || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* =========================================
   START APPLICATION
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    async () => {

        const initialized =
            initializeSupabase();

        if (!initialized) {
            return;
        }


        /* Show roadmap */

        displayRoadmap();


        /* Load Supabase data */

        await loadTopics();


        /* Header Add Topic */

        document
            .getElementById("addTopicButton")
            .addEventListener("click", () => {

                openAddTopicModal();

            });


        /* Close modal */

        document
            .getElementById("closeModalButton")
            .addEventListener("click", closeModal);


        document
            .getElementById("cancelButton")
            .addEventListener("click", closeModal);


        /* Save */

        document
            .getElementById("addTopicForm")
            .addEventListener(
                "submit",
                saveNewTopic
            );


        /* Back */

        document
            .getElementById("backToRoadmapButton")
            .addEventListener(
                "click",
                backToRoadmap
            );


        /* Search */

        document
            .getElementById("searchInput")
            .addEventListener(
                "input",
                searchTopics
            );


        /* Close search */

        document
            .getElementById("closeSearchButton")
            .addEventListener(
                "click",
                closeSearch
            );


        /* Click outside modal */

        document
            .getElementById("addTopicModal")
            .addEventListener("click", function (event) {

                if (event.target === this) {
                    closeModal();
                }

            });

    }
);
