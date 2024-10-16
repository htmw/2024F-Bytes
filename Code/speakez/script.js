let timeout; 
document.getElementById('inputText').addEventListener('input', () => { 
    clearTimeout(timeout); 
    timeout = setTimeout(translateText, 300); 
}); 

async function fetchLanguages() {
    const apiUrl = 'https://libretranslate.com/languages'; // API endpoint for available languages
    try {
        const response = await fetch(apiUrl); 
        if (!response.ok) { 
            throw new Error(`HTTP error! status: ${response.status}`); 
        } 
        const languages = await response.json(); 
        const sourceLanguageSelect = document.getElementById('sourceLanguage'); 
        const targetLanguageSelect = document.getElementById('targetLanguage'); 

        languages.forEach(language => { 
            const option = document.createElement('option'); 
            option.value = language.code; 
            option.textContent = language.name; 
            sourceLanguageSelect.appendChild(option.cloneNode(true)); 
            targetLanguageSelect.appendChild(option); 
        });
    } catch (error) { 
        console.error('Error fetching languages:', error); 
    } 
}

function swapLanguages() { 
    const sourceLanguageSelect = document.getElementById('sourceLanguage'); 
    const targetLanguageSelect = document.getElementById('targetLanguage'); 
    const tempValue = sourceLanguageSelect.value; 
    sourceLanguageSelect.value = targetLanguageSelect.value; 
    targetLanguageSelect.value = tempValue; 
    translateText(); 
} 

async function translateText() { 
    const sourceLanguage = document.getElementById('sourceLanguage').value; 
    const targetLanguage = document.getElementById('targetLanguage').value; 
    const inputText = document.getElementById('inputText').value; 

    if (!sourceLanguage || !targetLanguage || !inputText) { 
        document.getElementById('outputText').value = '';
        return; 
    } 
    
    const apiUrl = 'https://libretranslate.com/translate'; 
    const data = { 
        q: inputText, 
        source: sourceLanguage, 
        target: targetLanguage, 
        format: 'text' 
    }; 

    try { 
        const response = await fetch(apiUrl, {
            method: 'POST', 
            headers: { 
                'Content-Type': 'application/json' 
            }, 
            body: JSON.stringify(data) 
        }); 

        if (!response.ok) { 
            const errorDetails = await response.text(); 
            console.error('Error response:', errorDetails);
            throw new Error(`HTTP error! status: ${response.status}`); 
        } 
        
        const result = await response.json(); 
        document.getElementById('outputText').value = result.translatedText; 
    } catch (error) { 
        console.error('Error translating text:', error); 
        alert("An error occurred while translating."); 
    }
}

fetchLanguages(); 
document.getElementById('swapButton').addEventListener('click', swapLanguages); 
document.getElementById('inputText').addEventListener('input', translateText); 
document.getElementById('uploadButton').addEventListener('click', translateText);


document.getElementById('uploadButton').addEventListener('click', function() {
    const dropArea = document.getElementById('drop-area'); 
    if (dropArea.style.display === 'none' || dropArea.style.display === '') {
        dropArea.style.display = 'block';  
    } else {
        dropArea.style.display = 'none';  
    }
});


document.getElementById('uploadButton').addEventListener('click', function() {
    const uploadSection = document.getElementById('uploadSection');
    if (uploadSection.style.display === 'none' || uploadSection.style.display === '') {
        uploadSection.style.display = 'block';  
    } else {
        uploadSection.style.display = 'none';  
    }
});


document.getElementById('signInButton').addEventListener('click', function() {
    document.getElementById('signInDropdown').classList.toggle('show');
});

let uploadFilesArray = [];

document.getElementById("fileInput").addEventListener("change", function () {
    document.querySelector(".fileUploadError").innerHTML = ""; 
    let files = this.files;
    let allowedFileTypes = ["audio/mp3"]; 
    let maxFileSize = 5242880; 

    uploadFilesArray = [];
    document.getElementById("fileUploadName").innerHTML = ""; 

    for (let i = 0; i < files.length; i++) {
        if (files[i].size <= maxFileSize && allowedFileTypes.includes(files[i].type)) {
            uploadFilesArray.push(files[i]);
            document.getElementById("fileUploadName").innerHTML += `<li>${files[i].name} selected <i onclick="deletefile(${i})" style="color:red;cursor:pointer;">&#10006;</i></li>`;
        } else if (files[i].size > maxFileSize) {
            document.querySelector(".fileUploadError").innerHTML = "Sorry, your file is too large. Maximum limit is 5MB.";
            return;
        } else {
            document.querySelector(".fileUploadError").innerHTML = 'Please upload files in ".mp3" format only';
            return;
        }
    }
    document.getElementById("fileInput").value = ''; 
});

function deletefile(id) {
    uploadFilesArray.splice(id, 1);
    document.getElementById("fileUploadName").innerHTML = ""; 
    uploadFilesArray.forEach((file, index) => {
        document.getElementById("fileUploadName").innerHTML += `
            <li>
                ${file.name} selected 
                <i onclick="deletefile(${index})" style="color:red;cursor:pointer;">&#10006;</i>
            </li>
        `;
    });
}

document.addEventListener("DOMContentLoaded", function() {
    let target = document.getElementById("drop-area");
    let fileInput = document.getElementById("fileInput");

    target.addEventListener('dragover', function(e) {
        e.preventDefault();
        target.classList.add('dragging');
    });

    target.addEventListener('dragleave', function() {
        target.classList.remove('dragging');
    });

    target.addEventListener('drop', function(e) {
        e.preventDefault();
        target.classList.remove('dragging');
        fileInput.files = e.dataTransfer.files; 
        fileInput.dispatchEvent(new Event('change')); 
    });
});
