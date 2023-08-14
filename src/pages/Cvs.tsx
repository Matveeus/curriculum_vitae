import React, { useEffect } from 'react';
import { BreadcrumbsNav, CVsTable, Loader } from '../components';
import { useLazyQuery } from '@apollo/client';
import { Cv } from '../apollo/types';
import { GET_CVS } from '../apollo/operations';
import InfoBar from '../components/InfoBar';
import { useTypedDispatch } from '../hooks/useTypedDispatch';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { cvsSelectors, setCvs } from '../store/cvsSlice';

export default function Cvs() {
  const dispatch = useTypedDispatch();
  const cvs = useTypedSelector(cvsSelectors.selectAll);
  const [getCVs, { loading, error, data }] = useLazyQuery<{ cvs: Cv[] }>(GET_CVS);

  useEffect(() => {
    getCVs();
  }, []);

  useEffect(() => {
    if (data) {
      dispatch(setCvs(data.cvs));
    }
  }, [data]);

  const dataExist = cvs.length > 0;

  if (loading && !dataExist) {
    return <Loader />;
  }

  return (
    <>
      <BreadcrumbsNav paths={[{ text: 'CVs' }]} />
      <CVsTable cvs={cvs} />
      {error && !dataExist ? <InfoBar text={error.message} status="error" /> : null}
    </>
  );
}
