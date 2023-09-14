export default class UserDto {
    constructor(user) {
        this.name = `${user.first_name} ${user.last_name}`
        this.role = user.role
        this.email = user.email
        this.last_connection = user.last_connection
    }
}