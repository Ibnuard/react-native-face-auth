//Custom User Utils

export function capitalize(str) {
    if (str == null || str.length == 0) {
        return '-'
    }

    return str.charAt(0).toUpperCase() + str.slice(1)
}