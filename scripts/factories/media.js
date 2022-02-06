class Media {
    constructor(data) {
        if (data.image) {
            return new Image(data);
        } else {
            return new Video(data);
        }
    }
}