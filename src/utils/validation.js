const isValidUrl = (testUrl) => {
    try {
        new URL(testUrl);
        return true;
        // eslint-disable-next-line no-unused-vars
    } catch (error) {
        return false;
    }
};

export { isValidUrl };
