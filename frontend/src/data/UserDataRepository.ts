const maxScoreKey = "MAX_SCORE"

class UserDataRepository {
    get maxScore(): number {
        let item = localStorage.getItem(maxScoreKey);
        if (item == null) {
            return 0
        }
        let result = Number.parseInt(item);
        if (Number.isNaN(result)) {
            return 0
        }
        return result
    }

    set maxScore(value) {
        localStorage.setItem(maxScoreKey, value.toString())
    }
}

export default UserDataRepository