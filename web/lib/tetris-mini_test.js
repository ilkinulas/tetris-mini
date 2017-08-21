if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'tetris-mini_test'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'tetris-mini_test'.");
}
this['tetris-mini_test'] = function (_, Kotlin) {
  'use strict';
  function BoardTest() {
  }
  BoardTest.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'BoardTest',
    interfaces: []
  };
  var package$net = _.net || (_.net = {});
  var package$ilkinulas = package$net.ilkinulas || (package$net.ilkinulas = {});
  var package$tetrismini = package$ilkinulas.tetrismini || (package$ilkinulas.tetrismini = {});
  package$tetrismini.BoardTest = BoardTest;
  Kotlin.defineModule('tetris-mini_test', _);
  return _;
}(typeof this['tetris-mini_test'] === 'undefined' ? {} : this['tetris-mini_test'], kotlin);
