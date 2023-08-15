const request = require('supertest')
const app = require('../app')

const URL_MOVIES = '/api/v1/movies';
let movieId;

const movie = {
    name:"Avengers",
    image:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/JohnWick_logo_bg.svg/220px-JohnWick_logo_bg.svg.png",
    synopsis:"simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",    
    releaseYear:"2014-05/20"
}

test("POST -> 'URL_MOVIES', should return status code 201, and res.body.name === movie.name", async () => {

    const res = await request(app)
        .post(URL_MOVIES)
        .send(movie)

        movieId = res.body.id

        expect(res.status).toBe(201);
        expect(res.body).toBeDefined();
        expect(res.body.name).toBe(movie.name)
});

test("GET -> 'URL_MOVIES', should return status code 200 and res.body.toHaveLength === 1", async()=>{
    const res = await request(app)
        .get(URL_MOVIES)
    console.log(res.body)
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)    

});

test("GET ONE -> 'URL_MOVIES/:id', should return status code 200 and res.body.name === movie.name", async()=>{

    const res = await request(app)
        .get(`${URL_MOVIES}/${movieId}`)
    
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movie.name)    

});

test("UPDATE -> 'URL_MOVIES/:id', ahould return status code 200, res.body.name === dircetor.name", async () => {
    const movieUpdate = {
        name:"Jumanji"
    }

    const res = await request(app)
        .put(`${URL_MOVIES}/${movieId}`)
        .send(movieUpdate)
    
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movieUpdate.name)    
});

test("DELETE -> 'URL_DIRECTORS/:id', should return status code 204", async()=>{
    const res = await request(app)
        .delete(`${URL_MOVIES}/${movieId}`)
    expect(res.status).toBe(204)    
});
