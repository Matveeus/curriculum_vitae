import React, { useEffect } from 'react';
import routes from '../constants/routes';
import { BreadcrumbsNav, Loader } from '../components';
import { useParams } from 'react-router-dom';
import { useTypedDispatch } from '../hooks/useTypedDispatch';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { addCv, cvsSelectors } from '../store/cvsSlice';
import { useQuery } from '@apollo/client';
import { GET_CV } from '../apollo/operations';
import InfoBar from '../components/InfoBar';
import CvDetailsForm from '../components/forms/CVs/CvDetailsFrom';
import ContactIcon from '@mui/icons-material/ContactPageOutlined';

export default function ProjectDetails() {
  const dispatch = useTypedDispatch();
  const { id } = useParams();
  const storedCv = useTypedSelector(state => cvsSelectors.selectById(state, id as string));
  const { data, error, loading } = useQuery(GET_CV, { variables: { id }, skip: !!storedCv });
  const cv = storedCv || data?.cv;

  useEffect(() => {
    if (data) {
      dispatch(addCv(data?.cv));
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
      <CvDetailsForm cv={cv} />
      {error ? <InfoBar text={error.message} status="error" /> : null}
    </>
  );
}
