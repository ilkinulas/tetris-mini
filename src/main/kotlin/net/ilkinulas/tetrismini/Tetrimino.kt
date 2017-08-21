package net.ilkinulas.tetrismini

import kotlin.js.Math


abstract class Tetrimino(val type: Type) {

    enum class Type { I, O, T, S, Z, J, L }

    companion object {
        fun createRandom(): Tetrimino {
            val values = Type.values()
            return when (values[(Math.random() * values.size).toInt()]) {
                Type.I -> I()
                Type.O -> O()
                Type.T -> T()
                Type.S -> S()
                Type.Z -> Z()
                Type.J -> J()
                Type.L -> L()
            }
        }
    }

    val cells = Array2d(4, 4)
    val pivot = Position()
    val position = Position()
    var bounds: Rectangle<Int>

    init {
        initialize()
        bounds = calculateBounds()
    }

    abstract fun initialize()

    fun calculateRotatedBlockPositions(): List<Position> {
        if (type == Type.O) {
            return blockPositions()
        }
        val list = mutableListOf<Position>()
        for (x in 0..cells.width - 1) {
            for (y in 0..cells.height - 1) {
                if (cells[x, y] == 1) {
                    val relPosToPivot = Position(x, y) - pivot
                    val newPos = pivot - Position(-relPosToPivot.y, relPosToPivot.x)
                    list.add(newPos)
                }
            }
        }
        list.find { it.y < 0 }?.let {
            list.forEach { it.y++ }
        }
        return list
    }

    fun applyRotation(rotatedBlocks: List<Position>) {
        cells.reset()
        rotatedBlocks.forEach {
            cells[it.x, it.y] = 1
        }
        bounds = calculateBounds()
    }

    fun calculateBounds(): Rectangle<Int> {
        var minX = Int.MAX_VALUE
        var minY = Int.MAX_VALUE
        var maxX = Int.MIN_VALUE
        var maxY = Int.MIN_VALUE
        for (x in 0..cells.width - 1) {
            for (y in 0..cells.height - 1) {
                if (cells[x, y] == 1) {
                    if (x < minX) minX = x
                    if (x > maxX) maxX = x
                    if (y < minY) minY = y
                    if (y > maxY) maxY = y
                }
            }
        }
        return Rectangle(minX, minY, maxX - minX + 1, maxY - minY + 1)
    }


    fun moveDown() {
        position.y++
    }

    fun moveLeft() {
        position.x--
    }

    fun moveRight() {
        position.x++
    }

    fun checkCollision(collisionFunction: (x: Int, y: Int) -> Boolean): Boolean {
        for (x in 0..3) {
            for (y in 0..3) {
                if (cells[x, y] == 1) {
                    if (collisionFunction(x, y)) {
                        return true
                    }
                }
            }
        }
        return false
    }

    private fun blockPositions(): List<Position> {
        val list = mutableListOf<Position>()
        for (x in 0..3) {
            for (y in 0..3) {
                if (cells[x, y] == 1)
                    list.add(Position(x, y))
            }
        }
        return list
    }
}

class I : Tetrimino(Type.I) {
    override fun initialize() {
        cells[0, 1] = 1
        cells[1, 1] = 1
        cells[2, 1] = 1
        cells[3, 1] = 1
        pivot.set(1, 1)
        position.set(3, -1)
    }
}

class T : Tetrimino(Type.T) {
    override fun initialize() {
        cells[1, 1] = 1
        cells[2, 1] = 1
        cells[3, 1] = 1
        cells[2, 2] = 1
        pivot.set(2, 1)
        position.set(3, -1)
    }
}

class L : Tetrimino(Type.L) {
    override fun initialize() {
        cells[1, 0] = 1
        cells[1, 1] = 1
        cells[1, 2] = 1
        cells[2, 2] = 1
        pivot.set(1, 1)
        position.set(3, 0)
    }
}

class J : Tetrimino(Type.J) {
    override fun initialize() {
        cells[2, 0] = 1
        cells[2, 1] = 1
        cells[2, 2] = 1
        cells[1, 2] = 1
        pivot.set(2, 1)
        position.set(3, 0)
    }
}

class O : Tetrimino(Type.O) {
    override fun initialize() {
        cells[1, 1] = 1
        cells[1, 2] = 1
        cells[2, 1] = 1
        cells[2, 2] = 1
        pivot.set(1, 1)
        position.set(3, -1)
    }
}

class S : Tetrimino(Type.S) {
    override fun initialize() {
        cells[1, 2] = 1
        cells[2, 2] = 1
        cells[2, 1] = 1
        cells[3, 1] = 1
        pivot.set(2, 2)
        position.set(3, -1)
    }
}

class Z : Tetrimino(Type.Z) {
    override fun initialize() {
        cells[0, 1] = 1
        cells[1, 1] = 1
        cells[1, 2] = 1
        cells[2, 2] = 1
        pivot.set(1, 2)
        position.set(3, -1)
    }
}