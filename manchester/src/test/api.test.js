import supertest from 'supertest';
import { expect } from 'chai';

const API_KEY = "377a3172f4ae6ce8b24413e251ef34a5";
const city = 'Joinville,sc,br';

describe('GET API WEATHER', () => {
    it('Requisição na API WEATHER', async () => {
        const res = await supertest('https://api.openweathermap.org')
            .get(`/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=pt`);
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
    });
});
