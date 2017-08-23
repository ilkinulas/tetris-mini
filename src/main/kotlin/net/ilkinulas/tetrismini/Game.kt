package net.ilkinulas.tetrismini

import org.w3c.dom.CanvasRenderingContext2D
import org.w3c.dom.HTMLCanvasElement
import org.w3c.dom.events.KeyboardEvent
import kotlin.browser.document
import kotlin.browser.window
import kotlin.js.Date

object Theme {
    const val borderColor = "#37393A"
    const val boardGridColor = "#B2DBBF"
    const val sidePanelBgColor = "#B2DBBF"
    const val fontColor = "#247BA0"
    const val tetriminoColor = "#247BA0"
    const val fontStyle = "20px Consolas"
    const val gameOverFontColor = "#B91372"
}

class Game {

    companion object {
        val canvas = document.getElementById("canvas") as HTMLCanvasElement
        val context = canvas.getContext("2d") as CanvasRenderingContext2D
    }

    private val boardWidth: Double

    init {
        canvas.width = 600
        canvas.height = (canvas.width / 3.0 * 4.0).toInt()
        boardWidth = canvas.width / 2.0
    }

    private val width = canvas.width.toDouble()
    private val height = canvas.height.toDouble()
    private var previousRenderTime = 0L

    private val boardModel = BoardModel(10, 20)
    private val boardView = BoardView(
            Rectangle(0.0, 0.0, boardWidth, boardWidth * 2),
            context, boardModel)
    private val gameModel = GameModel()
    private val scoreView = ScoreBoardView(
            Rectangle(boardWidth, 0.0, boardWidth / 2, boardWidth * 2),
            context, boardModel, gameModel)

    private fun handleInputs() {
    }

    private var frame = 0

    private fun update(delta: Long) {
        if (gameModel.gameOver) {
            return
        }
        if (frame >= framesPerBlock()) {
            moveDown()
            frame = 0
        }
        frame++
    }

    private fun framesPerBlock() = 15 - (gameModel.level * 2)

    private fun render(delta: Long) {
        clearScreen()
        boardView.render()
        scoreView.render()
    }

    private fun clearScreen() {
        Game.context.clearRect(0.0, 0.0, width, height)
    }

    private fun gameLoop() {
        val delta = calculateDeltaTime()
        handleInputs()
        update(delta)
        render(delta)
    }

    private fun calculateDeltaTime(): Long {
        val now = Date().getTime().toLong()
        val previous = previousRenderTime
        previousRenderTime = now
        if (previous == 0L) {
            return 0
        }
        return now - previous
    }

    fun run() {
        listenKeyboardInputs()
        window.setInterval({ gameLoop() }, 40)
    }

    private fun listenKeyboardInputs() {
        document.body?.onkeydown = {
            if (it is KeyboardEvent) {
                if (gameModel.gameOver) {
                    restartGame()
                } else {
                    when (it.keyCode) {
                        Keys.SPACE.code -> boardModel.fallDown()
                        Keys.LEFT.code -> boardModel.moveLeft()
                        Keys.RIGHT.code -> boardModel.moveRight()
                        Keys.DOWN.code -> moveDown()
                        Keys.UP.code -> boardModel.rotate()
                    }
                }
            }
        }
    }

    private fun restartGame() {
        gameModel.reset()
        boardModel.reset()
    }

    private fun moveDown() {
        val moved = boardModel.moveDown()
        if (!moved) {
            val clearedLineCount = boardModel.startNewTurn()
            gameModel.updateScore(clearedLineCount)
            if (boardModel.isGameOver()) {
                gameModel.gameOver = true
            }
        }
    }
}