import Sequelize from 'sequelize';
import config from '../config/config';

const env = 'development';
const conf = config[env];

const sequelize = new Sequelize(conf.database, conf.username, conf.password, {
  ...conf,
});

const models = {
  Insight: sequelize.import('./insight'),
  Feeling: sequelize.import('./feeling'),
  InsightFeelings: sequelize.import('./insightFeelings'),
};

Object.keys(models).forEach(modelName => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;
