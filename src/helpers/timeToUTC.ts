export const timeToUTC = (isoTime: string) => {
    return `${new Date(isoTime).toLocaleTimeString('en-US')}, ${new Date(isoTime).toLocaleDateString('en-US')}`;
};
