export class User {
    public id: number;
    public name: string;
    public email: string;
    public password: string;
    public age: string;
    public gender: string;
    public height: number;
    public weight: number;

    constructor (id: number, name: string, email: string, password: string, age: string, gender: string, height: number, weight: number) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.age = age;
        this.gender = gender;
        this.height = height;
        this.weight = weight;
    }
}
