import { useRecoilValue } from 'recoil';
import { allPackagesState } from '../recoil/atoms/common';

export function useGetCategoryNames() {
    const allPacks = useRecoilValue(allPackagesState);

    return function getAllCategories() {
        let categories = [...new Set(allPacks.map(item => item.category))].map((item, index) => {
            return {
                id: index + 1,
                title: item,
                active: false
            }
        });

        categories.unshift({ id: 0, title: "All", active: true });

        return categories;
    }
}