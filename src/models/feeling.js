export default (sequelize, DataTypes) => {
  const Feeling = sequelize.define('feeling', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Feeling.associate = models => {
    Feeling.belongsToMany(models.Insight, {
      through: models.InsightFeelings,
      foreignKey: {
        name: 'feelingId',
        field: 'feeling_id',
      },
    });
  };

  return Feeling;
};
