jest.mock("../config/mongo");

const mongoConnect = require("../config/mongo");
const authService = require("../auth/auth.handler");

describe("Authentication Service", () => {
  beforeEach(() => {
    mongoConnect.mockClear();
  });

  test("AUTH-01: Login with valid credentials", async () => {
    mongoConnect.mockResolvedValue({
      collection: () => ({
        findOne: jest.fn().mockResolvedValue({
          email: "test@test.com",
          password: "hashedPassword",
        }),
      }),
    });

    const result = await authService.login({
      userId: "testDev1",
      role: "OWNER"
    });
    expect(result.error).toEqual("Invalid credentials");
  });
});
