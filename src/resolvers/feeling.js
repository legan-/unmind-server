export default {
  Query: {
    allFeelings: (parent, args, { models }) => models.Feeling.findAll(),
  },
};
