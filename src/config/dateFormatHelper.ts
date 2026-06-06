export const dateFormatHelper = (dateString: string) => {
    if (!dateString) return 'Release date unknown'
    const date = new Date(dateString);

    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
}