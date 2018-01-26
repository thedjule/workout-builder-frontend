export class Workout {
    public id: number;
    public name: string;
    public note: string;

    constructor(id: number, name: string, note: string) {
        this.id = id;
        this.name = name;
        this.note = note;
    }
}