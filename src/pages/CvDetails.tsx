import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_CV } from '../apollo/operations';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { addCv, cvsSelectors } from '../store/cvsSlice';
import { usersSelectors } from '../store/usersSlice';
import { useTypedDispatch } from '../hooks/useTypedDispatch';
import routes from '../constants/routes';
import ContactIcon from '@mui/icons-material/ContactPageOutlined';
import { BreadcrumbsNav, Loader, InfoBar, Details } from '../components';
import type { Cv } from '../apollo/types';

interface QueryResult {
  cv: Cv;
}

export default function ProjectDetails() {
  const { id } = useParams();
  const dispatch = useTypedDispatch();
  const storedCv = useTypedSelector(state => cvsSelectors.selectById(state, id as string));
  const { data, error, loading } = useQuery<QueryResult>(GET_CV, {
    variables: { id },
    skip: !!storedCv,
  });
  const cv = (storedCv || data?.cv) as Cv;
  const cvOwner = useTypedSelector(state => usersSelectors.selectById(state, cv?.user?.id as string));

  useEffect(() => {
    if (data) {
      dispatch(addCv(data.cv));
    }
  }, [data]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <BreadcrumbsNav
        paths={[
          { text: 'CVs', route: routes.cvs() },
          { icon: <ContactIcon />, text: cv?.name, route: routes.cv(cv?.id) },
        ]}
      />

      <Details
        entity={{
          name: cv.name,
          description: cv.description,
          user: cvOwner?.profile.full_name ?? cv.user?.email ?? '-',
          projects: cv.projects?.map(p => p.name) ?? '-',
          skills: cv.skills?.map(s => s.skill_name) ?? '-',
          languages: cv.languages?.map(l => l.language_name) ?? '-',
        }}
        mt={4}
      />

      {error ? <InfoBar text={error.message} status="error" /> : null}
    </>
  );
}
