

export function useGetCategorisedPackages(allPacks) {

    return function getCategorisedPackages() {
        const groupedData = allPacks?.reduce((acc, item) => {
            const key = item.category;
            if (!acc[key]) {
                acc[key] = [];
            }
            acc[key].push(item);
            return acc;
        }, {});


        return groupedData;
    }
}