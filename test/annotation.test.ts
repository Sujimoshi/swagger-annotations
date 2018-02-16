import Annotations from "../src/annotations"
import Swagger from "../src/swagger"

describe("Annotations tests", () => {

  let swagger: Swagger

  beforeEach(() => {
    swagger = new Swagger("some.com", "/api")
  })

  it("Path annotations", (done) => {
    const { path, parameter, response, security } = swagger.annotations()
    swagger.security("jwt", {
      type: "apiKey",
      name: "Authorization",
      in: "header",
      description: "JWT Auth"
    })
    
    class UserController {
      @path("/user", "post", "createUser", ["user"], "Create user")
      @parameter("body", "body", "string", true, "User instance")
      @response("default", "Success", "string")
      @security("jwt")
      createAction() {
        console.log('User created')
      }
    }

    swagger.validate().then(() => {
      const api = swagger.toJSON()
      if(Object.keys(api.paths).length < 1) 
        return done("Too few paths")
      done()
    }).catch(done)
  })

  it("Defintion annotations", (done) => {
    const { definition, property } = swagger.annotations()

    @definition("User")
    class User {
      @property("name", "string", "User name", true)
      name: string = "Igor"
    }

    swagger.validate().then(() => {
      const api = swagger.toJSON()
      if(Object.keys(api.definitions).length < 1) 
        return done("Too few definitions")
      done()
    }).catch(done)
  })
})
