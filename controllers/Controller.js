class Controller {
	static prepareForJson(data, success = true) {
		return {
			data: data,
			success
		}
	}
}

module.exports = Controller;
