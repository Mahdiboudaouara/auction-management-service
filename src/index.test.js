const request = require("supertest");
const { app } = require("./app");
const { faker } = require("@faker-js/faker");
const db = require("./config");

afterAll((done) => {
    // Close the database connection
    db.end(done);
});

describe("createAuction", () => {
    test("should return 400 status code if no file was uploaded", async () => {
      const req = {
        body: {
          productName: "Test Product",
          userId: 1,
          productCategory: 2,
          productDescription: "Test product description",
          auctionDate: "2024-12-03",
        },
      };
      const response = await request(app)
        .post("/backend/auction/create")
        .send(req.body);
      expect(response.statusCode).toBe(400);
      expect(response.text).toBe("No file was uploaded.");
    });
  });
  
  describe("displayProducts", () => {
    test("should return products data successfully with valid input", async () => {
      const response = await request(app).get(
        "/backend/auction/display?page=1&limit=10"
      );
      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBeGreaterThanOrEqual(0);
    });
  });
  describe("countProducts", () => {
    test("should return a count of products", async () => {
      const response = await request(app).get("/backend/auction/count");
      console.log("response.body", response.body);
      expect(response.statusCode).toBe(200);
      expect(response.body[0]).toHaveProperty("count");
    });
  });
  
  describe("countProductsCategory", () => {
    test("should return a count of products for a given category", async () => {
      const response = await request(app).get(
        "/backend/auction/countbycategory/1?page=1&limit=10"
      );
      expect(response.statusCode).toBe(200);
      expect(response.body[0]).toHaveProperty("count");
    });
  });
  
  describe("getCategories", () => {
    test("should return a list of categories", async () => {
      const response = await request(app).get("/backend/auction/categories");
      expect(response.statusCode).toBe(200);
      expect(response.body).not.toHaveLength(0);
    });
  });
  
  describe("displayByCategory", () => {
    test("should return a list of products for a given category", async () => {
      const response = await request(app).get(
        "/backend/auction/countbycategory/1?page=1&limit=10"
      );
      expect(response.statusCode).toBe(200);
      expect(response.body).not.toHaveLength(0);
    });
  });
  describe("displayProduct", () => {
    test("should return product with given product_id", async () => {
      const product_id = 10;
      const response = await request(app).get(
        `/backend/auction/displayproduct/${product_id}`
      );
      console.log("response.body", response.body);
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("id");
      expect(response.body.id).toBe(product_id);
    });
  
    test("should return 500 status code and error message if database query fails", async () => {
      const product_id = 1002;
      const mockDbQuery = jest
        .spyOn(db, "query")
        .mockImplementation((query, callback) => {
          callback(new Error("Database query failed"));
        });
      const response = await request(app).get(
        `/backend/auction/displayproduct/${product_id}`
      );
      expect(response.statusCode).toBe(500);
      expect(response.body).toHaveProperty("error");
      expect(response.body.error).toBe("Error retrieving data from the database");
      mockDbQuery.mockRestore();
    });
  });
  
  describe("getCategory", () => {
    test("should return category with given category_id", async () => {
      const category_id = 1;
      const response = await request(app).get(
        `/backend/auction/getCategory/${category_id}`
      );
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("id");
      expect(response.body.id).toBe(category_id);
    });
})