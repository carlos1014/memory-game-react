import { useMemo } from 'react';
import {
  useParams,
  useHistory,
  useLocation
} from 'react-router-dom';

const useRouter = () => {
  const params = useParams();
  const location = useLocation();
  const navigate = useHistory();

  return useMemo(() => {
    return {
      navigate,
      pathname: location.pathname,
      location,
      params,
    };
  }, [params, location, navigate]);
};

export default useRouter;
