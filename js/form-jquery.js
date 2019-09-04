/**
 * Copyright (c) 2019
 *
 * Convention Data Services - Programming Challenge
 *
 * @summary Supporting functions in jQuery
 * @author Cary Briel <carybriel@gmail.com>
 *
 * Created at     : 2019-08-30
 * Last modified  : 2019-09-03
 */

/*****************************************
 *
 *
 *  Form field validation
 *
 *
 *****************************************/

$(function() {  // Replaces depreciated $(document).ready().

    /**
     * Determines if  'How did you hear of us?' should be required input. Determines this
     * based on whether promo code field is empty.
     *
     * Specifically:
     *
     * An empty promo code field indicates that 'How did you hear of us?" field is required.
     *
     * @param promo {HTMLElement} - Promo code element DOM object
     * @returns {boolean} - Returns true if 'How did you hear of us?" is required, else false
     */
    function val_isheardrequired(promo) {
        return $.trim($(promo).val()).length === 0;
    }

    /**
     * Hides or reveals the required field asterisk for 'How did you hear..' field based on
     * whether promo code field is empty.
     *
     * Specifically:
     *
     * The required field asterisk will be revealed if promo field is empty.
     *
     * @param promo {HTMLElement} - Promo code element DOM object
     * @param id - id of element containing required field asterisk.
     */
    function val_setheardrequired(promo, id) {
        if (val_isheardrequired(promo)) {
            $(id).show();
        } else {
            $(id).hide();
        }
    }

    /**
     * Reveals an error text element and (by default) sets input element's border color to red.
     *
     * @param obj {HTMLElement} - Input element
     * @param id - id of error text element to be revealed
     * @param doborder {boolean} - Whether to set border color of input element to red.
     */
    function val_seterror(obj, id, doborder) {
        if (doborder) $(obj).css("border-color", 'red');
        $(id).show();
    }

    /**
     * Hides an error text element and (by default) sets input element's border color back to its inherited value.
     *
     * @param obj {HTMLElement} - Input element
     * @param id - id of error text element to be hidden
     * @param doborder {boolean} - Whether to set border color of input element back.
     */
    function val_clearerror(obj, id, doborder) {
        if (doborder) $(obj).css("border-color", 'inherit');
        $(id).hide();
    }

    /**
     * Determines whether or not given input field is blank.
     *
     * @param {HTMLElement} obj - Input element to be checked
     * @returns {boolean} - Returns true if blank, else false
     */
    function val_isblank(obj) {
        return $.trim($(obj).val()).length === 0;
    }

    /**
     * Determines whether given input field is blank and hides/reveals
     * the specified error text element as appropriate.
     *
     * Specifically:
     *
     * If field is blank, error text is revealed. If not blank, error text is hidden.
     *
     * @param obj {HTMLElement} obj - Object for input field to be checked
     * @param id - id of error text element to be hidden/revealed
     * @returns {boolean} - Returns true if field is blank, else false.
     */
    function val_checkblank(obj, id) {
        if (val_isblank(obj)) {
            if (id) val_seterror(obj, id,true);
            return true;
        } else {
            if (id) val_clearerror(obj, id, true);
            return false;
        }
    }

    /**
     * Determines if checkbox field is checked
     * @param obj - {HTMLElement} obj - Object (checkbox) to be checked
     * @returns {boolean} - Return true if checked, else false.
     */
    function val_ischecked(obj) {
        return $(obj).prop("checked");
    }

    /**
     * Determines whether given checkbox is blank and hides/reveals
     * the specified error text element as appropriate.
     *
     * Specifically:
     *
     * If field is NOT checked, error text is revealed. If checked, error text is hidden.
     *
     * @param obj {HTMLElement} - Object (checkbox) to be checked
     * @param id - id of error text element to be hidden/revealed
     * @returns {boolean} - Returns true if field (checkbox) is checked, else false.
     */
    function val_checkchecked(obj, id) {
        if (val_ischecked(obj)) {
            if (id) val_clearerror(obj, id, false);
            return true;
        } else {
            if (id) val_seterror(obj, id, false);
            return false;
        }
    }

    /**
     * Valdates an email address
     * @param obj {HTMLElement} - Input field to be checked
     * @returns {boolean} - Returns true if email address is valid, else false.
     */
    function val_isemail(obj) {
        return ($.trim($(obj).val()).length !== 0 && /^.+\@.+\..+$/.test($(obj).val()));
    }

    /**
     * Validates email address and hides/reveals error text element as appropriate.
     *
     * Specifically:
     *
     * If the email address is invalid, error text is revealed. Otherwise, error text is hidden.

     * @param obj {HTMLElement} - Input field to be checked
     * @param id - id of error text element to be hidden/revealed
     * @returns {boolean} - Returns true if email address is valid, else false.
     */
    function val_checkemail(obj, id) {
        if (val_isemail(obj)) {
            if (id) val_clearerror(obj, id, true);
            return true;
        } else {
            if (id) val_seterror(obj, id, true);
            return false;
        }
    }


    /*****************************************
     *
     *
     *  Specific form field validation functions
     *
     *
     *****************************************/


    /**
     * Validate first name input field
     *
     * First name field is required and must not be blank.
     */
    function val_input_firstname(obj) {
        val_checkblank(obj, '#err-firstname-blank');
        val_setformok();
    }

    /**
     * Validate the last name input field
     *
     * Last name field is required and must not be blank.
     */
    function val_input_lastname(obj) {
        val_checkblank(obj, '#err-lastname-blank');
        val_setformok();
    }

    /**
     * Validate the phone field
     **
     * Phone number field is required and must not be blank.
     * Additionally, input is filtered for digits only via onkeypress event.
     */
    function val_input_phone(obj) {
        val_checkblank(obj, '#err-phone-blank');
        val_setformok();
    }

    /**
     * Validate the email field
     *
     * Email field is required and must not be blank.
     * Additionally, visitor supplied email address format must be valid.
     */
    function val_input_email(obj) {
        val_clearerror(obj, '#err-email-email', true);
        if (val_checkblank(obj, '#err-email-blank') === false)
            val_checkemail(obj, '#err-email-email');
        val_setformok();

    }

    /**
     * Validate the promo code field
     *
     * Promo code is not required, but determines whether 'How did you hear' field is required.
     *
     * Specifically:
     *
     * If promo code is supplied by visitor, then the 'How did you hear' field will not be required.
     * This function enables/hides the red required asterisk on the 'How did you hear' field accordingly.
     *
     * Additionally, input is filtered for alphanumeric chars only via the onkeypress event.
     */
    function val_input_promo(obj) {
        if (!val_isheardrequired(obj))
            val_clearerror($('#input-heard'), '#err-heard-blank', true);
        val_setheardrequired(obj, '#heard-required');
        val_setformok();
    }

    /**
     * Validate the 'How did you hear of us?' field
     *
     * Selection in this dropdown is required, unless the user enters a Promo code.
     *
     * Specifically:
     *
     * If no promo code is entered, the field cannot be left at 'Please choose...' (value: unknown).
     */
    function val_input_heard(obj) {
        if (val_isheardrequired($('#input-promo')) && $(obj).val() === 'unknown')
            val_seterror(obj, '#err-heard-blank', true);
        else val_clearerror(obj, '#err-heard-blank', true);
        val_setformok();
    }

    /**
     * Validate textarea which is revealed when 'Other' is selected in 'How did you hear of us?'
     *
     * Specifically:
     *
     * A textarea which (initially hidden) is revealed if the visitor chooses 'Other'
     * in 'How did you hear of us?'. If revealed, the textarea is required and cannot be blank.
     */
    function val_input_heard_other(obj) {
        val_checkblank(obj, '#err-other-blank');
        val_setformok();
    }

    /**
     * Validate that the 'Terms & conditions' checkbox is checked.
     *
     * Specifically:
     *
     * The 'Terms & Conditions' checkbox is required and must be checked to submit the form.
     */
    function val_input_terms(obj) {
        val_checkchecked(obj, '#err-terms-blank');
        val_setformok();
    }

    /*****************************************
     *
     *
     *  jQuery event handlers
     *
     *
     *****************************************/

    //
    // Form field onblur / onchange events
    //

    $("#input-first-name").on("blur", function () {
        setTimeout(() => val_input_firstname(this), 100);
    });
    $("#input-last-name").on("blur", function () {
        setTimeout(() => val_input_lastname(this), 100);
    });
    $("#input-phone").on("blur", function () {
        setTimeout(() => val_input_phone(this), 100);
    });
    $("#input-email").on("blur", function () {
        setTimeout(() => val_input_email(this), 100);
    });
    $("#input-promo").on("blur", function () {
        setTimeout(() => val_input_promo(this), 100);
    });
    $("#input-heard").on("blur change", function () {
        if (event.type === "change")
            $(this).val() === 'other' ? $("#other-desc").show() : $("#other-desc").hide();
        setTimeout(() => val_input_heard(this), 100);
    });
    $("#input-heard-other").on("blur", function () {
        setTimeout(() => val_input_heard_other(this), 100);
    });
    $("#input-terms").on("blur change", function () {
        setTimeout(() => val_input_terms(this), 100);
    });
    $("#accept-link").on("click", function () {
        $("#terms-alert").show();
    });

    //
    // Form onsubmit event
    //

    $("#theform").submit(function(event) {
        return val_validateall(true);
    });

    //
    // Form field keypress events
    //

    $("#input-phone").keypress(function(event) {
        var keycode = event.which;
        return keycode >= 48 && keycode <= 57;
    });
    $("#input-promo").keypress(function(event) {
        var keycode = event.which;
        return (keycode >= 48 && keycode <= 57) ||
            (keycode >= 65 && keycode <= 90) ||
            (keycode >= 97 && keycode <= 122);
    });

    /**
     * This function validates all form fields and optionally displays relevant error messages
     * when fields don't validate successfully.

     * It's called on two occasions:

     * 1.) It's called as the user moves from field to field for the purpose of determining
     *     whether the green success box above the form should be displayed
     *     (indicating that all fields have been filled out correctly.) In this case, the 'display' param
     *     is set to false, as to not display errors.
     * 2.) It's called when the form is submitted in order to determine if the form CAN BE submitted.
     *     In this case, display param is set to 'true' so that all appropriate error messages are displayed.
     *
     * @param display {boolean} - Whether to display errors on all fields that don't validate
     * @returns {boolean} - Returns true if all fields validate, else false.
     */
    function val_validateall(display) {
        var result = true;

        var first = $('#input-first-name');
        var last = $('#input-last-name');
        var phone = $('#input-phone');
        var email = $('#input-email');
        var promo = $('#input-promo');
        var heard = $('#input-heard');
        var heard_other = $('#input-heard-other');
        var terms = $('#input-terms');

        if (val_checkblank(first, display ? '#err-firstname-blank' : false)) result = false;
        if (val_checkblank(last, display ? '#err-lastname-blank' : false)) result = false;
        if (val_checkblank(phone, display ? '#err-phone-blank' : false)) result = false;
        if (display)
            val_clearerror(email, '#err-email-email', true);
        if (val_checkblank(email, display ? '#err-email-blank' : false)) {
            result = false;
        } else {
            if (!val_checkemail(email, display ? '#err-email-email' : false))
                result = false;
        }
        if (val_isblank(promo) && heard.val() === 'unknown') {
            if (display) val_seterror(heard, '#err-heard-blank', true);
            result = false;
        } else {
            if (display) val_clearerror(heard, '#err-heard-blank', true);
        }
        if (heard.val() === 'other' &&
            val_checkblank(heard_other, display ? '#err-other-blank' : false)) result = false;
        if (!val_checkchecked(terms, display ? '#err-terms-blank' : false)) result = false;
        return result;
    }

    /**
     * This function displays green box above
     * the form when the form fields have all validated correctly.
     */
    function val_setformok() {
        var success = $('#all-fields-validate');
        val_validateall(false) ? success.show() : success.hide();
    }

    /**
     * This code fades and hides the custom alert box when the user clicks 'X'.
     *
     * @type {HTMLCollectionOf<Element>}
     */
    $(".terms-close").each(function(index, element) {
        $(this).click(function () {
            $(this).parent().css('opacity','0');
            setTimeout(() => {
                $(this).parent().hide();
                $(this).parent().css('opacity','1');
            }, 600);
        });
    });
});
