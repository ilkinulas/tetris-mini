package net.ilkinulas.tetrismini

import org.w3c.dom.CanvasRenderingContext2D


class BoardView(bounds: Rectangle<Double>, val context2D: CanvasRenderingContext2D, val model: BoardModel) {

    private val cellWidth = bounds.width / model.width
    private val cellHeight = bounds.height / model.height

    companion object {
        const val defaultColor = "black"
        const val debugColor = "red"
    }

    private var debug = false

    fun render() {
        for (row in 0..model.width - 1) {
            for (col in 0..model.height - 1) {
                val value = model[row, col]
                when (value) {
                    0 -> drawEmptyCell(row, col)
                    1 -> drawFilledCell(row, col)
                }
            }
        }
        val tetriminoCells = model.getTetriminoCells()
        val pos = model.getTetriminoPosition()
        for (row in 0..tetriminoCells.width - 1) {
            for (col in 0..tetriminoCells.height - 1) {
                if (tetriminoCells[row, col] == 1) {
                    drawFilledCell(pos.x + row, pos.y + col)
                }
            }
        }

        if (debug) {
            context2D.strokeStyle = debugColor
            context2D.strokeRect(
                    model.tetrimino.position.x.toDouble() * cellWidth,
                    model.tetrimino.position.y.toDouble() * cellHeight,
                    cellWidth * 4,
                    cellHeight * 4)
        }
    }

    private fun drawFilledCell(row: Int, col: Int) {
        context2D.fillStyle = defaultColor
        context2D.fillRect(
                row * cellWidth + 5,
                col * cellHeight + 5,
                cellWidth - 10,
                cellHeight - 10)
        context2D.clearRect(
                row * cellWidth + 10,
                col * cellHeight + 10,
                cellWidth - 20,
                cellHeight - 20)
    }

    private fun drawEmptyCell(row: Int, col: Int) {
        context2D.strokeStyle = defaultColor
        context2D.strokeRect(
                row * cellWidth,
                col * cellHeight,
                cellWidth,
                cellHeight)

    }
}