import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const GET_TALENT = gql`
  query GetTalent($id: ID!) {
    talent(id: $id) {
      id
      name
    }
  }
`;

export const Talent = () => (
  <div className="talent">
    <h2>Talent</h2>
    <Query query={GET_TALENT} variables={{ id: 1 }}>
      {({ loading, error, data }) => {
        if (loading) { return <p>Loading ...</p> }
        if (error) { return <p>Oh no! {error.message}</p> }

        return (
          <ul>
            <li>Name: {data.talent.name}</li>
          </ul>
        );
      }}
    </Query>
  </div>
);

