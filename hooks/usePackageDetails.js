import { useState, useEffect } from 'react';
import { callApi } from '../services/api/callApi';

const usePackageDetails = (packageId) => {
    const [packageDetails, setPackageDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!packageId) return;

        setIsLoading(true);
        callApi({
            endPoint: `packages/${packageId}`,
            method: 'GET',
            callback: (result) => {
                setIsLoading(false);
                if (result?.status === 200 && result.data?.data?.length > 0) {
                    setPackageDetails(result.data.data[0]);
                } else {
                    setError('Failed to fetch package details');
                }
            },
        });
    }, [packageId]);

    return { packageDetails, isLoading, error };
};

export default usePackageDetails;