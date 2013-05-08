// Global variable named purchaseForm ment to hold an object of PurchaseForm type
var purchaseForm;
// Global variables named imageName and imageArtist to hold an images name and artist, respectfully
var imageName, imageArtist;

/*Function referenced by "setImages" whcich:
	1. Pulls the Picture Image information from the URL
	2. Sizes the Picture and Frame Images appropriately
	3. Sets the Images onto the page into their proper place */
var setImages = function () {
	// Creates variables for use when placing images
	var info, imageParts, imageType, frameType;

	// Pull references to HTML elements and place them into appropriately named variables
	var titleNode = $("title");		// Reference to the <h1> page Image Title
	var artistNode = $("artist");		// Reference to the <h2> page Image Artist Subtitle
	var pictureNode = $("pictureImage");	// Reference to the <img> page Picture Image
	var pictureLinkNode = $("pictureLink");	// Reference to the <a> page Picture Image Link
	var frameNode = $("frameImage");	// Reference to the <img> page Frame Image

	// Pull the Picture image information from the URL ("?" symbol and after) into info
	info = window.location.search;

	// Split info by the "_" symbol into an array of strings called imageParts
	imageParts = info.split(/[_]/g);

	// Reconstruct the picture image parts into strings holding the imageType, imageName and imageArtist using String methods and regular expressions
	// Note: Images follow the naming convention "imageType_imageName_imageArtist
	imageType = imageParts[0].replace(/[?]/, "");										// Remove "?"
	imageName = imageParts[1].replace(/[%]/g, " ").replace(/[0]|[2]/g, "").replace(/\s[7]/g, "'");				// Replace "%" with " ", " 7" with "'", and Remove "2" and "0"
	imageArtist = imageParts[2].split(/[.]/)[0].replace(/[%]/g, " ").replace(/[0]|[2]/g, "").replace(/\s[7]/g, "'");	// Replace "%" with " ", " 7" with "'", and Remove "?", "2", and "0"

	// Reconstruct the picture image name and replace it into info
	info = info.replace(/[?]|[0]|[2]/g, "").replace(/[%]/g, " ").replace(/\s[7]/g, "'");					// Replace "%" with " ", " 7" with "'", and Remove "?", "2", and "0"

	// Size the picture and frame images based on the imageType
	// Note: sq = square, pt = portrait, ls = landscape
	if (imageType == "sq") {
		pictureNode.height = 300;
		pictureNode.width = 300;
		frameNode.height = 300;
		frameNode.width = 300;
	} else if (imageType == "pt") {
		pictureNode.height = 400;
		pictureNode.width = 270;
		frameNode.height = 400;
		frameNode.width = 270;
	} else {
		pictureNode.height = 270;
		pictureNode.width = 390;
		frameNode.height = 270;
		frameNode.width = 390;
	}

	// Update the frame image using the changeFrame method
	changeFrame();

	// Update the picture title and artist subtitle
	titleNode.textContent = imageName;
	artistNode.textContent = "By: " + imageArtist;

	// Update the picture image and it's corrisponding link
	pictureNode.src = "../img/pictures/" + info;
	pictureNode.alt = info;
	pictureLinkNode.href = "../img/pictures/" + info;
}

/*Function referenced by "changeFrame" which:
	1. Sets the correct frame image onto the page
	2. Updates the displayed price */
var changeFrame = function () {
	// Pull references to HTML elements and place them into appropriately named variables
	var frameNode = $("frameImage");	// Reference to the <img> page Frame Image
	var frameLinkNode = $("frameLink");	// Reference to the <a> page Frame Image Link
	var frameSelectionNode = $("frame");	// Reference to the <select> page Form Frame Selection Node

	// Pull the value of the currently selected frameType from the frame selection node
	frameType = frameSelectionNode.value;

	// If frameType is not an empty string...
	if (frameType != "") {
		// Change the Frame Image and Frame Image Link according to the value in frameType...
		switch (parseInt(frameType)) {
			case 50:
				frameNode.src = "../img/frames/" + "frame1.gif";
				frameLinkNode.href = "../img/frames/" + "frame1.gif";
				break;
			case 40:
				frameNode.src = "../img/frames/" + "frame2.gif";
				frameLinkNode.href = "../img/frames/" + "frame2.gif";
				break;
			case 30:
				frameNode.src = "../img/frames/" + "frame3.gif";
				frameLinkNode.href = "../img/frames/" + "frame3.gif";
				break;
			case 20:
				frameNode.src = "../img/frames/" + "frame4.gif";
				frameLinkNode.href = "../img/frames/" + "frame4.gif";
				break;
			case 10:
				frameNode.src = "../img/frames/" + "frame5.gif";
				frameLinkNode.href = "../img/frames/" + "frame5.gif";
				break;
			case 0:
				frameNode.src = "../img/frames/" + "noFrame.gif";
				frameLinkNode.href = "../img/frames/" + "noFrame.gif";
		}
	} else { // If frameType is an empty string...
		// Change Frame Image and Frame Image Link accordingly
		frameNode.src = "../img/frames/" + "noFrame.gif";
		frameLinkNode.href = "../img/frames/" + "noFrame.gif";
	}

	// Update the displayed price using the setPrice method
	setPrice();
}

/*Function referenced by "setPrice" which:
	1. Calculates the price of the picture based on the inputed information
	2. Displays that calculated price */
var setPrice = function () {
	// Create a price variable to hold the total price, intially at 0
	var price = 0;

	// Pull references to HTML elements and place them into appropriately named variables
	var heightSelectionNode = $("height");	// Reference to the <select> page Form Height Selection Node
	var widthSelectionNode = $("width");	// Reference to the <select> page Form Width Selection Node
	var frameSelectionNode = $("frame");	// Reference to the <select> page Form Frame Selection Node
	var priceNode = $("price");		// Reference to the <span> page element which displays the current calculated price

	// If each of the selection elements has a valid selection (anything but the first option)...
	if ( heightSelectionNode.value != "" && widthSelectionNode.value != "" && frameSelectionNode.value != "" ) {
		// -----Calculate the price---

		// Add the cost of the picture ($5 per square inch), by multiplying 5 and the calculated image area (from the values in the width and height selection nodes)
		price += 5 * ( parseInt( heightSelectionNode.value ) ) * ( parseInt( widthSelectionNode.value ) );
		// Add the cost of the frame, by multiplying the cost of the frame per inch (frame selection node value) and the calculated image perimeter (from the values int he width and height selection nodes)
		price += ( frameSelectionNode.value ) * ( ( 2 * heightSelectionNode.value ) + ( 2 * widthSelectionNode.value ) );

		// Convert price into a string by concatinating a "$" before the price value
		price = "$" + price;
	} else {  // If any of the selection elements has an invalid selection...
		// Place an "error" message in the price variable
		price = "Please select dimmensions and frame."
	}

	// Display the calculated price (or message) on the page
	priceNode.firstChild.nodeValue = price;
}

/*Function referenced by "displayValues" which:
	1. Creates a summary of the information inputed into the form
	2. Displays that information in a confirmation box
	3. Should the user confirm the information, thanks them for the purchase and redirects them to the home page */
var displayValues = function () {
	// Creates a variable named summary to hold the purchase summary information, initially holding the summary headder
	var summary = "Purchase Report:\n-----------------------\nPicture Specification:\n";

	// -----Add the image specification information (title, height, width, frame) by pulling their values from their corrisponding HTML elements to the summary-----
	summary += "\tTitle: " + $("title").textContent + "\n";
	summary += "\tHeight: " + $("height").value + " in\n";
	summary += "\tWidth: " + $("width").value + " in\n";

	// Add the frame type based on the value in the HTML "frame" <select> element's value to the summary
	switch ( parseInt( $("frame").value ) ) {
		case 50:
			summary += "\tFrame: " + "Frame 5\n";
			break;
		case 40:
			summary += "\tFrame: " + "Frame 4\n";
			break;
		case 30:
			summary += "\tFrame: " + "Frame 3\n";
			break;
		case 20:
			summary += "\tFrame: " + "Frame 2\n";
			break;
		case 10:
			summary += "\tFrame: " + "Frame 1\n";
			break;
		case 0:
			summary += "\tFrame: " + "No Frame\n";
	}

	// -----Add the contact information (email, first & last name, address, city, state, zip, phone) by pulling their values from their corrisponding HTML elements to the summary-----
	summary += "Contact Information:\n";
	summary += "\tE-Mail: " + $("email").value + "\n";
	summary += "\tFirst Name: " + $("first_name").value + "\n";
	summary += "\tLast Name: " + $("last_name").value + "\n";
	summary += "\tAddress: " + $("address").value + "\n";
	summary += "\tCity: " + $("city").value + "\n";
	summary += "\tState: " + $("state").value + "\n";
	summary += "\tZIP Code: " + $("zip").value + "\n";
	summary += "\tPhone Number: " + $("phone").value + "\n";

	// -----Add the payment information (credit card type, number and expiration date) by pulling their values from their corrisponding HTML elements to the summary-----
	summary += "Payment Information:\n";

	// Add the credit card type based on the value in the HTML "card_type" <select> element's value to the summary
	switch ( $("card_type").value ) {
		case "m":
			summary += "\tCard Type: " + "MasterCard\n";
			break;
		case "v":
			summary += "\tCard Type: " + "Visa\n";
			break;
		case "d":
			summary += "\tCard Type: " + "Discover\n";
			break;
		case "a":
			summary += "\tCard Type: " + "American Express\n";
	}

	summary += "\tCard Number: " + $("card_number").value + "\n";
	summary += "\tExpiration Date: " + $("exp_date").value;

	// Display the summary string in a confirmation box
	// If the user clicks "OK"...
	if ( confirm(summary) ) {
		// Alert a thank you for the purchase
		alert("Thank you for your purchase!");
		// Redirect to the homepage
		window.location = "../index.html";
	}

	// Note: If the user clicks "cancel", they stay on the current page to make changes to the input
}

/*Function referenced by "purchaseClick" which:
	1. Removes cursor focus from the Purchase button
	2. Runs validation tests on the values in the purchase form, and displays the information entered if the validation is passed.  Otherwise, asks the user to correct the errors in the form via an alert */
var purchaseClick = function () {
	// Removes teh cursor focus from the "purchase" (Purchase) button
	$("purchase").blur();
	// Checks to see if the purchase form is valid using the PurchaseForm object type validateForm method
	if ( purchaseForm.validateForm() ) {
		// If validation fails, asks the user to correct the errors
		alert("Please correct the errors on the page.");
	} else {
		// If validation passes, displays the values entered into the form using the displayValues method
		displayValues();	
	}
}

/*Function referenced by "resetClick" which:
	1. Removes the cursor focus from the Reset button
	2. Resets all the values of all elements in the purchase form
	3. Resets all the error messages in the purchase form 
	4. Resets the displayed price */
var resetClick = function () {
	// Removes the cursor focus from the "reset_form" (reset) button
	$("reset_form").blur();
	// Resets all the values of all the elements in the "purchase_form" form using the form reset method
	$("purchase_form").reset();
	// Resets all the error messages in the registration form using the PurchaseForm object type resetErrors method
	purchaseForm.resetErrors();
	// Resets the price
	setPrice();
}

//Window onload handler
window.onload = function () {
	// Assigns the changeFrame function to the "frame" element's onchange handler
	$("frame").onchange = changeFrame;

	// Assigns the setPrice function to the "height" and "width" elements' onchange handlers
	$("height").onchange = setPrice;
	$("width").onchange = setPrice;

	// Assigns the purchaseClick function to the "purchase" element onclick handler
	$("purchase").onclick = purchaseClick;

	// Assigns the resetClick function to the "reset_form" element onclick handler
	$("reset_form").onclick = resetClick;

	// Calls the setImages function to set the images on the page
	setImages();

	// Creates a new object of PurchaseForm object type, and assigns it to the purchaseForm variable
	purchaseForm = new PurchaseForm();
}