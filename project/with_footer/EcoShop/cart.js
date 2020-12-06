var promoCode;
var promoPrice;
var fadeTime = 300;

$(document).ready(function(){
    //----------------------------------------------------------------------------------------------------------     
    $("#Navigation").click(
        function () { 
          $("#HomeDropdown").css("visibility","hidden");
          $("#RecycleDropdown").css("visibility","hidden");
          $('#Main').toggle();
    });       
    
    $("#Main").hide(); 
    
    //-------------------------------------------------------------------- 
    $("#Account").mouseover(function(){
          $("#HomeDropdown").css("visibility","visible");
          $("#RecycleDropdown").css("visibility","hidden");
    });
    $("#HomeDropdown").mouseleave (function(){
          $("#HomeDropdown").css("visibility","hidden");
    });
    //-------------------------------------------------------------------- 
    $("#System").mouseover(function(){
          $("#RecycleDropdown").css("visibility","visible");
          $("#HomeDropdown").css("visibility","hidden");
    });
    //--------------------------------------------------------------------
    $("#RecycleDropdown").mouseleave (function(){
          $("#RecycleDropdown").css("visibility","hidden");
    });
    //-------------------------------------------------------------------
    $("#EcoShop").mouseover(function(){
          $("#HomeDropdown").css("visibility","hidden");
          $("#RecycleDropdown").css("visibility","hidden");
    });
    //-------------------------------------------------------------------
    $("#Scanner").mouseover(function(){
          $("#HomeDropdown").css("visibility","hidden");
          $("#RecycleDropdown").css("visibility","hidden");
    });   
    
//-----------------------------------------------------------------------------------------------------------

/* Assign actions */
$(".quantity input").change(function() {
  updateQuantity(this);
});

$('.remove button').click(function() {
  removeItem(this);
});

$(document).ready(function() {
  updateSumItems();
});

$('.promo-code-cta').click(function() {

  promoCode = $('#promo-code').val();

  if (promoCode == '10off' || promoCode == '10OFF') {
    //If promoPrice has no value, set it as 10 for the 10OFF promocode
    if (!promoPrice) {
      promoPrice = 10;
    } else if (promoCode) {
      promoPrice = promoPrice * 1;
    }
  } else if (promoCode != '') {
    alert("Invalid Promo Code");
    promoPrice = 0;
  }
  //If there is a promoPrice that has been set (it means there is a valid promoCode input) show promo
  if (promoPrice) {
    $('.summary-promo').removeClass('hide');
    $('.promo-value').text(promoPrice.toFixed(2));
    recalculateCart(true);
  }
});

function recalculateCart(onlyTotal) {
  var subtotal = 0;

  $('.basket-product').each(function() {
    subtotal += parseFloat($(this).children('.subtotal').text());
  });

  var total = subtotal;

  var promoPrice = parseFloat($('.promo-value').text());
  if (promoPrice) {
    if (subtotal >= 10) {
      total -= promoPrice;
    } else {
      alert('Order must be more than £10 for Promo code to apply.');
      $('.summary-promo').addClass('hide');
    }
  }

  if (onlyTotal) {
    $('.total-value').fadeOut(fadeTime, function() {
      $('#basket-total').html(total.toFixed(2));
      $('.total-value').fadeIn(fadeTime);
    });
  } else {
    $('.final-value').fadeOut(fadeTime, function() {
      $('#basket-subtotal').html(subtotal.toFixed(2));
      $('#basket-total').html(total.toFixed(2));
      if (total == 0) {
        $('.checkout-cta').fadeOut(fadeTime);
      } else {
        $('.checkout-cta').fadeIn(fadeTime);
      }
      $('.final-value').fadeIn(fadeTime);
    });
  }
}

function updateQuantity(quantityInput) {
  var productRow = $(quantityInput).parent().parent();
  var price = parseFloat(productRow.children('.price').text());
  var quantity = $(quantityInput).val();
  var linePrice = price * quantity;

  productRow.children('.subtotal').each(function() {
    $(this).fadeOut(fadeTime, function() {
      $(this).text(linePrice.toFixed(2));
      recalculateCart();
      $(this).fadeIn(fadeTime);
    });
  });

  productRow.find('.item-quantity').text(quantity);
  updateSumItems();
}

function updateSumItems() {
  var sumItems = 0;
  $('.quantity input').each(function() {
    sumItems += parseInt($(this).val());
  });
  $('.total-items').text(sumItems);
}


function removeItem(removeButton) {
  var productRow = $(removeButton).parent().parent();
  productRow.slideUp(fadeTime, function() {
    productRow.remove();
    recalculateCart();
    updateSumItems();
  });
}
});