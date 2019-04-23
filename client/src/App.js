import React, { useState } from 'react';

import { Talent } from './Talent';
import { TalentWithFilms } from './TalentWithFilms';

export const App = () => {
  const [moreDetails, showMoreDetails] = useState(false);

  return (
    <div>
      <Talent />

      <button onClick={() => showMoreDetails(!moreDetails)}>
        {moreDetails ? 'Less' : 'More'} Details
      </button>

      {moreDetails ? <TalentWithFilms /> : null}
    </div>
  );
};
