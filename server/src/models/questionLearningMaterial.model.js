const { DataTypes } = require('sequelize');

const sequelize = require('../configs/database');

const QuestionLearningMaterial = sequelize.define(
  'QuestionLearningMaterial',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    questionId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    learningMaterialId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  { timestamps: false }
);

module.exports = QuestionLearningMaterial;
