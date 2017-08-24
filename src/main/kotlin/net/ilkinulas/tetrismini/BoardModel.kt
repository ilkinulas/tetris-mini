package net.ilkinulas.tetrismini


class BoardModel(val width: Int, val height: Int) {

    private val cells = Array2d(width, height)

    var tetrimino: Tetrimino = Tetrimino.createRandom()
    var nextTetrimino : Tetrimino = Tetrimino.createRandom()

    operator fun get(x: Int, y: Int) = cells[x, y]

    fun reset() {
        for (x in 0 until width) {
            for (y in 0 until height) {
                cells[x, y] = 0
            }
        }
    }

    fun rotate() {
        val rotatedBlocks = tetrimino.calculateRotatedBlockPositions()
        val collision = rotatedBlocks.find { cells[tetrimino.position.x + it.x, tetrimino.position.y + it.y] == 1 }
        if (collision == null) {
            tetrimino.applyRotation(rotatedBlocks)
        }
    }

    fun moveDown(): Boolean {
        val collides = tetrimino.checkCollision { x, y ->
            val targetX = tetrimino.position.x + x
            val targetY = tetrimino.position.y + y + 1
            cells[targetX, targetY] == 1 || targetY >= height
        }
        if (collides) {
            return false
        }
        tetrimino.moveDown()
        return true
    }

    fun fallDown() {
        while (moveDown()) {

        }
    }

    fun moveLeft(): Boolean {
        val collides = tetrimino.checkCollision { x, y ->
            val targetX = tetrimino.position.x + x - 1
            val targetY = tetrimino.position.y + y
            cells[targetX, targetY] == 1 || targetX < 0
        }
        if (collides) {
            return false
        }

        tetrimino.moveLeft()
        return true
    }

    fun moveRight(): Boolean {
        val collides = tetrimino.checkCollision { x, y ->
            val targetX = tetrimino.position.x + x + 1
            val targetY = tetrimino.position.y + y
            cells[targetX, targetY] == 1 || targetX >= width
        }
        if (collides) {
            return false
        }
        tetrimino.moveRight()
        return true
    }

    fun getTetriminoCells() = tetrimino.cells
    fun getTetriminoPosition() = tetrimino.position

    fun startNewTurn(): Int {
        finalizeTetrimino()

        tetrimino = nextTetrimino
        nextTetrimino = Tetrimino.createRandom()

        return clearLines()
    }

    fun isGameOver() : Boolean  = (0 until width).firstOrNull { cells[it, 0] == 1 } != null

    private fun finalizeTetrimino() {
        for (tx in 0..3) {
            for (ty in 0..3) {
                if (tetrimino.cells[tx, ty] == 1) {
                    val targetX = tetrimino.position.x + tx
                    val targetY = tetrimino.position.y + ty
                    cells[targetX, targetY] = 1
                }
            }
        }
    }

    private fun clearLines(): Int {
        val fullLines = mutableListOf<Int>()
        for (y in 0 until height) {
            var fullLine = true
            for (x in 0 until width) {
                if (cells[x, y] == 0) {
                    fullLine = false
                    break
                }
            }
            if (fullLine) {
                fullLines.add(y)
            }
        }

        fullLines.forEach { line ->
            for (i in 0 until width) {
                cells[i, line] = 0
                for (j in line downTo 0) {
                    cells[i, j] = cells[i, j - 1]
                    cells[i, j - 1] = 0
                }
            }
        }
        return fullLines.size
    }

}