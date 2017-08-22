package net.ilkinulas.tetrismini

import org.w3c.dom.CanvasRenderingContext2D
import org.w3c.dom.HTMLCanvasElement
import org.w3c.dom.events.KeyboardEvent
import kotlin.browser.document
import kotlin.browser.window
import kotlin.js.Date

class Game {

    companion object {
        val canvas = document.getElementById("canvas") as HTMLCanvasElement
        val context = canvas.getContext("2d") as CanvasRenderingContext2D
    }

    private val width = canvas.width.toDouble()
    private val height = canvas.height.toDouble()
    private var previousRenderTime = 0L

    private val boardModel = BoardModel(10, 20)
    private val boardView = BoardView(Rectangle(0.0, 0.0, width, height), context, boardModel)
    private val gameModel = GameModel()

    private fun handleInputs() {
    }

    private var frame = 0

    private fun update(delta: Long) {
        if (frame >= framesPerBlock()) {
            handleKeyDown()
            frame = 0
        }
        frame++
    }

    private fun framesPerBlock() = 15 - (gameModel.level * 2)

    private fun render(delta: Long) {
        clearScreen()
        boardView.render()
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
        boardModel.createRandomTetrimino()
        window.setInterval({ gameLoop() }, 40)
    }

    private fun listenKeyboardInputs() {
        document.body?.onkeydown = {
            if (it is KeyboardEvent) {
                when (it.keyCode) {
                    Keys.ENTER.code -> boardModel.fallDown()
                    Keys.SPACE.code -> boardModel.rotate()
                    Keys.LEFT.code -> boardModel.moveLeft()
                    Keys.RIGHT.code -> boardModel.moveRight()
                    Keys.DOWN.code -> handleKeyDown()
                }
            }
        }
    }

    private fun handleKeyDown() {
        val moved = boardModel.moveDown()
        if (!moved) {
            val clearedLineCount = boardModel.startNewTurn()
            gameModel.updateScore(clearedLineCount)
            if (boardModel.isGameOver()) {
                println("GAME OVER")
            }
            println("Score : ${gameModel.score} Level : ${gameModel.level} totalLines : ${gameModel.totalNumberOfLinesCleared}")
        }
    }
}