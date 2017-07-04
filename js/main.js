const View = require('./ttt-view');
const Game = require('./game');

$( () => {
  const $rootEl = $('figure.ttt');
  const newGame = new Game ();
  const newView = new View(newGame, $rootEl);
});
