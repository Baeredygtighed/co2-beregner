import { Schema, model, models } from "mongoose"

const termSchema = new Schema({
	terms: {
		type: Array,
		required: true,
	},
	definition: {
		type: String,
		required: true,
	},
}, {
	timestamps: true,
})

const Term = models.Term || model("Term", termSchema)

export default Term
