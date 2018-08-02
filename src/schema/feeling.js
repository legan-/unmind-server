export default `
  type Feeling {
    id: Int!
    name: String!
  }

  type Query {
    allFeelings: [Feeling!]!
  }
`;
