//Global variable named gallery ment to hold an object of Gallery object type
var gallery;

//Window onload handler
window.onload = function () {
	// Creates an object with 4 properties, each holding HTML tag IDs as string information
	// And assigns it to the variable named "params"
	params = {imgListsId:   "imgLists",
		  imgTableId:   "imgTable",
		  backButtonId: "backButton",
		  nextButtonId: "nextButton"  }

	// Creates a Gallery object, passing the params object to the Gallery constructor
	// And assigsns it to the global variable named "gallery"
	gallery = new Gallery( params );
}
