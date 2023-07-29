import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import { fetchActors } from '~/api/fetchActors';
import { type Persons } from '~/entities/Card';
import { Actors } from '~/features/Actors/Actors';

export const ActorPage = () => {
  const [person, setPerson] = useState<Persons | null>(null);
  const { id } = useParams<'id'>();

  useEffect(() => {
    fetchActors(id || '')
      .then((data) => setPerson(data))
      .catch((error: Error) => error);
  }, [id]);

  return <div>{person ? <Actors actors={person} /> : null}</div>;
};
