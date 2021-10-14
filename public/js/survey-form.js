function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

import "./modules/runtime.js";
import $, { get } from "./modules/jquery.js";
$(function () {
  var shouldSubmit = false;
  $("[required]").siblings("label").addClass("required");
  $(".color-option").each(function () {
    $(this).css("--color", $(this).text());
  });
  $("#submit").click(function (e) {
    var _this = this;

    if (shouldSubmit) return;
    var form = $("#survey-form");
    if (!form[0].checkValidity()) return form[0].reportValidity();
    e.preventDefault();
    get("/validate-email", {
      email: $("#email").val()
    }, function (res) {
      console.log(res, ":", _typeof(res));
      shouldSubmit = Boolean(res === null || res === void 0 ? void 0 : res.validated);

      if (!(res !== null && res !== void 0 && res.validated)) {
        $("#email")[0].setCustomValidity("email does not exist");
        $("#email").change(function () {
          this.setCustomValidity("");
        });
        form[0].reportValidity();
        return;
      }

      $(_this).click();
    }, "json");
  });
});