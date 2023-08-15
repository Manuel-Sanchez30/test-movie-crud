const request = require("supertest");
const app = require("../app");

let actorId;
const URL_ACTORS = '/api/v1/actors'

const actor = {
    firstName: "John",
    lastName: "Wick",
    nationality: "Estadounidense",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/JohnWick_logo_bg.svg/220px-JohnWick_logo_bg.svg.png",
    birthday: "1965-05-24"
};

test("POST -> URL_ACTORS, should return status code 201 and res.body.firstName === actor.     firstName", async ()=>{

    const res = await request(app)    

        .post(URL_ACTORS)
        .send(actor)
    
    actorId = res.body.id

    expect(res.status).toBe(201);
    expect(res.body).toBeDefined();
    expect(res.body.firstName).toBe(actor.firstName) 

});

test("GET -> URL_ACTORS, should return status code 200 and res.body.toHaveLength === 1", async ()=>{
    const res = await request(app)
        .get(URL_ACTORS)
    
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1);    

});

test("GET ONE -> URL_ACTORS/:id, should return status code 200, and res.body.name === actor.name", async ()=>{

    const res = await request(app)
        .get(`${URL_ACTORS}/${actorId}`)
    
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(actor.name)    

});

test("UPDATE -> 'URL_ACTORS/:id', should return status code 200, res.body.firstName === actorUpdate.firstName", async ()=>{
    const actorUpdate = {
        firstName: "juan"
    }

    const res = await request(app)
        .put(`${URL_ACTORS}/${actorId}`)
        .send(actorUpdate)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(actorUpdate.firstName)    
});

test("DELETE -> URL_ACTORS/:id, should return status code 204", async ()=>{
    const res = await request(app)
        .delete(`${URL_ACTORS}/${actorId}`)
    
    expect(res.status).toBe(204)    
});






