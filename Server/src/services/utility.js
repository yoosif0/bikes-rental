module.exports = {
    successMessageWrapper: { success: 'ok' },
    errorMessageWrapper(msg) {
        return { msg }
    },
}