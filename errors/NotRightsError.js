class NotRightsError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotRightError';
    this.statusCode = 403;
  }
}

module.exports = NotRightsError;
