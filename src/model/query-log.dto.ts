export class QueryLogDto {
  constructor(
    public readonly _id: string,
    public readonly searchQuery: string,
    public readonly timeSearched: string,
  ) {}
}
