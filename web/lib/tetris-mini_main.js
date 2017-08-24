if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'tetris-mini_main'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'tetris-mini_main'.");
}
this['tetris-mini_main'] = function (_, Kotlin) {
  'use strict';
  var until = Kotlin.kotlin.ranges.until_dqglrj$;
  var downTo = Kotlin.kotlin.ranges.downTo_dqglrj$;
  var Enum = Kotlin.kotlin.Enum;
  var IntCompanionObject = Kotlin.kotlin.js.internal.IntCompanionObject;
  Keys.prototype = Object.create(Enum.prototype);
  Keys.prototype.constructor = Keys;
  Tetrimino$Type.prototype = Object.create(Enum.prototype);
  Tetrimino$Type.prototype.constructor = Tetrimino$Type;
  I.prototype = Object.create(Tetrimino.prototype);
  I.prototype.constructor = I;
  T.prototype = Object.create(Tetrimino.prototype);
  T.prototype.constructor = T;
  L.prototype = Object.create(Tetrimino.prototype);
  L.prototype.constructor = L;
  J.prototype = Object.create(Tetrimino.prototype);
  J.prototype.constructor = J;
  O.prototype = Object.create(Tetrimino.prototype);
  O.prototype.constructor = O;
  S.prototype = Object.create(Tetrimino.prototype);
  S.prototype.constructor = S;
  Z.prototype = Object.create(Tetrimino.prototype);
  Z.prototype.constructor = Z;
  function Array2d(width, height) {
    this.width = width;
    this.height = height;
    this.cells_0 = Kotlin.newArray(Kotlin.imul(this.width, this.height), 0);
  }
  Array2d.prototype.reset = function () {
    var $receiver = this.cells_0;
    var tmp$, tmp$_0;
    var index = 0;
    for (tmp$ = 0; tmp$ !== $receiver.length; ++tmp$) {
      var item = $receiver[tmp$];
      this.cells_0[tmp$_0 = index, index = tmp$_0 + 1 | 0, tmp$_0] = 0;
    }
  };
  Array2d.prototype.coordinatesToIndex_0 = function (x, y) {
    return Kotlin.imul(y, this.width) + x | 0;
  };
  Array2d.prototype.get_vux9f0$ = function (x, y) {
    return this.cells_0[this.coordinatesToIndex_0(x, y)];
  };
  Array2d.prototype.set_qt1dr2$ = function (x, y, value) {
    this.cells_0[this.coordinatesToIndex_0(x, y)] = value;
  };
  Array2d.prototype.iterator = function () {
    return Kotlin.arrayIterator(this.cells_0, 'IntArray');
  };
  Array2d.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'Array2d',
    interfaces: []
  };
  function BoardModel(width, height) {
    this.width = width;
    this.height = height;
    this.cells_0 = new Array2d(this.width, this.height);
    this.tetrimino = Tetrimino$Companion_getInstance().createRandom();
    this.nextTetrimino = Tetrimino$Companion_getInstance().createRandom();
  }
  BoardModel.prototype.get_vux9f0$ = function (x, y) {
    return this.cells_0.get_vux9f0$(x, y);
  };
  BoardModel.prototype.reset = function () {
    var tmp$, tmp$_0, tmp$_1, tmp$_2, tmp$_3, tmp$_4, tmp$_5, tmp$_6;
    tmp$ = until(0, this.width);
    tmp$_0 = tmp$.first;
    tmp$_1 = tmp$.last;
    tmp$_2 = tmp$.step;
    for (var x = tmp$_0; x <= tmp$_1; x += tmp$_2) {
      tmp$_3 = until(0, this.height);
      tmp$_4 = tmp$_3.first;
      tmp$_5 = tmp$_3.last;
      tmp$_6 = tmp$_3.step;
      for (var y = tmp$_4; y <= tmp$_5; y += tmp$_6) {
        this.cells_0.set_qt1dr2$(x, y, 0);
      }
    }
  };
  BoardModel.prototype.rotate = function () {
    var rotatedBlocks = this.tetrimino.calculateRotatedBlockPositions();
    var firstOrNull_6jwkkr$result;
    firstOrNull_6jwkkr$break: do {
      var tmp$;
      tmp$ = rotatedBlocks.iterator();
      while (tmp$.hasNext()) {
        var element = tmp$.next();
        if (this.cells_0.get_vux9f0$(this.tetrimino.position.x + element.x | 0, this.tetrimino.position.y + element.y | 0) === 1) {
          firstOrNull_6jwkkr$result = element;
          break firstOrNull_6jwkkr$break;
        }
      }
      firstOrNull_6jwkkr$result = null;
    }
     while (false);
    var collision = firstOrNull_6jwkkr$result;
    if (collision == null) {
      this.tetrimino.applyRotation_ry40lv$(rotatedBlocks);
    }
  };
  function BoardModel$moveDown$lambda(this$BoardModel) {
    return function (x, y) {
      var targetX = this$BoardModel.tetrimino.position.x + x | 0;
      var targetY = this$BoardModel.tetrimino.position.y + y + 1 | 0;
      return this$BoardModel.cells_0.get_vux9f0$(targetX, targetY) === 1 || targetY >= this$BoardModel.height;
    };
  }
  BoardModel.prototype.moveDown = function () {
    var collides = this.tetrimino.checkCollision_wwola7$(BoardModel$moveDown$lambda(this));
    if (collides) {
      return false;
    }
    this.tetrimino.moveDown();
    return true;
  };
  BoardModel.prototype.fallDown = function () {
    while (this.moveDown()) {
    }
  };
  function BoardModel$moveLeft$lambda(this$BoardModel) {
    return function (x, y) {
      var targetX = this$BoardModel.tetrimino.position.x + x - 1 | 0;
      var targetY = this$BoardModel.tetrimino.position.y + y | 0;
      return this$BoardModel.cells_0.get_vux9f0$(targetX, targetY) === 1 || targetX < 0;
    };
  }
  BoardModel.prototype.moveLeft = function () {
    var collides = this.tetrimino.checkCollision_wwola7$(BoardModel$moveLeft$lambda(this));
    if (collides) {
      return false;
    }
    this.tetrimino.moveLeft();
    return true;
  };
  function BoardModel$moveRight$lambda(this$BoardModel) {
    return function (x, y) {
      var targetX = this$BoardModel.tetrimino.position.x + x + 1 | 0;
      var targetY = this$BoardModel.tetrimino.position.y + y | 0;
      return this$BoardModel.cells_0.get_vux9f0$(targetX, targetY) === 1 || targetX >= this$BoardModel.width;
    };
  }
  BoardModel.prototype.moveRight = function () {
    var collides = this.tetrimino.checkCollision_wwola7$(BoardModel$moveRight$lambda(this));
    if (collides) {
      return false;
    }
    this.tetrimino.moveRight();
    return true;
  };
  BoardModel.prototype.getTetriminoCells = function () {
    return this.tetrimino.cells;
  };
  BoardModel.prototype.getTetriminoPosition = function () {
    return this.tetrimino.position;
  };
  BoardModel.prototype.startNewTurn = function () {
    this.finalizeTetrimino_0();
    this.tetrimino = this.nextTetrimino;
    this.nextTetrimino = Tetrimino$Companion_getInstance().createRandom();
    return this.clearLines_0();
  };
  BoardModel.prototype.isGameOver = function () {
    var $receiver = until(0, this.width);
    var firstOrNull$result;
    firstOrNull$break: do {
      var tmp$;
      tmp$ = $receiver.iterator();
      while (tmp$.hasNext()) {
        var element = tmp$.next();
        if (this.cells_0.get_vux9f0$(element, 0) === 1) {
          firstOrNull$result = element;
          break firstOrNull$break;
        }
      }
      firstOrNull$result = null;
    }
     while (false);
    return firstOrNull$result != null;
  };
  BoardModel.prototype.finalizeTetrimino_0 = function () {
    for (var tx = 0; tx <= 3; tx++) {
      for (var ty = 0; ty <= 3; ty++) {
        if (this.tetrimino.cells.get_vux9f0$(tx, ty) === 1) {
          var targetX = this.tetrimino.position.x + tx | 0;
          var targetY = this.tetrimino.position.y + ty | 0;
          this.cells_0.set_qt1dr2$(targetX, targetY, 1);
        }
      }
    }
  };
  BoardModel.prototype.clearLines_0 = function () {
    var tmp$, tmp$_0, tmp$_1, tmp$_2, tmp$_3, tmp$_4, tmp$_5, tmp$_6;
    var fullLines = Kotlin.kotlin.collections.ArrayList_init_ww73n8$();
    tmp$ = until(0, this.height);
    tmp$_0 = tmp$.first;
    tmp$_1 = tmp$.last;
    tmp$_2 = tmp$.step;
    for (var y = tmp$_0; y <= tmp$_1; y += tmp$_2) {
      var fullLine = true;
      tmp$_3 = until(0, this.width);
      tmp$_4 = tmp$_3.first;
      tmp$_5 = tmp$_3.last;
      tmp$_6 = tmp$_3.step;
      for (var x = tmp$_4; x <= tmp$_5; x += tmp$_6) {
        if (this.cells_0.get_vux9f0$(x, y) === 0) {
          fullLine = false;
          break;
        }
      }
      if (fullLine) {
        fullLines.add_11rb$(y);
      }
    }
    var tmp$_7;
    tmp$_7 = fullLines.iterator();
    while (tmp$_7.hasNext()) {
      var element = tmp$_7.next();
      var tmp$_8, tmp$_9, tmp$_10, tmp$_11, tmp$_12;
      tmp$_8 = until(0, this.width);
      tmp$_9 = tmp$_8.first;
      tmp$_10 = tmp$_8.last;
      tmp$_11 = tmp$_8.step;
      for (var i = tmp$_9; i <= tmp$_10; i += tmp$_11) {
        this.cells_0.set_qt1dr2$(i, element, 0);
        tmp$_12 = downTo(element, 0).iterator();
        while (tmp$_12.hasNext()) {
          var j = tmp$_12.next();
          this.cells_0.set_qt1dr2$(i, j, this.cells_0.get_vux9f0$(i, j - 1 | 0));
          this.cells_0.set_qt1dr2$(i, j - 1 | 0, 0);
        }
      }
    }
    return fullLines.size;
  };
  BoardModel.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'BoardModel',
    interfaces: []
  };
  function BoardView(bounds, context2D, model) {
    this.bounds_0 = bounds;
    this.context2D_0 = context2D;
    this.model_0 = model;
    this.cellWidth_0 = this.bounds_0.width / this.model_0.width;
    this.cellHeight_0 = this.bounds_0.height / this.model_0.height;
    this.debug_0 = false;
  }
  BoardView.prototype.render = function () {
    var tmp$, tmp$_0, tmp$_1, tmp$_2, tmp$_3, tmp$_4, tmp$_5, tmp$_6, tmp$_7, tmp$_8, tmp$_9, tmp$_10, tmp$_11, tmp$_12, tmp$_13, tmp$_14;
    this.drawBorder_0();
    tmp$ = until(0, this.model_0.width);
    tmp$_0 = tmp$.first;
    tmp$_1 = tmp$.last;
    tmp$_2 = tmp$.step;
    for (var row = tmp$_0; row <= tmp$_1; row += tmp$_2) {
      tmp$_3 = until(0, this.model_0.height);
      tmp$_4 = tmp$_3.first;
      tmp$_5 = tmp$_3.last;
      tmp$_6 = tmp$_3.step;
      for (var col = tmp$_4; col <= tmp$_5; col += tmp$_6) {
        var value = this.model_0.get_vux9f0$(row, col);
        if (value === 0)
          this.drawEmptyCell_0(row, col);
        else if (value === 1)
          this.drawFilledCell_0(row, col);
      }
    }
    var tetriminoCells = this.model_0.getTetriminoCells();
    var pos = this.model_0.getTetriminoPosition();
    tmp$_7 = until(0, tetriminoCells.width);
    tmp$_8 = tmp$_7.first;
    tmp$_9 = tmp$_7.last;
    tmp$_10 = tmp$_7.step;
    for (var row_0 = tmp$_8; row_0 <= tmp$_9; row_0 += tmp$_10) {
      tmp$_11 = until(0, tetriminoCells.height);
      tmp$_12 = tmp$_11.first;
      tmp$_13 = tmp$_11.last;
      tmp$_14 = tmp$_11.step;
      for (var col_0 = tmp$_12; col_0 <= tmp$_13; col_0 += tmp$_14) {
        if (tetriminoCells.get_vux9f0$(row_0, col_0) === 1) {
          this.drawFilledCell_0(pos.x + row_0 | 0, pos.y + col_0 | 0);
        }
      }
    }
    if (this.debug_0) {
      this.context2D_0.strokeStyle = Theme_getInstance().debugColor;
      this.context2D_0.strokeRect(this.model_0.tetrimino.position.x * this.cellWidth_0, this.model_0.tetrimino.position.y * this.cellHeight_0, this.cellWidth_0 * 4, this.cellHeight_0 * 4);
    }
  };
  BoardView.prototype.drawBorder_0 = function () {
    this.context2D_0.strokeStyle = Theme_getInstance().borderColor;
    this.context2D_0.strokeRect(this.bounds_0.x, this.bounds_0.y, this.bounds_0.width, this.bounds_0.height);
  };
  BoardView.prototype.drawFilledCell_0 = function (row, col) {
    this.context2D_0.fillStyle = Theme_getInstance().tetriminoColor;
    this.context2D_0.fillRect(row * this.cellWidth_0 + 2, col * this.cellHeight_0 + 2, this.cellWidth_0 - 4, this.cellHeight_0 - 4);
  };
  BoardView.prototype.drawEmptyCell_0 = function (row, col) {
    this.context2D_0.strokeStyle = Theme_getInstance().boardGridColor;
    this.context2D_0.strokeRect(row * this.cellWidth_0, col * this.cellHeight_0, this.cellWidth_0, this.cellHeight_0);
  };
  BoardView.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'BoardView',
    interfaces: []
  };
  function Theme() {
    Theme_instance = this;
    this.borderColor = '#37393A';
    this.boardGridColor = '#B2DBBF';
    this.sidePanelBgColor = '#B2DBBF';
    this.fontColor = '#247BA0';
    this.tetriminoColor = '#247BA0';
    this.fontStyle = '20px Consolas';
    this.gameOverFontColor = '#B91372';
    this.debugColor = 'red';
  }
  Theme.$metadata$ = {
    kind: Kotlin.Kind.OBJECT,
    simpleName: 'Theme',
    interfaces: []
  };
  var Theme_instance = null;
  function Theme_getInstance() {
    if (Theme_instance === null) {
      new Theme();
    }
    return Theme_instance;
  }
  function Game() {
    Game$Companion_getInstance();
    this.boardWidth_0 = 0;
    Game$Companion_getInstance().canvas.width = 600;
    Game$Companion_getInstance().canvas.height = Game$Companion_getInstance().canvas.width / 3.0 * 4.0 | 0;
    this.boardWidth_0 = Game$Companion_getInstance().canvas.width / 2.0;
    this.width_0 = Game$Companion_getInstance().canvas.width;
    this.height_0 = Game$Companion_getInstance().canvas.height;
    this.previousRenderTime_0 = Kotlin.Long.ZERO;
    this.boardModel_0 = new BoardModel(10, 20);
    this.boardView_0 = new BoardView(new Rectangle(0.0, 0.0, this.boardWidth_0, this.boardWidth_0 * 2), Game$Companion_getInstance().context, this.boardModel_0);
    this.gameModel_0 = new GameModel();
    this.scoreView_0 = new ScoreBoardView(new Rectangle(this.boardWidth_0, 0.0, this.boardWidth_0 / 2, this.boardWidth_0 * 2), Game$Companion_getInstance().context, this.boardModel_0, this.gameModel_0);
    this.frame_0 = 0;
  }
  function Game$Companion() {
    Game$Companion_instance = this;
    var tmp$, tmp$_0;
    this.canvas = Kotlin.isType(tmp$ = document.getElementById('canvas'), HTMLCanvasElement) ? tmp$ : Kotlin.throwCCE();
    this.context = Kotlin.isType(tmp$_0 = this.canvas.getContext('2d'), CanvasRenderingContext2D) ? tmp$_0 : Kotlin.throwCCE();
  }
  Game$Companion.$metadata$ = {
    kind: Kotlin.Kind.OBJECT,
    simpleName: 'Companion',
    interfaces: []
  };
  var Game$Companion_instance = null;
  function Game$Companion_getInstance() {
    if (Game$Companion_instance === null) {
      new Game$Companion();
    }
    return Game$Companion_instance;
  }
  Game.prototype.handleInputs_0 = function () {
  };
  Game.prototype.update_0 = function (delta) {
    if (this.gameModel_0.gameOver) {
      return;
    }
    if (this.frame_0 >= this.framesPerBlock_0()) {
      this.moveDown_0();
      this.frame_0 = 0;
    }
    this.frame_0 = this.frame_0 + 1 | 0;
  };
  Game.prototype.framesPerBlock_0 = function () {
    return 15 - (this.gameModel_0.level * 2 | 0) | 0;
  };
  Game.prototype.render_0 = function (delta) {
    this.clearScreen_0();
    this.boardView_0.render();
    this.scoreView_0.render();
  };
  Game.prototype.clearScreen_0 = function () {
    Game$Companion_getInstance().context.clearRect(0.0, 0.0, this.width_0, this.height_0);
  };
  Game.prototype.gameLoop_0 = function () {
    var delta = this.calculateDeltaTime_0();
    this.handleInputs_0();
    this.update_0(delta);
    this.render_0(delta);
  };
  Game.prototype.calculateDeltaTime_0 = function () {
    var now = Kotlin.Long.fromNumber((new Date()).getTime());
    var previous = this.previousRenderTime_0;
    this.previousRenderTime_0 = now;
    if (Kotlin.equals(previous, Kotlin.Long.ZERO)) {
      return Kotlin.Long.ZERO;
    }
    return now.subtract(previous);
  };
  function Game$run$lambda(this$Game) {
    return function () {
      this$Game.gameLoop_0();
    };
  }
  Game.prototype.run = function () {
    this.listenKeyboardInputs_0();
    window.setInterval(Game$run$lambda(this), 40);
  };
  function Game$listenKeyboardInputs$lambda(this$Game) {
    return function (it) {
      var tmp$;
      if (Kotlin.isType(it, KeyboardEvent)) {
        if (this$Game.gameModel_0.gameOver) {
          this$Game.restartGame_0();
        }
         else {
          tmp$ = it.keyCode;
          if (tmp$ === Keys$SPACE_getInstance().code)
            this$Game.boardModel_0.fallDown();
          else if (tmp$ === Keys$LEFT_getInstance().code)
            this$Game.boardModel_0.moveLeft();
          else if (tmp$ === Keys$RIGHT_getInstance().code)
            this$Game.boardModel_0.moveRight();
          else if (tmp$ === Keys$DOWN_getInstance().code)
            this$Game.moveDown_0();
          else if (tmp$ === Keys$UP_getInstance().code)
            this$Game.boardModel_0.rotate();
        }
      }
    };
  }
  Game.prototype.listenKeyboardInputs_0 = function () {
    var tmp$;
    (tmp$ = document.body) != null ? (tmp$.onkeydown = Game$listenKeyboardInputs$lambda(this)) : null;
  };
  Game.prototype.restartGame_0 = function () {
    this.gameModel_0.reset();
    this.boardModel_0.reset();
  };
  Game.prototype.moveDown_0 = function () {
    var moved = this.boardModel_0.moveDown();
    if (!moved) {
      var clearedLineCount = this.boardModel_0.startNewTurn();
      this.gameModel_0.updateScore_za3lpa$(clearedLineCount);
      if (this.boardModel_0.isGameOver()) {
        this.gameModel_0.gameOver = true;
      }
    }
  };
  Game.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'Game',
    interfaces: []
  };
  var linesPerLevel;
  function GameModel() {
    this.scoreCoefficients_0 = [40, 100, 300, 1200];
    this.targetNumberOfLinesToLevelUp_0 = linesPerLevel;
    this.totalNumberOfLinesCleared_26cse0$_0 = 0;
    this.level_26cse0$_0 = 0;
    this.score_26cse0$_0 = 0;
    this.gameOver = false;
  }
  Object.defineProperty(GameModel.prototype, 'totalNumberOfLinesCleared', {
    get: function () {
      return this.totalNumberOfLinesCleared_26cse0$_0;
    },
    set: function (totalNumberOfLinesCleared) {
      this.totalNumberOfLinesCleared_26cse0$_0 = totalNumberOfLinesCleared;
    }
  });
  Object.defineProperty(GameModel.prototype, 'level', {
    get: function () {
      return this.level_26cse0$_0;
    },
    set: function (level) {
      this.level_26cse0$_0 = level;
    }
  });
  Object.defineProperty(GameModel.prototype, 'score', {
    get: function () {
      return this.score_26cse0$_0;
    },
    set: function (score) {
      this.score_26cse0$_0 = score;
    }
  });
  GameModel.prototype.reset = function () {
    this.gameOver = false;
    this.score = 0;
    this.level = 0;
    this.totalNumberOfLinesCleared = 0;
  };
  GameModel.prototype.updateScore_za3lpa$ = function (numLines) {
    if (numLines === 0) {
      return;
    }
    this.score = this.score + Kotlin.imul(this.scoreCoefficients_0[numLines - 1 | 0], this.level + 1 | 0) | 0;
    this.totalNumberOfLinesCleared = this.totalNumberOfLinesCleared + numLines | 0;
    if (this.totalNumberOfLinesCleared >= this.targetNumberOfLinesToLevelUp_0) {
      this.targetNumberOfLinesToLevelUp_0 = this.targetNumberOfLinesToLevelUp_0 + linesPerLevel | 0;
      this.level = this.level + 1 | 0;
    }
  };
  GameModel.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'GameModel',
    interfaces: []
  };
  function Keys(name, ordinal, code) {
    Enum.call(this);
    this.code = code;
    this.name$ = name;
    this.ordinal$ = ordinal;
  }
  function Keys_initFields() {
    Keys_initFields = function () {
    };
    Keys$ENTER_instance = new Keys('ENTER', 0, 13);
    Keys$SPACE_instance = new Keys('SPACE', 1, 32);
    Keys$LEFT_instance = new Keys('LEFT', 2, 37);
    Keys$UP_instance = new Keys('UP', 3, 38);
    Keys$RIGHT_instance = new Keys('RIGHT', 4, 39);
    Keys$DOWN_instance = new Keys('DOWN', 5, 40);
  }
  var Keys$ENTER_instance;
  function Keys$ENTER_getInstance() {
    Keys_initFields();
    return Keys$ENTER_instance;
  }
  var Keys$SPACE_instance;
  function Keys$SPACE_getInstance() {
    Keys_initFields();
    return Keys$SPACE_instance;
  }
  var Keys$LEFT_instance;
  function Keys$LEFT_getInstance() {
    Keys_initFields();
    return Keys$LEFT_instance;
  }
  var Keys$UP_instance;
  function Keys$UP_getInstance() {
    Keys_initFields();
    return Keys$UP_instance;
  }
  var Keys$RIGHT_instance;
  function Keys$RIGHT_getInstance() {
    Keys_initFields();
    return Keys$RIGHT_instance;
  }
  var Keys$DOWN_instance;
  function Keys$DOWN_getInstance() {
    Keys_initFields();
    return Keys$DOWN_instance;
  }
  Keys.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'Keys',
    interfaces: [Enum]
  };
  function Keys$values() {
    return [Keys$ENTER_getInstance(), Keys$SPACE_getInstance(), Keys$LEFT_getInstance(), Keys$UP_getInstance(), Keys$RIGHT_getInstance(), Keys$DOWN_getInstance()];
  }
  Keys.values = Keys$values;
  function Keys$valueOf(name) {
    switch (name) {
      case 'ENTER':
        return Keys$ENTER_getInstance();
      case 'SPACE':
        return Keys$SPACE_getInstance();
      case 'LEFT':
        return Keys$LEFT_getInstance();
      case 'UP':
        return Keys$UP_getInstance();
      case 'RIGHT':
        return Keys$RIGHT_getInstance();
      case 'DOWN':
        return Keys$DOWN_getInstance();
      default:Kotlin.throwISE('No enum constant net.ilkinulas.tetrismini.Keys.' + name);
    }
  }
  Keys.valueOf_61zpoe$ = Keys$valueOf;
  function main(args) {
    var game = new Game();
    game.run();
  }
  function Position(x, y) {
    if (x === void 0)
      x = 0;
    if (y === void 0)
      y = 0;
    this.x = x;
    this.y = y;
  }
  Position.prototype.set_vux9f0$ = function (x, y) {
    this.x = x;
    this.y = y;
  };
  Position.prototype.plus_30fsf6$ = function (other) {
    return new Position(this.x + other.x | 0, this.y + other.y | 0);
  };
  Position.prototype.minus_30fsf6$ = function (other) {
    return new Position(this.x - other.x | 0, this.y - other.y | 0);
  };
  Position.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'Position',
    interfaces: []
  };
  Position.prototype.component1 = function () {
    return this.x;
  };
  Position.prototype.component2 = function () {
    return this.y;
  };
  Position.prototype.copy_vux9f0$ = function (x, y) {
    return new Position(x === void 0 ? this.x : x, y === void 0 ? this.y : y);
  };
  Position.prototype.toString = function () {
    return 'Position(x=' + Kotlin.toString(this.x) + (', y=' + Kotlin.toString(this.y)) + ')';
  };
  Position.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.x) | 0;
    result = result * 31 + Kotlin.hashCode(this.y) | 0;
    return result;
  };
  Position.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.x, other.x) && Kotlin.equals(this.y, other.y)))));
  };
  function Rectangle(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  Rectangle.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'Rectangle',
    interfaces: []
  };
  Rectangle.prototype.component1 = function () {
    return this.x;
  };
  Rectangle.prototype.component2 = function () {
    return this.y;
  };
  Rectangle.prototype.component3 = function () {
    return this.width;
  };
  Rectangle.prototype.component4 = function () {
    return this.height;
  };
  Rectangle.prototype.copy_v3b1co$ = function (x, y, width, height) {
    return new Rectangle(x === void 0 ? this.x : x, y === void 0 ? this.y : y, width === void 0 ? this.width : width, height === void 0 ? this.height : height);
  };
  Rectangle.prototype.toString = function () {
    return 'Rectangle(x=' + Kotlin.toString(this.x) + (', y=' + Kotlin.toString(this.y)) + (', width=' + Kotlin.toString(this.width)) + (', height=' + Kotlin.toString(this.height)) + ')';
  };
  Rectangle.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.x) | 0;
    result = result * 31 + Kotlin.hashCode(this.y) | 0;
    result = result * 31 + Kotlin.hashCode(this.width) | 0;
    result = result * 31 + Kotlin.hashCode(this.height) | 0;
    return result;
  };
  Rectangle.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.x, other.x) && Kotlin.equals(this.y, other.y) && Kotlin.equals(this.width, other.width) && Kotlin.equals(this.height, other.height)))));
  };
  function ScoreBoardView(bounds, context2D, boardModel, gameModel) {
    this.bounds_0 = bounds;
    this.context2D_0 = context2D;
    this.boardModel_0 = boardModel;
    this.gameModel_0 = gameModel;
  }
  ScoreBoardView.prototype.render = function () {
    this.drawBorderAndBg_0();
    this.drawNextTetrimino_0();
    this.drawScoreboard_0();
    this.drawGameOverText_0();
  };
  ScoreBoardView.prototype.drawGameOverText_0 = function () {
    if (this.gameModel_0.gameOver) {
      var yOffset = 350.0;
      this.context2D_0.font = Theme_getInstance().fontStyle;
      this.context2D_0.fillStyle = Theme_getInstance().gameOverFontColor;
      this.context2D_0.fillText('GAME OVER', this.bounds_0.x + 10, yOffset);
      this.context2D_0.fillText('Press any key', this.bounds_0.x + 10, yOffset + 30.0);
      this.context2D_0.fillText('to restart', this.bounds_0.x + 10, yOffset + 60.0);
    }
  };
  ScoreBoardView.prototype.drawScoreboard_0 = function () {
    this.context2D_0.font = Theme_getInstance().fontStyle;
    this.context2D_0.fillStyle = Theme_getInstance().fontColor;
    this.context2D_0.fillText('Score : ' + this.gameModel_0.score, this.bounds_0.x + 10, 150.0);
    this.context2D_0.fillText('Level : ' + this.gameModel_0.level, this.bounds_0.x + 10, 200.0);
    this.context2D_0.fillText('Lines : ' + this.gameModel_0.totalNumberOfLinesCleared, this.bounds_0.x + 10, 250.0);
  };
  ScoreBoardView.prototype.drawBorderAndBg_0 = function () {
    this.context2D_0.strokeStyle = Theme_getInstance().borderColor;
    this.context2D_0.strokeRect(this.bounds_0.x, this.bounds_0.y, this.bounds_0.width, this.bounds_0.height);
    this.context2D_0.fillStyle = Theme_getInstance().sidePanelBgColor;
    this.context2D_0.fillRect(this.bounds_0.x, this.bounds_0.y, this.bounds_0.width, this.bounds_0.height);
  };
  ScoreBoardView.prototype.drawNextTetrimino_0 = function () {
    var tmp$, tmp$_0, tmp$_1, tmp$_2, tmp$_3, tmp$_4, tmp$_5, tmp$_6;
    var blockSize = 30.0;
    this.context2D_0.fillStyle = Theme_getInstance().tetriminoColor;
    var tetriminoCells = this.boardModel_0.nextTetrimino.cells;
    var pos = new Position((this.bounds_0.x | 0) + 15 | 0, (this.bounds_0.y | 0) + 15 | 0);
    tmp$ = until(0, tetriminoCells.width);
    tmp$_0 = tmp$.first;
    tmp$_1 = tmp$.last;
    tmp$_2 = tmp$.step;
    for (var row = tmp$_0; row <= tmp$_1; row += tmp$_2) {
      tmp$_3 = until(0, tetriminoCells.height);
      tmp$_4 = tmp$_3.first;
      tmp$_5 = tmp$_3.last;
      tmp$_6 = tmp$_3.step;
      for (var col = tmp$_4; col <= tmp$_5; col += tmp$_6) {
        if (tetriminoCells.get_vux9f0$(row, col) === 1) {
          this.context2D_0.fillRect(pos.x + blockSize * row, pos.y + blockSize * col, blockSize, blockSize);
        }
      }
    }
  };
  ScoreBoardView.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'ScoreBoardView',
    interfaces: []
  };
  function Tetrimino(type) {
    Tetrimino$Companion_getInstance();
    this.type_x2d6vs$_0 = type;
    this.cells = new Array2d(4, 4);
    this.pivot = new Position();
    this.position = new Position();
    this.bounds = null;
    this.bounds = this.calculateBounds_x2d6vs$_0();
  }
  function Tetrimino$Type(name, ordinal) {
    Enum.call(this);
    this.name$ = name;
    this.ordinal$ = ordinal;
  }
  function Tetrimino$Type_initFields() {
    Tetrimino$Type_initFields = function () {
    };
    Tetrimino$Type$I_instance = new Tetrimino$Type('I', 0);
    Tetrimino$Type$O_instance = new Tetrimino$Type('O', 1);
    Tetrimino$Type$T_instance = new Tetrimino$Type('T', 2);
    Tetrimino$Type$S_instance = new Tetrimino$Type('S', 3);
    Tetrimino$Type$Z_instance = new Tetrimino$Type('Z', 4);
    Tetrimino$Type$J_instance = new Tetrimino$Type('J', 5);
    Tetrimino$Type$L_instance = new Tetrimino$Type('L', 6);
  }
  var Tetrimino$Type$I_instance;
  function Tetrimino$Type$I_getInstance() {
    Tetrimino$Type_initFields();
    return Tetrimino$Type$I_instance;
  }
  var Tetrimino$Type$O_instance;
  function Tetrimino$Type$O_getInstance() {
    Tetrimino$Type_initFields();
    return Tetrimino$Type$O_instance;
  }
  var Tetrimino$Type$T_instance;
  function Tetrimino$Type$T_getInstance() {
    Tetrimino$Type_initFields();
    return Tetrimino$Type$T_instance;
  }
  var Tetrimino$Type$S_instance;
  function Tetrimino$Type$S_getInstance() {
    Tetrimino$Type_initFields();
    return Tetrimino$Type$S_instance;
  }
  var Tetrimino$Type$Z_instance;
  function Tetrimino$Type$Z_getInstance() {
    Tetrimino$Type_initFields();
    return Tetrimino$Type$Z_instance;
  }
  var Tetrimino$Type$J_instance;
  function Tetrimino$Type$J_getInstance() {
    Tetrimino$Type_initFields();
    return Tetrimino$Type$J_instance;
  }
  var Tetrimino$Type$L_instance;
  function Tetrimino$Type$L_getInstance() {
    Tetrimino$Type_initFields();
    return Tetrimino$Type$L_instance;
  }
  Tetrimino$Type.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'Type',
    interfaces: [Enum]
  };
  function Tetrimino$Type$values() {
    return [Tetrimino$Type$I_getInstance(), Tetrimino$Type$O_getInstance(), Tetrimino$Type$T_getInstance(), Tetrimino$Type$S_getInstance(), Tetrimino$Type$Z_getInstance(), Tetrimino$Type$J_getInstance(), Tetrimino$Type$L_getInstance()];
  }
  Tetrimino$Type.values = Tetrimino$Type$values;
  function Tetrimino$Type$valueOf(name) {
    switch (name) {
      case 'I':
        return Tetrimino$Type$I_getInstance();
      case 'O':
        return Tetrimino$Type$O_getInstance();
      case 'T':
        return Tetrimino$Type$T_getInstance();
      case 'S':
        return Tetrimino$Type$S_getInstance();
      case 'Z':
        return Tetrimino$Type$Z_getInstance();
      case 'J':
        return Tetrimino$Type$J_getInstance();
      case 'L':
        return Tetrimino$Type$L_getInstance();
      default:Kotlin.throwISE('No enum constant net.ilkinulas.tetrismini.Tetrimino.Type.' + name);
    }
  }
  Tetrimino$Type.valueOf_61zpoe$ = Tetrimino$Type$valueOf;
  function Tetrimino$Companion() {
    Tetrimino$Companion_instance = this;
  }
  Tetrimino$Companion.prototype.createRandom = function () {
    var tmp$, tmp$_0;
    var values = Tetrimino$Type$values();
    tmp$ = values[Math.random() * values.length | 0];
    if (Kotlin.equals(tmp$, Tetrimino$Type$I_getInstance()))
      tmp$_0 = new I();
    else if (Kotlin.equals(tmp$, Tetrimino$Type$O_getInstance()))
      tmp$_0 = new O();
    else if (Kotlin.equals(tmp$, Tetrimino$Type$T_getInstance()))
      tmp$_0 = new T();
    else if (Kotlin.equals(tmp$, Tetrimino$Type$S_getInstance()))
      tmp$_0 = new S();
    else if (Kotlin.equals(tmp$, Tetrimino$Type$Z_getInstance()))
      tmp$_0 = new Z();
    else if (Kotlin.equals(tmp$, Tetrimino$Type$J_getInstance()))
      tmp$_0 = new J();
    else if (Kotlin.equals(tmp$, Tetrimino$Type$L_getInstance()))
      tmp$_0 = new L();
    else
      tmp$_0 = Kotlin.noWhenBranchMatched();
    var tetrimino = tmp$_0;
    tetrimino.initialize();
    return tetrimino;
  };
  Tetrimino$Companion.$metadata$ = {
    kind: Kotlin.Kind.OBJECT,
    simpleName: 'Companion',
    interfaces: []
  };
  var Tetrimino$Companion_instance = null;
  function Tetrimino$Companion_getInstance() {
    if (Tetrimino$Companion_instance === null) {
      new Tetrimino$Companion();
    }
    return Tetrimino$Companion_instance;
  }
  Tetrimino.prototype.calculateRotatedBlockPositions = function () {
    var tmp$, tmp$_0, tmp$_1, tmp$_2, tmp$_3, tmp$_4, tmp$_5, tmp$_6;
    if (this.type_x2d6vs$_0 === Tetrimino$Type$O_getInstance()) {
      return this.blockPositions_x2d6vs$_0();
    }
    var list = Kotlin.kotlin.collections.ArrayList_init_ww73n8$();
    tmp$ = until(0, this.cells.width);
    tmp$_0 = tmp$.first;
    tmp$_1 = tmp$.last;
    tmp$_2 = tmp$.step;
    for (var x = tmp$_0; x <= tmp$_1; x += tmp$_2) {
      tmp$_3 = until(0, this.cells.height);
      tmp$_4 = tmp$_3.first;
      tmp$_5 = tmp$_3.last;
      tmp$_6 = tmp$_3.step;
      for (var y = tmp$_4; y <= tmp$_5; y += tmp$_6) {
        if (this.cells.get_vux9f0$(x, y) === 1) {
          var relPosToPivot = (new Position(x, y)).minus_30fsf6$(this.pivot);
          var newPos = this.pivot.minus_30fsf6$(new Position(-relPosToPivot.y, relPosToPivot.x));
          list.add_11rb$(newPos);
        }
      }
    }
    var firstOrNull_6jwkkr$result;
    firstOrNull_6jwkkr$break: do {
      var tmp$_7;
      tmp$_7 = list.iterator();
      while (tmp$_7.hasNext()) {
        var element = tmp$_7.next();
        if (element.y < 0) {
          firstOrNull_6jwkkr$result = element;
          break firstOrNull_6jwkkr$break;
        }
      }
      firstOrNull_6jwkkr$result = null;
    }
     while (false);
    if (firstOrNull_6jwkkr$result != null) {
      var tmp$_8;
      tmp$_8 = list.iterator();
      while (tmp$_8.hasNext()) {
        var element_0 = tmp$_8.next();
        element_0.y = element_0.y + 1 | 0;
      }
    }
    return list;
  };
  Tetrimino.prototype.applyRotation_ry40lv$ = function (rotatedBlocks) {
    this.cells.reset();
    var tmp$;
    tmp$ = rotatedBlocks.iterator();
    while (tmp$.hasNext()) {
      var element = tmp$.next();
      this.cells.set_qt1dr2$(element.x, element.y, 1);
    }
    this.bounds = this.calculateBounds_x2d6vs$_0();
  };
  Tetrimino.prototype.calculateBounds_x2d6vs$_0 = function () {
    var tmp$, tmp$_0, tmp$_1, tmp$_2, tmp$_3, tmp$_4, tmp$_5, tmp$_6;
    var minX = IntCompanionObject.MAX_VALUE;
    var minY = IntCompanionObject.MAX_VALUE;
    var maxX = IntCompanionObject.MIN_VALUE;
    var maxY = IntCompanionObject.MIN_VALUE;
    tmp$ = until(0, this.cells.width);
    tmp$_0 = tmp$.first;
    tmp$_1 = tmp$.last;
    tmp$_2 = tmp$.step;
    for (var x = tmp$_0; x <= tmp$_1; x += tmp$_2) {
      tmp$_3 = until(0, this.cells.height);
      tmp$_4 = tmp$_3.first;
      tmp$_5 = tmp$_3.last;
      tmp$_6 = tmp$_3.step;
      for (var y = tmp$_4; y <= tmp$_5; y += tmp$_6) {
        if (this.cells.get_vux9f0$(x, y) === 1) {
          if (x < minX)
            minX = x;
          if (x > maxX)
            maxX = x;
          if (y < minY)
            minY = y;
          if (y > maxY)
            maxY = y;
        }
      }
    }
    return new Rectangle(minX, minY, maxX - minX + 1 | 0, maxY - minY + 1 | 0);
  };
  Tetrimino.prototype.moveDown = function () {
    var tmp$;
    tmp$ = this.position;
    tmp$.y = tmp$.y + 1 | 0;
  };
  Tetrimino.prototype.moveLeft = function () {
    var tmp$;
    tmp$ = this.position;
    tmp$.x = tmp$.x - 1 | 0;
  };
  Tetrimino.prototype.moveRight = function () {
    var tmp$;
    tmp$ = this.position;
    tmp$.x = tmp$.x + 1 | 0;
  };
  Tetrimino.prototype.checkCollision_wwola7$ = function (collisionFunction) {
    for (var x = 0; x <= 3; x++) {
      for (var y = 0; y <= 3; y++) {
        if (this.cells.get_vux9f0$(x, y) === 1) {
          if (collisionFunction(x, y)) {
            return true;
          }
        }
      }
    }
    return false;
  };
  Tetrimino.prototype.blockPositions_x2d6vs$_0 = function () {
    var list = Kotlin.kotlin.collections.ArrayList_init_ww73n8$();
    for (var x = 0; x <= 3; x++) {
      for (var y = 0; y <= 3; y++) {
        if (this.cells.get_vux9f0$(x, y) === 1)
          list.add_11rb$(new Position(x, y));
      }
    }
    return list;
  };
  Tetrimino.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'Tetrimino',
    interfaces: []
  };
  function I() {
    Tetrimino.call(this, Tetrimino$Type$I_getInstance());
  }
  I.prototype.initialize = function () {
    this.cells.set_qt1dr2$(0, 1, 1);
    this.cells.set_qt1dr2$(1, 1, 1);
    this.cells.set_qt1dr2$(2, 1, 1);
    this.cells.set_qt1dr2$(3, 1, 1);
    this.pivot.set_vux9f0$(1, 1);
    this.position.set_vux9f0$(3, -1);
  };
  I.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'I',
    interfaces: [Tetrimino]
  };
  function T() {
    Tetrimino.call(this, Tetrimino$Type$T_getInstance());
  }
  T.prototype.initialize = function () {
    this.cells.set_qt1dr2$(1, 1, 1);
    this.cells.set_qt1dr2$(2, 1, 1);
    this.cells.set_qt1dr2$(3, 1, 1);
    this.cells.set_qt1dr2$(2, 2, 1);
    this.pivot.set_vux9f0$(2, 1);
    this.position.set_vux9f0$(3, -1);
  };
  T.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'T',
    interfaces: [Tetrimino]
  };
  function L() {
    Tetrimino.call(this, Tetrimino$Type$L_getInstance());
  }
  L.prototype.initialize = function () {
    this.cells.set_qt1dr2$(1, 0, 1);
    this.cells.set_qt1dr2$(1, 1, 1);
    this.cells.set_qt1dr2$(1, 2, 1);
    this.cells.set_qt1dr2$(2, 2, 1);
    this.pivot.set_vux9f0$(1, 1);
    this.position.set_vux9f0$(3, 0);
  };
  L.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'L',
    interfaces: [Tetrimino]
  };
  function J() {
    Tetrimino.call(this, Tetrimino$Type$J_getInstance());
  }
  J.prototype.initialize = function () {
    this.cells.set_qt1dr2$(2, 0, 1);
    this.cells.set_qt1dr2$(2, 1, 1);
    this.cells.set_qt1dr2$(2, 2, 1);
    this.cells.set_qt1dr2$(1, 2, 1);
    this.pivot.set_vux9f0$(2, 1);
    this.position.set_vux9f0$(3, 0);
  };
  J.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'J',
    interfaces: [Tetrimino]
  };
  function O() {
    Tetrimino.call(this, Tetrimino$Type$O_getInstance());
  }
  O.prototype.initialize = function () {
    this.cells.set_qt1dr2$(1, 1, 1);
    this.cells.set_qt1dr2$(1, 2, 1);
    this.cells.set_qt1dr2$(2, 1, 1);
    this.cells.set_qt1dr2$(2, 2, 1);
    this.pivot.set_vux9f0$(1, 1);
    this.position.set_vux9f0$(3, -1);
  };
  O.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'O',
    interfaces: [Tetrimino]
  };
  function S() {
    Tetrimino.call(this, Tetrimino$Type$S_getInstance());
  }
  S.prototype.initialize = function () {
    this.cells.set_qt1dr2$(1, 2, 1);
    this.cells.set_qt1dr2$(2, 2, 1);
    this.cells.set_qt1dr2$(2, 1, 1);
    this.cells.set_qt1dr2$(3, 1, 1);
    this.pivot.set_vux9f0$(2, 2);
    this.position.set_vux9f0$(3, -1);
  };
  S.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'S',
    interfaces: [Tetrimino]
  };
  function Z() {
    Tetrimino.call(this, Tetrimino$Type$Z_getInstance());
  }
  Z.prototype.initialize = function () {
    this.cells.set_qt1dr2$(0, 1, 1);
    this.cells.set_qt1dr2$(1, 1, 1);
    this.cells.set_qt1dr2$(1, 2, 1);
    this.cells.set_qt1dr2$(2, 2, 1);
    this.pivot.set_vux9f0$(1, 2);
    this.position.set_vux9f0$(3, -1);
  };
  Z.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'Z',
    interfaces: [Tetrimino]
  };
  var package$net = _.net || (_.net = {});
  var package$ilkinulas = package$net.ilkinulas || (package$net.ilkinulas = {});
  var package$tetrismini = package$ilkinulas.tetrismini || (package$ilkinulas.tetrismini = {});
  package$tetrismini.Array2d = Array2d;
  package$tetrismini.BoardModel = BoardModel;
  package$tetrismini.BoardView = BoardView;
  Object.defineProperty(package$tetrismini, 'Theme', {
    get: Theme_getInstance
  });
  Object.defineProperty(Game, 'Companion', {
    get: Game$Companion_getInstance
  });
  package$tetrismini.Game = Game;
  Object.defineProperty(package$tetrismini, 'linesPerLevel', {
    get: function () {
      return linesPerLevel;
    }
  });
  package$tetrismini.GameModel = GameModel;
  Object.defineProperty(Keys, 'ENTER', {
    get: Keys$ENTER_getInstance
  });
  Object.defineProperty(Keys, 'SPACE', {
    get: Keys$SPACE_getInstance
  });
  Object.defineProperty(Keys, 'LEFT', {
    get: Keys$LEFT_getInstance
  });
  Object.defineProperty(Keys, 'UP', {
    get: Keys$UP_getInstance
  });
  Object.defineProperty(Keys, 'RIGHT', {
    get: Keys$RIGHT_getInstance
  });
  Object.defineProperty(Keys, 'DOWN', {
    get: Keys$DOWN_getInstance
  });
  package$tetrismini.Keys = Keys;
  package$tetrismini.main_kand9s$ = main;
  package$tetrismini.Position = Position;
  package$tetrismini.Rectangle = Rectangle;
  package$tetrismini.ScoreBoardView = ScoreBoardView;
  Object.defineProperty(Tetrimino$Type, 'I', {
    get: Tetrimino$Type$I_getInstance
  });
  Object.defineProperty(Tetrimino$Type, 'O', {
    get: Tetrimino$Type$O_getInstance
  });
  Object.defineProperty(Tetrimino$Type, 'T', {
    get: Tetrimino$Type$T_getInstance
  });
  Object.defineProperty(Tetrimino$Type, 'S', {
    get: Tetrimino$Type$S_getInstance
  });
  Object.defineProperty(Tetrimino$Type, 'Z', {
    get: Tetrimino$Type$Z_getInstance
  });
  Object.defineProperty(Tetrimino$Type, 'J', {
    get: Tetrimino$Type$J_getInstance
  });
  Object.defineProperty(Tetrimino$Type, 'L', {
    get: Tetrimino$Type$L_getInstance
  });
  Tetrimino.Type = Tetrimino$Type;
  Object.defineProperty(Tetrimino, 'Companion', {
    get: Tetrimino$Companion_getInstance
  });
  package$tetrismini.Tetrimino = Tetrimino;
  package$tetrismini.I = I;
  package$tetrismini.T = T;
  package$tetrismini.L = L;
  package$tetrismini.J = J;
  package$tetrismini.O = O;
  package$tetrismini.S = S;
  package$tetrismini.Z = Z;
  linesPerLevel = 10;
  main([]);
  Kotlin.defineModule('tetris-mini_main', _);
  return _;
}(typeof this['tetris-mini_main'] === 'undefined' ? {} : this['tetris-mini_main'], kotlin);
