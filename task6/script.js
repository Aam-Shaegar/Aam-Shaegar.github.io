/*jslint browser:true */
/*global document */
document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("calculator");
  var radios = form.elements["type"];
  var quantity = document.getElementById("quantity");
  var quantityError = document.getElementById("quantity-error");
  var optionsField = document.getElementById("options-fieldset");
  var propertyField = document.getElementById("property-fieldset");
  var optionSelect = document.getElementById("option-select");
  var propertyCheckbox = document.getElementById("property-checkbox");
  var result = document.getElementById("result");

  var basePrice = { "1": 100, "2": 150, "3": 200 };
  var propertyAdd = 200;

  function getSelectedType() {
    var i;
    for (i = 0; i < radios.length; i += 1) {
      if (radios[i].checked) {
        return radios[i].value;
      }
    }
    return "1";
  }

  function isValidQuantity(str) {
    return /^[1-9][0-9]*$/.test(str);
  }

  function updateVisibility() {
    var t = getSelectedType();
    if (t === "1") {
      optionsField.style.display = "none";
      propertyField.style.display = "none";
    } else if (t === "2") {
      optionsField.style.display = "";
      propertyField.style.display = "none";
    } else if (t === "3") {
      optionsField.style.display = "none";
      propertyField.style.display = "";
    }
  }

  function recalc() {
    var t = getSelectedType();
    var qRaw = quantity.value.trim();

    if (!isValidQuantity(qRaw)) {
      quantityError.textContent = "Ошибка: введите целое число > 0.";
      result.textContent = "Стоимость: —";
      return;
    }

    quantityError.textContent = "";

    var q = Number(qRaw);
    var unit = basePrice[t] || 0;
    var add = 0;

    if (t === "2") {
      add = Number(optionSelect.value) || 0;
    } else if (t === "3") {
      add = propertyCheckbox.checked ? propertyAdd : 0;
    }

    var total = q * (unit + add);
    result.textContent = "Стоимость: " + total + " ₽ ("
      + q + " × " + (unit + add) + " ₽)";
  }


  var k;
  for (k = 0; k < radios.length; k += 1) {
    radios[k].addEventListener("change", function () {
      updateVisibility();
      recalc();
    });
  }

  quantity.addEventListener("input", function () {
    recalc();
  });

  optionSelect.addEventListener("change", function () {
    recalc();
  });

  propertyCheckbox.addEventListener("change", function () {
    recalc();
  });

  updateVisibility();
  recalc();
});
