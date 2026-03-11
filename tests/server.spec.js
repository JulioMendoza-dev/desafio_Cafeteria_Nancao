const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
    it("Debería obtener status 200 y el tipo de dato correcto", async () => {
        const response = await request(server).get("/cafes");
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    })
    it("Debería obtener codigo 404 al eliminar un cafe que no existe", async () => {
        const response = await request(server).delete("/cafes/999").set("Authorization", "Bearer token");
        expect(response.status).toBe(404);
    })
    it("Debería obtener codigo 201 al crear un nuevo cafe en POST", async () => {
        const newCafe = {
            id: 5,
            nombre: "Cafe con leche",
            precio: 150,
            stock: 20
        }
        const response = await request(server).post("/cafes").send(newCafe);
        expect(response.status).toBe(201);
    })

    it("Debería obtener codigo 400 al actualizar un café enviando un id en los parámetros que sea diferente al id dentro del payload.", async () => {
        const updatedCafe = {
            id: 5,
            nombre: "Cafe con leche",
            precio: 150,
            stock: 20
        }
        const response = await request(server).put("/cafes/4").send(updatedCafe);
        expect(response.status).toBe(400);
    })
})