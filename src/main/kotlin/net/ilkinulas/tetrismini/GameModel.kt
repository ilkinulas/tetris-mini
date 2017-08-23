package net.ilkinulas.tetrismini

const val linesPerLevel = 10

class GameModel {

    private val scoreCoefficients = intArrayOf(40, 100, 300, 1200)
    private var targetNumberOfLinesToLevelUp = linesPerLevel

    var totalNumberOfLinesCleared = 0
        private set

    var level: Int = 0
        private set

    var score: Int = 0
        private set

    var gameOver : Boolean = false

    fun reset() {
        gameOver = false
        score = 0
        level = 0
        totalNumberOfLinesCleared = 0
    }

    fun updateScore(numLines: Int) {
        if (numLines == 0) {
            return
        }
        score += scoreCoefficients[numLines - 1] * (level + 1)
        totalNumberOfLinesCleared += numLines
        if (totalNumberOfLinesCleared >= targetNumberOfLinesToLevelUp) {
            targetNumberOfLinesToLevelUp += linesPerLevel
            level++
        }
    }
}

