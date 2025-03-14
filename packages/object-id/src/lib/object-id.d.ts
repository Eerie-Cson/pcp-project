export declare class ObjectId {
    private readonly _value;
    private constructor();
    static generate(type: string): ObjectId;
    static from(type: string): ObjectId;
    toString(): string;
    private get value();
}
