class View {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;
    this.setupBoard();
    this.bindEvents();
  }

  bindEvents() {
    this.$el.on("click", "li", ( event => {
        // this.game.playMove(function ()
      $(this).css("background-color", "white").off("mouseleave").off("mouseover");
      const $square = $(event.currentTarget);
      this.makeMove($square);
    }));
  }

  makeMove($square) {
    const pos = $square.data("pos");
    const currentPlayer = this.game.currentPlayer;

    try {
      this.game.playMove(pos);
    } catch (e) {
      alert("Invalid move! Try again.");
      return;
    }

    $square.addClass(currentPlayer);
    $square.append(`<marquee direction="down" width="90" height="105" behavior="alternate" scrollamount="3">
  <marquee behavior="alternate">${currentPlayer}</marquee>`);

    if (this.game.isOver()) {
      // cleanup click handlers.
      this.$el.off("click");
      this.$el.addClass("game-over");

      const winner = this.game.winner();
      const $figcaption = $("<figcaption>");

      if (winner) {
        this.$el.addClass(`winner-${winner}`);
        $figcaption.html(`You win, ${winner}!`);
      } else {
        $figcaption.html("It's a draw!");
      }

      this.$el.append($figcaption);
    }
  }

  setupBoard() {
     const $ul = $("<ul>");
     $ul.addClass("group");

     for (let rowIdx = 0; rowIdx < 3; rowIdx++) {
       for (let colIdx = 0; colIdx < 3; colIdx++) {
         let $li = $("<li>");
         $li.data("pos", [rowIdx, colIdx]);

         $ul.append($li);
       }
     }

     this.$el.append($ul);
   }
 }


module.exports = View;
