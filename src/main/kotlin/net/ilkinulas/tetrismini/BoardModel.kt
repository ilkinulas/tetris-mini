package net.ilkinulas.tetrismini


class BoardModel(val width: Int, val height: Int) {

    private val cells = Array2d(width, height)

    var tetrimino: Tetrimino = T()

    operator fun get(x: Int, y: Int) = cells[x, y]

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
    fun createRandomTetrimino() {
        tetrimino = Tetrimino.createRandom()
    }

    fun startNewTurn() {
        finalizeTetrimino()
        removeFullLines()
        createRandomTetrimino()
    }

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

    private fun removeFullLines() {
        val fullLines = mutableListOf<Int>()
        for (y in 0..height - 1) {
            var fullLine = true
            for (x in 0..width - 1) {
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
            for (i in 0..width - 1) {
                cells[i, line] = 0
                for (j in line downTo 0) {
                    cells[i, j] = cells[i, j - 1]
                    cells[i, j - 1] = 0
                }
            }
        }
    }


}