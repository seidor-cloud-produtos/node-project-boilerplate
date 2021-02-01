import { UserInterface } from '../../interfaces/User';

class UserBuilder {
    user: Partial<UserInterface>;

    constructor() {
        this.user = {};
    }

    public withId(id: string): UserBuilder {
        this.user.id = id;
        return this;
    }

    public withName(name: string): UserBuilder {
        this.user.name = name;
        return this;
    }

    public withSurname(surname: string): UserBuilder {
        this.user.surname = surname;
        return this;
    }

    public withEmail(email: string): UserBuilder {
        this.user.email = email;
        return this;
    }

    public withAge(age: number): UserBuilder {
        this.user.age = age;
        return this;
    }

    public withCreatedAt(createdAt: Date): UserBuilder {
        this.user.createdAt = createdAt;
        return this;
    }

    public withUpdatedAt(updatedAt: Date): UserBuilder {
        this.user.updatedAt = updatedAt;
        return this;
    }

    public build(): Partial<UserInterface> {
        return this.user;
    }
}

export default UserBuilder;
