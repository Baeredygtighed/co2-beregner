import { Schema, model, models } from "mongoose"
import { compare } from "bcrypt"

const UserSchema = new Schema({
	username: {type: String, required: true},
	password: {type: String, required: true},
})

UserSchema.methods.validatePassword = async function(password) {
	return await compare(password, this.password)
}

const User = models.User || model("User", UserSchema)

export default User
