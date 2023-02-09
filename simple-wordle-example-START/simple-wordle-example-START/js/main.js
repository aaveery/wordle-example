/*
We're going to build wordle without the keyboard.
*/

let word ="bitch"
let guesses = []

// 1. Add an event listener that listens to the form.
let wordleForm = document.querySelector("#wordle-form")

wordleForm.addEventListener("submit", (event)=> {
   // prevent the user from submitting the form bc we need to validate and add it
   event.preventDefault()
   let newGuessElement = event.target.elements['guess']
   let newGuess = newGuessElement.value
   // validate the length of the guess and add/remove the invalid class
   if (isTextFiveChars(newGuess)) {
      // valid
      newGuessElement.classList.remove("is-invalid")
   } else {
      // invalid
      newGuessElement.classList.add("is-invalid")
      return // exit the function so that it doesnt execute the addGuess function
   }

   // 4. only call the add guess function if the form is valid.
   addGuess(newGuess)
   newGuessElement.value =""
   newGuessElement.focus()

})

// 3. Create a function called "addguess" which pushes the guess on the guesses array
   // Note: this is going to to take our new guess as a parameter.
const addGuess = (guess) => {
   guesses.push(guess)
   console.log('All guesses shown below.')
   console.log(guesses)
   showGuessOnPage()
   checkIfCorrect()
}

// 6. Show the message in the element with the class wordle-success if it's successful.
const checkIfCorrect = () => {
   let wordleSuccessAlert = document.querySelector(".wordle-success")
   console.log(guesses)
   console.log(guesses.includes(word))
   if (guesses.includes(word))
   {
      wordleSuccessAlert.classList.remove("hidden")
      wordleForm.elements['guess'].disabled = true
   }
}

// 5. Create a showGuessOnPage function which will show the guess on the page.

const showGuessOnPage = () => {
  // 5a. return early if there are no guesses
   if (guesses.length === 0) {
      return
   }

   // 5b. create a selector that will select the guess row characters as a nodelist.
   let guessIndex = guesses.length -1 // returns the last item in an array
   let selector = `.guess-${guessIndex} .guess-character`
   let characterDivs = document.querySelectorAll(selector)

   // 5c. using foreach and your knowledge of accessing indexes to add each letter to each element.
   // loop through each of the characters
   characterDivs.forEach((element, index)=> {
      // get the guess and the character at a given index
      let currentGuess = guesses[guessIndex]

      // set the innerText of the div to that character
      element.innerText = currentGuess[index]

      // check if the character is in the right place (green box)
      if (isCharacterInCorrectPlace(currentGuess, index)) {
         // if it is add the 'correct-letter-placement' class to the element.
         element.classList.add("correct-letter-placement")
         return // exits because its correct
      }

      // check if character is in word (yellow box)
       if (isCharacterInWord(currentGuess, index)) {
            // if it is, add "incorrect-letter-placement" class to the element.
            element.classList.add("incorrect-letter-placement")
       }
   })

}

// 5d. create a isCharacterInCorrectPlace function to check if the character is in the right index of the word.
const isCharacterInCorrectPlace = (guess, index) => {
   return guess[index] === word[index] // returns true or false
}

//   5e.  create a isCharacterInWord function to check if the character is in the function.
// - Note if it's in the correct placement it should have been true in the function above.
const isCharacterInWord = (guess, index) => {
   return word.includes(guess[index]) // returns true or false
}

// 2. Validate if the value to see if it's five characters
const isTextFiveChars = (guess) => {
   if (guess.length === 5) {
      return true
   } else {
      return false
   }
}




