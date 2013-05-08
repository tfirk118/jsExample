// Global variable "that" to hold reference to the Gallery object
var that;

// Method for getting specified element by id
var $ = function (id) { return document.getElementById(id); }

// Function referenced by "Gallery" which serves as the constructor for the Gallery object type (accepts one argument)
var Gallery = function ( params ) {
	//Backs up the reference to the calling Gallery object in the global variable named "that"
	that = this;

	// -----Store references to the element nodes as properties-----

	// Check to see if the passed "params" object exists.  If it doesn't, create a new object and assign it to "params"
	if ( !params ) params = {};
	// Go through each property of the params object (all of which hold HTML tag IDs), pulling the reference to the corrisponding html
	// element and assign said reference to an appropriate Gallery property
	this.listNode = $(params.imgListsId);
	this.tableNode = $(params.imgTableId);
	this.backNode = $(params.backButtonId);
	this.nextNode = $(params.nextButtonId);

	// -----Validate nodes-----

	// Call the Gallery validateNode function on this gallery for each passed HTML element, passing the reference to the html element,
	// the expect tag type, and tag ID description
	this.validateNode( this.listNode, "ul", "List ID");
	this.validateNode( this.tableNode, "table", "Table ID");
	this.validateNode( this.backNode, "img", "Img ID");
	this.validateNode( this.nextNode, "img", "Img ID");

	// -----Define application paramaters-----

	// Assign page the value of 1, to hold the number of the current gallery page
	this.page = 1;
	// Assign numPages the number held within listNode's title property, to hold the total number of pages in the gallery
	this.numPages = parseInt(this.listNode.title);

	// -----Retrieve image page list nodes-----

	// Create an array named pageListNode, and assign to it all the references to the list nodes which hold gallery image
	// information (IE "page list nodes").  These nodes are signified by having an ID of "pagex" where x is the number of
	// the page they hold image information for.
	this.pageListNode = [];
	for ( i=0; i < this.numPages; i++ )
		this.pageListNode[i] = $( "page" + ( i+1 ) );

	// -----Retrieve img, span (titles), and a nodes for each image space-----

	// From the tableNode, pull all "img" "span" and "a" elements, placing them in arrays named imgNode, imgTitleNode,
	// and linkNode, respectfully
	this.imgNode = this.tableNode.getElementsByTagName("img");
	this.imgTitleNode = this.tableNode.getElementsByTagName("span");
	this.linkNode = this.tableNode.getElementsByTagName("a");

	// -----Retirieve img information-----

	// Create a 2D array for all image names named imgName
	this.imgName = new Array(this.numPages);
	for ( i = 0; i < this.imgName.length; i++)
		this.imgName[i] = new Array(15);

	// Place each image name within the imgName 2D array (first index for page, second index for table location)
	for ( i = 0; i < this.numPages; i++ )
		for ( p = 0; p < 15; p++ )
			this.imgName[i][p] = this.pageListNode[i].getElementsByTagName("ul")[0].getElementsByTagName("li")[p].textContent;

	// -----Create event handlers-----

	// Create a function referenced by the "backClick" property in the Gallery constructor which calls the prevPage
	// Gallery function only if the gallery's property "backNode" dosn't reference a node of class name "disabled"
	this.backClick = function () {
		if (that.backNode.className != "disabled")
			that.prevPage();
	}
	// Create a function referenced by the "nextClick" property in the Gallery constructor which calls the nextPage
	// Gallery function only if the gallery's property "nextNode" dosn't reference a node of class name "disabled"
	this.nextClick = function () {
		if (that.nextNode.className != "disabled")
			that.nextPage();
	}
	// Create a function referenced by the "backHover" property in the Gallery constructor which sets the src of the node referenced
	// by the gallery's "backNode" property only if that "backNode" dosn't have a class name of "disabled"
	this.backHover = function () {
		if (that.backNode.className != "disabled")
			that.backNode.src = "../img/library/backB.gif";
	}
	// Create a function referenced by the "nextHover" property in the Gallery constructor which sets the src of the node referenced
	// by the gallery's "nextNode" property only if that "nextNode" dosn't have a class name of "disabled"
	this.nextHover = function () {
		if (that.nextNode.className != "disabled")
			that.nextNode.src = "../img/library/nextB.gif";
	}
	// Create a function referenced by the "backLeave" property in the Gallery constructor which sets the src of the node referenced
	// by the gallery's "backNode" property only if that "backNode" dosn't have a class name of "disabled"
	this.backLeave = function () {
		if (that.backNode.className != "disabled")
			that.backNode.src = "../img/library/backA.gif";
	}
	// Create a function referenced by the "nextLeave" property in the Gallery constructor which sets the src of the node referenced
	// by the gallery's "nextNode" property only if that "nextNode" dosn't have a class name of "disabled"
	this.nextLeave = function () {
		if (that.nextNode.className != "disabled")
			that.nextNode.src = "../img/library/nextA.gif";
	}

	// -----Attatch event handlers-----

	// Assign the onclick property of the elements referenced by backNode and nextNode to their respective "Click" functions
	this.backNode.onclick = this.backClick;
	this.nextNode.onclick = this.nextClick;
	// Assign the onmouseover property of the elements referenced by backNode and nextNode to their respective "Hover" functions
	this.backNode.onmouseover = this.backHover;
	this.nextNode.onmouseover = this.nextHover;
	// Assign the onmouseout property of the elements referenced by backNode and nextNode to their respective "Leave" functions
	this.backNode.onmouseout = this.backLeave;
	this.nextNode.onmouseout = this.nextLeave;

	// -----Begin creating the gallery-----

	// Create an array named imageCache to function as a image cache
	this.imageCache = [];

	// Load the table
	this.loadTable();
}

/*Adds the "validateNode" function to the Gallery object type which accepts three arguments, taken to be a node, said node's name and said node's description
	then determines if said node is valid (exists, is an element as is of the correct type).  If not, throws an appropriate error. */
Gallery.prototype.validateNode = function ( node, nodeName, nodeDesc ) {
	// If the passed "node" dosn't exist, throw an error saying the node wasn't found using the passed nodeDesc
	if ( ! node ) {
		throw new Error("Gallery: " + nodeDesc + " not found.");
	}
	// If the passed node's nodeType isn't 1 (Element), throw an error saying the node isn't an element using the passed nodeDesc
	if ( node.nodeType !== 1 ) {
		throw new Error("Gallery: " + nodeDesc + " is not an element node.");
	} 
	// If the passed node's nodeName isn't exactly equal to the passed nodeName (in uppercase), throw an error saying that the node isn't of the nodeName type using the passed nodeDesc and nodeName
	if ( node.nodeName !== nodeName.toUpperCase() ) {
		throw new Error("Slide Show: " + nodeDesc + " is not a " + nodeName.toLowerCase() + " tag.");
	}
}

/*Adds the "loadTable" function to the Gallery object type which loads the current page of images into the gallery table, including images
	and their titles*/
Gallery.prototype.loadTable = function () {
	// Backs up the reference to the calling Gallery object in the global variable named "that"
	that = this;

	// Load the required images into the image cache
	this.loadImages();

	// Create variable for holding image information
	var imageParts, imageType, imageTitle, imageArtist;
	
	// Go through each location in the gallery table (td tags)
	for ( i = 0; i < 15; i++ ) {
		// Pull the corrisponding image "name" (from imgName 2D array), and split it into parts via the "_" symbols; storing said array in "imageParts"
		// Note: Images must follow the naming convention "imageType_imageName_imageArtist"
		imageParts = this.imgName[this.page - 1][i].split(/[_]/g);
		
		// Put the first "part" of the image "name" into "imageType" and the second "part" into "imageName"
		imageType = imageParts[0];
		imageTitle = imageParts[1];

		// Set the corrisponding imgNode's height and width based on the pulled imageType
		// Note: "sq" = square, "pt" = portrait, "ls" = landscape
		if (imageType == "sq") {
			this.imgNode[i].height = 150;
			this.imgNode[i].width = 150;
		} else if (imageType == "pt") {
			this.imgNode[i].height = 200;
			this.imgNode[i].width = 135;
		} else {
			this.imgNode[i].height = 135;
			this.imgNode[i].width = 190;
		}

		// Set the corrisponding imgTitleNode's text content to the pulled imageTitle
		this.imgTitleNode[i].textContent = imageTitle;	

		// Set the corrisponding linkNode's href to point to the purchase page, with the image "name" after a "?" (sending the image "name" to the purchase page)
		this.linkNode[i].href = "./purchase.html" + "?" + this.imgName[this.page - 1][i];	

		// Set the corrisponding imgNode's alt and src to the corrisponding image in the image Cache's alt and src
		this.imgNode[i].alt = this.imageCache[ (( this.page - 1 ) * 15 ) + i ].alt;
		this.imgNode[i].src = this.imageCache[ (( this.page - 1 ) * 15 ) + i ].src;
	}
}

/*Adds the "loadImages" function to the Gallery object type which loads needed images into the image Cache, but loads no more into the cache
	should the images have already been loaded*/
Gallery.prototype.loadImages = function () {
	// Backs up the reference to the calling Gallery object in the global variable named "that"
	that = this;

	// If the image Cache hasn't loaded this page, load the next 15 images (page) into the image cache
	// Note: There are 15 images per page
	if ( this.imageCache.length < (this.page * 15) ) {
		// Create a variable named image to hold a new image objects
		var image;

		// Load the next 15 images (page) into the image cache
		for ( i = 0; i < 15; i++ ) {
			// Create a new image object
			image = new Image();
			// Set said image object's src to the image directory + the "name" of the corrisponding image
			image.src = "../img/pictures/" + this.imgName[this.page - 1][i];
			// Set said image object's alt to the "name of the corrisponding image
			image.alt = this.imgName[this.page - 1][i];
			// Push the new object onto the gallery image cache
			this.imageCache.push( image );
		}
	}
}

// Adds the "prevPage" function to the Gallery object type which decrements the current page of the Gallery
Gallery.prototype.prevPage = function () {
	// Backs up the reference to the calling Gallery object in the global variable named "that"
	that = this

	// Decrements the gallery object's page number by 1
	this.page--;

	// If this new page is the first page of the gallery, disable the back button
	if (this.page == 1) {
		// Set the img element referenced by "backNode" src to the disabled button image directory
		this.backNode.src = "../img/library/buttonDisabled.gif";
		// Set the img element referenced by "backNode" class to "disabled"
		this.backNode.className = "disabled";
	}

	// Enable the next button -
	// Set the img element referenced by "nextNode" src to the default next button image directory
	this.nextNode.src = "../img/library/nextA.gif";
	// Set the img element referenced by "nextNode" class to "enabled"
	this.nextNode.className = "enabled";

	// Load the table with these new settings
	this.loadTable();
}

// Adds the "nextPage" function to the Gallery object type which advances the current page of the Gallery
Gallery.prototype.nextPage = function () {
	// Backs up the reference to the calling Gallery object in the global variable named "that"
	that = this

	// Increments the gallery object's page number by 1
	this.page++;

	// If this new page is the last page of the gallery, disable the next button
	if (this.page == this.numPages) {
		// Set the img element referenced by "nextNode" src to the disabled button image directory
		this.nextNode.src = "../img/library/buttonDisabled.gif";
		// Set the img element referenced by "nextNode" class to "disabled"
		this.nextNode.className = "disabled";
	}

	// Enable the back button -
	// Set the img element referenced by "backNode" src to the default back button image directory
	this.backNode.src = "../img/library/backA.gif";
	// Set the img element referenced by "backNode" class to "enabled"
	this.backNode.className = "enabled";

	// Load the table with these new settings
	this.loadTable();
}
