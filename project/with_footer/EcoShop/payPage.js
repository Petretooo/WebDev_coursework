$(function () {
  $("#pay").addClass("disabled");
  $("input[type=text]").keyup(function () {
    var empty = check();

    if (empty) {
      $("#pay").removeClass("disabled");
    } 
    else {
      $("#pay").addClass("disabled");
    }
  });

  $("#pay").click(function () {
    $("#p1").html("");
    $("#p2").html("");
    $("#p3").html("");
    $("#p4").html("");
    if (checkCardHolder() != true) {
      $(".card-holder").after(`<p id="p1">${checkCardHolder()}</p>`);
    }
    if (checkCardNumber() != true) {
      $(".card-number").after(`<p id="p2">${checkCardNumber()}</p>`);
    }
    if (checkExpDate() != true) {
      $(".exp-date").after(`<p id="p3">${checkExpDate()}</p>`);
    }
    if (checkCVC() != true) {
      $(".cvc").after(`<p id="p4">${checkCVC()}</p>`);
    }
    if ($(this).hasClass("disabled")) return false;
  });
});

function check() {
  var empty = false;
  if (
    checkCVC() === true &&
    checkCardHolder() === true &&
    checkCardNumber() === true &&
    checkExpDate() === true
  ) {
    empty = true;
  } else {
    empty = false;
  }
  return empty;
}

function checkCardHolder() {
  let inputUser = document.getElementById("inputUser").value;
  let error = "";
  const letters = /^[A-Za-z\s]+$/;

  if (inputUser === null || inputUser === "") {
    error = "&bull; Please enter valid Card Holder<br>";
  } else if (inputUser.length < 2 && inputUser.length > 35) {
    error = "&bull; Please enter valid name<br>";
  } else if (!letters.test(inputUser)) {
    error = "&bull;Use a correct format<br>";
  } else {
    error = true;
  }
  console.log(error);
  return error;
}

function checkCardNumber() {
  let cardNum = document.getElementById("cardNum").value;
  const numbers = /^[\d]{16}$/;
  let error = "";

  if (cardNum === null || cardNum === "") {
    error = "&bull; Please enter a valid card number<br>";
  } else if (!numbers.test(cardNum)) {
    error = "&bull;Use a correct format<br>";
  } else {
    error = true;
  }
  console.log(error);
  return error;
}

function checkCVC() {
  let cvc = document.getElementById("cvc").value;
  const numbers = /^[\d]{3}$/;
  let error = "";

  if (cvc === null || cvc === "") {
    error = "Empty Content! Try again! <br>";
  } else if (!numbers.test(cvc)) {
    error = "Invalid!<br>";
  } else {
    error = true;
  }
  console.log(error);
  return error;
}
function checkExpDate() {
  let expDate = document.getElementById("expDate").value;
  const numbers = /^[\d\/\d]{5}$/;
  let error = "";

  if (expDate === null || expDate === "") {
    error = " Empty content!Try again <br>";
  } else if (!numbers.test(expDate)) {
    error = "Use a correct format <br>";
  } else {
    error = true;
  }
  console.log(error);
  return error;
}
