export default abstract class AbstractItem{

    public key: number;

    protected constructor(key: number) {
        this.key = key;
    }

    abstract get value(): number;
}
