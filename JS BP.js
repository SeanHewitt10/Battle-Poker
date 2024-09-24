

var splashScreen = document.querySelector('.splash');
splashScreen.addEventListener('click',()=>{
  splashScreen.style.opacity = 0;
  setTimeout(()=>{
    splashScreen.classList.add('hidden')
  },610)
})


  var splashScreen2 = document.querySelector('.splash2');
  splashScreen2.addEventListener('click',()=>{
    splashScreen2.style.opacity = 0;
    setTimeout(()=>{
      splashScreen2.classList.add('hidden')
    },610)
  })
  


function dealCards(arr) {

    // get random index value
    const randomIndex  = Math.floor(Math.random() * arr.length);

    // get random item
    const item = arr[randomIndex];
    
    //removes entry from array
		arr.splice(randomIndex,1)
    
    return item;
}
 

//array for the deck
const deck = ['2H','3H','4H','5H','6H','7H','8H','9H','AH','BH','CH','DH','EH','2C','3C','4C','5C','6C','7C','8C','9C','AC','BC','CC','DC','EC','2D','3D','4D','5D','6D','7D','8D','9D','AD','BD','CD',
  'DD','ED','2S','3S','4S','5S','6S','7S','8S','9S','AS','BS','CS','DS','ES'];
//array for your hand
const hand = [];
//array for discarded cards
const discardPile = [];
//array for played hand
const playedHand = [];
//variable for displaying the hand played
var handName = ""
//hands able to be played
var hands = 4
//variable for discards
var discards = 2;
//variable for score for damage
var score2 = 0
//variable for boss health
var bossHealth = 200
//variable to determine boss
var bossCounter = 0
//variable for max hands
var handsMax = 4
//variable for max discards
var discardsMax = 2
//variable for multiplier
var multcount5 = 0
//var for continue button
var cont = document.getElementsByClassName("close")[0];
var close1 = document.getElementsByClassName("close")[1];
var accept = document.getElementsByClassName("close")[2];
var close3 = document.getElementsByClassName("close")[3];
var close4 = document.getElementsByClassName("close")[4];
// Get the modal
var modal = document.getElementById("myModal");
var modal1 = document.getElementById("myModal1");
var modal2 = document.getElementById("myModal2");
var modal3 = document.getElementById("myModal3");
var modal4 = document.getElementById("myModal4");
//var to get modal content of modal
var modalContent = document.getElementById("damage");
var modalContent1 = document.getElementById("discardM");
var modalContent2 = document.getElementById("beat");


for ( var q = 0; q < 8; q++ ) {
//runs X number of times

const result = dealCards(deck);

//pushes card code to display image file and changes class of checkbox
document.getElementById(q).src= result + ".png";

//pushes card ID to input checkbox values
var assign = "cb" + q;
document.getElementById(assign).value=result;

//pushes card codes to hand array
hand.push(result);

console.log(result);

}


//function for checking what hand has been played
function checkHand (array){

  // variable to check how many repeated "comparable" entries there are
  var comp = 0
  //variable to check the value of the repeated entries
  var value = 0
  //variable that will define the multiplier used when scoring
  var mult = 0
  //variable for score
  var score = 0
  
  //breaks down the array into 2 news ones by first and second character
  const check1 = array.map((e) => e[0]);
  const check2 = array.map((q) => q[1]);
  
  var i = check1.length
  var o = check2.length
  
  //function to check occurrences of specific value in an array
  function getOccurrence(array2, value) {
    return array2.filter((v) => (v === value)).length;
  }
  
  //turns the check1 array into an object and counts how many times a value appears
  var count = {};
  check1.forEach(function(v) {
    count[v] = (count[v] || 0) + 1;
  });
  

  //for loop to repeat this for the length of the check1 array
for (var p = 0; p < i; p++) {

  //variable assigned to positions in the array
  var pos = check1[p]
  var num = getOccurrence(check1, pos)

  //if statement to assign multiplier to 'comp' and value of card to 'value'
  if (num > comp) {
    comp = getOccurrence(check1, pos);
    if ((pos === 'A') || (pos === 'B') || (pos === 'C') || (pos === 'D')) {
      value = 10
    } else if (pos === 'E') {
      value = 11
    } else
      value = pos;

  }
} //end for loop
  
  //checks for flush in second array
  for (var p = 0; p < o; p++) {
  
    var pos2 = check2[p]
    var flush = getOccurrence(check2, pos2)
  
  }
  
  //sorts array by number then letters
  check1.sort(function(a, b) {
    if (typeof a === 'string' || typeof b === 'string') {
      return a.toString().localeCompare(b.toString());
    }
    return a - b;
  });
  
  console.log(check1)
  
  //This part begins the nested IF checks to go down the list and see what kind of poker hand the player has
  
  //checks for royal flush 
  if (check1.toString() == "A,B,C,D,E" && flush == 5) {
  
    handName = 'Royal Flush'
    score = 10000
    console.log(score)
  
    //checks for straight flush
  } else if ((check1.toString() == "9,A,B,C,D" || check1.toString() == "8,9,A,B,C" || check1.toString() == "7,8,9,A,B" || check1.toString() == "6,7,8,9,A" || check1.toString() == "5,6,7,8,9" || check1.toString() == "4,5,6,7,8" || check1.toString() == "3,4,5,6,7" || check1.toString() == "2,3,4,5,6" || check1.toString() == "2,3,4,5,E") && (flush == 5)) {
  
    mult = 9 + multcount5;
    
    handName = 'Straight Flush'
    
    for (var p = 0; p < i; p++) {
      var pos = check1[p]
      if ((pos === 'A') || (pos === 'B') || (pos === 'C') || (pos === 'D')) {
        score = score + 10
      } else if (pos === 'E') {
        score = score + 11
      } else {
        score = score + pos * 1;
      }
    }
    score = score * mult
    console.log(score)
    
  
    //checks for four of a kind
  } else if (comp === 4) {
  
    handName = 'Four of a kind'
    mult = 8 + multcount5;
    
    for (var p = 0; p < i; p++) {
  
      //variable assigned to positions in the array
      var pos = check1[p]
      var num = getOccurrence(check1, pos)
  
      //if statement to assign multiplier to 'comp' and value of card to 'value'
      if (num > comp) {
        comp = getOccurrence(check1, pos);
        if ((pos === 'A') || (pos === 'B') || (pos === 'C') || (pos === 'D')) {
          value = 10
        } else if (pos === 'E') {
          value = 11
        } else
          value = pos;
  
      }
    }
  
    value = value * 4;
    score = value * mult;
    console.log(score)
  
    //checks for full house
  } else if ((Object.values(count).includes(2)) && (Object.values(count).includes(3))) {
    handName = 'Full House';
    mult = 7 + multcount5;
    

    for (var p = 0; p < i; p++) {
      var pos = check1[p]
      if ((pos === 'A') || (pos === 'B') || (pos === 'C') || (pos === 'D')) {
        score = score + 10
      } else if (pos === 'E') {
        score = score + 11
      } else {
        score = score + pos * 1;
      }
    }
    score = score * mult
    console.log(score)
  
    //checks for flush
  } else if (flush === 5) {
    handName = 'Flush'
    mult = 6 + multcount5;
    

    for (var p = 0; p < i; p++) {
      var pos = check1[p]
      if ((pos === 'A') || (pos === 'B') || (pos === 'C') || (pos === 'D')) {
        score = score + 10
      } else if (pos === 'E') {
        score = score + 11
      } else {
        score = score + pos * 1;
      }
    }
    score = score * mult
    console.log(score)
  
  
    //checks for just straight
  } else if (check1.toString() == "A,B,C,D,E" || check1.toString() == "9,A,B,C,D" || check1.toString() == "8,9,A,B,C" || check1.toString() == "7,8,9,A,B" || check1.toString() == "6,7,8,9,A" || check1.toString() == "5,6,7,8,9" || check1.toString() == "4,5,6,7,8" || check1.toString() == "3,4,5,6,7" || check1.toString() == "2,3,4,5,6" || check1.toString() == "2,3,4,5,E") {
  
    handName = 'Straight'
    mult = 5 + multcount5;
    

    for (var p = 0; p < i; p++) {
      var pos = check1[p]
      if ((pos === 'A') || (pos === 'B') || (pos === 'C') || (pos === 'D')) {
        score = score + 10
      } else if (pos === 'E') {
        score = score + 11
      } else {
        score = score + pos * 1;
      }
    }
    score = score * mult
    console.log(score)
  
  
    // checks for three of a kind
  } else if (comp === 3) {
    handName = 'Three of a kind'
    mult = 4 + multcount5;
    
    for (var p = 0; p < i; p++) {
  
      //variable assigned to positions in the array
      var pos = check1[p]
      var num = getOccurrence(check1, pos)
  
      //if statement to assign multiplier to 'comp' and value of card to 'value'
      if (num > comp) {
        comp = getOccurrence(check1, pos);
        if ((pos === 'A') || (pos === 'B') || (pos === 'C') || (pos === 'D')) {
          value = 10
        } else if (pos === 'E') {
          value = 11
        } else
          value = pos;
  
      }
    }
  
    value = value * 3;
    score = value * mult;
    console.log(score)
  
  
    //checks for two pair
  } else if ((Object.values(count)[0] === 2 && Object.values(count)[1] === 2) || (Object.values(count)[0] === 2 && Object.values(count)[2] === 2) || (Object.values(count)[1] === 2 && Object.values(count)[2] === 2)) {
  
    handName = 'Two Pair'
  
    mult = 2 + multcount5;
    

    var array5 = [];
    var array6 = [];
    array5 = Object.keys(count);
    array6 = Object.values(count)
  
    console.log(array5)
    console.log(array6)
  
    var length = array6.length
  
    for (var m = 0; m < length; m++) {
      if (array6[m] === 2) {
        if ((array5[m] === 'A') || (array5[m] === 'B') || (array5[m] === 'C') || (array5[m] === 'D')) {
          score = score + 20
        } else if (array5[m] === 'E') {
          score = score + 22
        } else {
          score = score + (array5[m] * 2)
        }
      }
    }
  
    score = score * mult
    console.log(score)
  
  
    //checks for pair
  } else if (comp === 2) {
    handName = 'Pair'
    mult = 2 + multcount5;
    

    for (var p = 0; p < i; p++) {
  
      //variable assigned to positions in the array
      var pos = check1[p]
      var num = getOccurrence(check1, pos)
  
      //if statement to assign multiplier to 'comp' and value of card to 'value'
      if (num > comp) {
        comp = getOccurrence(check1, pos);
        if ((pos === 'A') || (pos === 'B') || (pos === 'C') || (pos === 'D')) {
          value = 10
        } else if (pos === 'E') {
          value = 11
        } else
          value = pos;
  
      }
    }
  
    value = value * 2;
    score = value * mult;
    console.log(mult)
    console.log(score)
    console.log(multcount5)
  
    //High Card
  } else {
    handName = 'High Card'
    mult = 1 + multcount5;

    var high = check1.length - 1
    if ((check1[high] === 'A') || (check1[high] === 'B') || (check1[high] === 'C') || (check1[high] === 'D')) {
      score = 10
    } else if (check1[high] === 'E') {
      score = 11
    } else {
      score = check1[high];
    }
    score = score * mult;
    console.log(score)
  }

score2 = score;

  }



//This section allows only 5 cards to be selected at one time
const maxChecks = 5  //change this number to adjust
let selectedCount = 0

document.querySelector('div').addEventListener('click', event => {
    if (event.target.type === 'checkbox') {
        selectedCount = event.target.checked
            ? selectedCount + 1
            : selectedCount - 1
    }

    if (selectedCount >= maxChecks) {
        [...document.querySelectorAll('input:not(:checked)')]
            .forEach(input => input.disabled = true)
    } else {
        [...document.querySelectorAll('input')]
            .forEach(input => input.disabled = false)
    }
})
//End section.





//submit function start
function submit(){

const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');

//pushes played hand to new array
checkboxes.forEach(checkbox => {
  playedHand.push(checkbox.value);
  
  


//deals cards and replaces them on screen with new ones
  const result = dealCards(deck);

  const index = hand.indexOf(checkbox.value);
  hand.splice(index, 1, result);

  var ids = checkbox.id;

  document.getElementById(ids).value=result;
  
  ids = ids.replace('cb', '')
  
  document.getElementById(ids).src= result + ".png";


});

//Updates hands counter
hands = hands -1
document.getElementById('handcount').innerHTML = "Hands remaining: " + hands;



//checks hand played and updates score
checkHand(playedHand)
  console.log(handName)
  console.log(score2 + ' is your score')

  modal.style.display = "block";
  modalContent.innerHTML = handName + "<br />" + "<br />" + " You did " + score2 + " damage to the boss!"
  cont.onclick = function() {
    modal.style.display = "none";
  }



  bossHealth = bossHealth - score2

//updates boss health
document.getElementById('bosshealth').innerHTML = "Boss Health:  " + bossHealth;


  //removes cards from played hand and adds them to discard pile
  var d2 = playedHand.length
  for (var g = 0; g < d2; g++){
    discardPile.push(playedHand[g])
  }
playedHand.splice(0,d2)


//if statement to check boss health and hands then move to next boss or end game
if ((hands <= 0) && (bossHealth > 0)) {
  modal3.style.display = "block";
  document.getElementById('loser2').innerHTML = "You did " + score2 + " damage."
  document.getElementById('loser').innerHTML = "Boss Health Remaining: " + bossHealth;
  close3.onclick = function() {
    modal3.style.display = "none";
    window.location.reload();
  //reloads the page to restart the game
  }

} else if ((hands >= 0) && (bossHealth <= 0)){


  modal.style.display = "none";
  modal2.style.display = "block";
  modalContent2.innerHTML = handName + "<br />" + "<br />" + " You did " + score2 + " damage to the boss and defeated it!<br> Great Job!"
  accept.onclick = function() {
    if(document.getElementById('radio1').checked){
    discardsMax = discardsMax + 1;
    resetPlay();
    }else if(document.getElementById('radio2').checked){
    handsMax = handsMax + 1
    resetPlay();
    }else if(document.getElementById('radio3').checked){
    multcount5 = multcount5 + 1
    resetPlay();
    }
    modal2.style.display = "none";
  }  
bossCounter = bossCounter + 1;


//sets boss to Jack
if (bossCounter === 1){

document.getElementById("bosspic").src = "jack.png";
bossHealth = 300;
document.getElementById('bossname').innerHTML = "Boss Name: Jack of Clubs";
document.getElementById('bosshealth').innerHTML = "Boss Health:  " + bossHealth;
resetPlay();

//sets boss to Queen
} else if (bossCounter === 2){

  document.getElementById("bosspic").src = "queen.png";
bossHealth = 400;
document.getElementById('bossname').innerHTML = "Boss Name: Queen of Hearts";
document.getElementById('bosshealth').innerHTML = "Boss Health:  " + bossHealth;
resetPlay();

//sets boss to King
} else if (bossCounter === 3){

  document.getElementById("bosspic").src = "king.png";
  bossHealth = 600;
  document.getElementById('bossname').innerHTML = "Boss Name: King of Diamonds";
  document.getElementById('bosshealth').innerHTML = "Boss Health:  " + bossHealth;
  resetPlay();

//sets boss to Joker
} else if (bossCounter === 4){

  document.getElementById("bosspic").src = "joker.png";
bossHealth = 900;
document.getElementById('bossname').innerHTML = "Boss Name: Wild Joker";
document.getElementById('bosshealth').innerHTML = "Boss Health:  " + bossHealth;
resetPlay();

//Win condition
} else if (bossCounter === 5){
  modal2.style.display = "none";
  modal4.style.display = "block";
  close4.onclick = function() {
    modal4.style.display = "none";
    window.location.reload();
  //reloads the page to restart the game
  }
}

}else{
  //do nothing
}


//unchecks the cards 
for(var x = 0; x < 8; x++){
  document.getElementById('cb'+x).checked = false;
}
selectedCount = 0

}
//Submit function end






//Discard button function
function discard(){

if (discards > 0){


discards = discards-1;
document.getElementById('discardcount').innerHTML = "Discards remaining: " + discards;

const checkboxes2 = document.querySelectorAll('input[type="checkbox"]:checked');

//remove cards from hand and adds to discard pile
checkboxes2.forEach(checkbox => {
  discardPile.push(checkbox.value);

  const result = dealCards(deck);


const index = hand.indexOf(checkbox.value);
  hand.splice(index, 1, result);

  var ids = checkbox.id;

document.getElementById(ids).value=result;

ids = ids.replace('cb', '')

document.getElementById(ids).src= result + ".png";
});

console.log(hand);
for(var x = 0; x < 8; x++){
  document.getElementById('cb'+x).checked = false;
}
selectedCount = 0

} else {

  modal1.style.display = "block";
  modalContent1.innerHTML = "You are out of discards"
  close1.onclick = function() {
    modal1.style.display = "none";
  }

}
}

document.getElementById('bossname').innerHTML = "Boss Name: Number Soldier";
document.getElementById('bosshealth').innerHTML = "Boss Health:  " + bossHealth;


//assigns discard counter number at beginning of game
document.getElementById('discardcount').innerHTML = "Discards remaining: " + discards;
document.getElementById('handcount').innerHTML = "Hands remaining: " + hands;
document.getElementById('multi').innerHTML = "Base Multiplier: " + multcount5;



function resetPlay(){
  hands = handsMax
  discards = discardsMax
  document.getElementById('discardcount').innerHTML = "Discards remaining: " + discards;
  document.getElementById('handcount').innerHTML = "Hands remaining: " + hands;
  document.getElementById('multi').innerHTML = "Base Multiplier: " + multcount5;

//removes cards from discard pile and adds them back to deck
var d3 = discardPile.length
for (var g = 0; g < d3; g++){
  deck.push(discardPile[g])
}
discardPile.splice(0,d3)
//removes cards from hand and adds them back to deck
var d4 = hand.length
for (var g = 0; g < d4; g++){
  deck.push(hand[g])
}
hand.splice(0,d4)

//deals cards from deck
for ( var q = 0; q < 8; q++ ) {
  const result = dealCards(deck);
  //pushes card code to display image file and changes class of checkbox
  document.getElementById(q).src= result + ".png";
  //pushes card ID to input checkbox values
  var assign = "cb" + q;
  document.getElementById(assign).value=result;
  //pushes card codes to hand array
  hand.push(result); 
  }

}