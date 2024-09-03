function SortByName(a, b) {
	var aName = a.size;
	var bName = b.size;

	return aName < bName;
}

function toTitleCase(str) {
	return str.replace(/\w\S*/g, function (txt) {
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	});
}

function toBgClassName(str) {
	var temp = str.replace(/\S/g, '_');
	return "bg-" + temp;
}

$(document).ready(function () {

	icons = $(icons).sort(SortByName);

	for (var i = 0; i < icons.length; i++) {
		$elem = $(".icon-inner-container ul");

		// Skip the one 64px icon
		if (icons[i].size == "64") {
			continue;
		}

		var icon_name = icons[i].name.replace('.png', '').replace(/-/g, ' ').replace(/_/g, ' ');
		var name = toTitleCase(icon_name);
		var img_src = "icons/png/" + icons[i].name;
		var size_classname = "img" + icons[i].size;
		var img_classname = 'bg-' + icons[i].name.replace('.png', '').replace(/_/g, '_').replace(/-/g, '_').toLowerCase();
		var object = '<li class="icon-item"><span class="helper"></span><a href="{{href}}" target="_blank"><div class="{{img-class}} {{size-class}}" title="{{img-title}}"></div></a></li>'
			.replace("{{href}}", img_src)
			.replace("{{img-src}}", img_src)
			.replace("{{img-class}}", img_classname)
			.replace("{{size-class}}", size_classname)
			.replace("{{img-title}}", name);

		$elem.append(object);
	}

	// Start Menu Toggle Functionality
	const startButton = document.getElementById('start-button');
	const startMenu = document.getElementById('start-menu');

	let menuOpen = false; // Track the state of the menu

	// Function to toggle the start menu visibility
	function toggleStartMenu() {
		console.log('Toggling start menu'); // Debugging line
		menuOpen = !menuOpen; // Toggle the state
		if (menuOpen) {
			startMenu.classList.add('open');
		} else {
			startMenu.classList.remove('open');
		}
	}

	// Handle Start button click
	startButton.addEventListener('click', function (event) {
		event.stopPropagation(); // Prevent the click from propagating to the document
		console.log('Start button clicked'); // Debugging line
		toggleStartMenu(); // Toggle the menu open/close
	});

	// Hide the start menu when clicking anywhere outside
	document.addEventListener('click', function (event) {
		console.log('Document clicked'); // Debugging line
		if (menuOpen && !startButton.contains(event.target) && !startMenu.contains(event.target)) {
			console.log('Click outside detected - closing menu'); // Debugging line
			menuOpen = false; // Update the state
			startMenu.classList.remove('open'); // Close the menu
			// toggleStartMenu(); // Toggle the menu open/close
			// startButton.classList.remove('active'); // Remove the active class from the start button
			startButton.classList.add('released'); // Remove the released class from the start button
		}
	});

	// Ensure the start menu does not close when clicking inside it
	startMenu.addEventListener('click', function (event) {
		event.stopPropagation(); // Prevent clicks inside the menu from closing it
	});
});