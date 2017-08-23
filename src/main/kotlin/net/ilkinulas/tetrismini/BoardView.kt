package net.ilkinulas.tetrismini

import org.w3c.dom.CanvasRenderingContext2D


class BoardView(val bounds: Rectangle<Double>, private val context2D: CanvasRenderingContext2D, val model: BoardModel) : View {

    private val cellWidth = bounds.width / model.width
    private val cellHeight = bounds.height / model.height

    companion object {
        const val defaultColor = "black"
        const val debugColor = "red"
    }

    private var debug = false

    override fun render() {
        drawBorder()
        for (row in 0 until model.width) {
            for (col in 0 until model.height) {
                val value = model[row, col]
                when (value) {
                    0 -> drawEmptyCell(row, col)
                    1 -> drawFilledCell(row, col)
                }
            }
        }
        val tetriminoCells = model.getTetriminoCells()
        val pos = model.getTetriminoPosition()
        for (row in 0 until tetriminoCells.width) {
            for (col in 0 until tetriminoCells.height) {
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

    private fun drawBorder() {
        context2D.strokeStyle = Theme.borderColor
        context2D.strokeRect(bounds.x, bounds.y, bounds.width, bounds.height)
    }

    private fun drawFilledCell(row: Int, col: Int) {
        context2D.fillStyle = Theme.tetriminoColor
        context2D.fillRect(
                row * cellWidth + 2,
                col * cellHeight + 2,
                cellWidth - 4,
                cellHeight - 4)
    }

    private fun drawEmptyCell(row: Int, col: Int) {
        context2D.strokeStyle = Theme.boardGridColor
        context2D.strokeRect(
                row * cellWidth,
                col * cellHeight,
                cellWidth,
                cellHeight)

    }
}