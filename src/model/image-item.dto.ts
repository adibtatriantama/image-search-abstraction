export class ImageItemDto {
  constructor(
    public readonly type: string,
    public readonly width: number,
    public readonly height: number,
    public readonly size: number,
    public readonly url: string,
    public readonly thumbnail: {
      url: string;
      width: number;
      height: number;
    },
    public readonly description: string,
    public readonly parentPage: string,
  ) {}
}
