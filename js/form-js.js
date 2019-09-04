/**
 * Copyright (c) 2019
 *
 * Convention Data Services - Programming Challenge
 *
 * @summary Supporting functions in JavaScript
 * @author Cary Briel <carybriel@gmail.com>
 *
 * Created at     : 2019-08-30
 * Last modified  : 2019-09-02
 */

/*****************************************
*
*
*  General
*
*
*****************************************/

/**
 * Trim leading and trailing whitespace from passed string.
 * Supported by all browsers.
 *
 * @param x - String to be trimmed
 * @returns {string} - The trimmed string
 */
function myTrim(x) {
    return x.replace(/^\s+|\s+$/gm,'');
}

/*****************************************
 *
 *
 *  Form field validation
 *
 *
 *****************************************/

/**
 * Validates character code is numeric
 *
 * Note:
 * This event handler is attached to the Phone number input field (onkeypress=)
 *
 * @param evt
 * @returns {boolean} true if key code is numeric, false otherwise
 */
function val_checknumeric(evt){
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if (charCode >= 48 && charCode <= 57)
        return true;
    return false;
}

/**
 * Validates character code is alphanumeric
 *
 * Note:
 * This event handler is attached to the Promo code input field (onkeypress=)
 *
 * @param evt
 * @returns {boolean} true if key code is alphanumeric, false otherwise
 */
function val_checkalphanumeric(evt){
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if ((charCode >= 48 && charCode <= 57) ||
        (charCode >= 65 && charCode <= 90) ||
        (charCode >= 97 && charCode <= 122))
        return true;
    return false;
}

/**
 * Returns the DOM element w/ the specified id attribute value
 *
 * @param id - The id of the DOM element to be retrieved
 * @returns {HTMLElement} - Returns DOM element object, else null if not found.
 */
function val_getid(id) { return document.getElementById(id); }

/**
 * Sets the display state (e.g., style=display:block) for the DOM element with
 * the specified id attribute value
 *
 * @param id - The id of DOM element to be set
 * @param val - Value to be set (i.e., block, inline, none, etc.)
 */
function val_setdisplay(id, val) { val_getid(id).style.display = val; }

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
function val_isheardrequired(promo) { promo.value = myTrim(promo.value); return promo.value.length===0; }

/**
 * Hides or reveals the required field asterisk for 'How did you hear..' field based on
 * whether promo code field is empty.
 *
 * Specifically:
 *
 * The required field asterisk will be revealed if promo field is empty.
 *
 * @param promo {HTMLElement} - Promo code element DOM object
 * @param howid - id of element containing required field asterisk.
 */
function val_setheardrequired (promo, howid) { if (val_isheardrequired(promo)) { val_setdisplay(howid,'inline'); } else { val_setdisplay(howid,'none'); } }

/**
 * Reveals an error text element and (by default) sets input element's border color to red.
 *
 * @param obj {HTMLElement} - Input element
 * @param id - id of error text element to be revealed
 * @param doborder {boolean} - Whether to set border color of input element to red.
 */
function val_seterror(obj, id, doborder) { if (doborder) obj.style.borderColor = 'red'; val_setdisplay(id,'block'); }

/**
 * Hides an error text element and (by default) sets input element's border color back to its inherited value.
 *
 * @param obj {HTMLElement} - Input element
 * @param id - id of error text element to be hidden
 * @param doborder {boolean} - Whether to set border color of input element back.
 */
function val_clearerror(obj, id, doborder) { if (doborder) obj.style.borderColor='inherit'; val_setdisplay(id,'none'); }

/**
 * Determines whether or not given input field is blank.
 *
 * @param {HTMLElement} obj - Input element to be checked
 * @returns {boolean} - Returns true if blank, else false
 */
function val_isblank(obj) { obj.value = myTrim(obj.value); return obj.value.length===0; }

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
function val_checkblank (obj, id) { obj.value = myTrim(obj.value); if (val_isblank(obj)) { if (id) val_seterror(obj,id,true); return true; } else { if (id) val_clearerror(obj,id,true); return false; } }

/**
 * Determines if checkbox field is checked
 * @param obj - {HTMLElement} obj - Object (checkbox) to be checked
 * @returns {boolean} - Return true if checked, else false.
 */
function val_ischecked(obj) { return obj.checked; }

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
function val_checkchecked (obj, id) { if (val_ischecked(obj)) { if (id) val_clearerror(obj,id,false); return true; } else { if (id) val_seterror(obj,id,false); return false; } }

/**
 * Valdates an email address
 * @param obj {HTMLElement} - Input field to be checked
 * @returns {boolean} - Returns true if email address is valid, else false.
 */
function val_isemail(obj) {
    return (obj.value.length !== 0 && /^.+\@.+\..+$/.test(obj.value));
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
function val_checkemail (obj, id) {
    if (val_isemail(obj)) { if (id) val_clearerror(obj,id,true); return true; } else { if (id) val_seterror(obj,id,true); return false; }
}


/*****************************************
 *
 *
 *  Specific form field validation functions
 *
 *
 *****************************************/

/**
 * Validate the first name field
 *
 * First name field is required and must not be blank.
 */
function val_input_firstname() {
    val_checkblank(val_getid('input-first-name'),'err-firstname-blank');
    val_setformok();
}

/**
 * Validate the last name field
 *
 * Last name field is required and must not be blank.
 */
function val_input_lastname() {
    val_checkblank(val_getid('input-last-name'),'err-lastname-blank');
    val_setformok();
}

/**
 * Validate the phone field
 **
 * Phone number field is required and must not be blank.
 * Additionally, input is filtered for digits only via onkeypress event.
 */
function val_input_phone() {
    val_checkblank(val_getid('input-phone'),'err-phone-blank');
    val_setformok();
}

/**
 * Validate the email field
 *
 * Email field is required and must not be blank.
 * Additionally, visitor supplied email address format must be valid.
 */
function val_input_email() {
    var obj = val_getid('input-email');
    val_clearerror(obj,'err-email-email',true);
    if (val_checkblank(obj,'err-email-blank') === false)
        val_checkemail(obj,'err-email-email');
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
function val_input_promo() {
    var obj = val_getid('input-promo');
    if (!val_isheardrequired(obj))
        val_clearerror(val_getid('input-heard'),'err-heard-blank',true);
    val_setheardrequired(obj,'heard-required');
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
function val_input_heard() {
    var obj = val_getid('input-heard');
    if (val_isheardrequired(val_getid('input-promo')) && obj.value==='unknown')
        val_seterror(obj,'err-heard-blank',true);
    else val_clearerror(obj,'err-heard-blank',true);
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
function val_input_heardother() {
    val_checkblank(val_getid('input-heard-other'),'err-other-blank');
    val_setformok();
}

/**
 * Validate that the 'Terms & conditions' checkbox is checked.
 *
 * Specifically:
 *
 * The 'Terms & Conditions' checkbox is required and must be checked to submit the form.
 */
function val_input_terms() {
    val_checkchecked(val_getid('input-terms'),'err-terms-blank');
    val_setformok();
}

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

    var first = val_getid('input-first-name');
    var last = val_getid('input-last-name');
    var phone = val_getid('input-phone');
    var email = val_getid('input-email');
    var promo = val_getid('input-promo');
    var heard = val_getid('input-heard');
    var heard_other = val_getid('input-heard-other');
    var terms = val_getid('input-terms');

    if (val_checkblank(first,display?'err-firstname-blank':false)) result = false;
    if (val_checkblank(last,display?'err-lastname-blank':false)) result = false;
    if (val_checkblank(phone,display?'err-phone-blank':false)) result = false;
    if (display)
        val_clearerror(email,'err-email-email',true);
    if (val_checkblank(email,display?'err-email-blank':false)) {
        result = false;
    } else {
        if (!val_checkemail(email, display?'err-email-email':false))
            result = false;
    }
    if (val_isblank(promo) && heard.value === 'unknown') {
        if (display) val_seterror(heard,'err-heard-blank',true);
        result = false;
    } else {
        if (display) val_clearerror(heard,'err-heard-blank',true);
    }
    if (heard.value === 'other' &&
        val_checkblank(heard_other, display?'err-other-blank':false)) result = false;
    if (!val_checkchecked(terms,display?'err-terms-blank':false)) result = false;
    return result;
}

/**
 * Displays green box above form, indicating that all form fields validated correctly.
 */
function val_setformok() {
    val_setdisplay('all-fields-validate',val_validateall(false)?'block':'none');
}

/*****************************************
 *
 *
 *  Event handlers
 *
 *
 *****************************************/

/**
 * This supports closing the custom alert box when the user clicks its 'X'.
 */
function customAlertCloseSupport() {
    /* Custom alert box close button support */
    var close = document.getElementsByClassName("terms-close");
    var i;
    for (i = 0; i < close.length; i++) {
        close[i].onclick = function () {
            var div = this.parentElement;
            div.style.opacity = "0";
            setTimeout(function () {
                div.style.display = "none";
                div.style.opacity = "1"
            }, 600);
        }
    }
}

/**
 * This function is executed when <body> DOM has been fully loaded.
 */
function onBodyLoaded() {
    customAlertCloseSupport();
}