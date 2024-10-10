

const TYPES = Object.freeze({
    complaint: 'Жалоба',
    offer: 'Предложение'
})

const STATUS = Object.freeze({
    rejected: 'Отказано',
    done: 'Выполнено',
    inProgress: 'Выполняется',
    sent: 'Отправлено'
})

export const typeColorChecker = (option) => {
    if (option === TYPES.complaint) {
        return { color: 'rgba(255, 0, 0, 0.70)' };
    } 
    return { color: 'rgba(0, 141, 255, 0.70)' };
}

export const statusColorChecker = (option) => {
    if (option === STATUS.rejected) {
        return { color: 'rgba(235, 4, 4, 0.69)' }
    } else if (option === STATUS.done) {
        return { color: 'rgba(4, 235, 36, 0.69)' }
    } else if (option === STATUS.inProgress ) {
        return { color: 'rgba(43, 103, 237, 0.69)' }
    }
    return { color: 'rgba(234, 237, 43, 0.69)' }
}
