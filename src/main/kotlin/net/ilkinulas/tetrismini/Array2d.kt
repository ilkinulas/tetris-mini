package net.ilkinulas.tetrismini


class Array2d(val width: Int, val height: Int, init: (() -> Unit)? = null) {

    companion object {
        fun copy(source: Array2d, destination: Array2d) {
            source.cells.forEachIndexed { index, value ->
                destination.cells[index] = value
            }
        }
    }

    val cells = IntArray(width * height)

    fun reset() {
        cells.forEachIndexed { index, _ -> cells[index] = 0 }
    }

    private fun coordinatesToIndex(x: Int, y: Int) = y * width + x

    operator fun get(x: Int, y: Int) = cells[coordinatesToIndex(x, y)]

    operator fun set(x: Int, y: Int, value: Int) {
        cells[coordinatesToIndex(x, y)] = value
    }

    operator fun iterator(): IntIterator = cells.iterator()
}
