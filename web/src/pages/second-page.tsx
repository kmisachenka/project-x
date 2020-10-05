import { Button } from '@chakra-ui/core';
import React from 'react';

import { Link, useTranslation } from '../i18n';

const SecondPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div>
      <h1>{t('welcome')}</h1>
      <Link href="/">
        <Button colorScheme="green" size="lg">
          {t('go-back')}
        </Button>
      </Link>
    </div>
  );
};

export default SecondPage;
