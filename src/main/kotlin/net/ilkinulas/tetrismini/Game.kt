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

    private fun handleInputs() {
    }

    var elapsedTime = 0L
    private fun update(delta: Long) {
        elapsedTime += delta
        if (elapsedTime >= 500) {
            handleKeyDown()
            elapsedTime = 0
        }
    }

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
        document.body?.onkeydown = {
            if (it is KeyboardEvent) {
                when (it.keyCode) {
                    13 -> println("ZZBAMMM")
                    32 -> boardModel.rotate()
                    37 -> boardModel.moveLeft()
                    39 -> boardModel.moveRight()
                    40 -> handleKeyDown()
                }
            }
        }

        boardModel.createRandomTetrimino()

        window.setInterval({ gameLoop() }, 40)
    }

    private fun handleKeyDown() {
        val moved = boardModel.moveDown()
        if ( ! moved) {
            boardModel.startNewTurn()
        }
    }
}