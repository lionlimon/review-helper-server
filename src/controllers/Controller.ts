export default class Controller {
  static prepareForJson<T>(data: T, success = true) {
    return {
      data,
      success,
    };
  }
}
