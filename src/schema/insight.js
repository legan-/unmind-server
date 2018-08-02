export default `
  enum OrderDirection {
    ASC
    DESC
  }

  enum OrderField {
    id
    createdAt
    updatedAt
  }

  type Insight {
    id: Int!
    mood: Int!
    comment: String
    createdAt: String!
    feelings: [Feeling!]!
  }

  type CreateInsightResponse {
    success: Boolean!
    insight: Insight
    errors: [Error!]
  }

  type Query {
    getInsight(id: Int!): Insight!
    allInsights(field: OrderField, direction: OrderDirection): [Insight!]!
  }

  type Mutation {
    createInsight(mood: Int!, comment: String, feelings: [Int!]): CreateInsightResponse!
  }
`;
