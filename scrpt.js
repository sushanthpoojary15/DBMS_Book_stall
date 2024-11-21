// Fetch the XML file and process it
function loadXML(callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'bookstore-server/Mybookstore_24MAI1013.xml', true); 
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            callback(xhr.responseXML); 
        }
    };
    xhr.send(null);
}

function sendUpdatedXML(updatedXmlString) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3000/update-xml', true); // Update the URL as needed
    xhr.setRequestHeader('Content-Type', 'text/xml');

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                location.reload();
            } else {
                console.error('Error updating XML file:', xhr.status, xhr.statusText);
            }
        }
    };
debugger;
    xhr.send(updatedXmlString); // Send the updated XML string
}

// Handle form submission
document.getElementById('bookForm').addEventListener('submit', function(e) {
    e.preventDefault(); 
    debugger;

    const isbn = document.getElementById('isbn').value;
    const name = document.getElementById('name').value;
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const image = document.getElementById('image').value;
    const description = document.getElementById('description').value;

    loadXML(function(xmlDoc) {

        const newBook = xmlDoc.createElement('book');
        newBook.setAttribute('ISBN', isbn);
        const nameElement = xmlDoc.createElement('name');
        nameElement.textContent = name;
        newBook.appendChild(nameElement);

        const titleElement = xmlDoc.createElement('title');
        titleElement.textContent = title;
        newBook.appendChild(titleElement);

        const authorElement = xmlDoc.createElement('author');
        authorElement.textContent = author;
        newBook.appendChild(authorElement);

        const imageElement = xmlDoc.createElement('image');
        imageElement.textContent = image;
        newBook.appendChild(imageElement);

        const descriptionElement = xmlDoc.createElement('description');
        descriptionElement.textContent = description;
        newBook.appendChild(descriptionElement);
        const topic = xmlDoc.getElementsByTagName('topic')[0];
        topic.appendChild(newBook);
        const serializer = new XMLSerializer();
        const updatedXmlString = serializer.serializeToString(topic);

        sendUpdatedXML(updatedXmlString)
    });
});




