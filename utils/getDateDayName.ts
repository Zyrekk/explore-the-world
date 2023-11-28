export const getDateDayName = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {weekday:"long"}).format(date);
};
