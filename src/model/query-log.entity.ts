export class QueryLogEntity {
  constructor(
    public readonly id: string,
    public readonly searchQuery: string,
    public readonly timeSearched: Date,
  ) {}
}
