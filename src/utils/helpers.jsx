export const formatDate = (
     date,
     options = { dateStyle: 'medium' }
) => {
     return new Date(date).toLocaleDateString('en-US', {...options})
}