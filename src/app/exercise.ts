export class Exercise {
    public id: number;
    public name: string;
    public video: string;
    public description: string;

    constructor(id: number, name: string, video: string, description: string) {
        this.id = id;
        this.name = name;
        this.video = video;
        this.description = description;
    }
}