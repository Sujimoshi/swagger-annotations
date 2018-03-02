import Swagger from "../src/swagger"

const { definition, property } = new Swagger("example.com", "/api").annotations()

@definition("User")
class User {

  @property("name", "string", "User name", true, "Igor")
  name: string = "Igor"
}