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

goodBooks = [
  new Book("Cesar Aira", "How I Became a Nun"),
  new Book("Roberto Bolaño", "Distant Star"),
  new Book("Rabelais", "Gargantua and Pantagruel"),
  new Book("Muriel Spark", "The Abesse of Crewe"),
  new Book("Lionel Trilling", "Sincerity and Authenticity",),
  new Book("Witold Gombrowicz", "Ferdydurke",),
  new Book("David Markson", "Wittgenstein's Mistress"),
  new Book("Machado de Assis", "Epitaph of a Small Winner"),
  new Book("Robert Burton", "The Anatomy of Melancholy"),
  new Book("Tom McCarthy", "Remainder"),
  new Book("James Lasdun", "The Horned Man"),
  new Book("Saint Augustine", "The Confessions"),
  new Book("Denis Johnson", "Jesus' Son"),
  new Book("Muriel Spark", "Loitering with Intent"),
  new Book("Heather McGowan", "The Duchess of Nothing",),
  new Book("Stanley Crawford", "The Log of the S.S. Mrs. Unguentine"),
  new Book("Evan S. Connell", "Mrs. Bridge"),
  new Book("Flann O'Brien", "The Third Policeman"),
  new Book("Thomas Bernhard", "Correction"),
  new Book("Clarice Lispector", "The Passion According to G. H."),
  new Book("Grace Paley", "Collected Stories"),
  new Book("Flannery O' Connor", "Everything that Rises Must Converge",),
  new Book("Joris-Karl Huysman","Against Nature"),
  new Book("Nicholson Baker", "The Mezzanine"),
  new Book("David Foster Wallace", "Oblivion"), 
  new Book("Nicholson Baker", "U & I"),
  new Book("Gerald Warner Brace", "The Department"),
  new Book("Guy Davenport", "The Geography of Imagination"),
  new Book("Jordan Kisner", "Thin Places"),
  new Book("Alan Huck", "I Walk Towards the Sun which is Always Going Down"),
  new Book("Guy Davenport", "The Hunter Gracchus"),
  new Book("Guy Davenport", "Every Force Evolves a Form"),
  new Book("Hugh Kenner", "The Pound Era"),
  new Book("Gillian Rose", "Love's Work"),
  new Book("Percival Everett", "Dr. No"),
  new Book("Denis Donoghue", "Speaking of Beauty"),
  new Book("Margaret Drabble", "The Millstone"),
  new Book("Barbara Pym", "Excellent Women"),
  new Book("Barbara Pym", "Quartet"),
  new Book("Thomas McGuane", "The Bushwacked Piano"),
  new Book("John le Carré", "Tinker Tailor Soldier Spy"),
  new Book("Reginald Reynolds", "Cleanliness and Godliness"),
  new Book("Thomas Carlyle", "Sartor Resartus"),
  new Book("Stanley Cavell", "Senses of Walden"),
  new Book("Annie Dillard", "For the Time Being"),
  new Book("Fran Ross", "Oreo"),
  new Book("Darius James", "Negrophobia"),
  new Book("John Jeremiah Sullivan", "Blood Horses"),
  new Book("Horacio Castellanos Moya", "Senselessness"),
  new Book("Mary Robison", "Oh!"),
  new Book("Mary Robison", "Why Did I Ever"),
  new Book("Paula Fox", "Desperate Characters"),
  new Book("Thomas Traheren", "Centuries of Meditation"),
  new Book("Edward Dahlberg", "Can These Bones Live"),
  new Book("Sven Lindqvist", "A History of Bombing"),
  new Book("Rachel Eisendrath", "Gallery of Clouds"),
  new Book("Lydia Millet", "George Bush, Dark Prince of Love: A Presidential Romance"),
  new Book("Daniel Hoffman", "Poe Poe Poe Poe Poe Poe Poe"),
  new Book("Amy Fusselman", "The Pharmacist's Mate"),
  new Book("Amy Fusselman", "Idiophone"),
  new Book("Amy Fusselman", "Savage Park"),
  new Book("Amy Fusselman", "8"),
  new Book("Amy Fusselman", "The Mean$"),
  new Book("Sir Thomas Browne", "Urne-Buriall"),
  new Book("Phyllis Rose", "Parallel Lives"),
  new Book("Peter De Vries", "The Blood of the Lamb"),
  new Book("John Ruskin", "Unto this Last"),
  new Book("Jean Toomer", "Cane"),
  new Book("Joseph Heller", "Something Happened"),
  new Book("D. H. Lawrence", "Studies in Classic American Literature"),
  new Book("John Berger", "and our faces, my heart, brief as photos"),
  new Book("William Carlos Williams", "In the American Grain"),
  new Book("Rivka Galchen", "Atmospheric Disturbances"),
  new Book("Rivka Galchen", "American Innovations"),
  new Book("Rivka Galchen", "Everyone Knows Your Mother is a Witch"),
  new Book("Rivka Galchen", "Little Labors"),
  new Book("D. Keith Mano", "The Fergus Dialogues"),
  new Book("J. F. Powers", "Wheat that Springeth Green"),
  new Book("Paul Metcalf", "Genoa"),
  new Book("Henry David Thoreau", "A Week on the Concord and Merrimack Rivers"),
  new Book("Eudora Welty", "The Ponder Heart"),
  new Book("W. M. Spackman", "A Difference of Design"),
  new Book("Robert K. Merton", "On the Shoulders of Giants"),
  new Book("Ben Belitt", "This Scribe, My Hand"),
  new Book("Max Porter", "Grief is the Thing with Feathers"),
  new Book("Henry Green", "Party Going"),
  new Book("Stanley Elkin", "The Magic Kingdom"),
  new Book("Deb Olin Unferth", "Wait Til you See Me Dance"),
  new Book("Cynthia Ozick", "The Puttermesser Papers"),
  new Book("Frank Kermode", "A Sense of an Ending"),
  new Book("Mary Douglas", "Purity and Danger"),
  new Book("Charles Olson", "Call Me Ishmael"),
  new Book("Rose Macaulay", "Personal Pleasures"),
  new Book("Cory Leadbeater", "The Uptown Local"),
  new Book("Helen DeWitt", "The Last Samurai"),
  new Book("Helen DeWitt", "The English Understand Wool"),
  new Book("Ben Marcus", "Notable American Women"),
  new Book("Sam Lipsyte", "Homeland"),
  new Book("Donald Antrim", "Elect Mr. Robinson for a Better World"),
  new Book("Gwendoline Riley", "First Love"),
  new Book("Percival Everett", "American Desert"),
  new Book("Henry Adams", "Mont St. Michel & Chartres"),
  new Book("Hugh Kenner", "The Counterfeiters"),
  new Book("Javier Marias", "Your Face Tomorrow"),
  new Book("Nan Fairbrother", "Men and Gardens"),
  new Book("Izaak Walton", "The Compleat Angler"),
  new Book("Eliot Weinberger", "An Elemental Thing"),
  new Book("Francisco Goldman", "Say Her Name"),
  new Book("Francisco Goldman", "The Interior Circuit"),
  new Book("Djuna Barnes", "Nightwood"),
  new Book("Djuna Barnes", "Ryder"),
  new Book("Holbrook Jackson", "The Anatomy of Bibliomania"),
  new Book("Henri Amiel", "The Private Journal"),
  new Book("Evelyn Waugh", "Decline and Fall"),
  new Book("Paul Valéry", "Monsier Teste"),
  new Book("Francis Ponge", "Soap"),
  new Book("Carol Mavor", "Reading Boyishly"),
  new Book("Eve Kosofsky Sedgwick", "A Dialogue on Love"),
  new Book("Thomas McGuane", "The Sporting Club"),
  new Book("Roberto Calasso", "Literature and the Gods"),
  new Book("Henry James", "The American Scene"),
  new Book("Jean Rhys", "Good Morning, Midnight"),
  new Book("Patrick Chamoiseau", "Solibo, Magnificent"),
  new Book("Mary Ruefle", "Madness, Rack, and Honey"),
  new Book("Philip Larkin", "Collected Poems"),
  new Book("Karen Solie", "The Road In Is Not The Same Road Out"),
  new Book("Franz Wright", "God's Silence"),
  new Book("Franz Wright", "Wheeling Motel"),
  new Book("Franz Wright", "Walking to Martha's Vineyard"),
  new Book("Julie Carr", "100 Notes on Violence"),
  new Book("Peter Gizzi", "Some Values of Landscape and Weather"),
  new Book("Frank Bidart", "Desire"),
  new Book("Jack Gilbert", "The Great Fires"),
  new Book("Kathleen Graber", "The Eternal City"),
  new Book("Kathleen Graber", "The City Twice"),
  new Book("Larry Levis","Winter Stars"),
  new Book("Ciaran Berry", "The Dead Zoo"),
  new Book("Ciaran Berry", "The Sphere of Birds")
];

}
