const HTMLService = {
    sanatizeHTML: (input) => {
        return input.replace(/<\/?[^>]+(>|$)/g, "");
    }
};

export default HTMLService;
