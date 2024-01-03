export interface IArticleSearchBody {
  id: number;
  title: string;
  content: string;
}
export interface IArticleSearchResult {
  hits: {
    total: number;
    hits: Array<{
      _source: IArticleSearchBody;
    }>;
  };
}
