import { NETWORK } from '@constants/api';
import { useQuery } from '@tanstack/react-query';
import type { CityData } from '@type/city';
import type { AxiosError } from 'axios';

import { getCity } from '@api/city/getCity';

export const useCityQuery = () => {
  const { data } = useQuery<CityData[], AxiosError>(['city'], getCity, {
    retry: NETWORK.RETRY_COUNT,
    suspense: true,
    useErrorBoundary: true,
  });

  return { cityData: data! };
};
