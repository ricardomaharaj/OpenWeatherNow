export type Resolver<T, Args> = (parent: unknown, args: Args) => Promise<T>
