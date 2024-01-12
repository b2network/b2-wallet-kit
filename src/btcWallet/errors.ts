export class ConnectorNotFoundError extends Error {
  constructor() {
    super('Connector not found, probably because the plugin is not installed.')
    this.name = 'ConnectorNotFoundError'
  }
}

export class UserRejectError extends Error {
  static code = 4001

  constructor() {
    super('User rejected the request.')
    this.name = 'UserRejectError'
  }
}
