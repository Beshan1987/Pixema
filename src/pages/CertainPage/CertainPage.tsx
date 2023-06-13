import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import { fetchCertainCard } from '~/api/fetchCertainCard';
import { type CardAPI } from '~/entities/Card';
import { CertainCard } from '~/features/Card/CertainCard/CertainPage';

export const CertainPage = () => {
  const [card, setCard] = useState<CardAPI | null>(null);
  const { id } = useParams<'id'>();

  useEffect(() => {
    fetchCertainCard(id || '')
      .then((data) => setCard(data))
      .catch((error: Error) => error);
  }, [id]);

  return <div>{card ? <CertainCard card={card} /> : null}</div>;
};
