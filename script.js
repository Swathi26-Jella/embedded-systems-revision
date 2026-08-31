const topicContainer = document.getElementById("topics");

topics.forEach(topic => {

    const topicCard = document.createElement("div");

    topicCard.className = "topic-card";

    topicCard.innerHTML = `
        <h2>Day ${topic.day} — ${topic.title}</h2>
    `;

    topic.notes.forEach(note => {

        const noteBox = document.createElement("div");

        noteBox.className = "note";

        noteBox.innerHTML = `
            <h3>${note.question}</h3>
            <p>${note.answer}</p>
        `;

        topicCard.appendChild(noteBox);
    });

    topicContainer.appendChild(topicCard);
});
