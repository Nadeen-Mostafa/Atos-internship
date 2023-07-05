'use strict';
/** @type {import('sequelize-cli').Migration} */
const { literal, DataTypes } = require('sequelize');
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('examDefinition', {
      id: {
        // allowNull: false,
        // autoIncrement: true,
        unique:true,
        defaultValue: literal('gen_random_uuid()'),
        primaryKey: true,
        type: Sequelize.UUID
      },
      exam_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      created_by:{
        allowNull:false,
        type:Sequelize.STRING
      },
      passing_score: {
        type: Sequelize.INTEGER
      },
      questions: {
        allowNull: false,
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      createdat: {
        // allowNull: false,
        type: Sequelize.DATE,
        defaultValue:literal('CURRENT_TIMESTAMP')
      }
    });

    

    await queryInterface.createTable('examInstance', {
      id: {
        unique:true,
        defaultValue: literal('gen_random_uuid()'),
        primaryKey: true,
        type: Sequelize.UUID
      },
      examdefinationid: {
        allowNull: false,
        // autoIncrement: true,
        // primaryKey: true,
        type: Sequelize.UUID,
        references: {
          model: 'examDefinition',
          key: 'id'
        }
      },
      startedtime: {
        allowNull: true,
        type: Sequelize.DATE
      },
      endtime: {
        allowNull: true,
        type: Sequelize.DATE
      },
      duration:{
        allowNull:false,
        type:Sequelize.INTEGER
      },
      completiontime: {
        allowNull: true,
        type: Sequelize.DATE
      },
      schduledtimefrom: {
        allowNull: false,
        type: Sequelize.DATE
      },
      schduledtimeto: {
        allowNull: false,
        type: Sequelize.DATE
      },
      created_by: {
        allowNull: false,
        type: Sequelize.STRING,
        // references: {
        //   model: 'examDefinitions',
        //   key: 'created_By'
        // }
      },
      createdat: {
        type: Sequelize.DATE,
        defaultValue:literal('CURRENT_TIMESTAMP')
      },
      taken_by: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      status: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      score: {
        allowNull:true,
        type:Sequelize.INTEGER
      }
      // updatedAt: {
      //   allowNull: false,
      //   type: Sequelize.DATE
      // }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropAllTables();
  }
};