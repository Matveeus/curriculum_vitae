import React, { useEffect } from 'react';
import { BreadcrumbsNav, CVsTable, Loader } from '../components';
import { useLazyQuery } from '@apollo/client';
import { Cv } from '../apollo/types';
import { GET_CVS } from '../apollo/operations';
import InfoBar from '../components/InfoBar';

export default function Cvs() {
  const [getCVs, { loading, error, data }] = useLazyQuery<{ cvs: Cv[] }>(GET_CVS);
  const cvs = data?.cvs || [];

  useEffect(() => {
    getCVs();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <BreadcrumbsNav paths={[{ text: 'CVs' }]} />
      <CVsTable cvs={cvs} />
      {error ? <InfoBar text={error.message} status="error" /> : null}
    </>
  );
}
