if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'tetris-mini_main'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'tetris-mini_main'.");
}
this['tetris-mini_main'] = function (_, Kotlin) {
  'use strict';
  var downTo = Kotlin.kotlin.ranges.downTo_dqglrj$;
  var println = Kotlin.kotlin.io.println_s8jyv4$;
  var Enum = Kotlin.kotlin.Enum;
  var IntCompanionObject = Kotlin.kotlin.js.internal.IntCompanionObject;
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
  function Array2d(width, height, init) {
    Array2d$Companion_getInstance();
    if (init === void 0)
      init = null;
    this.width = width;
    this.height = height;
    this.cells = Kotlin.newArray(Kotlin.imul(this.width, this.height), 0);
  }
  function Array2d$Companion() {
    Array2d$Companion_instance = this;
  }
  Array2d$Companion.prototype.copy_raryss$ = function (source, destination) {
    var $receiver = source.cells;
    var tmp$, tmp$_0;
    var index = 0;
    for (tmp$ = 0; tmp$ !== $receiver.length; ++tmp$) {
      var item = $receiver[tmp$];
      destination.cells[tmp$_0 = index, index = tmp$_0 + 1 | 0, tmp$_0] = item;
    }
  };
  Array2d$Companion.$metadata$ = {
    kind: Kotlin.Kind.OBJECT,
    simpleName: 'Companion',
    interfaces: []
  };
  var Array2d$Companion_instance = null;
  function Array2d$Companion_getInstance() {
    if (Array2d$Companion_instance === null) {
      new Array2d$Companion();
    }
    return Array2d$Companion_instance;
  }
  Array2d.prototype.reset = function () {
    var $receiver = this.cells;
    var tmp$, tmp$_0;
    var index = 0;
    for (tmp$ = 0; tmp$ !== $receiver.length; ++tmp$) {
      var item = $receiver[tmp$];
      this.cells[tmp$_0 = index, index = tmp$_0 + 1 | 0, tmp$_0] = 0;
    }
  };
  Array2d.prototype.coordinatesToIndex_0 = function (x, y) {
    return Kotlin.imul(y, this.width) + x | 0;
  };
  Array2d.prototype.get_vux9f0$ = function (x, y) {
    return this.cells[this.coordinatesToIndex_0(x, y)];
  };
  Array2d.prototype.set_qt1dr2$ = function (x, y, value) {
    this.cells[this.coordinatesToIndex_0(x, y)] = value;
  };
  Array2d.prototype.iterator = function () {
    return Kotlin.arrayIterator(this.cells, 'IntArray');
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
    this.tetrimino = new T();
  }
  BoardModel.prototype.get_vux9f0$ = function (x, y) {
    return this.cells_0.get_vux9f0$(x, y);
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
  BoardModel.prototype.createRandomTetrimino = function () {
    this.tetrimino = Tetrimino$Companion_getInstance().createRandom();
  };
  BoardModel.prototype.startNewTurn = function () {
    this.finalizeTetrimino_0();
    this.removeFullLines_0();
    this.createRandomTetrimino();
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
  BoardModel.prototype.removeFullLines_0 = function () {
    var tmp$, tmp$_0;
    var fullLines = Kotlin.kotlin.collections.ArrayList_init_ww73n8$();
    tmp$ = this.height - 1 | 0;
    for (var y = 0; y <= tmp$; y++) {
      var fullLine = true;
      tmp$_0 = this.width - 1 | 0;
      for (var x = 0; x <= tmp$_0; x++) {
        if (this.cells_0.get_vux9f0$(x, y) === 0) {
          fullLine = false;
          break;
        }
      }
      if (fullLine) {
        fullLines.add_11rb$(y);
      }
    }
    var tmp$_1;
    tmp$_1 = fullLines.iterator();
    while (tmp$_1.hasNext()) {
      var element = tmp$_1.next();
      var tmp$_2, tmp$_3;
      tmp$_2 = this.width - 1 | 0;
      for (var i = 0; i <= tmp$_2; i++) {
        this.cells_0.set_qt1dr2$(i, element, 0);
        tmp$_3 = downTo(element, 0).iterator();
        while (tmp$_3.hasNext()) {
          var j = tmp$_3.next();
          this.cells_0.set_qt1dr2$(i, j, this.cells_0.get_vux9f0$(i, j - 1 | 0));
          this.cells_0.set_qt1dr2$(i, j - 1 | 0, 0);
        }
      }
    }
  };
  BoardModel.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'BoardModel',
    interfaces: []
  };
  function BoardView(bounds, context2D, model) {
    BoardView$Companion_getInstance();
    this.context2D = context2D;
    this.model = model;
    this.cellWidth_0 = bounds.width / this.model.width;
    this.cellHeight_0 = bounds.height / this.model.height;
    this.debug_0 = false;
  }
  function BoardView$Companion() {
    BoardView$Companion_instance = this;
    this.defaultColor = 'black';
    this.debugColor = 'red';
  }
  BoardView$Companion.$metadata$ = {
    kind: Kotlin.Kind.OBJECT,
    simpleName: 'Companion',
    interfaces: []
  };
  var BoardView$Companion_instance = null;
  function BoardView$Companion_getInstance() {
    if (BoardView$Companion_instance === null) {
      new BoardView$Companion();
    }
    return BoardView$Companion_instance;
  }
  BoardView.prototype.render = function () {
    var tmp$, tmp$_0, tmp$_1, tmp$_2;
    tmp$ = this.model.width - 1 | 0;
    for (var row = 0; row <= tmp$; row++) {
      tmp$_0 = this.model.height - 1 | 0;
      for (var col = 0; col <= tmp$_0; col++) {
        var value = this.model.get_vux9f0$(row, col);
        if (value === 0)
          this.drawEmptyCell_0(row, col);
        else if (value === 1)
          this.drawFilledCell_0(row, col);
      }
    }
    var tetriminoCells = this.model.getTetriminoCells();
    var pos = this.model.getTetriminoPosition();
    tmp$_1 = tetriminoCells.width - 1 | 0;
    for (var row_0 = 0; row_0 <= tmp$_1; row_0++) {
      tmp$_2 = tetriminoCells.height - 1 | 0;
      for (var col_0 = 0; col_0 <= tmp$_2; col_0++) {
        if (tetriminoCells.get_vux9f0$(row_0, col_0) === 1) {
          this.drawFilledCell_0(pos.x + row_0 | 0, pos.y + col_0 | 0);
        }
      }
    }
    if (this.debug_0) {
      this.context2D.strokeStyle = BoardView$Companion_getInstance().debugColor;
      this.context2D.strokeRect(this.model.tetrimino.position.x * this.cellWidth_0, this.model.tetrimino.position.y * this.cellHeight_0, this.cellWidth_0 * 4, this.cellHeight_0 * 4);
    }
  };
  BoardView.prototype.drawFilledCell_0 = function (row, col) {
    this.context2D.fillStyle = BoardView$Companion_getInstance().defaultColor;
    this.context2D.fillRect(row * this.cellWidth_0 + 5, col * this.cellHeight_0 + 5, this.cellWidth_0 - 10, this.cellHeight_0 - 10);
    this.context2D.clearRect(row * this.cellWidth_0 + 10, col * this.cellHeight_0 + 10, this.cellWidth_0 - 20, this.cellHeight_0 - 20);
  };
  BoardView.prototype.drawEmptyCell_0 = function (row, col) {
    this.context2D.strokeStyle = BoardView$Companion_getInstance().defaultColor;
    this.context2D.strokeRect(row * this.cellWidth_0, col * this.cellHeight_0, this.cellWidth_0, this.cellHeight_0);
  };
  BoardView.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'BoardView',
    interfaces: []
  };
  function Game() {
    Game$Companion_getInstance();
    this.width_0 = Game$Companion_getInstance().canvas.width;
    this.height_0 = Game$Companion_getInstance().canvas.height;
    this.previousRenderTime_0 = Kotlin.Long.ZERO;
    this.boardModel_0 = new BoardModel(10, 20);
    this.boardView_0 = new BoardView(new Rectangle(0.0, 0.0, this.width_0, this.height_0), Game$Companion_getInstance().context, this.boardModel_0);
    this.elapsedTime = Kotlin.Long.ZERO;
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
    this.elapsedTime = this.elapsedTime.add(delta);
    if (this.elapsedTime.compareTo_11rb$(Kotlin.Long.fromInt(500)) >= 0) {
      this.handleKeyDown_0();
      this.elapsedTime = Kotlin.Long.ZERO;
    }
  };
  Game.prototype.render_0 = function (delta) {
    this.clearScreen_0();
    this.boardView_0.render();
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
    return function (it) {
      var tmp$;
      if (Kotlin.isType(it, KeyboardEvent)) {
        tmp$ = it.keyCode;
        if (tmp$ === 13)
          println('ZZBAMMM');
        else if (tmp$ === 32)
          this$Game.boardModel_0.rotate();
        else if (tmp$ === 37)
          this$Game.boardModel_0.moveLeft();
        else if (tmp$ === 39)
          this$Game.boardModel_0.moveRight();
        else if (tmp$ === 40)
          this$Game.handleKeyDown_0();
      }
    };
  }
  function Game$run$lambda_0(this$Game) {
    return function () {
      this$Game.gameLoop_0();
    };
  }
  Game.prototype.run = function () {
    var tmp$;
    (tmp$ = document.body) != null ? (tmp$.onkeydown = Game$run$lambda(this)) : null;
    this.boardModel_0.createRandomTetrimino();
    window.setInterval(Game$run$lambda_0(this), 40);
  };
  Game.prototype.handleKeyDown_0 = function () {
    var moved = this.boardModel_0.moveDown();
    if (!moved) {
      this.boardModel_0.startNewTurn();
    }
  };
  Game.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'Game',
    interfaces: []
  };
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
  function Tetrimino(type) {
    Tetrimino$Companion_getInstance();
    this.type = type;
    this.cells = new Array2d(4, 4);
    this.pivot = new Position();
    this.position = new Position();
    this.bounds = null;
    this.initialize();
    this.bounds = this.calculateBounds();
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
    return tmp$_0;
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
    var tmp$, tmp$_0;
    if (this.type === Tetrimino$Type$O_getInstance()) {
      return this.blockPositions_x2d6vs$_0();
    }
    var list = Kotlin.kotlin.collections.ArrayList_init_ww73n8$();
    tmp$ = this.cells.width - 1 | 0;
    for (var x = 0; x <= tmp$; x++) {
      tmp$_0 = this.cells.height - 1 | 0;
      for (var y = 0; y <= tmp$_0; y++) {
        if (this.cells.get_vux9f0$(x, y) === 1) {
          var relPosToPivot = (new Position(x, y)).minus_30fsf6$(this.pivot);
          var newPos = this.pivot.minus_30fsf6$(new Position(-relPosToPivot.y, relPosToPivot.x));
          list.add_11rb$(newPos);
        }
      }
    }
    var firstOrNull_6jwkkr$result;
    firstOrNull_6jwkkr$break: do {
      var tmp$_1;
      tmp$_1 = list.iterator();
      while (tmp$_1.hasNext()) {
        var element = tmp$_1.next();
        if (element.y < 0) {
          firstOrNull_6jwkkr$result = element;
          break firstOrNull_6jwkkr$break;
        }
      }
      firstOrNull_6jwkkr$result = null;
    }
     while (false);
    if (firstOrNull_6jwkkr$result != null) {
      var tmp$_2;
      tmp$_2 = list.iterator();
      while (tmp$_2.hasNext()) {
        var element_0 = tmp$_2.next();
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
    this.bounds = this.calculateBounds();
  };
  Tetrimino.prototype.calculateBounds = function () {
    var tmp$, tmp$_0;
    var minX = IntCompanionObject.MAX_VALUE;
    var minY = IntCompanionObject.MAX_VALUE;
    var maxX = IntCompanionObject.MIN_VALUE;
    var maxY = IntCompanionObject.MIN_VALUE;
    tmp$ = this.cells.width - 1 | 0;
    for (var x = 0; x <= tmp$; x++) {
      tmp$_0 = this.cells.height - 1 | 0;
      for (var y = 0; y <= tmp$_0; y++) {
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
  Object.defineProperty(Array2d, 'Companion', {
    get: Array2d$Companion_getInstance
  });
  var package$net = _.net || (_.net = {});
  var package$ilkinulas = package$net.ilkinulas || (package$net.ilkinulas = {});
  var package$tetrismini = package$ilkinulas.tetrismini || (package$ilkinulas.tetrismini = {});
  package$tetrismini.Array2d = Array2d;
  package$tetrismini.BoardModel = BoardModel;
  Object.defineProperty(BoardView, 'Companion', {
    get: BoardView$Companion_getInstance
  });
  package$tetrismini.BoardView = BoardView;
  Object.defineProperty(Game, 'Companion', {
    get: Game$Companion_getInstance
  });
  package$tetrismini.Game = Game;
  package$tetrismini.main_kand9s$ = main;
  package$tetrismini.Position = Position;
  package$tetrismini.Rectangle = Rectangle;
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
  main([]);
  Kotlin.defineModule('tetris-mini_main', _);
  return _;
}(typeof this['tetris-mini_main'] === 'undefined' ? {} : this['tetris-mini_main'], kotlin);
