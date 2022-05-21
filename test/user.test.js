const request = require("supertest");
const app = require("../src/app");
const db = require("../src/config/db.config");
// const User = require("../src/models/user.model");
// let id;
const user = {
  email: "johndoe5@gmail.com",
  first_name: "john",
  last_name: "Doe",
  password: "jd477720",
  phone: "+233277477720",
  address: "kumasi",
  is_admin: true,
};
// const newUser = new User(user);
let token;

beforeAll((done) => {
  db.query("DELETE FROM users");
  done();
});

test("Sign up user", async () => {
  await request(app)
    .post("/v1/auth/signup")
    .send({
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      password: user.password,
      phone: user.phone,
      address: user.address,
      is_admin: user.is_admin,
    })
    .expect(201);
});

test("login user", async () => {
  await request(app)
    .post("/v1/auth/login")
    .send({
      email: user.email,
      password: user.password,
    })
    .expect(202)
    .then((res) => {
      token = res.body.data.token;
      // console.log(res.body.data.token);
    });
});

test("login failure", async () => {
  await request(app)
    .post("/v1/auth/login")
    .send({
      email: "johnDoe@gmail.com",
      password: "258799656",
    })
    .expect(404);
});

test("reset password", async () => {
  console.log(token);
  const response = await request(app)
    .post("/v1/auth/reset-password")
    .set("Authorization", `Bearer ${token}`)
    .send({
      email: user.email,
      currentPassword: user.password,
      newPassword: "123456789",
    })
    .expect(202);
  // console.log(response.body);
});

test("logout", async () => {
  await request(app)
    .post("/v1/auth/logout")
    .set("Authorization", `Bearer ${token}`)
    .send()
    .expect(200);
});

test("login user again", async () => {
  await request(app)
    .post("/v1/auth/login")
    .send({
      email: user.email,
      password: "123456789",
    })
    .expect(202)
    .then((res) => {
      token = res.body.data.token;
      // console.log(res.body.data.token);
    });
});

test("logoutAll", async () => {
  await request(app)
    .post("/v1/auth/logoutAll")
    .set("Authorization", `Bearer ${token}`)
    .send()
    .expect(200);
});
