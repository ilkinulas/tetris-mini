package net.ilkinulas.tetrismini

import org.w3c.dom.CanvasRenderingContext2D

class ScoreBoardView(private val bounds: Rectangle<Double>, private val context2D: CanvasRenderingContext2D, val boardModel: BoardModel, val gameModel: GameModel) {

    fun render() {
        drawBorderAndBg()
        drawNextTetrimino()
        drawScoreboard()
        drawGameOverText()
    }

    private fun drawGameOverText() {
        if (gameModel.gameOver) {
            val yOffset = 350.0
            context2D.font = Theme.fontStyle
            context2D.fillStyle =  Theme.gameOverFontColor
            context2D.fillText("GAME OVER" , bounds.x + 10, yOffset)

            context2D.fillText("Press any key" , bounds.x + 10, yOffset + 30.0)
            context2D.fillText("to restart" , bounds.x + 10, yOffset + 60.0)
        }
    }

    private fun drawScoreboard() {
        context2D.font = Theme.fontStyle
        context2D.fillStyle =  Theme.fontColor
        context2D.fillText("Score : ${gameModel.score}" , bounds.x + 10, 150.0)
        context2D.fillText("Level : ${gameModel.level}" , bounds.x + 10, 200.0)
        context2D.fillText("Lines : ${gameModel.totalNumberOfLinesCleared}" , bounds.x + 10, 250.0)
    }

    private fun drawBorderAndBg() {
        context2D.strokeStyle = Theme.borderColor
        context2D.strokeRect(bounds.x, bounds.y, bounds.width, bounds.height)
        context2D.fillStyle = Theme.sidePanelBgColor
        context2D.fillRect(bounds.x, bounds.y, bounds.width, bounds.height)
    }

    private fun drawNextTetrimino() {
        boardModel.nextTetrimino?.let {
            val blockSize = 30.0
            context2D.fillStyle = Theme.tetriminoColor
            val tetriminoCells = it.cells
            val pos = Position(bounds.x.toInt() + 15, bounds.y.toInt() + 15)
            for (row in 0 until tetriminoCells.width) {
                for (col in 0 until tetriminoCells.height) {
                    if (tetriminoCells[row, col] == 1) {
                        context2D.fillRect(pos.x + (blockSize * row), pos.y + (blockSize * col), blockSize, blockSize)
                    }
                }
            }
        }
    }
}