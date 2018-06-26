


module.exports = {
    getDateIgnoringTimezone(inputDate) {
        const dateWithTimezone = new Date(inputDate)
        const date = new Date(dateWithTimezone.getTime() - dateWithTimezone.getTimezoneOffset() * 60 * 1000)
        return date
    }
    
}


