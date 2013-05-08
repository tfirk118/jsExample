//Method for getting specified element by id
var $ = function (id) { return document.getElementById(id); }

/*Function referenced by "PurchaseForm" which serves as the constructor for the PurchaseForm objec type which:
	1. Creates an array of fields to hold the purchase form information
	2. Populates said array with objects to hold said information
	3. Gives certain said objects a message property containing format information
	4. Gives certain said objects properties that relate to validation requirements */
var PurchaseForm = function () {
	// Creates an array named fields to hold PurchaseForm object information
	this.fields = [];

	// Creates objects for each input area in the purchase form within the fields array, named by index accordingly
	this.fields["height"] = {};
	this.fields["width"] = {};
	this.fields["frame"] = {};
	this.fields["email"] = {};
	this.fields["first_name"] = {};
	this.fields["last_name"] = {};
	this.fields["address"] = {};
	this.fields["city"] = {};
	this.fields["state"] = {};
	this.fields["zip"] = {};
	this.fields["phone"] = {};
	this.fields["card_type"] = {};
	this.fields["card_number"] = {};
	this.fields["exp_date"] = {};


	// Creates message properties for certain objects within the fields array which hold specific messages specifying input format
	this.fields["email"].message = "Must be a valid email address.";
	this.fields["state"].message = "Use 2 letter abbreviation.";
	this.fields["zip"].message = "Use 5 or 9 digit ZIP code.";
	this.fields["phone"].message = "Use 999-999-9999 format.";
	this.fields["card_number"].message = "Use 1111-2222-3333-4444 format.";
	this.fields["exp_date"].message = "Use mm/yyyy format.";


	// Creates properties for certain objects within the fields array which both signify required validation testing on the corrisponding form input and hold specific messages
	// for display should validation fail for the corresponding form input validation
	this.fields["height"].required = "Length measurement is required.";
	this.fields["width"].required = "Width measurement is required.";
	this.fields["frame"].required = "Frame selection is required.";
	this.fields["email"].required = "Email is required.";
	this.fields["email"].isEmail = "Email is not valid.";
	this.fields["first_name"].required = "First name is required.";
	this.fields["last_name"].required = "Last name is required.";
	this.fields["address"].required = "Address is required.";
	this.fields["city"].required = "City is required.";
	this.fields["state"].required = "State is required.";
	this.fields["state"].isState = "State is not valid.";
	this.fields["zip"].required = "ZIP Code is required.";
	this.fields["zip"].isZip = "ZIP Code is not valid.";
	this.fields["phone"].required = "Phone number is required.";
	this.fields["phone"].isPhone = "Phone number is not valid.";
	this.fields["card_type"].required = "Please select a card type.";
	this.fields["card_number"].required = "Card number is required.";
	this.fields["card_number"].isCC = "Card number is not valid.";
	this.fields["exp_date"].required = "Expiration date is required.";
	this.fields["exp_date"].isDate = "Expiration date is not valid.";
	this.fields["exp_date"].expired = "Card has expired.";
}

// ----------Validation methods----------

/*Adds the "tooShort" function to the PurchaseForm object type which accepts a string and an integer then tests to see if said string is shorter than said integer.
	if this is the case, returns true, otherwise, returns false. */
PurchaseForm.prototype.tooShort = function (text, length) {
	// Tests to see if the inputed string (text) is shorter than the specified length (length) and returns the corresponding boolean value
	return (text.length < length);
}

/*Adds the "isEmail" function to the PurchaseForm object type which accepts two string values, then tests to see if they are equal.
	If this is the case, returns true, otherwise, returns false. 
	The string passes email validation if it has a local part of less than 65 characters, has a domain name of less than 256 characters, and has a local
	part and domain name which adhere to SMTP specification for email addresses. */
PurchaseForm.prototype.isEmail = function (text) {
	// Tests to see if the length of the passed string is 0 (empty string), if so, returns false
	if (text.length == 0) return false;

	// Splits the passed string into parts via the "@" symbol and puts the array of strings into parts
	var parts = text.split("@");

	// If the string was not broken into two parts via the previous statement, return false
	if (parts.length != 2 ) return false;

	// If the first part of the broken string is greater than 64 characters, or if the second part is greater than 256 characters, return false
	if (parts[0].length > 64) return false;
	if (parts[1].length > 255) return false;

	// Creates a regular expression that tests for a string which follows SMTP specifications for the local part of an email address
	// Then tests the first part of the broken string against it using the String match method, and finally returns false if the substring fails the test
	var address =
		"(^[\\w!#$%&'*+/=?^`{|}~-]+(\\.[\\w!#$%&'*+/=?^`{|}~-]+)*$)";
	var quotedText = "(^\"(([^\\\\\"])|(\\\\[\\\\\"]))+\"$)";
	var localPart = new RegExp( address + "|" + quotedText );
	if ( !parts[0].match(localPart) ) return false;

	// Creates a regular expression that tests for a string which follows SMTP specifications for the hostname (domain name) part of an email address
	// Then tests the second part of the broken string against it using the String match method, and finally returns false if the substring fails the test
	var hostnames =
		"(([a-zA-Z0-9]\\.)|([a-zA-Z0-9][-a-zA-Z0-9]{0,62}[a-zA-Z0-9]\\.))+";
	var tld = "[a-zA-Z0-9]{2,6}";
	var domainPart = new RegExp("^" + hostnames + tld + "$");
	if ( !parts[1].match(domainPart) ) return false;

	// Return true, as the passed string (text) has passed all the tests
	return true;
}

/*Adds the "isState" function to the PurchaseForm object type which accepts a string value, then tests to see if it passes a specified State identifier validation.
	If this is the case, returns true, otherwise, returns false.
	The string passes state identifier validation if the string is equal to any of the U.S. state abbreviations (in capital letters). */
PurchaseForm.prototype.isState = function (text) {
	// Creates an array named states which holds 50 string literals, each representing a U.S. state abbreviation
	var states = new Array(
		"AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FL",
		"GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME",
		"MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH",
		"NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI",
		"SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY");

	// Goes through each string (state abbreviation) in the states array and tests if it equals the passed string (text)
	// If this occurs, true is returned
	for( var i in states ) {
		if ( text == states[i] ) {
			return true;
		}
	}

	// If the passed string (text) dosen't equal any of the strings in the states array, false is returned
	return false;
}

/*Adds the "isZip" function to the PurchaseForm object type which accepts a string value, then tests to see if it passes a specified a zip code validation.
	If this is the case, returns true, otehrwise, returns false.
	The string passes zip code validation if the string contains only 5 digits, or if it starts with 5 digits, has a dash, then ends with 4 digits. */
PurchaseForm.prototype.isZip = function (text) {
	// Creates a regular expression that tests for a string which contains only 5 digits, or a string that starts with 5 digits, has a dash, then ends with 4 digits
	// Then tests the passed string (text) against it, and finally returns the result of said test.
	return /^\d{5}(-\d{4})?$/.test(text);
}

/*Adds the "isPhone" function to the PurchaseForm object type which accepts a string value, then tests to see if it passes a specified phone number validation.
	If this is the case, returns true, otherwise, returns false.
	The string passes phone number validation if the string follows the exact sequence: 3 digits, dash, 3 digits, dash, 4 digits */
PurchaseForm.prototype.isPhone = function (text) {
	// Uses the string search function passed a created regular expression on the pssed string (text)
	// The passed regular expression finds if the string follows the exact sequence: 3 digits, dash, 3 digits, dash, 4 digits
	// Returns true if the passed string follows said expression, false otherwise
	return /^\d{3}-\d{3}-\d{4}$/.test(text);
}

/*Adds the "isCC" function to the PurchaseForm object type which accepts a string value, then tests to see if it passes a specified cred card number validation.
	If this is the case, returns true, otherwise, returns false.
	The string passes credit card validation if the string follows the exact sequence: 4 digits, dash, 4 digits, dash, 4 digits, dash, 4 digits */
PurchaseForm.prototype.isCC = function (text) {
	// Creates a regular expression that tests for a string which follows the exact sequence: 4 digits, dash, 4 digits, dash, 4 digits, dash, 4 digits
	// Then tests the passed string (text) against it, and finally returns the result of said test.
	return /^\d{4}-\d{4}-\d{4}-\d{4}$/.test(text);
}

/*Adds the "isDate" function to the PurchaseForm object type which accepts a string value, then tests to see if it passes a specified date validation.
	If this is the case, returns true, otherwise, returns false.
	The string passes date validation if the string follows the exact sequence: (0, 1 or nothing), 1 digit, /, 4 digits.  And, if the month extracted from the strin gis between 1 and 12, inclusive. */
PurchaseForm.prototype.isDate = function (text) {
	// Creates a regular expression that tests for a string which follows the exact sequence: (0, 1 or nothing), 1 digit, /, 4 digits
	// Then tests the passed string (text) against it, returning false if teh string fails the test
	if ( ! /^[01]?\d\/\d{4}$/.test(text) ) return false;

	// Splits the passed string (text) by the "/" symbol, into two parts, creating the month integer and the year integer
	var dateParts = text.split("/");
	var month = parseInt(dateParts[0], 10);
	var year = parseInt(dateParts[1]);

	// If the month integer is not in 1 - 12 (inclusive), returns false
	if ( month < 1 || month > 12 ) return false;

	// Otherwise, returns true
	return true;
}

/*Adds the "hasExpired" function to the PurchaseForm object type which accepts a string value, then tests to see if it passes a specified date value validation.
	If this is the case, returns false, otherwise, returns true.
	The string passes the date value validation if the string's specified date (expiration date) is larger (later) than the current date. */
PurchaseForm.prototype.hasExpired = function (text) {
	// Splits the passed string (text) by the "/" symbol, into two parts, creating the month integer and the year integer
	var dateParts = text.split("/");
	var month = parseInt(dateParts[0]);
	var year = parseInt(dateParts[1]);

	// Creates two new Date objects, one containing the current date (now) and one containing the passed date (exp)
	var now = new Date();
	var exp = new Date( year, month);

	// Returns true if the current date is greater than the passed date (if the credit card has expired)
	return ( now > exp );
}

/*Adds the "validateField" function to the PurchaseForm object type which accepts two strings (the first taken to be a fieldname from the fields array, and the second
	taken to be that fields information from the form), then runs specified tests on the field specified. */
PurchaseForm.prototype.validateField = function (fieldName, text) {
	// Places the field under fieldName within the fields array into a variable named field for easier use
	var field = this.fields[fieldName];

	// If the specified field has a "required" property defined, run the corrisponding test
	if (field.required) {
		// Call the tooShort method on the field's information to test to see if it is shorter than 1 character (empty string)
		// If so, throw an error with the field's required error message
		if ( this.tooShort(text,1) ) {
			throw new Error(field.required);
		}
	}

	// If the specified field has a "isEmail" property defined, run the corrisponding test
	if (field.isEmail) {
		// Call the isEmail method on the field's information to test to see if it passes email validation
		// If not so, throw an error with the field's isEmail error message
		if ( ! this.isEmail(text) ) {
			throw new Error(field.isEmail);
		}
	}

	// If the specified field has a "isState" property defined, run the corrisponding test
	if (field.isState) {
		// Call the isState method on the field's information to test to see if it passes state identifier validation
		// If not so, throw an error with the field's isState error message
		if ( ! this.isState(text) ) {
			throw new Error(field.isState);
		}
	}

	// If the specified field has a "isZip" property defined, run the corrisponding test
	if (field.isZip) {
		// Call the isZip method on the field's information to test to see if it passes zip code validation
		// If not so, throw an error with the field's isZip error message
		if ( ! this.isZip(text) ) {
			throw new Error(field.isZip);
		}
	}

	// If the specified field has a "isPhone" property defined, run the corrisponding test
	if (field.isPhone) {
		// Call the isPhone method on the field's information to test to see if it passes phone number validation
		// If not so, throw an error with the field's isPhone error message
		if ( ! this.isPhone(text) ) {
			throw new Error(field.isPhone);
		}
	}

	// If the specified field has a "isCC" property defined, run the corrisponding test
	if (field.isCC) {
		// Call the isCC method on the field's information to test to see if it passes credit card number validation
		// If not so, throw an error with the field's isCC error message
		if ( ! this.isCC(text) ) {
			throw new Error(field.isCC);
		}
	}

	// If the specified field has a "isDate" property defined, run the corrisponding test
	if (field.isDate) {
		// Call the isDate method on the field's information to test to see if it passes date validation
		// If not so, throw an error with the field's isDate error message
		if ( ! this.isDate(text) ) {
			throw new Error(field.isDate);
		}
	}

	// If the specified field has a "expired" property defined, run the corrisponding test
	if (field.expired) {
		// Call the hasExpired method on the field's information to test to see if it dosen't pass date value validation (if the credit card has expired)
		// If so, throw an error with the field's expired error message
		if ( this.hasExpired(text) ) {
			throw new Error(field.expired);
		}
	}
}

// ----------Error message methods----------

/*Adds the "resetErrors" function to the PurchaseForm object type which resets all the errors on the registartion form, including what the user sees by:
	1. Ressetting the class of each error span tag to an empty string
	2. Resetting th error message of each span tag to it's default message */
PurchaseForm.prototype.resetErrors = function () {
	// Creates a message variable to store the default message for each form element
	var message;

	// Goes through each field in the fields array...
	for ( var fieldName in this.fields ) {
		// Setting the corrisponding error span tag to have an empty string class name (so it's no longer of "error" class)
		$(fieldName + "_error").className = "";
		// Placing the field's default message in the corrisponding error span tage, if such a message exists (otherwise, an empty string)
		message = this.fields[fieldName].message;
		$(fieldName + "_error").firstChild.nodeValue =
			( message ) ? message : "";
	}
}

/*Adds the "clearError" function to the PurchaseForm object type which accepts a string (taken to be the fieldName of a field in fields), that resets
	the error on the specified field by:
	1. Resetting the class name of the specified field's corrisponding error span tag to an empty string
	2. Resetting the error message of the specified field's corrisponding error span tag to an empty string */
PurchaseForm.prototype.clearError = function ( fieldName ) {
	// Changes the class of the error span tag corrisponding to the passed fieldName to an empty string
	$(fieldName + "_error").className = "";
	// Changes the message of the error span tag corrisponding to the passed fieldName to an empty string
	$(fieldName + "_error").firstChild.nodeValue = "";
}

// ----------Method to validate form----------

/*Adds the "validateForm" function to the PurchaseForm object type which validates the user form by:
	1. Checking to see if any/all of the fields in the form contain invalid data
	2. If so, changing the error message in the form to the correct error message beside the incorrect field
	3. Finally, returning true if any errors were found */
PurchaseForm.prototype.validateForm = function () {
	// Creates a hasErrors variable which initially holds false to hold if any errors were found in processing
	var hasErrors = false;

	// Goes through each field in the fields array...
	for ( var fieldName in this.fields ) {
		// Clearing any error identifier present in the field via the PurchaseForm clearError Function (sending the field name)
		this.clearError(fieldName);
		// Then running validation on the field using the PurchaseForm validateField function (sending the field name and field value)
		try {
			this.validateField(fieldName, $(fieldName).value );
		// If validation fails (if an error was thrown)...
		} catch (error) {
			// Set hasErrors to true (as an error was found)
			hasErrors = true;
			// Set the class of the error span tag corrisponding to the current field to "error" (to signify it as "error" class)
			$(fieldName + "_error").className = "error";
			// Set the message of the error span tag corrisponding the current field to the message that was thrown with the error
			$(fieldName + "_error").firstChild.nodeValue = error.message;    
		}
	}

	// Return hasErrors to show if an error was found
	return hasErrors;
}

