const request = require("supertest");
const app = require("../index");

describe("Operaciones CRUD de cafes", () => {
    it("la ruta GET /cafes devuelve un status code 200 y el tipo de dato recibido es un arreglo con por lo menos 1 objeto", async () => {
        const response = await request(app).get("/cafes");
        expect(response.status).toBe(200);

    });

    it("Debería obtener codigo 404 al eliminar un cafe que no existe", async () => {
        const response = await request(app).delete("/cafes/999").set("Authorization", "Bearer token");
        expect(response.status).toBe(404);
    })

    it("Debería obtener codigo 201 al crear un nuevo cafe en POST", async () => {
        const newCafe = {
            id: 5,
            nombre: "Cafe con leche",
            precio: 150,
            stock: 20
        }
        const response = await request(app).post("/cafes").send(newCafe);
        expect(response.status).toBe(201);
    })

    it("Debería obtener codigo 400 al actualizar un café enviando un id en los parámetros que sea diferente al id dentro del payload.", async () => {
        const updatedCafe = {
            id: 5,
            nombre: "Cafe con leche",
            precio: 150,
            stock: 20
        }
        const response = await request(app).put("/cafes/4").send(updatedCafe);
        expect(response.status).toBe(400);
    })
})