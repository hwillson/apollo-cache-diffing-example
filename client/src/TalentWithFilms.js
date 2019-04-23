import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const GET_TALENT_WITH_FILMS = gql`
  query GetTalentWithFilms($id: ID!) {
    talent(id: $id) {
      id
      name
      films {
        id
        title
        year
      }
    }
  }
`;

function prepareData(data, cache, query, variables) {
  let newData;
  if (data && Object.keys(data).length > 0) {
    newData = data;
  } else {
    const diff = cache.diff({
      query,
      variables,
      returnPartialData: true,
    });
    newData = diff ? diff.result : {};
  }
  return newData;
}

export const TalentWithFilms = () => (
  <div className="talent-with-films">
    <h2>Talent With Films</h2>
    <Query
      query={GET_TALENT_WITH_FILMS}
      variables={{ id: 1 }}
    >
      {({ error, data, client: { cache } }) => {
        if (error) { return <p>Oh no! {error.message}</p> }

        const fullData =
          prepareData(data, cache, GET_TALENT_WITH_FILMS, { id: 1 });

        return (
          <ul>
            <li key="name">Name: {fullData.talent.name}</li>
            <li key="films">
              Films:
              {
                fullData.talent.films
                  ? (
                    <ul>
                      {fullData.talent.films.map(film => (
                        <li key={film.title}>
                          Title: {film.title} ({film.year})
                        </li>
                      ))}
                    </ul>
                  )
                  : ' loading ...'
              }
            </li>
          </ul>
        );
      }}
    </Query>
  </div>
);
