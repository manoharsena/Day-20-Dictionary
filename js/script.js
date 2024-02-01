
let form = document.querySelector(".form");

// input box for enter a word to search in dictionary.
let inputWord = document.querySelector(".inputWord");

// word meaning div
let wordMeaning = document.querySelector(".meaning");

// get the reference of the button
let btnSearch = document.querySelector(".btnSearch");

// findMeaning function
async function findMeaning(word) {
  // make the api request for the input word.
  try {
    let response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );

    // get the meaning for a given word from the API and parse the json.

    let data = await response.json();

    // show the details below the input box
    // create a paragraph
    let paragraph = document.createElement("p");

    // reset the wordMeaning
    wordMeaning.innerHTML = "";

    // get the audio data
    let audioSource = data[0].phonetics[0].audio;

    // set the content of the paragraph element
    paragraph.innerHTML = `
        <span class='fas fa-volume-up audio-icon'></span>
        <audio class='audio'>
            <source src=${audioSource} type='audio/mpeg'>
        </audio>
        Word: <b>${data[0].word}</b>`;

    // append the created paragraph to the wordMeaning
    wordMeaning.appendChild(paragraph);

    document.querySelector(".audio-icon").addEventListener("click", (event) => {
      document.querySelector(".audio").play();
    });

    // create a list
    let list = document.createElement("ul");
    list.style.listStyleType = "none";

    let meanings = data[0].meanings;

    for (let meaning of meanings) {
      // create a list item
      let listItem = document.createElement("li");

      // set the content of the list item
      listItem.innerHTML = `${meaning.partOfSpeech}`;

      // To display the meanings of given word in every category

      let subList = document.createElement("ul");
      subList.style.listStyleType = "disc";

      // get the definitions for the input word
      let definitions = meaning.definitions;

      for (let definition of definitions) {
        // create a list of item
        let subListItem = document.createElement("li");

        // set the content of the list item
        subListItem.innerHTML = `<em>${definition.definition}</em>`;

        // append the item to the list
        subList.appendChild(subListItem);
      }

      listItem.appendChild(subList);
      // append the item to the list
      list.appendChild(listItem);
    }

    wordMeaning.appendChild(list);
  } catch (error) {
    console.error("error fetching the meaning of the word");
  }
}

function onSubmit(event) {
  event.preventDefault();

  let word = inputWord.value;

  // call the api to getting the meaning of the word and display below input box.

  findMeaning(word);
}

form.addEventListener("submit", onSubmit);
btnSearch.addEventListener("click", onSubmit);
