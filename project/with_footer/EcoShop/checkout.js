$(function () {
  $("#Continue").addClass("disabled");

  $("input[type=text]").keyup(function () {
    var empty = check();
    if (empty) {
      $("#Continue").removeClass("disabled");
    } else {
      $("#Continue").addClass("disabled");
    }
  });

  $("#Continue").click(function () {
    $("#p1").html("");
    $("#p2").html("");
    $("#p3").html("");
    if (checkAddress() != true) {
      $(".shipping-address").after(`<p id="p1">${checkAddress()}</p>`);
    }
    if (checkEmail() != true) {
      $(".email").after(`<p id="p2">${checkEmail()}</p>`);
    }
    if (checkPhone() != true) {
      $(".phone").after(`<p id="p3">${checkPhone()}</p>`);
    }
    if ($(this).hasClass("disabled")) return false;
  });
});

function check() {
  empty = false;
  if (
    checkAddress() === true &&
    checkEmail() === true &&
    checkPhone() === true
  ) {
    empty = true;
  } else {
    empty = false;
  }
  return empty;
}

function checkAddress() {
  let shippingAddress = document.getElementById("inputAddress").value;
  let error = "";
  const lettersNumbs = /^[A-Za-z\d\s]+$/;
  if (shippingAddress === null || shippingAddress === "") {
    error = "&bull; Please enter valid shipping address<br>";
  } else if (!(shippingAddress.length > 5 && shippingAddress.length < 50)) {
    error = "&bull; Invalid<br>";
  } else if (!lettersNumbs.test(shippingAddress)) {
    error = "&bull;Use a correct format<br>";
  } else {
    error = true;
  }
  console.log(error);
  return error;
}
function checkPhone() {
  let phone = document.getElementById("inputPhone").value;
  let error = "";
  phone = phone + "";
  phone.trim();
  const numbers = /^[\d]+$/;
  if (phone === null || phone == "") {
    error = "&bull; Please enter a valid phone number<br>";
  } else if (!(phone.length === 10 || phone.length === 15)) {
    error = "&bull; Invalid<br>";
  } else if (!numbers.test(phone)) {
    error = "&bull;Use a correct format<br>";
  } else {
    error = true;
  }
  console.log(error);
  return error;
}
function checkEmail() {
  let email = document.getElementById("inputEmail").value;
  let error = "";
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email == null || email == "") {
    error = "&bull; Please enter valid email<br>";
  } else if (!emailRegex.test(email)) {
    error = "&bull;Use a correct format<br>";
  } else {
    error = true;
  }
  console.log(error);
  return error;
}
