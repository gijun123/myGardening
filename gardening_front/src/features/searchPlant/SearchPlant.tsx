'use client';

import { SearchPlantView } from './SearchPlantView';
import { useSearchPlantModel } from './useSearchPlantModel';

export const SearchPlant = () => {
    const model = useSearchPlantModel();
    return <SearchPlantView {...model} />;
};
