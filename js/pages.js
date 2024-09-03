var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

// -- Settings --
var buttonImagePath = 'images/frame/buttons';
var buttonImageSuffix = '.png';
var fadeTime = 400;
var bookLoadingTime = 800;

// -- Page --
function Page(id) {
	this.id = id;
	this.selector = '#' + this.id;
	this.buttonId = this.id + '_button';
	this.buttonSelector = '#' + this.buttonId;
	
	this.displayed = false;
	this.hovered = false;
	
	this.currentStateName = function(hover) {
		if (hover)
			return 'hover';
		else if (this.displayed)
			return 'current';
		else
			return 'normal';
	};
	
	this.updateButton = function() {
		var buttonState = this.currentStateName(this.hovered);
		var imageName = this.id + '.' + buttonState + buttonImageSuffix;
		var imagePath = buttonImagePath + '/' + imageName;
		var buttonImage = $(this.buttonSelector + ' img')[0];
		if (buttonImage != null) {
			buttonImage.src = imagePath;
		}
	};
	this.updateContent = function() {
		if (this.displayed) {
			$(this.selector).fadeIn(fadeTime);
		} else {
			$(this.selector).hide();
		}
	};
	this.refreshContent = function() {}
	this.update = function() {
		this.updateButton();
		this.updateContent();
		this.refreshContent();
	};
}

// -- Pages Collection --
function Pages(names) {
	this.all = [];
	this.withPage = function(targetPage, callback) {
		for (var i in this.all) {
			var page = this.all[i];
			var isTarget = (page == targetPage)
			callback(page, isTarget);
		}
	}
	
	this.display = function(targetPage) {
		this.withPage(targetPage, function(page, isTarget) {
			page.displayed = isTarget;
			page.update();
		});
	}
	
	this.hover = function(targetPage) {
		this.withPage(targetPage, function(page, isTarget) {
			page.hovered = isTarget;
			page.updateButton();
		});
	}
	
	this.setup = function(page) {
		button = $(page.buttonSelector);
		button.click(function() { pages.display(page); });
		button.hover(function() { pages.hover(page); });
		button.mouseout(function() { pages.hover(null); });
	};
	
	this.add = function(page) {
		this[page.id] = page;
		this.all.push(page);
		$(document).ready(function() {
			pages.setup(page);
		});
	};
	for (var i in names) {
		name = names[i];
		this.add(new Page(name));
	}
}

// -- The Pages --
var pages = new Pages([
	'intro',
	'stuff_by_her',
	'stuff_about_her'
]);

// -- Special handling for the random good book --
var random_good_book = new Page('random_good_book');
random_good_book.show_new_book = function() {
	book = getRandomBook();
	$('#random_good_book').html(
		formatBook(book)
	);
}
random_good_book.refreshContent = function() {
	$('#random_good_book').html(
		'<p>loading...</p>'
	);
	setTimeout('random_good_book.show_new_book()', bookLoadingTime);
}
pages.add(random_good_book);


}
