export class TileQueue {
    constructor() {
        this.queue = [];
    }

    push(tile) {
        this.queue.push(tile);
    }

    has(tile) {
        for (let i = 0; i < this.queue.length; i++) {
            let it = this.queue[i];
            if (it.x == tile.x && it.y == tile.y && it.z == tile.z && it.id == tile.id) {
                return true;
            }
        }
        return false;
        /* let result = this.queue.filter(i => {
            if (i.x == tile.x && i.y == tile.y && i.z == tile.z) {
                return true;
            } else {
                return false;
            }
        });
        if (result.length > 0) return true;
        return false; */
    }
}
export default TileQueue;