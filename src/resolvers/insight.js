export default {
  Query: {
    getInsight: (parent, { id }, { models }) => {
      return models.Insight.findOne({
        where: { id },
        include: [{ model: models.Feeling, as: 'feelings' }],
      });
    },

    allInsights: (parent, args, { models }) => {
      const { field = 'createdAt', direction = 'ASC' } = args;
      return models.Insight.findAll({
        order: [[field, direction]],
        include: [{ model: models.Feeling, as: 'feelings' }],
      });
    },
  },

  Mutation: {
    createInsight: async (parent, args, { models }) => {
      try {
        const response = await models.sequelize.transaction(async transaction => {
          const insight = await models.Insight.create(args, { transaction });

          const insightFeelings = await args.feelings.map(f => ({
            feelingId: f,
            insightId: insight.dataValues.id,
          }));

          await models.InsightFeelings.bulkCreate(insightFeelings, {
            transaction,
          });

          return insight;
        });

        return {
          success: true,
          insight: response,
        };
      } catch (err) {
        return {
          success: false,
        };
      }
    },
  },
};
