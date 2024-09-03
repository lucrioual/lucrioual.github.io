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


function Book(author, title) {
	this.title = title;
	this.author = author;
}

function randInt(range) {
	return Math.floor(Math.random() * range);
}

function getRandomBook() {
	return goodBooks[randInt(goodBooks.length)];
}

function formatBook(book) {
	return '<br><div class="randombookline"><a href="http://google.com/search?q=' + book.title + ' ' + book.author + '" target="_blank"><em>' + book.title + '</em> by ' + book.author + '</a><br>~~~~~~~~~~~~</div>';
}


}