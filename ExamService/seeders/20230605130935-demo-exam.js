'use strict';

const { DATE, TIME } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'examDefinition', [
      {
        id: "111",
        exam_Name: "Exam def one",
        passing_Score: 70,
        Questions: ["1S", "2S", "3S"],
        created_By: "Teacher ID",
        createdAt: new Date()

        // updatedAt: new Date()
      },
      {
        id: "222",
        exam_Name: "Exam def two",
        passing_Score: 50,
        Questions: ["4S", "26S", "31S"],
        created_By: "Teacher ID 22",
        createdAt: new Date()
        // updatedAt: new Date()
      }
    ], {});




    await queryInterface.bulkInsert(
      'examInstance', [
      {
        id: "1Examins",
        examDefinationId: "1",
        startedtime: new Date(),
        endTime: new Date(),
        duration: 30,
        completionTime: new Date(),
        schduledtimeFrom: new Date(),
        schduledtimeTo: new Date(),


        created_By: "Teacher ID 3",
        
        createdAt: new Date()

        // updatedAt: new Date() 

      }
    ]
    )
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
