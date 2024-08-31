const axios = require('axios');
const { expect } = require('chai');

const BASE_URL = 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json'; 

describe('API Testing', function() {

    // Positive Scenario
    it('should submit a new report with valid data and receive a success response', async function() {
        const payload = {
            title: 'Monthly Report',
            description: 'This report contains monthly performance metrics.',
            author: 'Jane Doe',
            date: '2024-08-26'
        };

        try {
            const response = await axios.post(`${BASE_URL}/reports`, payload);

            // Check if the response status is 200
            expect(response.status).to.equal(200);

            // Verify the response structure and content
            expect(response.data).to.have.property('status');
            expect(response.data).to.have.property('message').that.equals('Report submitted successfully');
            expect(response.data).to.have.property('data');
            expect(response.data.data).to.include({
                title: 'Monthly Report',
                description: 'This report contains monthly performance metrics.',
                author: 'Jane Doe',
                date: '2024-08-26'
            });
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
            throw error; // Ensure the test fails if there is an error
        }
    });

    // Negative Scenario
    it('should return an error when submitting a report with incomplete data', async function() {
        const payload = {
            title: 'Incomplete Report',
            date: '2024-08-26' // Missing other required fields
        };

        try {
            const response = await axios.post(`${BASE_URL}/reports`, payload);

            // The test should fail if a success response is received
            expect.fail('Expected a failure response but received success');
        } catch (error) {
            // Check if the response status is 400
            expect(error.response.status).to.equal(400);

            // Verify the error response structure and content
            expect(error.response.data).to.have.property('status');
            expect(error.response.data).to.have.property('error').that.equals('Incomplete data');
            expect(error.response.data).to.have.property('message').that.equals('The request is missing required fields.');
        }
    });

});
