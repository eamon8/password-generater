// Assignment Code
var generateBtn = document.querySelector("#generate");
var startBtn = document.getElementById("start1");
var steps = document.getElementsByClassName("steps");
var buttons = document.getElementsByClassName("btn");
var slider = document.getElementById("myRange");
var output = document.getElementById("lengthV");
var lowercase = "abcdefghijklmnopqrstuvwxyz";//lowercasecharset
var uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";//uppercasecharset
var numeric = "0123456789";//numbers
var special="!#$%&'()*+,-./:;<=>?@[\]^_`{|}~";//sepcialcharset
//setting the selected_length varable to store users password length changes
var selected_length = 0;
var step0 = document.getElementById("start");
var step2 = document.getElementById("step2");
var selected_char_types=[];
var charTypes = document.querySelectorAll(".char_types");
var selected_length = 0;
// Write password to the #password input
// startBtnEl.on('click', function () {
//   document.getElementById("id").innerHTML = "Current Lenght:  <input type="range" min="1" max="100" value="50" class="slider" id="myRange">
// });

output.innerHTML = slider.value; // Display the default slider value
//hide all steps and let strart show
function hidesteps(){
  for (step of steps){
  step.style.display= "none"
}};

hidesteps();//inttial hideing of steps


for ( button of buttons){
  button.addEventListener("click", function(){
    step0.style.display="none"
    hidesteps();
    var current = document.getElementById(this.dataset.step);
    current.style.display= "block";
  });

}

selected_length = slider.value; //set the initial slider value
document.getElementById("restart").style.display="none"
// Update the current slider value on drag
slider.onchange = function() {
    //store the user selected value
    selected_length = this.value;
    //change/update the display value with the user's selection
    output.innerText = this.value;
}


for (var ch_box of charTypes) {
  ch_box.onchange = function(){
    //on change if this checkbox is checked
    if (this.checked){
      //add the chartype to the array selected_char_types
      selected_char_types.push(this.value)
    }else{
      //if the checkbox was uncheked remove this item from the selected_char_types
      //get the value of the unselected 
      var selected_name = selected_char_types.indexOf(this.value)
      //loop over the current selected_char_types
      for( var i = 0; i < selected_char_types.length; i++){ 
        //using splice to remove the objects based on the value from the selected_char_types array
        if ( selected_char_types[i] === this.value) { 
          selected_char_types.splice(selected_name, 1); 
          //itterate over not just last seen but the entire array
          i--; 
        }
      }
    }
  };
}


function process_types(){
  //check that the char type list is larger then 0
  if (selected_char_types.length>0){
    return true;
  }
  //failed validation return false
  return false;
}

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
output.innerHTML = this.value;
}

   function generatePassword(){
    //setting new fresh value to the variable to store characters from the user selection  
    var chars=""
    //variable to store at least one char from the selected charsets
    var at_least_one=""
    //itarate over the array using the awesome new to me "var of array method"
    //to make sure at least one char from their selection exists
    for(var typ of selected_char_types){
      //add the global var values of chars based on selection to the chars
      chars += window[typ];
      //append random char from each selected char type to the at_least_one
      at_least_one+=window[typ].charAt(Math.floor(Math.random() * window[typ].length));
    }
    //add chars from the at_least_one varable before adding more chars
    random_chars = at_least_one;
    //loop over the chars string setting the limit of characters to users selection
    //subtracting the one of character length 
    for (var i = 0; i < selected_length-at_least_one.length; i++) {
      //add random character to the varable
      random_chars += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    //return the string to be displayed to the user
    return random_chars;
  };
    

  function writePassword() {
    //validation of char types failed display error
    if (!process_types()){
      document.getElementById("validation_errors").innerText="Please select at least one char type!"
      return;
    };
  document.getElementById("validation_errors").innerText=""
  //store the password string
  var password = generatePassword();
  var passwordText = document.querySelector("#password");
  passwordText.value = password;
  // hide the character type selection
  step2.style.display="none";
  // display the start card body
  document.getElementById("start").style.display = "block";
  // display the result section
  // change the result sections button text to let user change the selection
  document.getElementById("start1").innerText="Change Generated Password"
  //unhide the reset button to allow the user to start over
  document.getElementById("restart").style.display = "inline-block";

}


// function writePassword() {
//   var password = generatePassword();
//   var passwordText = document.querySelector("#password");
//   passwordText.value = password;
  
// }
// Add event listener to generate button
generateBtn.addEventListener("click", writePassword)




