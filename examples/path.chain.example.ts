import Swagger from "../src/swagger";

const swg: Swagger = new Swagger("example.com", "/api")

swg.path("/user", "post", "createUser", ["user"], "Create user")
  .parameter("body", "body", "string", true, "User instance")
  .response("200", "Success", "string")
  .response("default", "Success", "string")
  .security("jwt")
function createUserAction() {
  console.log('User created')
}