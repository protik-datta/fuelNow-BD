import { useQuery } from '@tanstack/react-query';
import { getDistrictsByDivision, getDivisions } from '../services/api';

export const useDivisions = () => {
  return useQuery({
    queryKey: ["divisions"],
    queryFn: getDivisions,
  });
};

export const useDistricts = (divisionId) => {
  return useQuery({
    queryKey: ["districts", divisionId],
    queryFn: () => getDistrictsByDivision(divisionId),
    enabled: !!divisionId,
  });
};
