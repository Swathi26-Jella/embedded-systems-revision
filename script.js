const topicContainer = document.getElementById("topics");

// Create the Day buttons
topics.forEach(topic => {

    const button = document.createElement("button");

    button.className = "day-button";

    button.textContent = `Day ${topic.day} — ${topic.title}`;

    // When the button is clicked
    button.addEventListener("click", function () {

        showTopic(topic);

    });

    topicContainer.appendChild(button);
});


// Function to display the selected topic
function showTopic(topic) {

    // Remove old topic details
    const oldDetails = document.getElementById("topic-details");

    if (oldDetails) {
        oldDetails.remove();
    }


    // Create new topic details
    const details = document.createElement("div");

    details.id = "topic-details";

    details.className = "topic-card";


    // Topic title
    const title = document.createElement("h2");

    title.textContent = `Day ${topic.day} — ${topic.title}`;

    details.appendChild(title);


    // Display all notes
    topic.notes.forEach(note => {

        const noteBox = document.createElement("div");

        noteBox.className = "note";


        const question = document.createElement("h3");

        question.textContent = note.question;


        const answer = document.createElement("p");

        answer.textContent = note.answer;


        noteBox.appendChild(question);

        noteBox.appendChild(answer);

        details.appendChild(noteBox);
    });


    // Add details below the buttons
    topicContainer.appendChild(details);


    // Scroll to the selected topic
    details.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}


// Automatically show Day 1 when website opens
showTopic(topics[0]);
