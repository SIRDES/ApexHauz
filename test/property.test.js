const request = require("supertest");
const app = require("../src/app");

const user = {
  email: "johndoe5@gmail.com",
  first_name: "john",
  last_name: "Doe",
  password: "jd477720",
  phone: "+233277477720",
  address: "kumasi",
  is_admin: true,
};
let token, property_id;
const property = {
  status: "available",
  price: 734.9,
  state: "accra",
  city: "Nima",
  address: "Obs 23",
  type: "4-bedroom",
};

test("login user again", async () => {
  await request(app)
    .post("/v1/auth/login")
    .send({
      email: user.email,
      password: "123456789",
    })
    .then((res) => {
      token = res.body.data.token;
    });
});

test("Add property", async () => {
  const res = await request(app)
    .post("/v1/property")
    .set("Authorization", `Bearer ${token}`)
    .send(property)
    .expect(201);
});

test("should get all proeperties", async () => {
  const res = await request(app).get("/v1/property").send().expect(200);
  property_id = res.body.data[0].property_id;
});

test("should get property by id", async () => {
  const res = await request(app)
    .get(`/v1/property/${property_id}`)
    .send()
    .expect(200);
});

test("should update property as sold", async () => {
  const res = await request(app)
    .patch(`/v1/property/${property_id}/sold`)
    .set("Authorization", `Bearer ${token}`)
    .send({
      status: "sold",
    })
    .expect(200);
});

test("Should report fraud", async () => {
  const res = await request(app)
    .post(`/v1/property/${property_id}/report`)
    .set("Authorization", `Bearer ${token}`)
    .send({
      reason: "Double sales",
      description: "The property was sold already",
    })
    .expect(200);
});

