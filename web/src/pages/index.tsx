import { gql } from '@apollo/client';
import { useQuery } from '@apollo/react-hooks';
import { Button } from '@chakra-ui/core';
import { NextPage } from 'next';
import React from 'react';

import { Link, useTranslation } from '../i18n';

const IndexPage: NextPage = () => {
  const query = gql`
    query {
      hello
    }
  `;

  const queryResult = useQuery(query);

  const { t, i18n } = useTranslation();

  const handleChangeLanguageClick = () => {
    i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
  };

  return (
    <div>
      <h1>{t('hello-world')}</h1>
      <h1>{queryResult?.data?.hello ?? 'none'}</h1>
      <Button colorScheme="green" size="lg" onClick={handleChangeLanguageClick}>
        {t('change-language')}
      </Button>
      <Link href="/second-page">
        <Button colorScheme="red" size="lg">
          {t('goto-second-page')}
        </Button>
      </Link>
    </div>
  );
};

export default IndexPage;
