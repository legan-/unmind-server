export default (sequelize, DataTypes) => {
  const Insight = sequelize.define('insight', {
    mood: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: {
          args: true,
          msg: 'Invalid mood type',
        },
        min: {
          args: 1,
          msg: 'Mood needs to be greater than or equal to 1',
        },
        max: {
          args: 7,
          msg: 'Mood needs to be less than or equal to 7',
        },
      },
    },
    comment: {
      type: DataTypes.TEXT,
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at',
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at',
    },
  });

  Insight.associate = models => {
    Insight.belongsToMany(models.Feeling, {
      through: models.InsightFeelings,
      foreignKey: {
        name: 'insightId',
        field: 'insight_id',
      },
    });
  };

  return Insight;
};
