

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
        return { color: 'rgba(255, 0, 0)' };
    } 
    return { color: 'rgba(0, 141, 255)' };
}

export const statusColorChecker = (option) => {
    if (option === STATUS.rejected) {
        return { color: 'rgba(255, 0, 0)' }
    } else if (option === STATUS.done) {
        return { color: 'rgba(4, 235, 36)' }
    } else if (option === STATUS.inProgress ) {
        return { color: 'rgba(0, 141, 255)' }
    }
    return { color: 'rgba(234, 237, 43)' }
}
