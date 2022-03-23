import { useContext, useState, useEffect } from 'react';
import { UserContext } from '@providers/User';
import api from '@utils/api';

export default function useFeatureFlag(feature: string) {
  const { noUser, loading } = useContext(UserContext);
  const [featureStatus, setFeatureStatus] = useState(false);

  useEffect(() => {
    if (!noUser && !loading) {
      api.getFeatureStatus(feature).then(status => {
        setFeatureStatus(status.data.data.featureFlag?.status || false);
      });
    }
  }, [noUser, loading, feature]);

  return featureStatus;
}
