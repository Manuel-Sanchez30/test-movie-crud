const request = require('supertest')
const app = require('../app')

const URL_DIRECTORS = '/api/v1/directors';
let directorId;

const director = {
    firstName:"jhonn",
    lastName:"Spencer",
    nationality:"USA",
    image:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/JohnWick_logo_bg.svg/220px-JohnWick_logo_bg.svg.png",
    birthday:"1973-05-20"
}

test("POST -> 'URL_DIRECTORS', should return status code 201, and res.body.firstName === director.firstName", async () => {

    const res = await request(app)
        .post(URL_DIRECTORS)
        .send(director)

    directorId = res.body.id

        expect(res.status).toBe(201);
        expect(res.body).toBeDefined();
        expect(res.body.firstName).toBe(director.firstName)
});

test("GET -> 'URL_DIRECTORS', should return status code 200 and res.body.toHaveLength === 1", async()=>{
    const res = await request(app)
        .get(URL_DIRECTORS)
    
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)    

});

test("GET ONE -> 'URL_DIRECTORS/:id', should return status code 200 and res.body.firstName === direc tor.firstName", async()=>{

    const res = await request(app)
        .get(`${URL_DIRECTORS}/${directorId}`)
    
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(director.firstName)    

});

test("UPDATE -> 'URL_DIRECTORS/:id', ahould return status code 200, res.body.firstName === dircetor.firstName", async () => {
    const directorUpdate = {
        firstName:"Clark"
    }

    const res = await request(app)
        .put(`${URL_DIRECTORS}/${directorId}`)
        .send(directorUpdate)
    
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(directorUpdate.firstName)    
});

test("DELETE -> 'URL_DIRECTORS/:id', should return status code 204", async()=>{
    const res = await request(app)
        .delete(`${URL_DIRECTORS}/${directorId}`)
    expect(res.status).toBe(204)    
});

