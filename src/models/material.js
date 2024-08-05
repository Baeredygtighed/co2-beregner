import { Schema, model, models } from "mongoose"

const materialSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	category: {
		type: String,
		required: true,
	},
	production_cost: {
		type: Number,
		required: true,
	},
	usage_cost: {
		type: Number,
		required: true,
	},
	destruction_cost: {
		type: Number,
		required: true,
	},
	/* image: {
		type: String,
		required: true,
	}, */
}, {
	timestamps: true,
})

const Material = models.Material || model("Material", materialSchema)
export default Material
