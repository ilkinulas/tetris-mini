package net.ilkinulas.tetrismini


data class Position(var x: Int = 0, var y: Int = 0) {
    fun set(x: Int, y: Int) {
        this.x = x
        this.y = y
    }

    operator fun plus(other: Position) = Position(x + other.x, y + other.y)
    operator fun minus(other: Position) = Position(x - other.x, y - other.y)
}